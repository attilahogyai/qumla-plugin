import Ember from 'ember';
export default Ember.Component.extend({
	question: null,
	answerOption: null,
	answerOptionId: null,
	summary: null,
	hideHeader: false,
	
	showDetail: false,
	showOptions: true,

	enableDetailLink: true,
	enableEditLink: false,
	hideQuestionDetail: false,

	showReadMoreButton: Ember.computed('question.description',function(){
		return this.get('question.description').length>45 && this.get('showDetail');
	}),
	headerImg: Ember.computed.alias('question.headerImg'),
	classNames:['card','question-card'],
	enableEffect: false,
	updateAnswerId:function(aid){
		this.get('question.options').map(function(data){
			data.set('answer',aid);
		});
	},
	showDescription: Ember.computed('question.description',function(){
		return this.get('question.description') && !this.get('hideQuestionDetail');
	}),
	showUrl: Ember.computed('question.description',function(){
		return this.get('question.url') && !this.get('hideQuestionDetail');
	}),	
	actions:{
		selectAnswer: function (option){
			this.set('answerOption',option);
			this.set('answerOptionId',option.get('id'));
			this.updateAnswerId(option.get('id'));
			this.sendAction('onVote', this.get('question'),option);
		},
		answerChanged:function(){
			this.updateAnswerId(this.get('answerOptionId'));
		},
		/*
		vote:function(option){
			this.sendAction('onVote', this.get('question'),option);
		},*/
		toggleDetail:function(){
			this.set('showDetail',!this.get('showDetail'));
		},
		openDetail:function(){
			this.set('showDetail',true);	
		}
	},
	didInsertElement:function(){
		if(this.get('summary')){
			Ember.run.later(()=>{
				this.set("enableEffect",true);
				Ember.run.later( () => {
					Ember.Logger.debug('close page');
					this.sendAction('resultDisplayed');
				},2000);
			},0);			
		}
		this.sendAction('htmlInserted');

	}
});