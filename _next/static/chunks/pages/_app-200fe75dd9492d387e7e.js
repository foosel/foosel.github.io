(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3856:function(e){const t=[{external:"https://foosel.net",site_name:"foosel.net",assets:"./public/assets/content/",blog:{count:10},feeds:{blog:{title:"foosel.net Blog",description:"",link:"https://foosel.net/blog/",image:"",favicon:"https://foosel.net/favicon.ico",output:"./public/feed/blog"}},seo:{titleTemplate:"%s | foosel.net",openGraph:{type:"website",locale:"en",url:"https://foosel.net",site_name:"foosel.net"},twitter:{handle:"@foosel",site:"@foosel",cardType:"summary_large_image"}},social:{github:"https://github.com/foosel",twitter:"https://twitter.com/foosel",mastodon:"https://chaos.social/@foosel",linkedin:"https://www.linkedin.com/in/ginahaeussge/",mail:"mailto:contact@foosel.net"}}];e.exports=t.length<=1?t[0]:t},2962:function(e,t,o){"use strict";o.d(t,{lX:function(){return s},PB:function(){return h}});var n=o(9008),a=o(7294);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var p={templateTitle:"",noindex:!1,nofollow:!1,defaultOpenGraphImageWidth:0,defaultOpenGraphImageHeight:0,defaultOpenGraphVideoWidth:0,defaultOpenGraphVideoHeight:0,disableGooglebot:!1},l=function(e,t,o){void 0===t&&(t=[]);var n=void 0===o?{}:o,r=n.defaultWidth,i=n.defaultHeight;return t.reduce((function(t,o,n){return t.push(a.createElement("meta",{key:"og:"+e+":0"+n,property:"og:"+e,content:o.url})),o.alt&&t.push(a.createElement("meta",{key:"og:"+e+":alt0"+n,property:"og:"+e+":alt",content:o.alt})),o.secureUrl&&t.push(a.createElement("meta",{key:"og:"+e+":secure_url0"+n,property:"og:"+e+":secure_url",content:o.secureUrl.toString()})),o.type&&t.push(a.createElement("meta",{key:"og:"+e+":type0"+n,property:"og:"+e+":type",content:o.type.toString()})),o.width?t.push(a.createElement("meta",{key:"og:"+e+":width0"+n,property:"og:"+e+":width",content:o.width.toString()})):r&&t.push(a.createElement("meta",{key:"og:"+e+":width0"+n,property:"og:"+e+":width",content:r.toString()})),o.height?t.push(a.createElement("meta",{key:"og:"+e+":height"+n,property:"og:"+e+":height",content:o.height.toString()})):i&&t.push(a.createElement("meta",{key:"og:"+e+":height"+n,property:"og:"+e+":height",content:i.toString()})),t}),[])},c=function(e){var t,o,n,i=[];e.titleTemplate&&(p.templateTitle=e.titleTemplate);var c="";e.title?(c=e.title,p.templateTitle&&(c=p.templateTitle.replace(/%s/g,(function(){return c})))):e.defaultTitle&&(c=e.defaultTitle),c&&i.push(a.createElement("title",{key:"title"},c));var s,h,d=e.noindex||p.noindex||e.dangerouslySetAllPagesToNoIndex,u=e.nofollow||p.nofollow||e.dangerouslySetAllPagesToNoFollow,m=e.disableGooglebot||p.disableGooglebot||e.dangerouslyDisableGooglebot,g="";if(e.robotsProps){var f=e.robotsProps,y=f.nosnippet,G=f.maxSnippet,b=f.maxImagePreview,k=f.maxVideoPreview,v=f.noarchive,E=f.noimageindex,w=f.notranslate,O=f.unavailableAfter;g=(y?",nosnippet":"")+(G?",max-snippet:"+G:"")+(b?",max-image-preview:"+b:"")+(v?",noarchive":"")+(O?",unavailable_after:"+O:"")+(E?",noimageindex":"")+(k?",max-video-preview:"+k:"")+(w?",notranslate":"")}(e.dangerouslyDisableGooglebot&&(p.disableGooglebot=!0),d||u?(e.dangerouslySetAllPagesToNoIndex&&(p.noindex=!0),e.dangerouslySetAllPagesToNoFollow&&(p.nofollow=!0),i.push(a.createElement("meta",{key:"robots",name:"robots",content:(d?"noindex":"index")+","+(u?"nofollow":"follow")+g})),m||i.push(a.createElement("meta",{key:"googlebot",name:"googlebot",content:(d?"noindex":"index")+","+(u?"nofollow":"follow")+g}))):(i.push(a.createElement("meta",{key:"robots",name:"robots",content:"index,follow"+g})),m||i.push(a.createElement("meta",{key:"googlebot",name:"googlebot",content:"index,follow"+g}))),e.description&&i.push(a.createElement("meta",{key:"description",name:"description",content:e.description})),e.mobileAlternate&&i.push(a.createElement("link",{rel:"alternate",key:"mobileAlternate",media:e.mobileAlternate.media,href:e.mobileAlternate.href})),e.languageAlternates&&e.languageAlternates.length>0&&e.languageAlternates.forEach((function(e){i.push(a.createElement("link",{rel:"alternate",key:"languageAlternate-"+e.hrefLang,hrefLang:e.hrefLang,href:e.href}))})),e.twitter&&(e.twitter.cardType&&i.push(a.createElement("meta",{key:"twitter:card",name:"twitter:card",content:e.twitter.cardType})),e.twitter.site&&i.push(a.createElement("meta",{key:"twitter:site",name:"twitter:site",content:e.twitter.site})),e.twitter.handle&&i.push(a.createElement("meta",{key:"twitter:creator",name:"twitter:creator",content:e.twitter.handle}))),e.facebook&&e.facebook.appId&&i.push(a.createElement("meta",{key:"fb:app_id",property:"fb:app_id",content:e.facebook.appId})),null!=(t=e.openGraph)&&t.title||e.title)&&i.push(a.createElement("meta",{key:"og:title",property:"og:title",content:(null==(s=e.openGraph)?void 0:s.title)||c}));(null!=(o=e.openGraph)&&o.description||e.description)&&i.push(a.createElement("meta",{key:"og:description",property:"og:description",content:(null==(h=e.openGraph)?void 0:h.description)||e.description}));if(e.openGraph){if((e.openGraph.url||e.canonical)&&i.push(a.createElement("meta",{key:"og:url",property:"og:url",content:e.openGraph.url||e.canonical})),e.openGraph.type){var T=e.openGraph.type.toLowerCase();i.push(a.createElement("meta",{key:"og:type",property:"og:type",content:T})),"profile"===T&&e.openGraph.profile?(e.openGraph.profile.firstName&&i.push(a.createElement("meta",{key:"profile:first_name",property:"profile:first_name",content:e.openGraph.profile.firstName})),e.openGraph.profile.lastName&&i.push(a.createElement("meta",{key:"profile:last_name",property:"profile:last_name",content:e.openGraph.profile.lastName})),e.openGraph.profile.username&&i.push(a.createElement("meta",{key:"profile:username",property:"profile:username",content:e.openGraph.profile.username})),e.openGraph.profile.gender&&i.push(a.createElement("meta",{key:"profile:gender",property:"profile:gender",content:e.openGraph.profile.gender}))):"book"===T&&e.openGraph.book?(e.openGraph.book.authors&&e.openGraph.book.authors.length&&e.openGraph.book.authors.forEach((function(e,t){i.push(a.createElement("meta",{key:"book:author:0"+t,property:"book:author",content:e}))})),e.openGraph.book.isbn&&i.push(a.createElement("meta",{key:"book:isbn",property:"book:isbn",content:e.openGraph.book.isbn})),e.openGraph.book.releaseDate&&i.push(a.createElement("meta",{key:"book:release_date",property:"book:release_date",content:e.openGraph.book.releaseDate})),e.openGraph.book.tags&&e.openGraph.book.tags.length&&e.openGraph.book.tags.forEach((function(e,t){i.push(a.createElement("meta",{key:"book:tag:0"+t,property:"book:tag",content:e}))}))):"article"===T&&e.openGraph.article?(e.openGraph.article.publishedTime&&i.push(a.createElement("meta",{key:"article:published_time",property:"article:published_time",content:e.openGraph.article.publishedTime})),e.openGraph.article.modifiedTime&&i.push(a.createElement("meta",{key:"article:modified_time",property:"article:modified_time",content:e.openGraph.article.modifiedTime})),e.openGraph.article.expirationTime&&i.push(a.createElement("meta",{key:"article:expiration_time",property:"article:expiration_time",content:e.openGraph.article.expirationTime})),e.openGraph.article.authors&&e.openGraph.article.authors.length&&e.openGraph.article.authors.forEach((function(e,t){i.push(a.createElement("meta",{key:"article:author:0"+t,property:"article:author",content:e}))})),e.openGraph.article.section&&i.push(a.createElement("meta",{key:"article:section",property:"article:section",content:e.openGraph.article.section})),e.openGraph.article.tags&&e.openGraph.article.tags.length&&e.openGraph.article.tags.forEach((function(e,t){i.push(a.createElement("meta",{key:"article:tag:0"+t,property:"article:tag",content:e}))}))):"video.movie"!==T&&"video.episode"!==T&&"video.tv_show"!==T&&"video.other"!==T||!e.openGraph.video||(e.openGraph.video.actors&&e.openGraph.video.actors.length&&e.openGraph.video.actors.forEach((function(e,t){e.profile&&i.push(a.createElement("meta",{key:"video:actor:0"+t,property:"video:actor",content:e.profile})),e.role&&i.push(a.createElement("meta",{key:"video:actor:role:0"+t,property:"video:actor:role",content:e.role}))})),e.openGraph.video.directors&&e.openGraph.video.directors.length&&e.openGraph.video.directors.forEach((function(e,t){i.push(a.createElement("meta",{key:"video:director:0"+t,property:"video:director",content:e}))})),e.openGraph.video.writers&&e.openGraph.video.writers.length&&e.openGraph.video.writers.forEach((function(e,t){i.push(a.createElement("meta",{key:"video:writer:0"+t,property:"video:writer",content:e}))})),e.openGraph.video.duration&&i.push(a.createElement("meta",{key:"video:duration",property:"video:duration",content:e.openGraph.video.duration.toString()})),e.openGraph.video.releaseDate&&i.push(a.createElement("meta",{key:"video:release_date",property:"video:release_date",content:e.openGraph.video.releaseDate})),e.openGraph.video.tags&&e.openGraph.video.tags.length&&e.openGraph.video.tags.forEach((function(e,t){i.push(a.createElement("meta",{key:"video:tag:0"+t,property:"video:tag",content:e}))})),e.openGraph.video.series&&i.push(a.createElement("meta",{key:"video:series",property:"video:series",content:e.openGraph.video.series})))}e.defaultOpenGraphImageWidth&&(p.defaultOpenGraphImageWidth=e.defaultOpenGraphImageWidth),e.defaultOpenGraphImageHeight&&(p.defaultOpenGraphImageHeight=e.defaultOpenGraphImageHeight),e.openGraph.images&&e.openGraph.images.length&&i.push.apply(i,l("image",e.openGraph.images,{defaultWidth:p.defaultOpenGraphImageWidth,defaultHeight:p.defaultOpenGraphImageHeight})),e.defaultOpenGraphVideoWidth&&(p.defaultOpenGraphVideoWidth=e.defaultOpenGraphVideoWidth),e.defaultOpenGraphVideoHeight&&(p.defaultOpenGraphVideoHeight=e.defaultOpenGraphVideoHeight),e.openGraph.videos&&e.openGraph.videos.length&&i.push.apply(i,l("video",e.openGraph.videos,{defaultWidth:p.defaultOpenGraphVideoWidth,defaultHeight:p.defaultOpenGraphVideoHeight})),e.openGraph.locale&&i.push(a.createElement("meta",{key:"og:locale",property:"og:locale",content:e.openGraph.locale})),e.openGraph.site_name&&i.push(a.createElement("meta",{key:"og:site_name",property:"og:site_name",content:e.openGraph.site_name}))}return e.canonical&&i.push(a.createElement("link",{rel:"canonical",href:e.canonical,key:"canonical"})),e.additionalMetaTags&&e.additionalMetaTags.length>0&&e.additionalMetaTags.forEach((function(e){var t,o,n;i.push(a.createElement("meta",r({key:"meta:"+(null!=(t=null!=(o=null!=(n=e.keyOverride)?n:e.name)?o:e.property)?t:e.httpEquiv)},e)))})),null!=(n=e.additionalLinkTags)&&n.length&&e.additionalLinkTags.forEach((function(e){var t;i.push(a.createElement("link",r({key:"link"+(null!=(t=e.keyOverride)?t:e.href)+e.rel},e)))})),i},s=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t.prototype.render=function(){var e=this.props,t=e.title,o=e.titleTemplate,r=e.defaultTitle,i=e.dangerouslyDisableGooglebot,p=void 0!==i&&i,l=e.dangerouslySetAllPagesToNoIndex,s=void 0!==l&&l,h=e.dangerouslySetAllPagesToNoFollow,d=void 0!==h&&h,u=e.description,m=e.canonical,g=e.facebook,f=e.openGraph,y=e.additionalMetaTags,G=e.twitter,b=e.defaultOpenGraphImageWidth,k=e.defaultOpenGraphImageHeight,v=e.defaultOpenGraphVideoWidth,E=e.defaultOpenGraphVideoHeight,w=e.mobileAlternate,O=e.languageAlternates,T=e.additionalLinkTags;return a.createElement(n.default,null,c({title:t,titleTemplate:o,defaultTitle:r,dangerouslySetAllPagesToNoIndex:s,dangerouslySetAllPagesToNoFollow:d,description:u,canonical:m,facebook:g,openGraph:f,additionalMetaTags:y,twitter:G,defaultOpenGraphImageWidth:b,defaultOpenGraphImageHeight:k,defaultOpenGraphVideoWidth:v,defaultOpenGraphVideoHeight:E,mobileAlternate:w,languageAlternates:O,additionalLinkTags:T,dangerouslyDisableGooglebot:p}))},t}(a.Component),h=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t.prototype.render=function(){var e=this.props,t=e.title,o=e.noindex,r=void 0!==o&&o,i=e.nofollow,p=e.robotsProps,l=e.description,s=e.canonical,h=e.openGraph,d=e.facebook,u=e.twitter,m=e.additionalMetaTags,g=e.titleTemplate,f=e.mobileAlternate,y=e.languageAlternates,G=e.additionalLinkTags,b=e.disableGooglebot;return a.createElement(n.default,null,c({title:t,noindex:r,nofollow:i,robotsProps:p,description:l,canonical:s,facebook:d,openGraph:h,additionalMetaTags:m,twitter:u,titleTemplate:g,mobileAlternate:f,languageAlternates:y,additionalLinkTags:G,disableGooglebot:b}))},t}(a.Component)},7672:function(e,t,o){"use strict";o.r(t);var n=o(4942),a=(o(883),o(226),o(2250),o(7614),o(4715),o(4917),o(2962)),r=o(3856),i=o.n(r),p=o(5893);function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){(0,n.Z)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}t.default=function(e){var t=e.Component,o=e.pageProps;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.lX,c({},i().seo)),(0,p.jsx)(t,c({},o))]})}},1780:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return o(7672)}])},883:function(){},2250:function(){},4715:function(){},4917:function(){},7614:function(){},226:function(){},9008:function(e,t,o){e.exports=o(639)},4942:function(e,t,o){"use strict";function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,{Z:function(){return n}})}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(1780),t(4651)}));var o=e.O();_N_E=o}]);