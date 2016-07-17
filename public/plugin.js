var slice = Array.prototype.slice;
window.qumla = window.qumla || {};
qumla.lookup=function(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
};

qumla.create=function create(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			qumla.lookup(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};
qumla.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

qumla.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

qumla.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};
qumla.siblingIndex = function (el) {
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

qumla.init=function(){
   var p=qumla.lookup('#qumla-plugin');
  
   if(p!=null){
     var id=p.getAttribute('data-qid');
     if(!id){
       console.log('data-qid not found for wrapper div');
       return;
     }
     var url='http://localhost:4200/question/'+id+'/q/detail?t=null';
     qumla.create('iframe', {inside:p, 'id':'qumla-plugin-frame','style':'height:0px;width:100%;;border:none;overflow:hidden;-webkit-transition: height 0.5s ease;-moz-transition: height 0.5s ease;-ms-transition: height 0.5s ease;-o-transition: height 0.5s ease;transition: height 0.5s ease;', 'src':url});
   }else{
     console.log('element not found with ID:#qumla-plugin. Please insert the qumla-plugin code snippet.');
   }
};
qumla.open=function(height){
   var frame=qumla.lookup('#qumla-plugin-frame');
   frame.setAttribute('style','height:'+height+'px;width:100%;border:none;overflow:hidden;-webkit-transition: height 0.5s ease;-moz-transition: height 0.5s ease;-ms-transition: height 0.5s ease;-o-transition: height 0.5s ease;transition: height 0.5s ease;');
};
qumla.close=function(){
  var frame=qumla.lookup('#qumla-plugin-frame');
  frame.setAttribute('style','height:0px;width:100%;border:none;overflow:hidden;-webkit-transition: height 0.5s ease;-moz-transition: height 0.5s ease;-ms-transition: height 0.5s ease;-o-transition: height 0.5s ease;transition: height 0.5s ease;');
};
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		qumla.init();
	}
	else {
	// Wait for it
	document.addEventListener("DOMContentLoaded", qumla.init);
	}
}
