"use strict";(self.webpackChunkfrontend_danilenko_ekaterina=self.webpackChunkfrontend_danilenko_ekaterina||[]).push([[580],{8580:(e,a,s)=>{s.r(a),s.d(a,{default:()=>Z});var t=s(2791),n=s(5151),c=s(2402),i=s(1796),l=s(6339),r=s(4643),o=s(3387),d=s(3276),_=s(562),x=s(971),h=s(5075),m=s(331),u=s(7372),j=s(184);const Z=()=>{const[e,a]=(0,t.useState)(1),s=(0,n.C)((e=>e.coaches.coachesData)),Z=(0,n.C)((e=>e.coaches.status)),g=(0,n.C)((e=>e.coaches.pages)),N=(0,n.T)();return(0,t.useEffect)((()=>{Z===x.q.idle&&N((0,r.Mo)({page:0,size:26}))}),[Z,N]),(0,t.useEffect)((()=>{N((0,r.Mo)({page:e-1,size:26}))}),[e,N]),(0,j.jsxs)(h.X,{children:[(0,j.jsx)(i.w,{}),(0,j.jsx)(d.r,{children:(0,j.jsx)(c.V,{title:"\u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b",page:e,onPageChange:(e,s)=>{a(s)},totalPages:g,actionButton:(0,j.jsx)(o.H,{btnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0433\u043e",handleClick:()=>N((0,l.Gk)())}),children:(0,j.jsx)(u.g,{status:Z,children:s.map((e=>(0,j.jsx)(m.t,{title:"".concat(e.name," ").concat(e.surname),subtitle:e.category,img:e.photo,menuItems:_.KD,getData:(0,r.H1)(e)},e.id)))})})})]})}},3387:(e,a,s)=>{s.d(a,{H:()=>l});var t=s(2419),n=s(4294);const c="AddButton_btn__N7mKy";var i=s(184);const l=e=>{let{btnText:a,handleClick:s}=e;return(0,i.jsx)(n.Z,{variant:"outlined",startIcon:(0,i.jsx)(t.Z,{}),className:c,onClick:s,children:a})}},3276:(e,a,s)=>{s.d(a,{r:()=>i});var t=s(4554);const n="ContainerLayout_box__Des3i";var c=s(184);const i=e=>{let{children:a}=e;return(0,c.jsxs)(t.Z,{className:n,children:[" ",a," "]})}},562:(e,a,s)=>{s.d(a,{KD:()=>c,Nh:()=>n,k9:()=>i});var t=s(6339);const n=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0442\u0440\u0435\u043d\u0435\u0440\u0430",callback:(0,t.pf)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,t.cC)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,t.Bq)()}],c=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u044f",callback:(0,t.td)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,t.UB)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,t.gs)()}],i=[{id:"0",text:"\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u044f",callback:(0,t.X$)()},{id:"1",text:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",callback:(0,t.OE)()},{id:"2",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",callback:(0,t.Xw)()}]},84:(e,a,s)=>{s.d(a,{$:()=>o});var t=s(5117),n=s(4387),c=s(5151);const i="Menu_menu__PbwQr";var l=s(2791),r=s(184);const o=e=>{let{menuItems:a,...s}=e;const o=(0,c.T)();return(0,r.jsx)(t.Z,{anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},className:i,disableScrollLock:!0,...s,children:a.map((e=>(0,l.createElement)(n.Z,{...e,key:e.id,onClick:()=>{s.getData&&o(s.getData),o(e.callback)}},e.text)))})}},5075:(e,a,s)=>{s.d(a,{X:()=>i});var t=s(9164);const n="PageLayout_container__qU485";var c=s(184);const i=e=>{let{children:a}=e;return(0,c.jsx)(t.Z,{disableGutters:!0,maxWidth:!1,className:n,children:a})}},331:(e,a,s)=>{s.d(a,{t:()=>h});var t=s(2898),n=s(4554),c=s(3400),i=s(2791),l=s(5151),r=s(84),o=s(9331);const d="PersonItem_box__orL+6",_="PersonItem_icon__+828a";var x=s(184);const h=e=>{let{title:a,subtitle:s,img:h,menuItems:m,getData:u}=e;const[j,Z]=(0,i.useState)(null),g=Boolean(j),N=(0,l.C)((e=>e.user.isAdminMode));return(0,x.jsxs)(n.Z,{className:d,children:[(0,x.jsx)(o.P,{title:a,subtitle:s,img:h}),N&&(0,x.jsx)(c.Z,{id:"action-button",size:"large","aria-label":"display more actions",edge:"end",onClick:e=>{Z(e.currentTarget)},children:(0,x.jsx)(t.Z,{className:_})}),(0,x.jsx)(r.$,{anchorEl:j,menuItems:m,onClose:()=>{Z(null)},open:g,getData:u})]})}},7372:(e,a,s)=>{s.d(a,{g:()=>l});var t=s(890),n=s(971);const c="StatusWrapper_text__Br0IG";var i=s(184);const l=e=>{let{status:a,children:s}=e;return(0,i.jsxs)(i.Fragment,{children:[a===n.q.loading&&(0,i.jsx)(t.Z,{className:c,children:"Loading..."}),a===n.q.failed&&(0,i.jsx)(t.Z,{className:c,children:"Error..."}),a===n.q.succeeded&&s]})}},2402:(e,a,s)=>{s.d(a,{V:()=>f});var t=s(8264),n=s(1131),c=s(1473),i=s(3721),l=s(5818),r=s(4554),o=s(1333),d=s(6563),_=s(6314),x=s(6934),h=s(890),m=s(1087),u=s(5151);const j="ListContainer_list_container__vnOzA",Z="ListContainer_list_header__FH8TB",g="ListContainer_list_header_main__ZxOYi",N="ListContainer_title__NMrAR",b="ListContainer_less_icon__Is4ip",k="ListContainer_stack__owu98",v="ListContainer_pagination_item__gkbdu",C="ListContainer_box__wcaX2",p="ListContainer_link_box__NZM1h",L="ListContainer_link__vSb33",P="ListContainer_arrow_icon__ypEIY";var V=s(184);const f=e=>{let{title:a,actionButton:s,children:f,link:w,main:I,page:H,totalPages:M,onPageChange:B}=e;const E=(0,u.C)((e=>e.user.isAdminMode)),D=(0,x.ZP)((e=>(0,V.jsx)(c.Z,{disableGutters:!0,elevation:0,square:!0,...e})))((()=>({"&::before":{display:"none"}})));return I?(0,V.jsxs)(D,{className:j,defaultExpanded:!0,children:[(0,V.jsxs)(l.Z,{className:g,expandIcon:(0,V.jsx)(n.Z,{className:b}),"aria-controls":"panel1-content",id:"panel1-header",children:[(0,V.jsxs)(h.Z,{className:N,children:[" ",a," "]}),E&&s]}),(0,V.jsxs)(i.Z,{children:[(0,V.jsxs)(r.Z,{className:C,children:[f," "]}),w&&(0,V.jsx)(r.Z,{className:p,children:(0,V.jsxs)(m.OL,{to:w,className:L,children:["\u0412\u0441\u0435",(0,V.jsx)(t.Z,{className:P})]})})]})]}):(0,V.jsxs)(r.Z,{className:j,children:[(0,V.jsxs)(r.Z,{className:Z,children:[(0,V.jsxs)(h.Z,{className:N,children:[" ",a," "]}),E&&s,(0,V.jsx)(_.Z,{className:k,children:(0,V.jsx)(o.Z,{count:M,page:H,onChange:B,hidePrevButton:!0,size:"small",renderItem:e=>(0,V.jsx)(d.Z,{slots:{next:t.Z},...e,className:v})})})]}),(0,V.jsxs)(r.Z,{className:C,children:[" ",f," "]})]})}},1796:(e,a,s)=>{s.d(a,{w:()=>V});var t=s(2216),n=s(4492),c=s(4554),i=s(9953),l=s(5523),r=s(9012),o=s(493),d=s(9259),_=s(9955),x=s(890),h=s(1087),m=s(5151),u=s(8777),j=s(9503);const Z="Navbar_icon__jBVI2",g="Navbar_navbar__2jQY-",N="Navbar_list__VzPeA",b="Navbar_link__+rrBs",k="Navbar_link_active__ZaE7V",v="Navbar_control__PNV+v",C="Navbar_switch__q23LI",p="Navbar_span__VPPIi";var L=s(184);const P=[{link:j._.guests,icon:(0,L.jsx)(t.Z,{className:Z}),name:"\u041f\u043e\u0441\u0435\u0442\u0438\u0442\u0435\u043b\u0438"},{link:j._.coaches,icon:(0,L.jsx)(n.Z,{className:Z}),name:"\u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b"},{link:j._.skipasses,icon:(0,L.jsx)(d.Z,{children:(0,L.jsx)("svg",{width:"22",height:"13",viewBox:"0 0 22 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,L.jsx)("path",{d:"M12 6.11765H19V7.26471H12V6.11765ZM12 4.20588H19V5.35294H12V4.20588ZM12 8.02941H19V9.17647H12V8.02941ZM20 0H2C0.9 0 0 0.688235 0 1.52941V11.4706C0 12.3118 0.9 13 2 13H20C21.1 13 22 12.3118 22 11.4706V1.52941C22 0.688235 21.1 0 20 0ZM20 11.4706H11V1.52941H20V11.4706Z",fill:"#C2C9CE"})})}),name:"\u0421\u043a\u0438-\u043f\u0430\u0441\u0441\u044b"}],V=()=>{const e=(0,m.T)(),a="\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440"===(0,m.C)((e=>e.user.role)),s=(0,m.C)((e=>e.user.isAdminMode));return(0,L.jsxs)(i.ZP,{variant:"permanent",className:g,children:[(0,L.jsx)(o.Z,{disablePadding:!0,className:N,children:P.map((e=>(0,L.jsxs)(h.OL,{to:e.link,className:e=>{let{isActive:a}=e;return a?"".concat(b," ").concat(k):"".concat(b)},children:[e.icon,(0,L.jsx)(x.Z,{children:e.name})]},e.name)))}),(0,L.jsx)(c.Z,{children:a&&(0,L.jsx)(r.Z,{children:(0,L.jsx)(l.Z,{label:"\u0420\u0435\u0436\u0438\u043c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",className:v,control:(0,L.jsx)(_.Z,{className:C,onChange:()=>e((0,u.d$)()),checked:s})})})}),(0,L.jsx)(x.Z,{component:"span",className:p,children:"\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b"})]})}}}]);
//# sourceMappingURL=580.d67a6f91.chunk.js.map