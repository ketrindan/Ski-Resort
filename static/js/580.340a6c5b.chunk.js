"use strict";(self.webpackChunkfrontend_danilenko_ekaterina=self.webpackChunkfrontend_danilenko_ekaterina||[]).push([[580],{8580:(e,a,t)=>{t.r(a),t.d(a,{default:()=>j});var s=t(2791),n=t(5151),c=t(2402),i=t(1796),l=t(6339),r=t(4643),o=t(3387),d=t(3276),_=t(562),h=t(971),m=t(5075),x=t(331),u=t(7372),g=t(184);const j=()=>{const[e,a]=(0,s.useState)(1),t=(0,n.C)((e=>e.coaches.coachesData)),j=(0,n.C)((e=>e.coaches.status)),k=(0,n.C)((e=>e.coaches.pages)),v=(0,n.T)();return(0,s.useEffect)((()=>{j===h.q.idle&&v((0,r.Mo)({page:0,size:26}))}),[j,v]),(0,s.useEffect)((()=>{v((0,r.Mo)({page:e-1,size:26}))}),[e,v]),(0,g.jsxs)(m.X,{children:[(0,g.jsx)(i.w,{}),(0,g.jsx)(d.r,{children:(0,g.jsx)(c.V,{title:"\u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b",page:e,onPageChange:(e,t)=>{a(t)},totalPages:k,actionButton:(0,g.jsx)(o.H,{btnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0433\u043e",handleClick:()=>v((0,l.Gk)())}),children:(0,g.jsx)(u.g,{status:j,children:t.map((e=>(0,g.jsx)(x.t,{title:"".concat(e.name," ").concat(e.surname),subtitle:e.category,img:e.photo,menuItems:_.KD,getData:(0,r.H1)(e)},e.id)))})})})]})}},3387:(e,a,t)=>{t.d(a,{H:()=>l});var s=t(2419),n=t(4294);const c="AddButton_btn__N7mKy";var i=t(184);const l=e=>{let{btnText:a,handleClick:t}=e;return(0,i.jsx)(n.Z,{variant:"outlined",startIcon:(0,i.jsx)(s.Z,{}),className:c,onClick:t,children:a})}},3276:(e,a,t)=>{t.d(a,{r:()=>i});var s=t(4554);const n="ContainerLayout_box__Des3i";var c=t(184);const i=e=>{let{children:a}=e;return(0,c.jsxs)(s.Z,{className:n,children:[" ",a," "]})}},562:(e,a,t)=>{t.d(a,{KD:()=>c,Nh:()=>n,k9:()=>i});var s=t(6339);const n=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0442\u0440\u0435\u043d\u0435\u0440\u0430",callback:(0,s.pf)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,s.cC)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,s.Bq)()}],c=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u044f",callback:(0,s.td)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,s.UB)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,s.gs)()}],i=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u044f",callback:(0,s.X$)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,s.OE)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,s.Xw)()}]},84:(e,a,t)=>{t.d(a,{$:()=>o});var s=t(5117),n=t(4387),c=t(5151);const i="Menu_menu__PbwQr";var l=t(2791),r=t(184);const o=e=>{let{menuItems:a,...t}=e;const o=(0,c.T)();return(0,r.jsx)(s.Z,{anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},className:i,disableScrollLock:!0,...t,children:a.map((e=>(0,l.createElement)(n.Z,{...e,key:e.id,onClick:()=>{t.getData&&o(t.getData),o(e.callback)}},e.text)))})}},5075:(e,a,t)=>{t.d(a,{X:()=>i});var s=t(9164);const n="PageLayout_container__qU485";var c=t(184);const i=e=>{let{children:a}=e;return(0,c.jsx)(s.Z,{disableGutters:!0,maxWidth:!1,className:n,children:a})}},331:(e,a,t)=>{t.d(a,{t:()=>m});var s=t(2898),n=t(4554),c=t(3400),i=t(2791),l=t(5151),r=t(84),o=t(9331);const d="PersonItem_box__orL+6",_="PersonItem_icon__+828a";var h=t(184);const m=e=>{let{title:a,subtitle:t,img:m,menuItems:x,getData:u}=e;const[g,j]=(0,i.useState)(null),k=Boolean(g),v=(0,l.C)((e=>e.user.isAdminMode));return(0,h.jsxs)(n.Z,{className:d,children:[(0,h.jsx)(o.P,{title:a,subtitle:t,img:m}),v&&(0,h.jsx)(c.Z,{id:"action-button",size:"large","aria-label":"display more actions",edge:"end",onClick:e=>{j(e.currentTarget)},children:(0,h.jsx)(s.Z,{className:_})}),(0,h.jsx)(r.$,{anchorEl:g,menuItems:x,onClose:()=>{j(null)},open:k,getData:u})]})}},7372:(e,a,t)=>{t.d(a,{g:()=>l});var s=t(890),n=t(971);const c="StatusWrapper_text__Br0IG";var i=t(184);const l=e=>{let{status:a,children:t}=e;return(0,i.jsxs)(i.Fragment,{children:[a===n.q.loading&&(0,i.jsx)(s.Z,{className:c,children:"Loading..."}),a===n.q.failed&&(0,i.jsx)(s.Z,{className:c,children:"Error..."}),a===n.q.succeeded&&t]})}},2402:(e,a,t)=>{t.d(a,{V:()=>b});var s=t(8264),n=t(4554),c=t(1333),i=t(6563),l=t(6314),r=t(890),o=t(1087),d=t(5151);const _="ListContainer_list_container__vnOzA",h="ListContainer_list_header__FH8TB",m="ListContainer_title__NMrAR",x="ListContainer_stack__owu98",u="ListContainer_pagination_item__gkbdu",g="ListContainer_box__wcaX2",j="ListContainer_link__vSb33",k="ListContainer_arrow_icon__ypEIY";var v=t(184);const b=e=>{let{title:a,actionButton:t,children:b,link:Z,main:C,page:N,totalPages:p,onPageChange:V}=e;const w=(0,d.C)((e=>e.user.isAdminMode));return(0,v.jsxs)(n.Z,{className:_,children:[(0,v.jsxs)(n.Z,{className:h,children:[(0,v.jsxs)(r.Z,{className:m,children:[" ",a," "]}),w&&t,!C&&(0,v.jsx)(l.Z,{className:x,children:(0,v.jsx)(c.Z,{count:p,page:N,onChange:V,hidePrevButton:!0,size:"small",renderItem:e=>(0,v.jsx)(i.Z,{slots:{next:s.Z},...e,className:u})})})]}),(0,v.jsxs)(n.Z,{className:g,children:[" ",b," "]}),C&&Z&&(0,v.jsxs)(o.OL,{to:Z,className:j,children:["\u0412\u0441\u0435",(0,v.jsx)(s.Z,{className:k})]})]})}},1796:(e,a,t)=>{t.d(a,{w:()=>L});var s=t(2216),n=t(4492),c=t(4554),i=t(9953),l=t(5523),r=t(9012),o=t(493),d=t(9259),_=t(9955),h=t(890),m=t(1087),x=t(5151),u=t(8777),g=t(9503);const j="Navbar_icon__jBVI2",k="Navbar_navbar__2jQY-",v="Navbar_list__VzPeA",b="Navbar_link__+rrBs",Z="Navbar_link_active__ZaE7V",C="Navbar_control__PNV+v",N="Navbar_switch__q23LI",p="Navbar_span__VPPIi";var V=t(184);const w=[{link:g._.guests,icon:(0,V.jsx)(s.Z,{className:j}),name:"\u041f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u0438"},{link:g._.coaches,icon:(0,V.jsx)(n.Z,{className:j}),name:"\u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b"},{link:g._.skipasses,icon:(0,V.jsx)(d.Z,{children:(0,V.jsx)("svg",{width:"22",height:"13",viewBox:"0 0 22 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,V.jsx)("path",{d:"M12 6.11765H19V7.26471H12V6.11765ZM12 4.20588H19V5.35294H12V4.20588ZM12 8.02941H19V9.17647H12V8.02941ZM20 0H2C0.9 0 0 0.688235 0 1.52941V11.4706C0 12.3118 0.9 13 2 13H20C21.1 13 22 12.3118 22 11.4706V1.52941C22 0.688235 21.1 0 20 0ZM20 11.4706H11V1.52941H20V11.4706Z",fill:"#C2C9CE"})})}),name:"\u0421\u043a\u0438-\u043f\u0430\u0441\u0441\u044b"}],L=()=>{const e=(0,x.T)(),a="\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440"===(0,x.C)((e=>e.user.role)),t=(0,x.C)((e=>e.user.isAdminMode));return(0,V.jsxs)(i.ZP,{variant:"permanent",className:k,children:[(0,V.jsx)(o.Z,{disablePadding:!0,className:v,children:w.map((e=>(0,V.jsxs)(m.OL,{to:e.link,className:e=>{let{isActive:a}=e;return a?"".concat(b," ").concat(Z):"".concat(b)},children:[e.icon,(0,V.jsx)(h.Z,{children:e.name})]},e.name)))}),(0,V.jsx)(c.Z,{children:a&&(0,V.jsx)(r.Z,{children:(0,V.jsx)(l.Z,{label:"\u0420\u0435\u0436\u0438\u043c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",className:C,control:(0,V.jsx)(_.Z,{className:N,onChange:()=>e((0,u.d$)()),checked:t})})})}),(0,V.jsx)(h.Z,{component:"span",className:p,children:"\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b"})]})}}}]);
//# sourceMappingURL=580.340a6c5b.chunk.js.map