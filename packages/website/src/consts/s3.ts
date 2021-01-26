export const S3_BUCKET_ID = process.env.DO_S3_BUCKET;
export const S3_ENDPOINT = process.env.DO_S3_ENDPOINT;
export const S3_BASE_URL = `https://${S3_BUCKET_ID}.${S3_ENDPOINT}`;
export const S3_ACL_OPTIONS = {
  PRIVATE: 'private',
  PUBLIC_READ: 'public-read',
  PUBLIC_READ_WRITE: 'public-read-write',
};
export const BUCKET_MEDIA_PREFIX = 'gruppettoruhr/media';
