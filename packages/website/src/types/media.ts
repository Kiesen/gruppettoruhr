import { JSONPayload } from '@src/types/api';

export type MediaContentURL = {
  url: string;
  key: string;
  lastModified: Date;
};

export type MediaContentError = string;

export type MediaContentURLResponse = JSONPayload<
  MediaContentURL,
  MediaContentError
>;

export type MediaContentURLSResponse = JSONPayload<
  MediaContentURL[],
  MediaContentError
>;

export type DeleteMediaContentResponse = JSONPayload<
  null,
  MediaContentError
>;
