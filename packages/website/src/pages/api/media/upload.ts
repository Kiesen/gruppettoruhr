/**
 * -- TODO --
 * Remove eslint disable rule after adding req and res types
 * that work both with next and multer.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '@src/utils/s3';

import { createJSONPayload } from '@src/utils/api';
import {
  FIELD_NAME,
  MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE,
} from '@src/consts/upload';
import {
  BUCKET_MEDIA_PREFIX,
  S3_BUCKET_ID,
  S3_BASE_URL,
} from '@src/consts/s3';

type NextApiRequestWithMediaProp = NextApiRequest & {
  mediaURLS?: string[];
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_ID,
    acl: 'public-read',
    contentType(_, file, cb) {
      cb(null, file.mimetype);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    key(req: any, file, cb) {
      const contentKey = `${BUCKET_MEDIA_PREFIX}/${file.originalname}`;

      // Use the media array on the request object to add new media url
      req.mediaURLS = [
        ...req.mediaURLS,
        `${S3_BASE_URL}/${contentKey}`,
      ];

      cb(null, contentKey);
    },
  }),
  fileFilter: (_, file, cb) => {
    if (MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    }
    cb(null, false);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
}).array(FIELD_NAME);

const handler = (
  req: NextApiRequestWithMediaProp,
  res: NextApiResponse
): void => {
  if (req.method === 'POST') {
    req.mediaURLS = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadMiddleware(req as any, res as any, (err) => {
      if (err) {
        const payload = createJSONPayload<string>(req.method, {
          error: 'Internal error during image upload',
        });
        res.status(500).send(payload);
      }

      const payload = createJSONPayload<{ mediaURLS: string[] }>(
        req.method,
        {
          data: { mediaURLS: req.mediaURLS },
        }
      );
      res.status(200).send(payload);
    });
  } else {
    const payload = createJSONPayload<string>(req.method, {
      error: 'Method not allows',
    });
    res.status(405).send(payload);
  }
};

export default handler;
