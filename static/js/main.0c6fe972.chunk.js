(this["webpackJsonp@meetingmaker/pdfwriter-example"]=this["webpackJsonp@meetingmaker/pdfwriter-example"]||[]).push([[0],{184:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(51),i=n.n(o),s=(n(66),n(5)),l=n.n(s),c=n(52),u=n(53),d=n(54),h=n(59),p=n(55),f=n(60),m=n(56),v=n(27),b=n.n(v),y=n(58),g=n.n(y);function x(e,t,n,a,r,o,i){try{var s=e[o](i),l=s.value}catch(c){return void n(c)}s.done?t(l):Promise.resolve(l).then(a,r)}function w(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function k(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function B(e,t){var n,a=0,r=e.substr(a,t-a);a=t+3;var o=e.indexOf("</b>",a);return o>a?(n=e.substr(a,o-a),a=o+3):(n=e.substr(a),a=e.length),a<0&&(a=0),{n:a,normalText:r,boldText:n}}function C(e,t){var n=0,a=e.substr(n,t-n),r={text:"",font:"n"},o=e.indexOf("</span>",t);if(o>t){var i=e.substr(t,o+6-n);n=o+6;var s=document.createElement("div");s.innerHTML=i,s.firstChild&&s.firstChild.style&&void 0!==s.firstChild.style&&(void 0!==s.firstChild.style.color&&(r.color=function(e){return"#"+e.split(",").map((function(e){return(0|e.replace(/\D/g,"")).toString(16)})).map((function(e){return e.length<2?"0"+e:e})).join("")}(s.firstChild.style.color)),"bold"===s.firstChild.style.fontWeight&&(r.font="b")),r.text=s.firstChild.innerText}else r.text=e.substr(n),n=e.length;return n<0&&(n=0),{i:n,normalText:a,span:r}}var T=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;w(this,e),this.host="https://nclong87.github.io",this.path="/pdfwriter",this.data=[],this.options=t}var t,n,a;return t=e,(n=[{key:"setHost",value:function(e){this.host=e}},{key:"setPath",value:function(e){this.path=e}},{key:"addPage",value:function(e){this.data.push({type:"addPage",item:{options:e}})}},{key:"moveUp",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.data.push({type:"move",item:{direction:"up",value:e}})}},{key:"moveDown",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.data.push({type:"move",item:{direction:"down",value:e}})}},{key:"addIcon",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.data.push({type:"icon",item:{icon:e,style:t,options:n}})}},{key:"addImage",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.data.push({type:"image",item:{image:e,options:t}})}},{key:"addText",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=b()(e,"<br/>","<br>");r=b()(e,"<br></b>","</b><br>"),g()(r,"<br>").forEach((function(e){if(0!==e.length){for(var r=[],o=0,i=0;i<e.length&&!(o>30);i++){o+=1;var s=e.substr(i),l=/(<span|<b>)/g.exec(s);if(l){if(l[0].includes("<b>")){var c=B(s,l.index),u=c.normalText,d=c.boldText;i+=c.n,u&&r.push({text:u,type:"n"}),d&&r.push({text:d,type:"b"})}else if(l[0].includes("<span")){var h=C(s,l.index);i+=h.i;var p=h.normalText,f=h.span,m=f.text,v=f.font,b=f.color;p&&r.push({text:p,type:"n"}),m&&r.push({text:m,type:v,color:b})}}else i=e.length,r.push({text:s,type:"n"})}1===r.length&&"n"===r[0].type?t.data.push({type:"text",item:{text:r[0].text,style:n,options:a}}):t.data.push({type:"formatted-text",item:{text:r,style:n,options:a}})}else t.data.push({type:"text",item:{text:" ",style:n,options:a}})}))}},{key:"output",value:function(){var e=this.host,t=this.path;this.iframe=document.createElement("iframe"),this.iframe.style="border:0 ;position: fixed;left: 0;top: 0;z-index: 9999;cursor: wait;background-color: #fff;opacity: 0.5;",this.iframe.width="100%",this.iframe.height="100%",this.iframe.src="".concat(e).concat(t),document.body.appendChild(this.iframe);var n=this;return new Promise((function(e){window.addEventListener("message",(function t(a){if(a.data&&a.data.type)if("ready"===a.data.type){var r={data:n.data,options:n.options};n.iframe.contentWindow.postMessage(r,"*")}else"finish"===a.data.type&&(e(a.data.data),document.body.removeChild(n.iframe),window.removeEventListener("message",t,!1))}))})).catch((function(e){return console.log("ERROR",e),null}))}},{key:"save",value:function(){var e,t=(e=l.a.mark((function e(){var t,n,a,r,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:null,e.next=3,this.output();case 3:n=e.sent,a=window.URL.createObjectURL(n),r=document.createElement("a"),document.body.appendChild(r),r.style="display: none",r.href=a,r.download=t||"untitled.pdf",r.click(),window.URL.revokeObjectURL(a);case 12:case"end":return e.stop()}}),e,this)})),function(){var t=this,n=arguments;return new Promise((function(a,r){var o=e.apply(t,n);function i(e){x(o,a,r,i,s,"next",e)}function s(e){x(o,a,r,i,s,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}()}])&&k(t.prototype,n),a&&k(t,a),e}(),E=n(183);function O(){return Math.floor(100*Math.random())}var R={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Dataset 1",backgroundColor:"rgba(255, 99, 132, 0.5)",borderColor:"rgb(255, 99, 132)",borderWidth:1,data:[O(),O(),O(),O(),O(),O(),O()]},{label:"Dataset 2",backgroundColor:"rgba(255, 159, 64, 0.5)",borderColor:"rgb(255, 159, 64)",borderWidth:1,data:[O(),O(),O(),O(),O(),O(),O()]}]},j={padding:Object.assign({left:0,right:0,top:0,bottom:0})},L="3. <b>Consultation Services</b>: The Recruitment team provides <b>consultation on </b>new and replacement positions - hiring  \u2013  process, salary<b> range, </b> hehehe<br><br>   <b>availability, possible</b> challenges/risks and strategies <br>to close the roles.",M="The man who knows his worth respects his fellow man because he respects himself first. He does not boast; is not self-seeking; nor does he force his personal opinion on others.",P='<span style="color: #FF6347;font-weight: bold;">#</span> What website or app has completely changed your life for better or for worse?',D=function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"onClick",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new T({defaultFontSize:11,defaultColor:"#222222"}),e.prev=1,t.addText(L,{fontSize:12,color:"#BBBBBB"}),t.addText(" "),t.addIcon("\uf10d",{color:"#BBBBBB"}),t.moveUp(),t.addText(M,null,{indent:16}),t.addText(" "),t.addText(P),t.addText(" "),e.next=12,E(this.chart);case 12:n=e.sent,a=n.toDataURL(),t.addImage(a),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),console.log("ERROR",e.t0);case 20:return e.next=22,t.save("test.pdf");case 22:case"end":return e.stop()}}),e,this,[[1,17]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{display:"flex",margin:"auto",flexDirection:"column",maxWidth:700}},r.a.createElement("p",{style:{color:"#BBBBBB"},dangerouslySetInnerHTML:{__html:L}}),r.a.createElement("p",null,r.a.createElement("i",{style:{paddingRight:6,color:"#BBBBBB"},className:"fas fa-quote-left"}),M),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:P}}),r.a.createElement("div",{ref:function(t){e.chart=t||e.chart},style:{display:"flex",flex:1,maxHeight:400,marginBottom:50}},r.a.createElement(m.a,{data:R,height:300,options:{cornerRadius:0,layout:j,maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[Object.assign({barThickness:40,gridLines:{display:!1,offsetGridLines:!1},stacked:!0})],yAxes:[Object.assign({barPercentage:.9,categoryPercentage:.55,ticks:{suggestedMin:0,suggestedMax:100,callback:function(e){return e%1===0?e:null}}})]}}})),r.a.createElement("button",{onClick:function(){return e.onClick()}},"Download PDF"))}}]),t}(a.Component);i.a.render(r.a.createElement(D,null),document.getElementById("root"))},61:function(e,t,n){e.exports=n(184)},66:function(e,t,n){}},[[61,1,2]]]);
//# sourceMappingURL=main.0c6fe972.chunk.js.map