import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from 'react-query';

import { MEDIA, MEDIA_UPLOAD } from '@src/consts/endpoints';
import { GET_MEDIA_URLS_KEY } from '@src/consts/cache';
import queryClient from '@src/config/queryClient';

import {
  DeleteMediaContentResponse,
  MediaContentURLSResponse,
  MediaContentURLResponse,
  MediaContentError,
  MediaContentURL,
} from '@src/types/media';

const fetchMediaURLS = async (): Promise<MediaContentURL[]> => {
  const response = await fetch(MEDIA);
  const payload: MediaContentURLSResponse = await response.json();
  if (!payload.errors && payload.data) {
    return payload.data;
  } else {
    // Catch and handling of the error is done by react query
    throw new Error(payload.errors);
  }
};

const uploadMediaContent = async (
  formData: FormData
): Promise<MediaContentURL> => {
  const response = await fetch(MEDIA_UPLOAD, {
    method: 'POST',
    body: formData,
  });
  const payload: MediaContentURLResponse = await response.json();
  if (!payload.errors && payload.data) {
    return payload.data;
  } else {
    // Catch and handling of the error is done by react query
    throw new Error(payload.errors);
  }
};

const deleteMediaContent = async (key: string): Promise<string> => {
  /**
   * The key of a s3 content object contains also a path.
   * We need to remove the path here to get the filename that
   * we want to remove.
   */
  const id = key.substring(key.lastIndexOf('/') + 1, key.length);

  const response = await fetch(`${MEDIA}/${id}`, {
    method: 'DELETE',
  });
  const payload: DeleteMediaContentResponse = await response.json();
  if (!payload.errors) {
    return key;
  } else {
    // Catch and handling of the error is done by react query
    throw new Error(payload.errors);
  }
};

export const useMediaQuery = (): UseQueryResult<
  MediaContentURL[],
  MediaContentError
> => useQuery(GET_MEDIA_URLS_KEY, fetchMediaURLS);

export const useUploadMediaContentMutation = (): UseMutationResult<
  MediaContentURL,
  MediaContentError
> =>
  useMutation(uploadMediaContent, {
    onSuccess: (url) => {
      queryClient.setQueryData(
        GET_MEDIA_URLS_KEY,
        (urls: MediaContentURL[]) => {
          return [url, ...urls];
        }
      );
    },
  });

export const useDeleteMediaContentMutation = (): UseMutationResult<
  string,
  MediaContentError
> =>
  useMutation(deleteMediaContent, {
    onSuccess: (key) => {
      queryClient.setQueryData(
        GET_MEDIA_URLS_KEY,
        (urls: MediaContentURL[]) => {
          console.log(key);
          return urls.filter((urls) => urls.key !== key);
        }
      );
    },
  });
