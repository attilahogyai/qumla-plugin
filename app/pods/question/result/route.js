import Ember from 'ember';
import App from 'qumla-plugin/app';

export default Ember.Route.extend({
	question: null,
	session: Ember.inject.service(),
	model:function(params,transition){
		//var stat = this.store.query('answerStat',{question:transition.resolvedModels.question.get('id')});
		// used just for prototype
		var question = transition.resolvedModels.question.question;
		this.set('question',question);		
		var optionStatRaw = this.store.query('answerstatoption',{filter:{question:this.get('question.id')}});
		var votingarea=App.getData('/votingarea',true,"GET",true,false,{qid:question.id},null,null);

		return Ember.RSVP.hash({
			optionStatRaw: optionStatRaw,
			question: question,
			votingarea: votingarea
		});
	},
	setupController: function(controller, model) {
		if(model.votingarea.length===0 && model.question.get('status')!==50){
			this.transitionTo('question.detail');
		}
		controller.set('question', model.question);
		controller.set('optionStatRaw', model.optionStatRaw);
  	},
  	actions:{
  		reloadHandler:function(modelName){
  			var loaderFunction=this.get(modelName+'Loader');
  			this.get('controller').set(modelName,loaderFunction.apply(this));
  		}
  	}
});
