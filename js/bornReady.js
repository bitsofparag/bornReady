/* 
 * Author: Parag Majumdar (admin@bitsofparag.com)
 * @usage:
 *  IMPORTANT: Include this script at the head
 *  1) As a jQuery plugin
 * 		$('#selector').bornReady(function(){
 * 			console.log(this.nodeName + ' was just inserted')
 * 			this.style.color = 'red'
 * 		})
 * 
 * 	2) As a standalone call
 * 		bornReady({
 * 			'#selector' : detectThis,
 * 			'.classes' : function(){ //do something with 'this' }
 *		})	
 */
!function(module){
	if(window.jQuery) jQuery.fn.bornReady = module
	else 
		window.bornReady = function(selector){
			var callback
			if(typeof selector === 'string') {
				var args = [].slice.call(arguments)
				selector = args[0]
				callback = args[1]
				module.call({selector : selector}, callback)
			}
			else if(Object.prototype.toString.call(selector) === '[object Object]') {
				for(var sel in selector) module.call({selector : sel}, selector[sel])
			}
			
		}
}((function(){
	var listeners = []
		,head = document.getElementsByTagName('head')[0]
		,style = document.createElement('style')
		,keyframes = document.createElement('style')
		,modifyDOM = function(e){
			listeners.forEach(function(item){
				[].slice.call(document.querySelectorAll(item.selector)).forEach(function(el){
					item.handler.call(el, e);
				})
			})
		}
		,prefix = (function(){
			var computed = window.getComputedStyle(document.documentElement, null)
			return ([].slice.call(computed).join('').match(/moz|webkit/) || (computed.OLink === '' && ['o']))[0]
		})()
		,cssPrefix = !prefix? '' : ('-' + prefix + '-')
		,animSetup = '{' + cssPrefix + 'animation-duration: 0.001s; ' + cssPrefix + 'animation-name: nodeInserted }'
		,keyframesText = document.createTextNode('@' + cssPrefix + 'keyframes nodeInserted { from { clip: rect(1px, auto, auto, auto); } to { clip: rect(0px, auto, auto, auto); }}')
	
	style.type = keyframes.type = "text/css"
	keyframes.appendChild(keyframesText)
	head.appendChild(keyframes)
	head.appendChild(style)
	
	if(document.attachEvent) document.attachEvent(prefix + 'AnimationStart', modifyDOM)
	else document.addEventListener(prefix + 'AnimationStart', modifyDOM, false)

	return function(fn){
		var sel = this.selector
			,rule = sel  + animSetup
			,bornReadyStyle = document.styleSheets[document.styleSheets.length - 1]
		
		bornReadyStyle.insertRule(rule, bornReadyStyle.cssRules.length)
		listeners.push({selector : sel, handler : fn})
		return this
	}
})())
