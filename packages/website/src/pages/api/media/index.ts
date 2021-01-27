import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { getContentURLS } from '@src/utils/s3';
import {
  createJSONPayload,
  createJSONErrorPayload,
} from '@src/utils/api';
import { BUCKET_MEDIA_PREFIX } from '@src/consts/s3';
import {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_METHOD_NOT_ALLOWED,
} from '@src/consts/status';

import {
  MediaContentURL,
  MediaContentErrors,
} from '@src/types/media';

const mediaHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const session = getSession({ req });
    if (!session) {
      const payload = createJSONErrorPayload<MediaContentErrors>(
        req.method,
        'Unauthorized'
      );
      res.status(HTTP_UNAUTHORIZED).send(payload);
    } else {
      const urls = await getContentURLS(BUCKET_MEDIA_PREFIX);
      const payload = createJSONPayload<MediaContentURL[]>(
        req.method,
        urls
      );
      res.status(HTTP_OK).send(payload);
    }
  } else {
    const payload = createJSONErrorPayload<MediaContentErrors>(
      req.method,
      'Method not allowed'
    );
    res.status(HTTP_METHOD_NOT_ALLOWED).send(payload);
  }
};

export default mediaHandler;
