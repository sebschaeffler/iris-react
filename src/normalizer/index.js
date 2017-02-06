import { Schema, arrayOf } from 'normalizr';

const apiSchema = new Schema('apis', { idAttribute: 'id' });
const appSchema = new Schema('apps', { idAttribute: 'id' });

export const Schemas = {
  API: apiSchema,
  API_ARRAY: arrayOf(apiSchema),
  APP: appSchema,
  APP_ARRAY: arrayOf(appSchema)
};
