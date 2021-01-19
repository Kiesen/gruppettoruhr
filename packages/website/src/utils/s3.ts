import aws from 'aws-sdk';

import {
  S3_ENDPOINT,
  S3_BASE_URL,
  S3_BUCKET_ID,
  BUCKET_MEDIA_PREFIX,
} from '@src/consts/s3';

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_S3_SPACES_KEY,
  secretAccessKey: process.env.DO_S3_SPACES_SECRET,
});

const getStaticImageURLs = (): Promise<string[]> => {
  return new Promise((res) => {
    s3.listObjects(
      {
        Bucket: S3_BUCKET_ID,
        Prefix: BUCKET_MEDIA_PREFIX,
      },
      (err, data) => {
        if (err) {
          return res([]);
        } else {
          const imageURLs = [];
          data.Contents.forEach((content) => {
            if (content.Size > 0)
              return imageURLs.push(`${S3_BASE_URL}/${content.Key}`);
          });
          return res(imageURLs);
        }
      }
    );
  });
};

export { getStaticImageURLs, s3 };
export default s3;
