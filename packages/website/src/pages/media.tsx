/**
 * -- TODO --
 * 1. Move all react toastify related common configs into a
 * global file to reused in different places. Also remove
 * inline config creation for better readability.
 *
 * 2. Replace fetch with react-query
 */
import Head from 'next/head';
import { FC, SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import {
  BiWindowOpen,
  BiCloudUpload,
  BiCopy,
  BiInfoCircle,
} from 'react-icons/bi';

import {
  FIELD_NAME,
  MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE,
} from '@src/consts/upload';
import { getStaticImageURLs } from '@src/utils/s3';

type MediaProps = {
  urls: string[];
};

export const getServerSideProps = async (): Promise<{
  props: MediaProps;
}> => {
  const urls = await getStaticImageURLs();
  return {
    props: { urls },
  };
};

const dropzoneOptions: Partial<DropzoneOptions> = {
  maxFiles: MAX_FILES,
  maxSize: MAX_FILE_SIZE,
  accept: MIME_TYPES,
};

const dropzoneClasses = `
  mb-12 
  h-16
  bg-white 
  border-dotted
  border-2
  rounded-xl
  flex flex-col 
  justify-center 
  cursor-pointer
  items-center 
  transition 
  duration-300 
  ease-in-out 
  transform 
  hover:scale-105 
  hover:bg-gray-100
  focus:outline-none
`;

const actionButtonClasses = ` 
  w-full 
  p-1 
  rounded-md
  flex 
  items-center 
  justify-center 
  bg-black 
  text-white
  transition 
  duration-300 
  ease-in-out 
  transform 
  hover:scale-105
  focus:outline-none
`;

const Media: FC<MediaProps> = ({ urls }) => {
  const [images] = useState(urls);

  const onDropImages = (acceptedFiles: File[]) => {
    const formData = new FormData();

    acceptedFiles.forEach((file) => {
      // Check if file is already uploaded
      formData.append(FIELD_NAME, file);
    });
    /**
     *  -- TODO --
     *  Replace with react query
     */
    fetch(`api/media/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((images) => {
        console.log(images);
      })
      .catch((error) => console.log(error));
  };

  const copyToClipboard = (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const textField = document.createElement('textarea');
    textField.innerText = event.currentTarget.id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    /**
     * -- TODO --
     * Move all config related properties into global file
     */
    toast(
      () => (
        <div className="flex items-center">
          <BiInfoCircle className="h-6 w-6 mr-2" />
          URL copied to clipboard
        </div>
      ),
      {
        type: 'success',
      }
    );
  };

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Media</title>
      </Head>
      <main className="container mx-auto pt-24">
        <Dropzone onDrop={onDropImages} {...dropzoneOptions}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={`${dropzoneClasses}`}>
              <input {...getInputProps()} />
              <span className="flex items-center font-semibold">
                <BiCloudUpload className="h-6 w-6 mr-2" />
                Click or drop images for upload
              </span>
            </div>
          )}
        </Dropzone>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((imagePath) => (
            <div
              key={imagePath}
              className="border p-4 rounded-xl flex flex-col items-center justify-between"
            >
              <img src={imagePath} className="max-w-full max-h-36" />
              <div className="w-full mt-8">
                <button
                  id={imagePath}
                  className={`mb-4 ${actionButtonClasses}`}
                  onClick={copyToClipboard}
                >
                  <BiCopy className="h-5 w-5 mr-2 hidden sm:inline-block" />
                  Copy Link
                </button>
                <a
                  href={imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${actionButtonClasses}`}
                >
                  <BiWindowOpen className="h-5 w-5 mr-2 hidden sm:inline-block" />{' '}
                  Open Image
                </a>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer
          {...{
            autoClose: 2500,
            closeOnClick: true,
            draggable: true,
          }}
        />
      </main>
    </>
  );
};

export default Media;
