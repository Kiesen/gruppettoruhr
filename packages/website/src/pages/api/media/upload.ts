import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { v4 as uuidv4 } from 'uuid';
import Busboy from 'busboy';

import { uploadObject } from '@src/utils/s3';
import { createJSONPayload } from '@src/utils/api';
import { MIME_TYPES, MAX_FILES } from '@src/consts/upload';
import { BUCKET_MEDIA_PREFIX, S3_ACL_OPTIONS } from '@src/consts/s3';
import {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_UNSUPPORTED_MEDIA_TYPE,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_INTERNAL_SERVER_ERROR,
} from '@src/consts/status';

import { MediaContentURL, MediaContentError } from '@src/types/media';

export const config = {
  api: {
    bodyParser: false,
  },
};

const mediaUploadHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  /**
   * We need to return a promise to avoid that nextjs reports a warning.
   * The reason for this is the nested async function call on the
   * busboy on file event.
   */
  return new Promise((resolve) => {
    if (req.method === 'POST') {
      const session = getSession({ req });
      if (!session) {
        const payload = createJSONPayload<null, MediaContentError>(
          req.method,
          null,
          'Unauthorized'
        );
        res.status(HTTP_UNAUTHORIZED).send(payload);
        resolve();
      } else {
        const busboy = new Busboy({
          headers: req.headers,
          limits: { files: MAX_FILES },
        });
        busboy.on(
          'file',
          async (_, file, filename, encoding, mimetype) => {
            if (MIME_TYPES.includes(mimetype)) {
              try {
                const uuid = uuidv4();
                const uploadData = await uploadObject(
                  `${BUCKET_MEDIA_PREFIX}/${uuid}.${filename}`,
                  file,
                  encoding,
                  mimetype,
                  S3_ACL_OPTIONS.PUBLIC_READ
                );
                const payload = createJSONPayload<MediaContentURL>(
                  req.method,
                  {
                    url: uploadData.Location,
                    lastModified: new Date(),
                  }
                );
                res.status(HTTP_OK).send(payload);
                resolve();
              } catch {
                const payload = createJSONPayload<
                  null,
                  MediaContentError
                >(req.method, null, 'File upload failed');
                res.status(HTTP_INTERNAL_SERVER_ERROR).send(payload);
                resolve();
              }
            } else {
              const payload = createJSONPayload<
                null,
                MediaContentError
              >(req.method, null, 'Mime type is not supported');
              res.status(HTTP_UNSUPPORTED_MEDIA_TYPE).send(payload);
              resolve();
            }
          }
        );
        req.pipe(busboy);
      }
    } else {
      const payload = createJSONPayload<null, MediaContentError>(
        req.method,
        null,
        'Method not allowed'
      );
      res.status(HTTP_METHOD_NOT_ALLOWED).send(payload);
      resolve();
    }
  });
};

export default mediaUploadHandler;
