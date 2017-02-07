import { Schema, arrayOf } from 'normalizr';

const apiSchema = new Schema('apis', { idAttribute: 'id' });
const appSchema = new Schema('apps', { idAttribute: 'id' });
const subscriptionSchema = new Schema('subscriptions', { idAttribute: 'id' });

export const Schemas = {
  API: apiSchema,
  API_ARRAY: arrayOf(apiSchema),
  APP: appSchema,
  APP_ARRAY: arrayOf(appSchema),
  SUBSCRIPTION: subscriptionSchema,
  SUBSCRIPTION_ARRAY: arrayOf(subscriptionSchema)
};
