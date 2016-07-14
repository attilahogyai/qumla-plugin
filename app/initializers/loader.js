export function initialize( application ) {
    application.inject('route', 'loader', 'service:loader');
    application.inject('controller', 'loader', 'service:loader');
    application.inject('component', 'loader', 'service:loader');
    
}

export default {
  name: 'loader',
  initialize: initialize
}; 