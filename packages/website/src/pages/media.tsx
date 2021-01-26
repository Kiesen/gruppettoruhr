import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { FC, SyntheticEvent, useState } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { useSession, getSession, Session } from 'next-auth/client';
import { BiWindowOpen, BiCloudUpload, BiCopy } from 'react-icons/bi';
import { AiOutlineLoading } from 'react-icons/ai';

import Unauthorized from '@src/components/Unauthorized';
import { getContentURLS } from '@src/utils/s3';
import { dropzoneClasses } from '@src/styles/media';
import { primaryActionButtonClasses } from '@src/styles/buttons';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@src/components/Notifications';
import { BUCKET_MEDIA_PREFIX } from '@src/consts/s3';
import {
  FIELD_NAME,
  MIME_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE,
} from '@src/consts/upload';

type MediaProps = {
  urls: string[];
  session?: Session;
};

type MediaState = {
  urls: string[];
  uploads: string[];
};

/**
 * -- TODO --
 * Check if getContentURLS can be moved or replaced
 * once react query is in place.
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{
  props: MediaProps;
}> => {
  let session = undefined;
  let urls = [];
  try {
    session = await getSession(context);
    urls = await getContentURLS(BUCKET_MEDIA_PREFIX);
  } catch (error) {
    console.error(error);
  }
  return {
    props: { urls, session },
  };
};

const Media: FC<MediaProps> = ({ urls }) => {
  const [state, setState] = useState<MediaState>({
    urls,
    uploads: [],
  });
  const [session, loading] = useSession();

  const dropzoneOptions: Partial<DropzoneOptions> = {
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    accept: MIME_TYPES,
  };

  /**
   * -- TODO --
   * Consider uploading the images not as batch
   * but async one by one.
   */
  const onDropImages = (acceptedFiles: File[]) => {
    const formData = new FormData();
    let uploads: string[] = [];
    acceptedFiles.forEach((file) => {
      formData.append(FIELD_NAME, file);
      uploads = [...uploads, file.name];
    });

    setState({ ...state, uploads });

    /**
     *  -- TODO --
     * Replace the fetch with react query and
     * add api response types.
     */
    fetch(`api/media/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(({ acceptedFiles, rejectedFiles }) => {
        for (const file in rejectedFiles as string[]) {
          showErrorNotification(
            `Error during upload of file: ${file}`
          );
        }
        const urls = acceptedFiles.concat(state.urls);
        setState({ urls, uploads: [] });
      })
      .catch((error) => {
        console.error(error);
        showErrorNotification('Error during image upload');
      });
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
    showSuccessNotification('URL copied to clipboard');
  };

  /**
   * -- TODO --
   * Add an option to delete an image from the s3 space
   */
  // const deleteImage = () => ({});

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Media</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        {!loading && !session && <Unauthorized classes="h-screen" />}
        {!loading && session && (
          <div className="container mx-auto py-24">
            <Dropzone onDrop={onDropImages} {...dropzoneOptions}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`${dropzoneClasses}`}
                >
                  <input {...getInputProps()} />
                  <span className="flex items-center font-semibold">
                    <BiCloudUpload className="h-6 w-6 mr-2" />
                    Click or drop images for upload
                  </span>
                </div>
              )}
            </Dropzone>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {state.uploads.map((id) => (
                <div
                  key={id}
                  className="bg-white border p-4 rounded-xl flex flex-col items-center justify-center"
                >
                  <AiOutlineLoading className="animate-spin h-12 w-12 mb-5" />
                  Uploading...
                </div>
              ))}
              {state.urls.map((url) => (
                <div
                  key={url}
                  className=" bg-white border p-4 rounded-xl flex flex-col items-center justify-between"
                >
                  <img src={url} className="max-w-full max-h-36" />
                  <div className="w-full mt-8">
                    <button
                      id={url}
                      className={`mb-4 ${primaryActionButtonClasses}`}
                      onClick={copyToClipboard}
                    >
                      <BiCopy className="h-5 w-5 mr-2 hidden sm:inline-block" />
                      Copy Link
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${primaryActionButtonClasses}`}
                    >
                      <BiWindowOpen className="h-5 w-5 mr-2 hidden sm:inline-block" />{' '}
                      Open Image
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Media;
