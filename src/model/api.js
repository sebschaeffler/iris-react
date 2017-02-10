import { Record } from 'immutable';

export default class Api extends Record({
  id: null,
  technical_name: '',
  name: '',
  context: 'Clearstream Xact',
  visibility: 'Public',
  thumbnail: null,
  description: '',
  tags: '',
  api_endpoint: '',
  doc_endpoint: '',
  rating: 0,
  numberOfUsers: 0
})
{
  getId() { return this.get('id'); }
  setId(id) { return this.set('id', id); }

  getTechnicalName() { return this.get('technical_name'); }
  setTechnicalName(technical_name) { return this.set('technical_name', technical_name); }

  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }

  getContext() { return this.get('context'); }
  setContext(context) { return this.set('context', context); }

  getVisibility() { return this.get('visibility'); }
  setVisibility(visibility) { return this.set('visibility', visibility); }

  getThumbnail() { return this.get('thumbnail'); }
  setThumbnail(thumbnail) { return this.set('thumbnail', thumbnail); }

  getDescription() { return this.get('description'); }
  setDescription(description) { return this.set('description', description); }

  getTags() { return this.get('tags'); }
  setTags(tags) { return this.set('tags', tags); }

  getApiEndpoint() { return this.get('api_endpoint'); }
  setApiEndpoint(api_endpoint) { return this.set('api_endpoint', api_endpoint); }

  getDocEndpoint() { return this.get('doc_endpoint'); }
  setDocEndpoint(doc_endpoint) { return this.set('doc_endpoint', doc_endpoint); }

  getRating() { return this.get('rating'); }
  setRating(rating) { return this.set('rating', rating); }

  getNumberOfUsers() { return this.get('numberOfUsers'); }
  setNumberOfUsers(numberOfUsers) { return this.set('numberOfUsers', numberOfUsers); }

};
