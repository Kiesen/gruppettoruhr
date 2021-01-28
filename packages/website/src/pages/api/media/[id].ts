import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { createJSONPayload } from '@src/utils/api';
import { deleteObject } from '@src/utils/s3';
import { BUCKET_MEDIA_PREFIX } from '@src/consts/s3';
import {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '@src/consts/status';

import { MediaContentError } from '@src/types/media';

const mediaContentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;

  if (req.method === 'DELETE') {
    const session = getSession({ req });
    if (!session) {
      const payload = createJSONPayload<null, MediaContentError>(
        req.method,
        null,
        'Unauthorized'
      );
      res.status(HTTP_UNAUTHORIZED).send(payload);
    } else {
      if (typeof id === 'string') {
        try {
          await deleteObject(`${BUCKET_MEDIA_PREFIX}/${id}`);
          const payload = createJSONPayload(req.method);
          res.status(HTTP_OK).send(payload);
        } catch {
          const payload = createJSONPayload<null, MediaContentError>(
            req.method,
            null,
            'Delete operation failed'
          );
          res.status(HTTP_INTERNAL_SERVER_ERROR).send(payload);
        }
      } else {
        const payload = createJSONPayload<null, MediaContentError>(
          req.method,
          null,
          'Bad request'
        );
        res.status(HTTP_BAD_REQUEST).send(payload);
      }
    }
  } else {
    const payload = createJSONPayload<null, MediaContentError>(
      req.method,
      null,
      'Unauthorized'
    );
    res.status(HTTP_METHOD_NOT_ALLOWED).send(payload);
  }
};

export default mediaContentHandler;
