import Ember from 'ember';

export function initialize(application) {
	application.deferReadiness();
  Ember.$.ajaxSetup({async:true});
  Ember.$.getJSON("/api/common/langtext", function(langtext) {
    for(var i=0;i<langtext.length;i++){
      var item=langtext[i];
      var c='/'+item['type']+'/'+item['code']+'/'+item['language'];
      Ember.STRINGS[c]=item['text'];
    }
    Ember.Logger.info('INIT Language DONE');
    application.advanceReadiness();
  });
}

export default {
  before: 'store',
  name: 'language-init',
  initialize: initialize
}; 