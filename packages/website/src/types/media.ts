import * as API from '@src/types/api';

export type MediaContentURL = { url: string; lastModified: Date };

export type MediaContentErrors = string;

export type MediaContentURLResponse =
  | API.JSONDataPayload<MediaContentURL>
  | API.JSONErrorPayload<MediaContentErrors>;

export type MediaContentURLSResponse =
  | API.JSONDataPayload<MediaContentURL[]>
  | API.JSONErrorPayload<MediaContentErrors>;
