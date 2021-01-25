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

const getMediaURLS = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(
      {
        Bucket: S3_BUCKET_ID,
        Prefix: BUCKET_MEDIA_PREFIX,
      },
      (err, data) => {
        if (err) {
          return reject('Error while fetching data from S3 service.');
        } else {
          const imageURLs = [];
          data.Contents.forEach((content) => {
            if (content.Size > 0)
              return imageURLs.push(`${S3_BASE_URL}/${content.Key}`);
          });
          return resolve(imageURLs);
        }
      }
    );
  });
};

const deleteObject = async (
  path: string
): Promise<aws.S3.DeleteObjectOutput> => {
  const params: aws.S3.DeleteObjectRequest = {
    Bucket: S3_BUCKET_ID,
    Key: path,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const uploadObject = async (
  key: string,
  body: aws.S3.Body,
  contentEncoding: string,
  contentType: string
): Promise<aws.S3.ManagedUpload.SendData> => {
  const params: aws.S3.PutObjectRequest = {
    Bucket: S3_BUCKET_ID,
    Key: key,
    Body: body,
    ContentEncoding: contentEncoding,
    ContentType: contentType,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export { getMediaURLS, deleteObject, uploadObject, s3 };
export default s3;
