"use strict";(self.webpackChunkkuzu_docs=self.webpackChunkkuzu_docs||[]).push([[1593],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=l(r),m=a,f=c["".concat(p,".").concat(m)]||c[m]||d[m]||o;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3388:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>u});var n=r(7462),a=(r(7294),r(3905)),o=r(5973);const s={title:"Set",description:"Update properties of node or relationship records to new values."},i="Database",p={unversionedId:"cypher/data-manipulation-clauses/set",id:"cypher/data-manipulation-clauses/set",title:"Set",description:"Update properties of node or relationship records to new values.",source:"@site/docs/cypher/data-manipulation-clauses/set.md",sourceDirName:"cypher/data-manipulation-clauses",slug:"/cypher/data-manipulation-clauses/set",permalink:"/docusaurus/cypher/data-manipulation-clauses/set",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/cypher/data-manipulation-clauses/set.md",tags:[],version:"current",frontMatter:{title:"Set",description:"Update properties of node or relationship records to new values."},sidebar:"tutorialSidebar",previous:{title:"Delete",permalink:"/docusaurus/cypher/data-manipulation-clauses/delete"},next:{title:"Performance Debugging",permalink:"/docusaurus/cypher/performance-debugging"}},l={},u=[{value:"Examples:",id:"examples",level:2},{value:"1. Setting node properties",id:"1-setting-node-properties",level:3},{value:"2. Setting relationship properties",id:"2-setting-relationship-properties",level:3}],c={toc:u},d="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"database"},"Database"),(0,a.kt)("p",null,"We will use the database, whose schema and data import commands are given ",(0,a.kt)("a",{parentName:"p",href:"/docusaurus/cypher/query-clauses/example-database"},"here"),":"),(0,a.kt)("img",{src:o.Z,style:{width:800}}),(0,a.kt)("p",null,"You can import this database by copy pasting the commands on that page. "),(0,a.kt)("h1",{id:"set"},"SET"),(0,a.kt)("p",null,"SET is similar to SQL's SET clause, and allows updating properties of node or relationship\nrecords to new values (possibly NULL)."),(0,a.kt)("h2",{id:"examples"},"Examples:"),(0,a.kt)("h3",{id:"1-setting-node-properties"},"1. Setting node properties"),(0,a.kt)("p",null,"For example the following query sets the age property of the User node\nwith name Adam to 50 (which is 30 in the original database)."),(0,a.kt)("p",null,"Query:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"MATCH (u:User) \nWHERE u.name = 'Adam' \nSET u.age = 50 \n")),(0,a.kt)("p",null,"Similarly the following sets Adam's age property to NULL.\nQuery:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"MATCH (u:User) \nWHERE u.name = 'Adam' \nSET u.age = NULL\n")),(0,a.kt)("h3",{id:"2-setting-relationship-properties"},"2. Setting relationship properties"),(0,a.kt)("p",null,"For example the following query sets the ",(0,a.kt)("inlineCode",{parentName:"p"},"since")," property of the Follows relationship(From Adam to Karissa) to 2012 (which is 2020 in the original database)."),(0,a.kt)("p",null,"Query:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"MATCH (u0:User)-[f:Follows]->(u1:User)\nWHERE u0.name = 'Adam' AND u1.name = 'Karissa'\nSET f.since = 2012\n")))}m.isMDXComponent=!0},5973:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/running-example-db76aa393fd70d29c831f1527455440a.png"}}]);