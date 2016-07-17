import Ember from 'ember';
import App from 'qumla-plugin/app';
import QuestionActions from 'qumla-plugin/mixins/question-actions';
export default Ember.Route.extend(QuestionActions,{
  title: function(tokens) {
    var title='';
    if(!tokens.length || tokens.length===0){
      title=App.locX('/title/application');
    }else{
      title=tokens.join(' - ');
    }
    Ember.$("[data-og-title]").attr("content",title);    
    return title;
  },
	actions: {
	    loading: function(transition/*, originRoute*/) {
  		  this.get('loader').startLoadProcess(transition.promise);
    		return true;
    	},
    	jumpToTag:function(tag){
    		if(tag.indexOf("#")===0){
    			tag=tag.substring(1);
    		}
    		this.transitionTo("tag",tag);
    	},
    	jumpToQuestion:function(title, id){
    		this.transitionTo("question.detail",id,title);
    	},
    	jumpToSearch:function(query){
    		this.transitionTo("search",query);
    	},
      didTransition: function() {
        let router = this.get('router');
        let self = this;
        Ember.run.schedule('afterRender',this, () => {
          Ember.run.later(this,() => {
            
            if(router.get('url')==='/question/0/new/edit' || 
              router.get('url').indexOf('/admin/')>-1){
              Ember.$('div#at4-share').attr('style', 'display:none !important');
              Ember.$('div#at-share-dock').attr('style', 'display:none !important');
            }else{
              Ember.$('div#at4-share').attr('style', 'display:block !important');
              Ember.$('div#at-share-dock').attr('style', 'display:block !important');
            }
            if(router.get('url').indexOf('/question')===-1){
              Ember.$("[data-og-url]").attr("content",'https://qumla.com'+router.get('url'));    
              Ember.$("[data-og-image-url]").attr("content","https://qumla.com/images/share-icon.png");
              Ember.$("[data-og-image]").attr("content","https://qumla.com/images/share-icon.png");                      
              Ember.$("[data-twitter-image]").attr("content","https://qumla.com/images/share-icon.png");    
              Ember.$("[data-og-image-secure-url]").attr("content","https://qumla.com/images/share-icon.png");         
              Ember.$("[data-og-description]").attr("content","Ask your question! See others' opinion and give voice to yours.");                                    
            }
          }, 1000);
        });
      },
      resultDisplayed: function(){ // triggred by by plugin after displaying the result screen
        //window.parent.qumla.close();
      },
      htmlInserted: function(){ // triggered by plugin when it was inserted
        var h=window.document.getElementsByTagName('html')[0].offsetHeight;
        console.log('plugin height:'+h);
        window.parent.qumla.open(h);
      }
    }
 });
