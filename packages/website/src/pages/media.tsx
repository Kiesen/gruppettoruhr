import { FC, useState } from 'react';
import Head from 'next/head';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';

const Media: FC<{}> = () => {
  const dropzoneOptions: Partial<DropzoneOptions> = {
    maxFiles: 4,
    maxSize: 2e6, // 2e6 bytes <-> 2MB
    accept: ['image/jpeg', 'image/png', 'image/gif'],
  };

  const [images, setImages] = useState(['', '']);

  const onDropImage = (image: unknown) => {
    console.log(image);
    setImages([]);
  };

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Media</title>
      </Head>
      <main className="container mx-auto pt-24">
        <Dropzone onDrop={onDropImage} {...dropzoneOptions}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="
                mb-12 
                h-12 
                bg-black 
                hover:bg-gray-700 
                transition 
                duration-300 
                ease-in-out 
                flex flex-col 
                justify-center 
                items-center 
                cursor-pointer
              "
            >
              <input {...getInputProps()} />
              <span className="flex items-center font-semibold text-white">
                <BsCloudUpload className="h-6 w-6 mr-2" />
                Drop or click to upload new images
              </span>
            </div>
          )}
        </Dropzone>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {images.map((image, i) => (
            <a
              key={i}
              className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
              href={image}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="wall_Background.jpg" />
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Media;
