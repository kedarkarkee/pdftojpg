(this.webpackJsonppdftojpg=this.webpackJsonppdftojpg||[]).push([[0],{2:function(e,t,a){e.exports={Img:"l_Img__1JBvO",Button:"l_Button__3o1ZD",W3ul:"l_W3ul__1BrWz",Bar:"l_Bar__2W4XG",BarItem:"l_BarItem__26_3X","w3-hide":"l_w3-hide__3DZKR","w3-hide-large":"l_w3-hide-large__1xZqO","w3-display-right":"l_w3-display-right__MVP26",Circle:"l_Circle__3rzn0","w3-card":"l_w3-card__3ee7w","w3-card-2":"l_w3-card-2__2Wtl6",W3Card4:"l_W3Card4__1LFfU","w3-small":"l_w3-small__zOA5h",Large:"l_Large__1eEp_",Xlarge:"l_Xlarge__2qk8o",Right:"l_Right__3E8oy",White:"l_White__11OSF",Trash:"l_Trash__1XWdS",Converting:"l_Converting__3cH6p","w3-spin":"l_w3-spin__3HIB6",fading:"l_fading__JOTEx",opac:"l_opac__oC9HD",animatetop:"l_animatetop__2bngh",animateleft:"l_animateleft__NC34X",animateright:"l_animateright__3YH2F",animatebottom:"l_animatebottom__14fV8",animatezoom:"l_animatezoom__24MAU"}},36:function(e,t,a){e.exports={Button:"uifileinput_Button__2taRo"}},37:function(e,t,a){e.exports={Spinner:"spinner_Spinner__1P0xz"}},44:function(e,t,a){},5:function(e,t,a){e.exports={Gallery:"Video_Gallery__2ZM7w",Desc:"Video_Desc__kx_hS",Responsive:"Video_Responsive__10hNa",Clearfix:"Video_Clearfix__2P2t9",Button:"Video_Button__1SOW9",UploadButton:"Video_UploadButton__2vdbY",Centered:"Video_Centered__1e0om",Grouped:"Video_Grouped__nQDDq",Switch:"Video_Switch__1YWI8",SelectContainer:"Video_SelectContainer__3nOsK",VideoSelect:"Video_VideoSelect__2Wl-3",ThumbSelect:"Video_ThumbSelect__12e6l",Inputs:"Video_Inputs__2w6Sl"}},76:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(17),c=a.n(s),i=a(14),l=(a(44),a(3)),o=a(4),d=a.n(o),u=a(19),j=a(13),p=a(7),b=a(26),h=a(36),f=a.n(h),x=a(1),v=function(e){var t=r.a.useRef(null),a=r.a.useRef(null);return Object(x.jsxs)("form",{ref:a,children:[Object(x.jsx)("button",{type:"button",onClick:function(){var e;null===(e=t.current)||void 0===e||e.click()},className:f.a.Button,children:e.label}),Object(x.jsx)("input",{accept:e.acceptedFileTypes,multiple:e.allowMultipleFiles,name:e.uploadFileName,onChange:function(t){var n,r;if(null===(n=t.target.files)||void 0===n?void 0:n.length){var s=new FormData;Array.from(t.target.files).forEach((function(e){s.append(t.target.name,e)})),e.onChange(s),null===(r=a.current)||void 0===r||r.reset()}},ref:t,style:{display:"none"},type:"file"})]})};v.defaultProps={acceptedFileTypes:"",allowMultipleFiles:!1};var O=a(37),m=a.n(O);var _=function(){return Object(x.jsxs)("div",{className:m.a.Spinner,children:[Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{})]})},C=a(5),g=a.n(C),w=a(38),N="http://3.232.224.65:8080",y="http://3.232.224.65:8080",A=a.n(w).a.create({baseURL:N}),k=a(2),S=a.n(k);var T=function(e){var t=[S.a.W3ul,S.a.W3Card4].join(" "),a=[S.a.BarItem,S.a.Circle,S.a.HideSmall,S.a.Img].join(" ");return Object(x.jsx)("ul",{className:t,children:e.histories.map((function(t){var n=new Date(t.timestamp).toLocaleDateString("en-US",{day:"numeric",month:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),r="";return 0===t.converted?r="Converting ".concat(t.finished," of ").concat(t.total):2===t.converted&&(r="Error"),Object(x.jsxs)("li",{className:S.a.Bar,children:[Object(x.jsx)("img",{src:N+"/assets/"+e.iconName,alt:"video icon",className:a}),Object(x.jsx)(i.b,{to:"/video/".concat(t.id),children:Object(x.jsxs)("div",{className:S.a.BarItem,children:[Object(x.jsx)("span",{className:S.a.Large,children:t.fileName}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:n})]})}),Object(x.jsx)("span",{className:S.a.Trash,onClick:function(){return e.deletePDF(t.id)}}),1!==t.converted?Object(x.jsx)("span",{className:S.a.Converting,children:r}):null]},t.id)}))})},B=[{value:"?x240",label:"240p"},{value:"?x480",label:"480p"},{value:"?x720",label:"720p"},{value:"?x1080",label:"1080p"},{value:"?x2160",label:"2160p"}],D=function(e){var t=e.split("x"),a=t[0],n=t[1];if(!a||!n)return!1;if("?"===a&&"?"===n)return!1;var r=!1,s=!1;return r="?"===a||!isNaN(Number(a)),s="?"===n||!isNaN(Number(n)),r&&s};var P=function(){var e=Object(n.useState)(!1),t=Object(p.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(0),c=Object(p.a)(s,2),l=c[0],o=c[1],h=Object(n.useState)(null),f=Object(p.a)(h,2),O=f[0],m=f[1],C=Object(n.useState)(!0),w=Object(p.a)(C,2),N=w[0],k=w[1],S=Object(n.useState)(!1),P=Object(p.a)(S,2),F=P[0],V=P[1],I=Object(n.useState)([]),z=Object(p.a)(I,2),R=z[0],W=z[1],H=Object(n.useState)([]),U=Object(p.a)(H,2),E=U[0],M=U[1],G=Object(n.useState)([]),L=Object(p.a)(G,2),J=L[0],X=L[1],Z=Object(n.useState)(),q=Object(p.a)(Z,2),K=q[0],Y=q[1],Q=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n,s,c,i,l,j,p,b,h;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],n=[],s=Object(u.a)(R),e.prev=3,s.s();case 5:if((c=s.n()).done){e.next=17;break}if(!(i=c.value).__isNew__){e.next=14;break}if(D(i.value)){e.next=11;break}return m("Invalid Video Resolution Detected. ".concat(i.value)),e.abrupt("return");case 11:a.push(i.value),e.next=15;break;case 14:a.push(i.value);case 15:e.next=5;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(3),s.e(e.t0);case 22:return e.prev=22,s.f(),e.finish(22);case 25:if(!F){e.next=29;break}n=[].concat(a),e.next=52;break;case 29:l=Object(u.a)(E),e.prev=30,l.s();case 32:if((j=l.n()).done){e.next=44;break}if(!(p=j.value).__isNew__){e.next=41;break}if(D(p.value)){e.next=38;break}return m("Invalid Thumbnail Resolution Detected. ".concat(p.value)),e.abrupt("return");case 38:n.push(p.value),e.next=42;break;case 41:n.push(p.value);case 42:e.next=32;break;case 44:e.next=49;break;case 46:e.prev=46,e.t1=e.catch(30),l.e(e.t1);case 49:return e.prev=49,l.f(),e.finish(49);case 52:return m(null),t.append("sizes",JSON.stringify(a)),t.append("thumbnailSizes",JSON.stringify(n)),t.append("keepDAR","".concat(N)),r(!0),o(0),b={responseType:"json",headers:{"Content-Type":"multipart/form-data","Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type, Authorization"},onUploadProgress:function(e){var t=100*e.loaded/e.total;t<99?o(Number(t.toFixed(2))):(r(!1),o(0),Y(!0))}},e.next=61,A.post("videoconvert/resize",t,b);case 61:if(h=e.sent,Y(!1),!h.data.error){e.next=66;break}return alert(h.data.error),e.abrupt("return");case 66:case"end":return e.stop()}}),e,null,[[3,19,22,25],[30,46,49,52]])})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(j.a)(d.a.mark((function e(){var t,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),t={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=4,A.get("history/video",t);case 4:if(a=e.sent,r(!1),!a.data.error){e.next=9;break}return alert(a.data.error),e.abrupt("return");case 9:X(a.data.files);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"DELETE","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=3,A.delete("files/video/"+t,a);case 3:return e.next=5,A.get("history/video");case 5:if(n=e.sent,r(!1),!n.data.error){e.next=10;break}return alert(n.data.error),e.abrupt("return");case 10:X(n.data.files);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=[g.a.Centered,g.a.Button].join(" "),ae=null,ne=null,re=null;a?(ae=Object(x.jsx)("div",{className:g.a.Centered,children:Object(x.jsx)(_,{})}),ne=0!==l?Object(x.jsxs)("div",{className:g.a.Centered,children:[l,"% Uploaded"]}):null):K?(ae=Object(x.jsx)("div",{className:g.a.Centered,children:Object(x.jsx)(_,{})}),ne=0!==l?Object(x.jsx)("div",{className:g.a.Centered,children:"Uploading to Bucket"}):null):re=Object(x.jsx)("div",{className:te,onClick:$,children:"History"});var se=Object(x.jsx)("div",{className:g.a.SelectContainer,children:Object(x.jsx)(b.a,{placeholder:"Select Video Resolutions",className:g.a.VideoSelect,isMulti:!0,options:B,onChange:function(e){W(e)}})}),ce=Object(x.jsx)("div",{className:g.a.SelectContainer,children:Object(x.jsx)(b.a,{placeholder:"Select Thumbnail Resolutions",className:g.a.ThumbSelect,isMulti:!0,options:B,onChange:function(e){M(e)},isDisabled:F})}),ie=null;O&&(ie=Object(x.jsx)("div",{className:g.a.Centered,children:O}));var le=0!==J.length?Object(x.jsx)("div",{className:g.a.Centered,children:Object(x.jsx)(T,{iconName:"video.png",histories:J,deletePDF:ee})}):null;return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:g.a.Grouped,children:[Object(x.jsx)("div",{className:g.a.UploadButton,children:Object(x.jsx)(v,{label:"Upload Video",uploadFileName:"video",onChange:Q,acceptedFileTypes:"video/*"})}),Object(x.jsx)(i.b,{to:"/",children:Object(x.jsx)("div",{className:g.a.Switch,children:"PDF Converter"})})]}),ie,Object(x.jsx)("div",{className:g.a.Centered,children:Object(x.jsxs)("label",{children:[Object(x.jsx)("input",{type:"checkbox",checked:N,onChange:function(e){return k(e.target.checked)}}),"Keep Aspect Ratio"]})}),Object(x.jsx)("div",{className:g.a.Centered,children:Object(x.jsxs)("label",{children:[Object(x.jsx)("input",{type:"checkbox",checked:F,onChange:function(e){return V(e.target.checked)}}),"Generate thumbnail same as video resolutions"]})}),se,ce,ae,ne,Object(x.jsxs)("div",{className:g.a.Centered,children:[null,null,re]}),le,Object(x.jsx)("div",{className:g.a.Clearfix})]})},F=a(39),V=a.n(F),I=a(8),z=a.n(I);var R=function(e){var t=[S.a.W3ul,S.a.W3Card4].join(" "),a=[S.a.BarItem,S.a.Circle,S.a.HideSmall,S.a.Img].join(" ");return Object(x.jsx)("ul",{className:t,children:e.histories.map((function(t){var n=new Date(t.timestamp).toLocaleDateString("en-US",{day:"numeric",month:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"});return Object(x.jsxs)("li",{className:S.a.Bar,children:[Object(x.jsx)("a",{href:N+"/files/pdfin/"+t.key,children:Object(x.jsx)("img",{src:N+"/assets/pdf.png",alt:"pdf icon",className:a})}),Object(x.jsxs)("div",{className:S.a.BarItem,onClick:function(){return e.showExisting(t.id)},children:[Object(x.jsx)("span",{className:S.a.Large,children:t.fileName}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:n})]}),Object(x.jsx)("span",{className:S.a.Trash,onClick:function(){return e.deletePDF(t.id)}})]},t.id)}))})};var W=function(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),c=Object(p.a)(s,2),l=c[0],o=c[1],b=Object(n.useState)([]),h=Object(p.a)(b,2),f=h[0],O=h[1],m=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(u.a)(a),e.prev=1,t.s();case 3:if((n=t.n()).done){e.next=9;break}return r=n.value,e.next=7,C(r);case 7:e.next=3;break;case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),t.e(e.t0);case 14:return e.prev=14,t.f(),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={responseType:"blob",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"GET","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=3,A.get("files/"+t.key,a);case 3:if(!(n=e.sent).data.error){e.next=7;break}return alert(n.data.error),e.abrupt("return");case 7:r=new Blob([n.data],{type:"image/jpg"}),V()(r,t.key);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),r([]),O([]),a={responseType:"json",headers:{"Content-Type":"multipart/form-data","Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=6,A.post("convert/jpg",t,a);case 6:if(n=e.sent,o(!1),!n.data.error){e.next=11;break}return alert(n.data.error),e.abrupt("return");case 11:r(n.data.files);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(d.a.mark((function e(){var t,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),r([]),t={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=5,A.get("history/pdf",t);case 5:if(a=e.sent,o(!1),!a.data.error){e.next=10;break}return alert(a.data.error),e.abrupt("return");case 10:O(a.data.files);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),r([]),O([]),a={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"GET","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=6,A.get("convert/jpg/"+t,a);case 6:if(n=e.sent,o(!1),!n.data.error){e.next=11;break}return alert(n.data.error),e.abrupt("return");case 11:r(n.data.files);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"DELETE","Access-Control-Allow-Headers":"Content-Type, Authorization"}},e.next=3,A.delete("files/pdf/"+t,a);case 3:return e.next=5,A.get("history/pdf");case 5:if(n=e.sent,o(!1),!n.data.error){e.next=10;break}return alert(n.data.error),e.abrupt("return");case 10:O(n.data.files);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=[z.a.Centered,z.a.Button].join(" "),B=null,D=null,P=null,F=null;if(l)B=Object(x.jsx)("div",{className:z.a.Centered,children:Object(x.jsx)(_,{})});else if(F=Object(x.jsx)("div",{className:T,onClick:w,children:"History"}),0!==a.length){D=Object(x.jsx)("div",{className:T,onClick:function(){return m()},children:"Download All"});var I=a[0].fileName.replace("pdf","zip");P=Object(x.jsx)("a",{href:N+"/files/pdfout/"+I,download:!0,children:Object(x.jsx)("div",{className:T,children:"Download As Zip"})})}var W=0!==f.length?Object(x.jsx)("div",{className:z.a.Centered,children:Object(x.jsx)(R,{histories:f,deletePDF:S,showExisting:k})}):null;return Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:z.a.Grouped,children:[Object(x.jsx)("div",{className:z.a.UploadButton,children:Object(x.jsx)(v,{label:"Upload PDF",uploadFileName:"pdf",onChange:g,acceptedFileTypes:".pdf"})}),Object(x.jsx)(i.b,{to:"/video",children:Object(x.jsx)("div",{className:z.a.Switch,children:"Video Converter"})})]}),B,Object(x.jsxs)("div",{className:z.a.Centered,children:[D,P,F]}),W,Object(x.jsx)("div",{className:z.a.Centered,children:a.map((function(e){return Object(x.jsx)("div",{className:z.a.Responsive,children:Object(x.jsxs)("div",{className:z.a.Gallery,children:[Object(x.jsx)("a",{target:"_blank",rel:"noreferrer",href:"".concat(N,"/files/pdfout/").concat(e.key),children:Object(x.jsx)("img",{src:"".concat(N,"/files/pdfout/").concat(e.key),alt:e.key,width:"600",height:"400"})}),Object(x.jsx)("a",{href:"".concat(N,"/files/pdfout/").concat(e.key),download:!0,children:Object(x.jsxs)("div",{className:z.a.Button,children:["Download Page ",e.page]})})]})},e.id)}))}),Object(x.jsx)("div",{className:z.a.Clearfix})]})},H=function(e){var t=e.split("x");return"?"===t[0]?"".concat(t[1],"p"):t[0]+" x "+t[1]};var U=Object(l.f)((function(e){var t=e.match.params.id,a=Object(n.useState)([]),r=Object(p.a)(a,2),s=r[0],c=r[1];Object(n.useEffect)((function(){var e={responseType:"json",headers:{"Access-Control-Allow-Origin":y,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type, Authorization"}};A.get("videoconvert/converted/"+t,e).then((function(e){e.data.error?alert(e.data.error):c(e.data)}))}),[t]);var i=[S.a.W3ul,S.a.W3Card4].join(" "),l=[S.a.BarItem,S.a.Circle,S.a.HideSmall,S.a.Img,S.a.Right].join(" "),o=s.filter((function(e){return 0===e.isThumbnail})),d=s.filter((function(e){return 1===e.isThumbnail})),u=o.map((function(e){return Object(x.jsxs)("li",{className:S.a.Bar,children:[Object(x.jsxs)("div",{className:S.a.BarItem,children:[Object(x.jsx)("span",{className:S.a.Large,children:e.fileName}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:H(e.resolution)})]}),Object(x.jsx)("a",{href:N+"/files/videoout/"+e.key,download:!0,children:Object(x.jsx)("img",{src:N+"/assets/download.png",alt:"download",className:l})})]},e.id)})),j=d.map((function(e){return Object(x.jsxs)("li",{className:S.a.Bar,children:[Object(x.jsxs)("div",{className:S.a.BarItem,children:[Object(x.jsx)("span",{className:S.a.Large,children:e.fileName}),Object(x.jsx)("br",{}),Object(x.jsx)("span",{children:H(e.resolution)})]}),Object(x.jsx)("a",{href:N+"/files/thumbnail/"+e.key,download:!0,children:Object(x.jsx)("img",{src:N+"/assets/download.png",alt:"download",className:l})})]},e.id)}));return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{children:Object(x.jsx)("h3",{children:"Converted Videos"})}),Object(x.jsx)("ul",{className:i,children:u}),Object(x.jsx)("div",{children:Object(x.jsx)("h3",{children:"Generated Thumbnails"})}),Object(x.jsx)("ul",{className:i,children:j})]})})),E=function(){var e=Object(x.jsxs)(l.c,{children:[Object(x.jsx)(l.a,{path:"/video/:id",component:U}),Object(x.jsx)(l.a,{path:"/video",component:P}),Object(x.jsx)(l.a,{path:"/",exact:!0,component:W})]});return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("main",{children:e})})};var M=function(){return Object(x.jsx)("div",{children:Object(x.jsx)(E,{})})},G=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,77)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),s(e),c(e)}))};c.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(i.a,{children:Object(x.jsx)(M,{})})}),document.getElementById("root")),G()},8:function(e,t,a){e.exports={Gallery:"PdfConverter_Gallery__2ig8c",Desc:"PdfConverter_Desc__2d_2y",Responsive:"PdfConverter_Responsive__2PbCB",Clearfix:"PdfConverter_Clearfix__22sNi",Button:"PdfConverter_Button__2Us6n",UploadButton:"PdfConverter_UploadButton__1ODs1",Centered:"PdfConverter_Centered__3Jgev",Grouped:"PdfConverter_Grouped__1mojt",Switch:"PdfConverter_Switch__UDree"}}},[[76,1,2]]]);
//# sourceMappingURL=main.9687d23f.chunk.js.map