"use strict";(self.webpackChunkmobile_screen_engagement_demo=self.webpackChunkmobile_screen_engagement_demo||[]).push([[7176,3047],{8331:(e,n,a)=>{var t=a(595);function s(e){e.register(t),function(e){e.languages.ejs={delimiter:{pattern:/^<%[-_=]?|[-_]?%>$/,alias:"punctuation"},comment:/^#[\s\S]*/,"language-javascript":{pattern:/[\s\S]+/,inside:e.languages.javascript}},e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"ejs",/<%(?!%)[\s\S]+?%>/g)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"ejs")})),e.languages.eta=e.languages.ejs}(e)}e.exports=s,s.displayName="ejs",s.aliases=["eta"]},595:e=>{function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,t,s,o){if(a.language===t){var r=a.tokenStack=[];a.code=a.code.replace(s,(function(e){if("function"===typeof o&&!o(e))return e;for(var s,i=r.length;-1!==a.code.indexOf(s=n(t,i));)++i;return r[i]=e,s})),a.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(a,t){if(a.language===t&&a.tokenStack){a.grammar=e.languages[t];var s=0,o=Object.keys(a.tokenStack);!function r(i){for(var g=0;g<i.length&&!(s>=o.length);g++){var l=i[g];if("string"===typeof l||l.content&&"string"===typeof l.content){var u=o[s],c=a.tokenStack[u],p="string"===typeof l?l:l.content,f=n(t,u),k=p.indexOf(f);if(k>-1){++s;var m=p.substring(0,k),d=new e.Token(t,e.tokenize(c,a.grammar),"language-"+t,c),h=p.substring(k+f.length),_=[];m&&_.push.apply(_,r([m])),_.push(d),h&&_.push.apply(_,r([h])),"string"===typeof l?i.splice.apply(i,[g,1].concat(_)):l.content=_}}else l.content&&r(l.content)}return i}(a.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_ejs.44b26808.chunk.js.map