import aws from 'aws-sdk';

import {
  S3_ENDPOINT,
  S3_BASE_URL,
  S3_BUCKET_ID,
} from '@src/consts/s3';

import { MediaContentURL } from '@src/types/media';

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_S3_SPACES_KEY,
  secretAccessKey: process.env.DO_S3_SPACES_SECRET,
});

const getContentURLS = async (
  bucketPrefix: string,
  params?: Omit<
    aws.S3.Types.ListObjectsV2Request,
    'Bucket' | 'Prefix'
  >,
  sortIdentifier: 'asc' | 'desc' = 'asc'
): Promise<MediaContentURL[]> => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(
      {
        Bucket: S3_BUCKET_ID,
        Prefix: bucketPrefix,
        ...params,
      },
      (err, data) => {
        if (err) {
          return reject('Error while fetching data from S3 service.');
        } else {
          const urls: MediaContentURL[] = [];
          // Sort the returned content
          data.Contents.sort((left, right) => {
            if (sortIdentifier === 'asc') {
              return (
                right.LastModified.getTime() -
                left.LastModified.getTime()
              );
            } else {
              return (
                left.LastModified.getTime() -
                right.LastModified.getTime()
              );
            }
          });
          // Create urls for each content object
          data.Contents.forEach((content) => {
            if (content.Size > 0)
              return urls.push({
                key: content.Key,
                url: `${S3_BASE_URL}/${content.Key}`,
                lastModified: content.LastModified,
              });
          });
          return resolve(urls);
        }
      }
    );
  });
};

const deleteObject = async (
  key: string
): Promise<aws.S3.DeleteObjectOutput> => {
  const params: aws.S3.DeleteObjectRequest = {
    Bucket: S3_BUCKET_ID,
    Key: key,
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
  contentType: string,
  acl: aws.S3.ObjectCannedACL = 'private'
): Promise<aws.S3.ManagedUpload.SendData> => {
  const params: aws.S3.PutObjectRequest = {
    Bucket: S3_BUCKET_ID,
    Key: key,
    Body: body,
    ContentEncoding: contentEncoding,
    ContentType: contentType,
    ACL: acl,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export { getContentURLS, deleteObject, uploadObject, s3 };
export default s3;
