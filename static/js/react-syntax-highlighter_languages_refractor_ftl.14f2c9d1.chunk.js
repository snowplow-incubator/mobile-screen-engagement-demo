"use strict";(self.webpackChunkmobile_screen_engagement_demo=self.webpackChunkmobile_screen_engagement_demo||[]).push([[8389,3047],{1505:(e,n,t)=>{var a=t(595);function r(e){e.register(a),function(e){for(var n=/[^<()"']|\((?:<expr>)*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'/.source,t=0;t<2;t++)n=n.replace(/<expr>/g,(function(){return n}));n=n.replace(/<expr>/g,/[^\s\S]/.source);var a={comment:/<#--[\s\S]*?-->/,string:[{pattern:/\br("|')(?:(?!\1)[^\\]|\\.)*\1/,greedy:!0},{pattern:RegExp(/("|')(?:(?!\1|\$\{)[^\\]|\\.|\$\{(?:(?!\})(?:<expr>))*\})*\1/.source.replace(/<expr>/g,(function(){return n}))),greedy:!0,inside:{interpolation:{pattern:RegExp(/((?:^|[^\\])(?:\\\\)*)\$\{(?:(?!\})(?:<expr>))*\}/.source.replace(/<expr>/g,(function(){return n}))),lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:null}}}}],keyword:/\b(?:as)\b/,boolean:/\b(?:false|true)\b/,"builtin-function":{pattern:/((?:^|[^?])\?\s*)\w+/,lookbehind:!0,alias:"function"},function:/\b\w+(?=\s*\()/,number:/\b\d+(?:\.\d+)?\b/,operator:/\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/,punctuation:/[,;.:()[\]{}]/};a.string[1].inside.interpolation.inside.rest=a,e.languages.ftl={"ftl-comment":{pattern:/^<#--[\s\S]*/,alias:"comment"},"ftl-directive":{pattern:/^<[\s\S]+>$/,inside:{directive:{pattern:/(^<\/?)[#@][a-z]\w*/i,lookbehind:!0,alias:"keyword"},punctuation:/^<\/?|\/?>$/,content:{pattern:/\s*\S[\s\S]*/,alias:"ftl",inside:a}}},"ftl-interpolation":{pattern:/^\$\{[\s\S]*\}$/,inside:{punctuation:/^\$\{|\}$/,content:{pattern:/\s*\S[\s\S]*/,alias:"ftl",inside:a}}}},e.hooks.add("before-tokenize",(function(t){var a=RegExp(/<#--[\s\S]*?-->|<\/?[#@][a-zA-Z](?:<expr>)*?>|\$\{(?:<expr>)*?\}/.source.replace(/<expr>/g,(function(){return n})),"gi");e.languages["markup-templating"].buildPlaceholders(t,"ftl",a)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"ftl")}))}(e)}e.exports=r,r.displayName="ftl",r.aliases=[]},595:e=>{function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,i){if(t.language===a){var o=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"===typeof i&&!i(e))return e;for(var r,s=o.length;-1!==t.code.indexOf(r=n(a,s));)++s;return o[s]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,i=Object.keys(t.tokenStack);!function o(s){for(var l=0;l<s.length&&!(r>=i.length);l++){var p=s[l];if("string"===typeof p||p.content&&"string"===typeof p.content){var u=i[r],c=t.tokenStack[u],g="string"===typeof p?p:p.content,f=n(a,u),d=g.indexOf(f);if(d>-1){++r;var k=g.substring(0,d),m=new e.Token(a,e.tokenize(c,t.grammar),"language-"+a,c),b=g.substring(d+f.length),h=[];k&&h.push.apply(h,o([k])),h.push(m),b&&h.push.apply(h,o([b])),"string"===typeof p?s.splice.apply(s,[l,1].concat(h)):p.content=h}}else p.content&&o(p.content)}return s}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_ftl.14f2c9d1.chunk.js.map