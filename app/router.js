import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('question',{path:'question/:question_id/:question_text'},function(){
    this.route('detail',{ path: 'detail' });
    this.route('result',{ path: 'result' });
  });
});

export default Router;
