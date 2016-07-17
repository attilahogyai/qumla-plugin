import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

window.App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});


// Language functions

App.lastLang='en';
App.lastLangF='en_EN';	

App.getLang=function(){
	var lang=App.lastLang;
	if(lang===null){
		lang = navigator.language || navigator.userLanguage;  
		if(!Ember.isEmpty(lang)){
			var l=lang.split('-');
			moment.lang(l[0]);
			App.moment.lang(l[0]);
			lang=l[0];
		}
	}
	App.lastLang=lang;
	return lang;
};
App.getLang(); 

// helper functions

App.locX=function(key, params){
	return Ember.String.loc(key+"/"+App.getLang(), params);
};
App.reload=function(clean){
	if(clean){ 
		if(window.localStorage) window.localStorage.clear();
	}
	Ember.run.schedule('afterRender',function(){
        var n = window.location.href.indexOf("#");
    	window.location.href=window.location.href.substring(0,n);
	});
};

App.getData = function(url,async,type,processdata,cache,data,success,error){

	if(url.indexOf('ext:')===0){
		url = 'https://qumla.com' + url.substring(3,url.length);		
	}else{
		url = '/api' + url;
	}
	Ember.$.ajaxSetup({async:async});
	var headers={};
	if(App.session){
		headers["Authorization"] = "Bearer "+App.session.get('token');
	}
	return Ember.$.ajax({
		type: type,
		data: data,
		url: url,
		headers: headers,
		processdata: processdata,
		cache: cache,
		success:success,
		error: error
	});
}; 

Ember.colorList=['#FF5722','#f4c63d','#d17905','#453d3f','#59922b','#0544d3',
'#6b0392','#f05b4f','#dda458','#eacf7d','#86797d','#b2c326','#6188e2','#a748ca','#f05b4f']; 

loadInitializers(App, config.modulePrefix);

export default App;
