"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[361],{6361:function(e,n,s){s.r(n);var t=s(885),r=s(9559),a=s(3211),u=s(2791),i=s(8687),c=s(2882),o=s(8614),h=s(184),l=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"),d=u.memo((function(){return(0,h.jsx)(m,{})})),m=u.memo((function(){return(0,h.jsxs)("div",{children:[(0,h.jsx)(f,{}),(0,h.jsx)(x,{})]})})),f=u.memo((function(){var e=(0,i.v9)((function(e){return e.chatPage.chatMessages})),n=(0,i.I0)();return(0,u.useEffect)((function(){l.addEventListener("message",(function(e){var s=JSON.parse(e.data);n(o.N.setChatMessages(s))}))}),[]),(0,h.jsx)("div",{style:{overflow:"auto",height:"350px"},children:e.map((function(e,n){return(0,h.jsx)(j,{message:e},n)}))})})),x=function(){var e=(0,u.useState)(""),n=(0,t.Z)(e,2),s=n[0],r=n[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("textarea",{onChange:function(e){return r(e.currentTarget.value)},value:s}),(0,h.jsx)("button",{onClick:function(){s&&(l.send(s),r(""))},children:"send"})]})},j=function(e){var n=e.message;return(0,h.jsx)("div",{style:{marginTop:"40px"},children:(0,h.jsx)(r.Z,{title:n.userName,extra:(0,h.jsx)(a.C,{size:32,src:n.photo||c}),style:{width:500},children:(0,h.jsx)("div",{children:n.message})})})};n.default=u.memo(d)}}]);
//# sourceMappingURL=361.c74fd7f9.chunk.js.map