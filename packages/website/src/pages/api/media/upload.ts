import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '@src/utils/s3';

import {
  FIELD_NAME,
  MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE,
} from '@src/consts/upload';
import { BUCKET_MEDIA_PREFIX, S3_BUCKET_ID } from '@src/consts/s3';

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
    key(_, file, cb) {
      cb(null, `${BUCKET_MEDIA_PREFIX}/${file.originalname}`);
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

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadMiddleware(req as any, res as any, (err) => {
      if (err) console.error(err);
    });
    res.status(200).send({});
  } else {
    res.status(405).send({});
  }
};
