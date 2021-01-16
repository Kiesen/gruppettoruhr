import { FC, useState } from 'react';
import Head from 'next/head';
import Dropzone, { DropzoneOptions } from 'react-dropzone';

const Media: FC<{}> = () => {
  const dropzoneOptions: Partial<DropzoneOptions> = {
    maxFiles: 4,
    maxSize: 2e6, // 2MB - Dropzone uses internally bytes
    accept: ['image/jpeg', 'image/png', 'image/gif'],
  };

  const [images, setImages] = useState([]);

  const onDropImage = (image: unknown) => {
    console.log(image);
    setImages([]);
  };

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Media</title>
      </Head>
      <main className="container pt-24 grid">
        {images.map((_, i) => (
          <div key={i} className=""></div>
        ))}
        <Dropzone onDrop={onDropImage} {...dropzoneOptions}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border border-grey-500 border-dashed rounded-md flex justify-center items-center h-48"
            >
              <input {...getInputProps()} />
              <p>Drop or click to upload new images</p>
            </div>
          )}
        </Dropzone>
      </main>
    </>
  );
};

export default Media;
