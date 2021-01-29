import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { FC, useState, SyntheticEvent } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { useSession, getSession, Session } from 'next-auth/client';
import {
  BiCloudUpload,
  BiLinkExternal,
  BiLinkAlt,
  BiTrash,
} from 'react-icons/bi';
import { AiOutlineLoading } from 'react-icons/ai';

import {
  useMediaQuery,
  useUploadMediaContentMutation,
  useDeleteMediaContentMutation,
} from '@src/hooks/media';
import Unauthorized from '@src/components/Unauthorized';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@src/components/Notifications';
import { dropzoneClasses } from '@src/styles/media';
import { secondaryActionButtonClasses } from '@src/styles/buttons';
import {
  FIELD_NAME,
  MIME_TYPES,
  MAX_FILE_SIZE,
} from '@src/consts/upload';

type MediaProps = {
  session?: Session;
};

type MediaState = string[];

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{
  props: MediaProps;
}> => {
  let session = undefined;
  try {
    session = await getSession(context);
  } catch (error) {
    console.error(error);
  }
  return {
    props: { session },
  };
};

const dropzoneOptions: Partial<DropzoneOptions> = {
  maxSize: MAX_FILE_SIZE,
  accept: MIME_TYPES,
};

const Media: FC<MediaProps> = () => {
  const [uploads, setUploads] = useState<MediaState>([]);
  const [session, sessionLoading] = useSession();
  const { data: mediaItems, isLoading } = useMediaQuery();
  const {
    mutateAsync: mutateAsyncUpload,
  } = useUploadMediaContentMutation();
  const {
    mutateAsync: mutateAsyncDelete,
  } = useDeleteMediaContentMutation();

  /**
   * -- TODO --
   * Update the setting of the local state. Right now it is not
   * working because of lost updates.
   */
  const onDropImages = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setUploads([...uploads, file.name]);
      const formData = new FormData();
      formData.append(FIELD_NAME, file);

      mutateAsyncUpload(formData)
        .then(() => {
          showSuccessNotification(`Upload successful: ${file.name}`);
        })
        .catch((error) => {
          console.error(error);
          showErrorNotification(
            `Error during uploading: ${file.name}`
          );
        })
        .finally(() => {
          setUploads(
            uploads.filter((filename) => filename !== file.name)
          );
        });
    });
  };

  const deleteMediaItem = async (
    event: SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    const id = event.currentTarget.id;
    try {
      await mutateAsyncDelete(id);
      showSuccessNotification(`File successful deleted`);
    } catch (error) {
      console.error(error);
      showErrorNotification(`Could not remove item`);
    }
  };

  const copyURL = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const textField = document.createElement('textarea');
    textField.innerText = event.currentTarget.id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    showSuccessNotification('Link copied to clipboard');
  };

  /**
   * -- TODO --
   * Update the appearance of the action buttons e.g. add hover
   * with a transition and try out different colors.
   */
  return (
    <>
      <Head>
        <title>Gruppettoruhr - Media</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        {!sessionLoading && !session && (
          <Unauthorized classes="h-screen" />
        )}
        {!sessionLoading && session && (
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
              {uploads.map((filename) => (
                <div
                  key={filename}
                  className="bg-white border p-4 rounded-xl flex flex-col items-center justify-center"
                >
                  <AiOutlineLoading className="animate-spin h-12 w-12 mb-5" />
                  {`Uploading ${filename}...`}
                </div>
              ))}
              {!isLoading &&
                mediaItems.map((mediaItem) => (
                  <div
                    key={mediaItem.key}
                    className=" bg-white border p-4 rounded-xl flex flex-col items-center justify-between"
                  >
                    <img
                      src={mediaItem.url}
                      className="max-w-full max-h-36"
                    />
                    <div className="w-full mt-8">
                      <button
                        id={mediaItem.url}
                        className={`mb-4 ${secondaryActionButtonClasses}`}
                        onClick={copyURL}
                      >
                        <BiLinkAlt className="h-5 w-5 mr-2 inline-block" />
                        Copy Link
                      </button>
                      <div className="flex flex-row justify-evenly">
                        <a
                          href={mediaItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mr-2 ${secondaryActionButtonClasses}`}
                        >
                          <BiLinkExternal className="h-5 w-5 mr-2 inline-block" />{' '}
                        </a>
                        <button
                          id={mediaItem.key}
                          className={`ml-2 bg-red-500 border-red-500 text-white ${secondaryActionButtonClasses}`}
                          onClick={deleteMediaItem}
                        >
                          <BiTrash className="h-5 w-5 mr-2 inline-block" />{' '}
                        </button>
                      </div>
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
