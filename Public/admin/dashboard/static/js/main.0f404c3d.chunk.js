(this.webpackJsonptest1=this.webpackJsonptest1||[]).push([[0],{147:function(e,t,s){},148:function(e,t,s){},181:function(e,t,s){},182:function(e,t,s){},279:function(e,t,s){"use strict";s.r(t);var c=s(0),n=s.n(c),r=s(26),l=s.n(r),i=(s(181),s(47)),d=s(48),a=s(51),o=s(50),j=(s.p,s(182),s(167)),b=s.n(j),h=s(168),p=s(52),O=s.n(p),x=(s(147),s(8)),u=function(e){Object(a.a)(s,e);var t=Object(o.a)(s);function s(e){return Object(i.a)(this,s),t.call(this,e)}return Object(d.a)(s,[{key:"render",value:function(){return null==this.props.member?Object(x.jsx)("div",{class:"spinner-border text-primary",role:"status",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Loading..."})}):Object(x.jsxs)("tr",{className:"shadow-sm custom-row",children:[Object(x.jsx)("td",{children:this.props.member.id}),Object(x.jsx)("td",{children:this.props.member.name}),Object(x.jsx)("td",{children:this.props.member.contact_name}),Object(x.jsx)("td",{children:this.props.member.phone}),Object(x.jsx)("td",{children:this.props.member.email}),Object(x.jsx)("td",{children:this.props.member.contact_type}),Object(x.jsx)("td",{children:this.props.member.location_type}),Object(x.jsx)("td",{children:this.props.member.member_type}),Object(x.jsx)("td",{children:1==this.props.member.accepted?Object(x.jsxs)("div",{class:"btn-group",children:[Object(x.jsx)("button",{type:"button",class:"btn btn-success",children:"Accepted"}),Object(x.jsx)("button",{type:"button",class:"btn btn-success dropdown-toggle dropdown-toggle-split","data-bs-toggle":"dropdown","aria-expanded":"false",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Toggle Dropdown"})}),Object(x.jsxs)("ul",{class:"dropdown-menu",children:[Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Another action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Something else here"})}),Object(x.jsx)("li",{children:Object(x.jsx)("hr",{class:"dropdown-divider"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Separated link"})})]})]}):Object(x.jsxs)("div",{class:"btn-group",children:[Object(x.jsx)("button",{type:"button",class:"btn btn-danger",children:"Not accepted"}),Object(x.jsx)("button",{type:"button",class:"btn btn-danger dropdown-toggle dropdown-toggle-split","data-bs-toggle":"dropdown","aria-expanded":"false",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Toggle Dropdown"})}),Object(x.jsxs)("ul",{class:"dropdown-menu",children:[Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Another action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Something else here"})}),Object(x.jsx)("li",{children:Object(x.jsx)("hr",{class:"dropdown-divider"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Separated link"})})]})]})}),Object(x.jsx)("td",{children:Object(x.jsxs)("div",{class:"dropdown",children:[Object(x.jsx)("button",{class:"btn btn-primary dropdown-toggle",type:"button",id:"dropdownMenuButton1","data-bs-toggle":"dropdown","aria-expanded":"false",children:"Actions"}),Object(x.jsxs)("ul",{class:"dropdown-menu","aria-labelledby":"dropdownMenuButton1",children:[Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Approve"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Another action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("hr",{class:"dropdown-divider"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Delete"})})]})]})})]},this.props.member.id)}}]),s}(n.a.Component),m=(s(148),function(e){Object(a.a)(s,e);var t=Object(o.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).state={memberList:null},c}return Object(d.a)(s,[{key:"componentDidMount",value:function(){var e,t=this;e=function(e){console.log(e),t.setState({memberList:e})},localStorage.token&&O.a.ajax({type:"GET",url:"https://sv-communityadvocates.org/api/react/members/",headers:{Authorization:"token "+localStorage.token},success:function(t){e(t)},error:function(){alert("Get members fail")}})}},{key:"model",value:function(){return Object(x.jsx)("div",{class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:Object(x.jsx)("div",{class:"modal-dialog",children:Object(x.jsxs)("div",{class:"modal-content",children:[Object(x.jsxs)("div",{class:"modal-header",children:[Object(x.jsx)("h5",{class:"modal-title",id:"exampleModalLabel",children:"Modal title"}),Object(x.jsx)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(x.jsx)("div",{class:"modal-body",children:"..."}),Object(x.jsxs)("div",{class:"modal-footer",children:[Object(x.jsx)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close"}),Object(x.jsx)("button",{type:"button",class:"btn btn-primary",children:"Save changes"})]})]})})})}},{key:"render",value:function(){return null==this.state.memberList?Object(x.jsx)("div",{class:"spinner-border text-primary",role:"status",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Loading..."})}):Object(x.jsx)("div",{style:{padding:30,overflowX:"scroll"},children:Object(x.jsxs)("table",{class:"table table-hover custom-table",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"ID"}),Object(x.jsx)("th",{children:"Name"}),Object(x.jsx)("th",{children:"Contact Name"}),Object(x.jsx)("th",{children:"Phone"}),Object(x.jsx)("th",{children:"Email"}),Object(x.jsx)("th",{children:"Contact Type"}),Object(x.jsx)("th",{children:"Location Type"}),Object(x.jsx)("th",{children:"Member Type"}),Object(x.jsx)("th",{children:"Accepted"}),Object(x.jsx)("th",{children:"Action"})]})}),Object(x.jsx)("tbody",{children:this.state.memberList.map((function(e){return Object(x.jsx)(u,{member:e})}))})]})})}}]),s}(n.a.Component)),g=function(e){Object(a.a)(s,e);var t=Object(o.a)(s);function s(e){return Object(i.a)(this,s),t.call(this,e)}return Object(d.a)(s,[{key:"render",value:function(){return null==this.props.need?Object(x.jsx)("div",{class:"spinner-border text-primary",role:"status",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Loading..."})}):Object(x.jsxs)("tr",{className:"shadow-sm custom-row",onClick:"window.location='./need?id="+this.props.id+"';",children:[Object(x.jsx)("td",{children:this.props.need.id}),Object(x.jsx)("td",{children:this.props.need.first_name}),Object(x.jsx)("td",{children:this.props.need.last_name}),Object(x.jsx)("td",{children:this.props.need.phone}),Object(x.jsx)("td",{children:this.props.need.email}),Object(x.jsx)("td",{children:this.props.need.contact_reference}),Object(x.jsx)("td",{children:this.props.need.gender}),Object(x.jsx)("td",{children:this.props.need.language}),Object(x.jsx)("td",{children:this.props.need.vulnerable_groups.length+" groups"}),Object(x.jsx)("td",{children:this.props.need.needs}),Object(x.jsx)("td",{children:Object(x.jsxs)("div",{class:"btn-group",children:[Object(x.jsx)("a",{class:"btn btn-primary",href:"./need?id="+this.props.need.id,role:"button",children:"Detail"}),Object(x.jsx)("button",{type:"button",class:"btn btn-primary dropdown-toggle dropdown-toggle-split","data-bs-toggle":"dropdown","aria-expanded":"false",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Toggle Dropdown"})}),Object(x.jsxs)("ul",{class:"dropdown-menu",children:[Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Another action"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Something else here"})}),Object(x.jsx)("li",{children:Object(x.jsx)("hr",{class:"dropdown-divider"})}),Object(x.jsx)("li",{children:Object(x.jsx)("a",{class:"dropdown-item",href:"#",children:"Separated link"})})]})]})})]},this.props.need.id)}}]),s}(n.a.Component),f=function(e){Object(a.a)(s,e);var t=Object(o.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).state={needList:null},c}return Object(d.a)(s,[{key:"componentDidMount",value:function(){var e,t=this;e=function(e){console.log(e),t.setState({memberList:e})},localStorage.token&&O.a.ajax({type:"GET",url:"https://sv-communityadvocates.org/api/react/needs-summary/",headers:{Authorization:"token "+localStorage.token},success:function(t){e(t)},error:function(){alert("Get members fail")}})}},{key:"render",value:function(){return null==this.state.memberList?Object(x.jsx)("div",{class:"spinner-border text-primary",role:"status",children:Object(x.jsx)("span",{class:"visually-hidden",children:"Loading..."})}):Object(x.jsx)("div",{style:{padding:30,overflowX:"scroll"},children:Object(x.jsxs)("table",{class:"table table-hover custom-table",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"ID"}),Object(x.jsx)("th",{children:"First name"}),Object(x.jsx)("th",{children:"Last Name"}),Object(x.jsx)("th",{children:"Phone"}),Object(x.jsx)("th",{children:"Email"}),Object(x.jsx)("th",{children:"Contact Preference"}),Object(x.jsx)("th",{children:"Gender"}),Object(x.jsx)("th",{children:"Primary Language"}),Object(x.jsx)("th",{children:"Vulnerable?"}),Object(x.jsx)("th",{children:"Needs"}),Object(x.jsx)("th",{children:"Action"})]})}),Object(x.jsx)("tbody",{children:this.state.memberList.map((function(e){return Object(x.jsx)(g,{need:e})}))})]})})}}]),s}(n.a.Component),v=s(165),y=s(169),w=s.n(y),k=v.a.Content,L=v.a.Sider,S=function(e){Object(a.a)(s,e);var t=Object(o.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).toggle=function(){c.setState({collapsed:!c.state.collapsed})},c.state={username:null,firstname:null,groups:[],collapsed:!0},Object(h.getLogin)((function(e){console.log(e),c.setState({username:e.username,firstname:e.first_name,groups:e.groups})})),c}return Object(d.a)(s,[{key:"render",value:function(){var e=this;return Object(x.jsx)("div",{className:"App",children:Object(x.jsxs)(v.a,{style:{minHeight:"100vh"},children:[Object(x.jsx)(b.a,{siteName:"SVCA",username:this.state.username}),Object(x.jsxs)(v.a,{children:[Object(x.jsx)(L,{theme:"light",trigger:null,collapsible:!0,collapsed:this.state.collapsed,children:Object(x.jsx)(w.a,{permission_groups:this.state.groups,selected:"1",collapsed:this.state.collapsed,toggle:function(){return e.toggle()}})}),Object(x.jsx)(v.a,{className:"site-layout",style:{background:"white"},children:Object(x.jsxs)(k,{className:"site-layout-background",children:[Object(x.jsxs)("h1",{children:["Hello ",this.state.firstname]}),Object(x.jsx)("div",{className:"container",children:Object(x.jsx)("div",{class:"accordion accordion-flush",id:"accordionExample",children:Object(x.jsxs)("div",{class:"accordion-item",children:[Object(x.jsx)("h2",{class:"accordion-header",id:"headingOne",children:Object(x.jsx)("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseOne","aria-expanded":"false","aria-controls":"collapseOne",children:"Member list"})}),Object(x.jsx)("div",{id:"collapseOne",class:"accordion-collapse collapse","aria-labelledby":"headingOne",children:Object(x.jsx)("div",{class:"accordion-body",children:Object(x.jsx)(m,{})})})]})})}),Object(x.jsx)("div",{className:"container",children:Object(x.jsx)("div",{class:"accordion accordion-flush",id:"accordionExample",children:Object(x.jsxs)("div",{class:"accordion-item",children:[Object(x.jsx)("h2",{class:"accordion-header",id:"headingOne",children:Object(x.jsx)("button",{class:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseNeed","aria-expanded":"true","aria-controls":"collapseNeed",children:"Needs list"})}),Object(x.jsx)("div",{id:"collapseNeed",class:"accordion-collapse collapse show","aria-labelledby":"headingOne",children:Object(x.jsx)("div",{class:"accordion-body",children:Object(x.jsx)(f,{})})})]})})})]})})]})]})})}}]),s}(n.a.Component);var A=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,283)).then((function(t){var s=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,l=t.getTTFB;s(e),c(e),n(e),r(e),l(e)}))};l.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(S,{})}),document.getElementById("root")),A()}},[[279,1,2]]]);
//# sourceMappingURL=main.0f404c3d.chunk.js.map