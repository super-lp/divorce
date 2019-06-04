define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
a.invoke("imagePreview",{
current:e,
urls:t
},function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),n("[Appmsg] click image, src: "+e);
}
function i(e){
var i=[],a=e.container,n=e.imgs||[];
if(a)for(var p=a.getElementsByTagName("img")||[],o=0,m=p.length;m>o;o++)n.push(p.item(o));
for(var o=0,m=n.length;m>o;o++){
var c=n[o],d=c.getAttribute("data-src")||c.getAttribute("src"),g=c.getAttribute("data-type");
if(d&&!d.isGif()){
for(;-1!=d.indexOf("?tp=webp");)d=d.replace("?tp=webp","");
c.dataset&&c.dataset.s&&d.isCDN()&&(d=d.replace(/\/640$/,"/0"),d=d.replace(/\/640\?/,"/0?")),
d.isCDN()&&(d=r.addParam(d,"wxfrom","3",!0)),e.is_https_res&&(d=d.http2https()),
g&&(d=r.addParam(d,"wxtype",g,!0)),i.push(d),function(e){
s.on(c,"click",function(){
return t(e,i),!1;
});
}(d);
}
}
}
var s=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),r=e("biz_common/utils/url/parse.js"),n=e("appmsg/log.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(e,o,n,i){
"use strict";
document.domain="qq.com";
var t=window.__moon_report||function(){},d=8,r={
ready:function(e){
var o=function(){
try{
e&&e();
}catch(o){
throw t([{
offset:d,
log:"ready",
e:o
}]),o;
}
};
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?o():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",o,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",o),
top.window.document.attachEvent("onWeixinJSBridgeReady",o));
},
invoke:function(e,o,n){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(i("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,o,function(o){
try{
if(n){
n.apply(window,arguments);
var i=o&&o.err_msg?", err_msg-> "+o.err_msg:"";
console.info("[jsapi] invoke->"+e+i);
}
}catch(r){
throw t([{
offset:d,
log:"invoke;methodName:"+e,
e:r
}]),r;
}
});
});
},
call:function(e){
this.ready(function(){
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(o){
throw t([{
offset:d,
log:"call;methodName:"+e,
e:o
}]),o;
}
});
},
on:function(e,o){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(e,function(){
try{
o&&o.apply(window,arguments);
}catch(n){
throw t([{
offset:d,
log:"on;eventName:"+e,
e:n
}]),n;
}
}):!1;
});
}
};
return r;
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(t){
"use strict";
function o(t){
var o=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",t.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(o+="&from=sougou");
var e=new Image;
e.src=o.substr(0,1024);
}
function e(){
var t=__appmsgCgiData;
if("2"==t.copyright_stat){
for(var o=r("copyright_info"),e=r("js_article");o&&e!==o;)c.copyright_top+=o.offsetTop,
o=o.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var t=window.pageYOffset||document.documentElement.scrollTop;
t+c.innerHeight>c.copyright_top&&(o({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(t){
return document.getElementById(t);
}
var i=t("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:o,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","pages/version4video.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e){
"use strict";
function t(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,n=window.__appmsgCgiData.copyright_stat,r=window.__appmsgCgiData.source_biz,a=0,o=i.length;o>a;a++){
var s=i[a];
if(2==s.type){
if(2==n&&r==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var m=document.getElementsByTagName("img"),a=0,o=m.length;o>a;a++){
var s=m[a],c=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[c]){
var p=document.createElement("div");
p.innerHTML=f.tmpl(d,t[c]);
{
var l=p.children[0],g=s.parentNode,w=g.insertBefore(l,s),u=w.children[0];
(function(e,t){
_.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(h.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[c],u);
}
w.insertBefore(s,u);
}
}
}
}
function i(e){
if(k&&k.length>0)for(var t,i,n,r=0,a=k.length;a>r;++r)t=k[r],i=t.iframe,n=t.src,
e&&(n=n.replace(/\&encryptVer=[^\&]*/gi,""),n=n.replace(/\&platform=[^\&]*/gi,""),
n=n.replace(/\&cKey=[^\&]*/gi,""),n=n+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",n);
}
function n(t){
var i=t.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=i),i.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",i.liked=window.is_temp_url?window.liked:i.liked,
i.liked&&u.addClass(t,"praised"),t.setAttribute("like",i.liked?"1":"0");
var n=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:i.read_num,o=window.is_temp_url?window.like_num:i.like_num;
a||(a=1),o||(o="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(o)>1e5?o="100000+":"",
r&&(r.innerHTML=a),n&&(n.innerHTML=o);
}(),e("appmsg/like.js")),1==t.comment_enabled&&(window.can_fans_comment_only=t.only_fans_can_comment,
e("appmsg/comment.js")),-1==p.indexOf("WindowsWechat")&&-1!=p.indexOf("MicroMessenger")&&t.reward&&(s=e("appmsg/reward_entry.js"),
s.handle(t.reward,a()));
}
function r(){
var r="";
k&&k.length>0&&(r="&is_need_ticket=1");
var o=b.checkNeedAds(),s=o.is_need_ad,m=(o._adInfo,o.both_ad),d=-1!=location.href.indexOf("&mock_ad=1");
d&&(o.is_need_ad=s=1),y("[Appmsg] start get asycn data, is_need_ad:"+s),w({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&abtest_cookie="+abtest_cookie+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+r+"&is_need_ad="+s+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+m+"&reward_uin_count="+(is_need_reward?3*a():0)+(window.send_time?"&send_time="+send_time:"")+"&msg_daily_idx="+msg_daily_idx,
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:v,
async:!0,
success:function(r){
if(y("[Appmsg] success get async data"),r)try{
if(d){
r.advertisement_num=1;
var a=e("a/testdata.js");
r.advertisement_info=a.data;
}
if(r&&r.base_resp&&r.base_resp.wxtoken&&(window.wxtoken=r.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
i(r.appmsgticket?r.appmsgticket.ticket:""),t(r),r.ret)return;
b.afterGetAdData(o,r),window.wx_user_can_reward=r.user_can_reward,n({
appmsgstat:r.appmsgstat,
comment_enabled:r.comment_enabled,
only_fans_can_comment:r.only_fans_can_comment,
reward:{
reward_total:r.reward_total_count,
reward_head_imgs:r.reward_head_imgs||[],
can_reward:r.can_reward,
timestamp:r.timestamp
}
});
}catch(s){
y("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var m=new Image;
return m.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(s.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(s));
}
},
error:function(){
y("[Appmsg] error get async data, biz="+biz+", mid="+mid);
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function a(){
return _.on(window,"resize",function(){
o(),s&&s.render(a());
}),o();
}
function o(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var n=30,r=34,o=Math.floor(.9*(e-n)/r);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=o*r+"px"),
a=function(){
return o;
},o;
}
e("biz_common/utils/string/html.js");
var s,m,d=e("appmsg/img_copyright_tpl.html.js"),c=!1,p=navigator.userAgent,l=-1!=p.indexOf("MicroMessenger"),_=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),g=200,w=e("biz_wap/utils/ajax.js"),u=e("biz_common/dom/class.js"),h=e("biz_wap/jsapi/core.js"),f=e("biz_common/tmpl.js"),y=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),v=e("rt/appmsg/getappmsgext.rt.js"),b=e("a/a.js"),j=document.getElementsByTagName("iframe"),x=document.getElementById("js_content"),k=[],z=x.offsetWidth,q=3*z/4;
window.logs.video_cnt=0;
for(var O=0,I=j.length;I>O;++O){
m=j[O];
var A=m.getAttribute("data-src")||"",E=m.getAttribute("src")||A;
if(E){
var B=e("pages/version4video.js");
if(!B.isShowMpVideo()&&(0==E.indexOf("http://v.qq.com/iframe/player.html")||0==E.indexOf("https://v.qq.com/iframe/player.html")||0==E.indexOf("http://v.qq.com/iframe/preview.html")||0==E.indexOf("https://v.qq.com/iframe/preview.html"))||0==E.indexOf("http://z.weishi.com/weixin/player.html")){
-1==E.indexOf("http://z.weishi.com/weixin/player.html")&&-1==A.indexOf("http://z.weixin.com/weixin/player.html")&&(A=A.replace(/^https:/,location.protocol),
A=A.replace(/^http:/,location.protocol),A=A.replace(/preview.html/,"player.html"),
E=E.replace(/^https:/,location.protocol),E=E.replace(/^http:/,location.protocol),
E=E.replace(/preview.html/,"player.html")),E=E.replace(/width=\d+/g,"width="+z),
E=E.replace(/height=\d+/g,"height="+q),l&&(0==E.indexOf("http://v.qq.com/iframe/player.html")||0==E.indexOf("https://v.qq.com/iframe/player.html"))||l&&(0==E.indexOf("http://v.qq.com/iframe/preview.html")||0==E.indexOf("https://v.qq.com/iframe/preview.html"))?k.push({
iframe:m,
src:E
}):m.setAttribute("src",E),m.width=z,m.height=q,m.style.setProperty&&(m.style.setProperty("width",z+"px","important"),
m.style.setProperty("height",q+"px","important")),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;
continue;
}
}
}
var M=document.getElementById("js_toobar3"),W=window.innerHeight||document.documentElement.clientHeight,T=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=M.offsetTop;
e+W+g>=t&&(r(),_.off(window,"scroll",T));
};
c?(_.on(window,"scroll",T),T()):r();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,r=0;
if("wifi"==window.networkType){
var m={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(m=this.lazyloadHeightWhenWifi()),n=Math.max(m.bottom*e,n),
r=Math.max(m.top*e,r);
}
for(var l=+new Date,c=[],u=this.sw,f=this,g=-1,p=0,w=t.length;w>p;p++)!function(t,e){
var m=t.el.offsetTop,l=t.src;
if(l){
(l.match(/\:\/\/[^\/]+\/mmbiz\//)&&l.indexOf("wx_fmt=gif")>-1||l.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&g++;
var f=r,p=n;
(l.match(/\:\/\/[^\/]+\/mmbiz\//)&&l.indexOf("wx_fmt=gif")>-1||l.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&d&&(f=0,
p=20),!t.show&&(i>=m&&i<=m+t.height+f||m>i&&i+o+p>m)&&(e.inImgRead&&(i>=m&&i<=m+t.height||m>i&&i+o>m)&&e.inImgRead(l,networkType),
e.changeSrc&&(l=e.changeSrc(t.el,l,g)),t.el.onerror=function(){
var t=this;
!!e.onerror&&e.onerror(l,t);
},t.el.onload=function(){
var t=this;
h(t,"height","auto","important"),t.getAttribute("_width")?h(t,"width",t.getAttribute("_width"),"important"):h(t,"width","auto","important"),
!!e.onload&&e.onload(l,t);
},s(t.el,"src",l),c.push(l),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>u&&(t.el.width=u);
}
}(t[p],f);
c.length>0&&this.detect&&this.detect({
time:l,
loadList:c,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,r=0,m=this.imgOccupied||!1;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var c=0,d=t.length;d>c;c++){
var u=t.item(c),f=s(u,n),g=s(u,"src");
if(f&&!(g&&g.indexOf("data:image/png;base64")<0)){
var p=100;
if(u.dataset&&u.dataset.ratio){
var w=1*u.dataset.ratio,b=1*u.dataset.w||a;
"number"==typeof w&&w>0?(b=a>=b?b:a,p=b*w,m||(u.style.width&&u.setAttribute("_width",u.style.width),
h(u,"width",b+"px","important"),h(u,"visibility","visible","important"),u.setAttribute("src",l))):h(u,"visibility","hidden","important");
}else h(u,"visibility","hidden","important");
m||h(u,"height",p+"px","important"),e.push({
el:u,
src:f,
height:p,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
r.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),r.on(document,"touchmove",function(i){
o.call(t,i);
}),o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),r=t("biz_common/dom/event.js"),m=t("biz_common/dom/attr.js"),s=m.attr,h=m.setProperty,l=t("biz_common/ui/imgonepx.js"),c=new Date,d=(c.getHours(),
!0);
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="",o="";
try{
""!=tid&&(o="tid="+tid+"&aid=54");
var t=e.split("?")[1]||"";
if(t=t.split("#")[0],""==t);else{
var m=[t,"mpshare=1","scene="+i,"srcid="+srcid];
""!=o&&m.push(o),t=m.join("&"),n=e.split("?")[0]+"?"+t+"#"+(e.split("#")[1]||"");
}
}catch(s){
n="";
}
return n||(n=location.href+"#wechat_redirect",(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_47_1&lc=1&log0=[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"),
n;
}
function n(e,i,n){
var o=e.split("?").pop();
if(o=o.split("#").shift(),""!=o){
var t=[o,"action=share","action_type="+n,"scene="+window.source,"req_id="+(window.req_id||""),"vid="+("undefined"!=typeof window.reportVid?window.reportVid.join(";"):""),"musicid="+("undefined"!=typeof window.reportMid?window.reportMid.join(";"):""),"voiceid="+("undefined"!=typeof window.reportVoiceid?window.reportVoiceid.join(";"):"")].join("&");
s({
url:"/mp/appmsgreport",
type:"POST",
data:t
});
}
}
function o(e,i){
return e.isCDN()&&(e=t.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var t=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),m=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/utils/ajax.js"),r=e("biz_wap/jsapi/core.js");
r.call("hideToolbar"),r.call("showOptionMenu");
var a=msg_title.htmlDecode(),c=(msg_source_url.htmlDecode(),""),l=msg_cdn_url||ori_head_img_url||round_head_img,d=msg_link.htmlDecode(),a=msg_title.htmlDecode(),u=msg_desc.htmlDecode();
u=u||d,u=u.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(u=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
l.isCDN()&&(l=l.replace(/\/0$/,"/300"),l=l.replace(/\/0\?/,"/300?")),"1"==is_limit_user&&r.call("hideOptionMenu"),
window.is_temp_url&&r.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),r.on("menu:share:appmessage",function(e){
var t=1,m=o(l,"1");
e&&"favorite"==e.scene&&(t=24,m=o(l,"4")),r.invoke("sendAppMessage",{
appid:c,
img_url:m,
img_width:"640",
img_height:"640",
link:i(d,t),
desc:u,
title:a
},function(){
n(d,fakeid,t);
});
}),r.on("menu:share:timeline",function(){
var e=l;
m.isIOS||(e=o(l,"2")),n(d,fakeid,2),r.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(d,2),
desc:u,
title:a
},function(){});
});
r.on("menu:share:weiboApp",function(){
r.invoke("shareWeiboApp",{
img_url:l,
link:i(d,3),
title:a
},function(){
n(d,fakeid,3);
});
}),r.on("menu:share:facebook",function(){
n(d,fakeid,4),r.invoke("shareFB",{
img_url:l,
img_width:"640",
img_height:"640",
link:i(d,4),
desc:u,
title:a
},function(){});
}),r.on("menu:share:QZone",function(){
var e=o(l,"6");
n(d,fakeid,5),r.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(d,22),
desc:u,
title:a
},function(){});
}),r.on("menu:share:qq",function(){
var e=o(l,"7");
n(d,fakeid,5),r.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(d,23),
desc:u,
title:a
},function(){});
}),r.on("menu:share:email",function(){
n(d,fakeid,5),r.invoke("sendEmail",{
content:i(d,5),
title:a
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},String.prototype.https2http=function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
},String.prototype.nogif=function(){
var n=this.toString();
return t(n)?n.replace("/0?","/s640?").replace("wx_fmt=gif",""):n;
},String.prototype.isGif=function(){
var n=this.toString();
return t(n);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":n(p)?"png":i(p)?"jpg":"unknow";
};
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n){
var t=r(e),a=t.query_str,i=[];
for(var s in n)n.hasOwnProperty(s)&&i.push(s+"="+encodeURIComponent(n[s]));
return i.length>0&&(a+=(""!=a?"&":"")+i.join("&")),t.host+(""!=a?"?"+a:"")+(""!=t.hash?"#"+t.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
return{
parseUrl:r,
join:e,
addParam:n
};
});;define('page/appmsg/not_in_mm.css', [], function(require, exports, module) {
	return ".rich_media_meta_list{position:relative;z-index:1}.rich_media_content{position:relative}.profile_container{width:535px;position:absolute;top:100%;left:65px;font-size:14px;*margin-top:10px}.profile_inner{position:relative;padding:30px 22px 36px 144px;background-color:#fff;border:1px solid #d9dadc;*zoom:1}.profile_arrow_wrp{position:absolute;left:22px;top:-8px}.profile_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#d9dadc;border-bottom-style:solid;position:absolute;top:0}.profile_arrow.arrow_in{margin-top:1px;border-bottom-color:#fff}.profile_avatar{position:absolute;width:100px;left:24px;top:24px;height:100px!important}.profile_nickname{font-size:16px;font-weight:400}.profile_meta{margin-top:5px;overflow:hidden;*zoom:1}.profile_meta_label{float:left;width:4em;margin-right:1em}.profile_meta_value{display:block;overflow:hidden;*zoom:1;color:#adadad}.icon_verify{width:16px;height:16px;vertical-align:middle;display:inline-block;line-height:9em;overflow:hidden}.icon_verify.success{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/wxverify\/icon_verify_success238f07.png) no-repeat 0 0}.not_in_mm span.rich_media_meta_nickname{display:inline-block}.not_in_mm a.rich_media_meta_nickname{display:none}.not_in_mm .rich_media_inner{position:relative}.not_in_mm .qr_code_pc_outer{display:none!important;position:fixed;left:0;right:0;top:20px;color:#717375;text-align:center}.not_in_mm .qr_code_pc_inner{position:relative;width:740px;margin-left:auto;margin-right:auto}.not_in_mm .qr_code_pc{position:absolute;right:-140px;top:0;width:140px;padding:16px;border:1px solid #d9dadc;background-color:#fff;word-wrap:break-word;word-break:break-all}.not_in_mm .qr_code_pc p{font-size:14px;line-height:20px}.not_in_mm .qr_code_pc_img{width:102px;height:102px}@media screen and (min-width:1025px){.not_in_mm .qr_code_pc_outer{display:block!important}}";
});;define('page/appmsg/page_mp_article_improve_combo.css', [], function(require, exports, module) {
	return ".selectTdClass{background-color:#edf5fa!important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd!important}table{margin-bottom:10px;border-collapse:collapse;display:table;width:100%!important}td,th{word-wrap:break-word;word-break:break-all;padding:5px 10px;border:1px solid #DDD}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center}th{border-top:2px solid #BBB;background:#f7f7f7}.ue-table-interlace-color-single{background-color:#fcfcfc}.ue-table-interlace-color-double{background-color:#f7faff}td p{margin:0;padding:0}.res_iframe{display:block;width:100%;background-color:transparent;border:0}.shopcard_iframe{margin:14px 0;height:95px}.vote_area{display:block;position:relative;margin:14px 0;white-space:normal!important}.vote_iframe{display:block;width:100%;height:100%;background-color:transparent;border:0}form{display:none!important}@media screen and (min-width:0\\0) and (min-resolution:72dpi){.rich_media_content table{table-layout:fixed!important}.rich_media_content td,.rich_media_content th{width:auto!important}}.tc{text-align:center}.tl{text-align:left}.tr{text-align:right}.tips_global{color:#8c8c8c}.rich_split_tips{margin:20px 0;min-height:24px}.rich_media_tool_tips{margin-bottom:8px}.rich_media_tool{overflow:hidden;padding-top:15px;line-height:32px}.rich_media_tool .meta_primary{float:left;margin-right:10px}.rich_media_tool .meta_extra{float:right;margin-left:10px}.rich_media_tool .meta_praise{margin-right:0;margin-left:8px}.media_tool_meta i{vertical-align:0;position:relative;top:1px;margin-right:3px}.meta_praise{-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;min-width:3.5em}.meta_praise .praise_num{display:inline-block;vertical-align:top}.icon_praise_gray{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp\/O+GkJHJd4H7kr5nm\/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil\/ENST20ml8BF4Afu4z9HT3V80B\/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS\/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9\/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq\/sQqSpmgWvo82rBbTdCPeAA4N69\/noXS1XhphaBz27SPPVtapz\/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko\/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA\/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8\/GsFi3mW\/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;width:13px;height:13px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto}.icon_praise_gray.praised{background-position:0 -18px}.praised .icon_praise_gray{background-position:0 -18px}.rich_tips{margin-top:25px;margin-bottom:0;min-height:24px;text-align:center}.rich_tips .tips{display:inline-block;vertical-align:middle}.rich_tips .tips,.rich_tips .rich_icon{vertical-align:middle}.rich_tips .rich_icon{margin-top:-3px 5px 0 0}.rich_tips.with_line{border-top:1px dotted #e1e1e1}.rich_tips.with_line .tips{position:relative;top:-12px;padding-left:16px;padding-right:16px;background-color:#f3f3f3}.rich_tips.with_line{line-height:16px}.rich_tips.with_line .tips{top:-11px;padding-left:.35em;padding-right:.35em}.title_tips .tips{color:#868686;font-size:16px}.loading_tips{margin:36px 0 20px}.title_bottom_tips{margin-top:-10px}.icon_arrow_gray{width:7px}.icon_loading_white{width:16px}.icon_loading_white.icon_before{margin-right:1em}.icon_loading_white.icon_after{margin-left:1em}.btn{display:block;padding-left:14px;padding-right:14px;font-size:18px;text-align:center;text-decoration:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;color:#fff;line-height:42px;-webkit-tap-highlight-color:rgba(255,255,255,0)}.btn.btn_inline{display:inline-block}.btn_primary{background-color:#04be02}.btn_primary:not(.btn_disabled):visited{color:#fff}.btn_primary:not(.btn_disabled):active{color:rgba(255,255,255,0.4);background-color:#039702}.btn_disabled{color:rgba(255,255,255,0.6)}.sougou_body .rich_media_area_primary{margin-top:10px}.sougou_body .rich_media_area_primary:first-child{margin-top:0}.sougou_body .rich_media_area_primary.sougou ul{padding-left:0;list-style-type:none}.sougou_body .rich_media_area_extra{margin-top:10px;background-color:#fff}.sougou_body .rich_media_area_title{font-size:16px;margin-bottom:.5em}.sougou_body .relate_article_list{font-size:15px}.sougou_body .relate_article_link{display:block;padding:.35em 0;color:#8c8c8c;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sougou_body .rich_tips.discuss_title_line{text-align:left;margin-top:0;padding:20px 0 .5em;border-width:0;line-height:1.6}.sougou_body .rich_tips.discuss_title_line .tips{position:static;padding:0;color:#3e3e3e}.sougou_body .rich_tips.with_line .tips{background-color:#fff}.sougou_body .rich_split_tips{margin:0;padding:20px 0}.sougou_body .rich_media_extra .loading_tips{margin:0;padding:20px 0}.emotion_tool{position:relative;overflow:hidden}.pic_emotion_switch_wrp{margin-left:15px;margin-bottom:6px;display:inline-block;font-size:0}.pic_emotion_switch_wrp img{width:35px;display:block}.pic_emotion_switch_wrp .pic_active{display:none}.pic_emotion_switch_wrp:active .pic_default{display:none}.pic_emotion_switch_wrp:active .pic_active{display:block}.emotion_switch{margin-left:15px;margin-bottom:6px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:35px;height:35px;vertical-align:middle;display:inline-block;-webkit-background-size:35px auto;background-size:35px auto}.emotion_switch:active{background-position:0 -40px}.emotion_panel_arrow_wrp{position:absolute;margin-top:-6px;margin-left:26px}.emotion_panel_arrow_wrp .emotion_panel_arrow{position:absolute;display:inline-block;width:0;height:0;border-width:6px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#e5e5e7;border-bottom-style:solid}.emotion_panel_arrow_wrp .arrow_in{border-bottom-color:#f6f6f8;top:1px}.emotion_panel{background-color:#f6f6f8;position:relative}.emotion_panel:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e3e3e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_panel:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e3e3e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.emotion_list_wrp{overflow:hidden;position:relative;font-size:0;white-space:nowrap}.emotion_list{padding:10px 15px 0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:normal;display:inline-block;vertical-align:top}.emotion_item{display:inline-block;width:36px;height:36px;margin-bottom:5px;text-align:center;line-height:36px}.emotion_navs{text-align:center;padding-bottom:5px}.emotion_nav{display:inline-block;width:8px;height:8px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;background-color:#bbb;margin:0 5px}.emotion_nav.current{background-color:#8c8c8c}.icon_emotion{width:22px;height:22px;vertical-align:middle;display:inline-block;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion.2x278965.png) no-repeat 0 0;-webkit-background-size:2520px auto;background-size:2520px auto}.icon_emotion.del{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/icon_emotion_tool.2x278965.png) no-repeat 0 0;width:28px;height:28px;vertical-align:middle;display:inline-block;background-position:2px -62px;-webkit-background-size:28px auto;background-size:28px auto}.icon_emotion.del:active{background-position:2px -92px}.icon_emotion_single{width:22px;height:22px;vertical-align:middle;display:inline-block;-webkit-background-size:22px auto;background-size:22px auto}.icon_emotion_single.icon1{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_01278965.png)}.icon_emotion_single.icon2{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_02278965.png)}.icon_emotion_single.icon3{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_03278965.png)}.icon_emotion_single.icon4{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_04278965.png)}.icon_emotion_single.icon5{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_05278965.png)}.icon_emotion_single.icon6{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_06278965.png)}.icon_emotion_single.icon7{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_07278965.png)}.icon_emotion_single.icon8{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_08278965.png)}.icon_emotion_single.icon9{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_09278965.png)}.icon_emotion_single.icon10{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_10278965.png)}.icon_emotion_single.icon11{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_11278965.png)}.icon_emotion_single.icon12{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_12278965.png)}.icon_emotion_single.icon13{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_13278965.png)}.icon_emotion_single.icon14{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_14278965.png)}.icon_emotion_single.icon15{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_15278965.png)}.icon_emotion_single.icon16{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_16278965.png)}.icon_emotion_single.icon17{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_17278965.png)}.icon_emotion_single.icon18{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_18278965.png)}.icon_emotion_single.icon19{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_19278965.png)}.icon_emotion_single.icon20{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_20278965.png)}.icon_emotion_single.icon21{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_21278965.png)}.icon_emotion_single.icon22{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_22278965.png)}.icon_emotion_single.icon23{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_23278965.png)}.icon_emotion_single.icon24{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_24278965.png)}.icon_emotion_single.icon25{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_25278965.png)}.icon_emotion_single.icon26{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_26278965.png)}.icon_emotion_single.icon27{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_27278965.png)}.icon_emotion_single.icon28{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_28278965.png)}.icon_emotion_single.icon29{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_29278965.png)}.icon_emotion_single.icon30{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_30278965.png)}.icon_emotion_single.icon31{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_31278965.png)}.icon_emotion_single.icon32{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_32278965.png)}.icon_emotion_single.icon33{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_33278965.png)}.icon_emotion_single.icon34{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_34278965.png)}.icon_emotion_single.icon35{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_35278965.png)}.icon_emotion_single.icon36{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_36278965.png)}.icon_emotion_single.icon37{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_37278965.png)}.icon_emotion_single.icon38{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_38278965.png)}.icon_emotion_single.icon39{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_39278965.png)}.icon_emotion_single.icon40{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_40278965.png)}.icon_emotion_single.icon41{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_41278965.png)}.icon_emotion_single.icon42{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_42278965.png)}.icon_emotion_single.icon43{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_43278965.png)}.icon_emotion_single.icon44{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_44278965.png)}.icon_emotion_single.icon45{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_45278965.png)}.icon_emotion_single.icon46{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_46278965.png)}.icon_emotion_single.icon47{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_47278965.png)}.icon_emotion_single.icon48{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_48278965.png)}.icon_emotion_single.icon49{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_49278965.png)}.icon_emotion_single.icon50{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_50278965.png)}.icon_emotion_single.icon51{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_51278965.png)}.icon_emotion_single.icon52{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_52278965.png)}.icon_emotion_single.icon53{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_53278965.png)}.icon_emotion_single.icon54{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_54278965.png)}.icon_emotion_single.icon55{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_55278965.png)}.icon_emotion_single.icon56{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_56278965.png)}.icon_emotion_single.icon57{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_57278965.png)}.icon_emotion_single.icon58{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_58278965.png)}.icon_emotion_single.icon59{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_59278965.png)}.icon_emotion_single.icon60{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_60278965.png)}.icon_emotion_single.icon61{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_61278965.png)}.icon_emotion_single.icon62{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_62278965.png)}.icon_emotion_single.icon63{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_63278965.png)}.icon_emotion_single.icon64{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_64278965.png)}.icon_emotion_single.icon65{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_65278965.png)}.icon_emotion_single.icon66{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_66278965.png)}.icon_emotion_single.icon67{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_67278965.png)}.icon_emotion_single.icon68{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_68278965.png)}.icon_emotion_single.icon69{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_69278965.png)}.icon_emotion_single.icon70{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_70278965.png)}.icon_emotion_single.icon71{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_71278965.png)}.icon_emotion_single.icon72{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_72278965.png)}.icon_emotion_single.icon73{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_73278965.png)}.icon_emotion_single.icon74{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_74278965.png)}.icon_emotion_single.icon75{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_75278965.png)}.icon_emotion_single.icon76{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_76278965.png)}.icon_emotion_single.icon77{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_77278965.png)}.icon_emotion_single.icon78{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_78278965.png)}.icon_emotion_single.icon79{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_79278965.png)}.icon_emotion_single.icon80{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_80278965.png)}.icon_emotion_single.icon81{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_81278965.png)}.icon_emotion_single.icon82{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_82278965.png)}.icon_emotion_single.icon83{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_83278965.png)}.icon_emotion_single.icon84{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_84278965.png)}.icon_emotion_single.icon85{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_85278965.png)}.icon_emotion_single.icon86{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_86278965.png)}.icon_emotion_single.icon87{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_87278965.png)}.icon_emotion_single.icon88{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_88278965.png)}.icon_emotion_single.icon89{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_89278965.png)}.icon_emotion_single.icon90{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_90278965.png)}.icon_emotion_single.icon91{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_91278965.png)}.icon_emotion_single.icon92{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_92278965.png)}.icon_emotion_single.icon93{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_93278965.png)}.icon_emotion_single.icon94{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_94278965.png)}.icon_emotion_single.icon95{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_95278965.png)}.icon_emotion_single.icon96{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_96278965.png)}.icon_emotion_single.icon97{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_97278965.png)}.icon_emotion_single.icon98{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_98278965.png)}.icon_emotion_single.icon99{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_99278965.png)}.icon_emotion_single.icon100{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_100278965.png)}.icon_emotion_single.icon101{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_101278965.png)}.icon_emotion_single.icon102{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_102278965.png)}.icon_emotion_single.icon103{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_103278965.png)}.icon_emotion_single.icon104{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_104278965.png)}.icon_emotion_single.icon105{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/emotion\/default-skin\/Expression@2x_105278965.png)}.wx_poptips{position:fixed;z-index:3;width:120px;min-height:120px;top:180px;left:50%;margin-left:-60px;background:rgba(40,40,40,0.5)!important;filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#80282828',endcolorstr = '#80282828');text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;color:#fff}.wx_poptips .icon_toast{width:53px;margin:15px 0 0}.wx_poptips .toast_content{margin:0 0 15px}.discuss_container .rich_media_title{font-size:18px}.discuss_container.disabled .btn_discuss{color:#60f05f}.discuss_container.access .discuss_container_inner{padding:15px 15px 0}.discuss_container.editing .discuss_container_inner{padding-bottom:25px}.discuss_container.editing .frm_textarea_box_wrp{margin:0 -15px}.discuss_container.editing .frm_textarea{height:78px;-webkit-overflow-scrolling:touch}.discuss_container.editing .frm_append.counter{display:block}.discuss_container.editing .discuss_btn_wrp{display:block}.discuss_container.editing .discuss_icon_tips{margin-top:0;margin-bottom:-14px}.discuss_container.editing .discuss_title_line{margin-bottom:-20px}.discuss_container.warning .counter{color:#e15f63}.frm_textarea{width:100%;background-color:transparent;border:0;display:block;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;height:37px;padding:10px 15px;resize:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.frm_textarea_box_wrp{position:relative}.frm_textarea_box_wrp:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:-1px}.frm_textarea_box_wrp:after{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.frm_textarea_box{display:block;background-color:#fff}.frm_append.counter{display:none;position:absolute;right:8px;bottom:8px;color:#a3a3a3;font-weight:400;font-style:normal;font-size:12px}.frm_append .current_num.warn{color:#f43631}.discuss_btn_wrp{display:none;margin-top:20px;margin-bottom:20px;text-align:right}.btn_discuss{padding-left:1.5em;padding-right:1.5em}.discuss_list{margin-top:-5px;padding-bottom:20px;font-size:16px}.discuss_item{position:relative;padding-left:45px;margin-top:26px;*zoom:1}.discuss_item:after{content:\"\\200B\";display:block;height:0;clear:both}.discuss_item .user_info{min-height:20px;overflow:hidden}.discuss_item .nickname{display:block;font-weight:400;font-style:normal;color:#727272;width:9em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.discuss_item .avatar{position:absolute;top:0;left:0;top:3px;width:35px;height:35px;background-color:#ccc;vertical-align:top;margin-top:0;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}.discuss_item .discuss_message{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;color:#3e3e3e;line-height:1.5}.discuss_item .discuss_extra_info{color:#8c8c8c;font-size:12px}.discuss_item .discuss_extra_info a{margin-left:.5em}.discuss_item .discuss_status{color:#ff7a21;white-space:nowrap}.discuss_item .discuss_status i{font-style:normal;margin-right:2px}.discuss_item .discuss_opr{float:right}.discuss_item .discuss_opr .meta_praise{display:inline-block;text-align:right;padding-top:5px;margin-top:-5px}.discuss_item .discuss_opr .praise_num{-webkit-user-select:none;user-select:none}.discuss_item .discuss_del{margin-left:.5em}.discuss_icon_tips{margin-bottom:20px}.discuss_icon_tips img{vertical-align:middle;margin-left:3px;margin-top:-4px}.discuss_icon_tips .icon_edit{width:12px}.discuss_icon_tips .icon_access{width:13px}.reply_result{position:relative;margin-top:.5em;padding-top:.5em;padding-left:.4em}.reply_result:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #dadada;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.reply_result .discuss_message{clear:both}.reply_result .nickname{position:relative;overflow:visible}.reply_result .nickname:before{content:\" \";position:absolute;left:-0.4em;top:50%;margin-top:-7px;width:3px;height:14px;background-color:#02bb00}.rich_tips.discuss_title_line{margin-top:50px}.reward_area{padding:38px 5% 20px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.reward_area_inner{margin:0 auto;position:relative;left:3px}.reward_access{display:inline-block;padding:0 1.6em;line-height:2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;background-color:#dc5d4a;color:#fff;font-size:16px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.reward_access:active{background-color:#be5041;color:#e69990}.reward_tips{margin-bottom:5px}.reward_user_tips{margin-top:1.4em}.reward_user_list{padding-top:.5em;overflow:hidden}.reward_user_avatar{display:inline-block;vertical-align:top;width:28px;height:28px;margin:0 6px 6px 0}.reward_user_avatar img{width:100%;height:100%!important}.reward_user_avatar.readmore{-webkit-tap-highlight-color:rgba(0,0,0,0)}.rich_media_extra{position:relative}.rich_media_extra .extra_link{display:block}.rich_media_extra img{vertical-align:middle;margin-top:-3px}.rich_media_extra .appmsg_banner{width:100%}.rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.mpda_bottom_container .rich_media_extra{padding-bottom:15px}.btn_default.btn_line,.btn_primary.btn_line{background-color:#fff;color:#04be02;border:1px solid #04be02;font-size:15px}.rich_media_extra .extra_link{position:relative}.promotion_tag{position:absolute;display:block;height:21px;line-height:21px;width:79px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_primary2c7543.png) no-repeat 0 0;background-position:100% 0;-webkit-background-size:79px 21px;background-size:79px 21px;font-size:14px;font-style:normal;color:#fff;padding-right:6px;text-align:right;right:0;bottom:0}.brand_logo{position:absolute;display:block;width:24%;right:1.54%;top:0}.brand_logo img{width:100%;vertical-align:top;max-height:35px}.top_banner{background-color:#fff}.top_banner .rich_media_extra{padding:15px 15px 20px 15px}.top_banner .rich_media_extra .extra_link{position:relative;padding-bottom:10px}.top_banner .rich_media_extra .extra_link:before{content:\" \";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d6d6d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);top:auto;bottom:-2px}.top_banner .rich_media_extra .extra_link:active,.top_banner .rich_media_extra .extra_link:focus{outline:0;border:0}.top_banner .rich_media_extra .appmsg_banner{width:100%;vertical-align:top;outline:0}.top_banner .rich_media_extra .appmsg_banner:active,.top_banner .rich_media_extra .appmsg_banner:focus{outline:0;border:0}.top_banner .rich_media_extra .promotion_tag{height:19px;line-height:19px;width:69px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/promotion_tag_bg_small24a2fe.png) no-repeat 0 0;font-size:12px;-webkit-background-size:69px 19px;background-size:69px 19px;bottom:10px;padding-left:6px}.top_banner .rich_media_extra .brand_logo{width:20%;right:2.22%}.top_banner .rich_media_extra .brand_logo img{max-height:35px}.top_banner .rich_media_extra .ad_msg_mask{position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;line-height:200px;background-color:#000;filter:alpha(opacity = 20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2}.top_banner .rich_media_extra .ad_msg_mask img{position:absolute;width:16px;top:50%;margin-top:-8px;left:50%;margin-left:-8px}.top_banner .preview_group.obvious_app{min-height:54px;position:relative}.top_banner .preview_group.obvious_app .pic_app{width:66.6%}.top_banner .preview_group.obvious_app .pic_app img{height:100%;min-height:54px}.top_banner .preview_group.obvious_app .info_app{width:33%;left:68%}.top_banner .preview_group.obvious_app .info_app .name_app{line-height:18px;font-size:13px}.top_banner .preview_group.obvious_app .info_app .profile_app{font-size:10px}.top_banner .preview_group.obvious_app .info_app .dm_app{bottom:5px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn{font-size:12px;padding-left:17px;line-height:16px}.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed,.top_banner .preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{-webkit-background-size:14px 14px;background-size:14px 14px;background-position:0 center;-webkit-background-position:0 center}.top_banner .preview_group.obvious_app .info_app .dm_app .extra_info{display:none}.wrp_preview_group{padding-top:100px}.preview_group{position:relative;min-height:83px;background-color:#fff;border:1px solid #e7e7eb;-webkit-text-size-adjust:none;text-size-adjust:none}.preview_group.fixed_pos{position:fixed;bottom:0;left:0;right:0}.preview_group .preview_group_inner{padding:14px}.preview_group .preview_group_inner .preview_group_info{padding-left:68px;color:#8d8d8d;font-size:14px}.preview_group .preview_group_inner .preview_group_info .preview_group_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:#000;font-weight:400;font-style:normal;padding-right:73px;max-width:142px;display:block}.preview_group .preview_group_inner .preview_group_info .preview_group_desc{padding-right:65px;display:inline-block;line-height:20px}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar{position:absolute;width:55px;height:55px;left:13px;top:50%;margin-top:-27px;z-index:1}.preview_group .preview_group_inner .preview_group_info .preview_group_avatar.br_radius{border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%}.preview_group .preview_group_inner .preview_group_opr{position:absolute;line-height:83px;top:0;right:13px}.preview_group .preview_group_inner .preview_group_opr .btn{padding:0;min-width:60px;min-height:30px;height:auto;line-height:30px;text-align:center}.preview_group.preview_card .card_inner{padding:0;min-height:89px}.preview_group.preview_card .card_inner .preview_card_avatar{position:absolute;width:89px;height:89px!important;margin:0;left:0;top:0}.preview_group.preview_card .card_inner .preview_group_info{padding:10px 12px 0 106px}.preview_group.preview_card .card_inner .preview_group_info .preview_group_title2{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;padding-right:0;display:block;color:#3e3e3e;font-weight:400}.preview_group.preview_card .card_inner .preview_group_info .preview_group_desc{padding-right:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_desc,.preview_group.preview_card .card_inner .preview_group_info.append_btn .preview_group_title{padding-right:68px;width:auto}.preview_group.preview_shop_card .shop_card_inner{padding:0;min-height:96px}.preview_group.preview_shop_card .preview_card_avatar{position:absolute;width:96px;height:96px!important;margin:0;left:0;top:0}.preview_group.preview_shop_card .preview_group_info{padding:10px 12px 0 111px}.preview_group.preview_shop_card .preview_shop_card_title{display:block;color:#3e3e3e;font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3;font-size:15px}.preview_group.preview_shop_card .preview_shop_card_desc{color:#8c8c8c;position:absolute;bottom:6px;left:111px;right:12px}.preview_group.preview_shop_card .preview_shop_card_price{font-size:16px;color:#3e3e3e}.preview_group.preview_shop_card .preview_shop_card_oldprice{text-decoration:line-through;color:#8c8c8c;font-size:13px;margin-bottom:-0.5em}.preview_group.preview_shop_card .preview_shop_card_price,.preview_group.preview_shop_card .preview_shop_card_oldprice{display:block}.preview_group.preview_shop_card .preview_shop_card_btn_buy{float:right;line-height:1.75;font-size:16px;padding:0 .8em;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;margin-top:1px}.preview_group.obvious_app{width:100%}.preview_group.obvious_app .preview_group_inner{padding:0}.preview_group.obvious_app .pic_app{width:58.3%;height:100%;display:inline-block;margin-right:2%;vertical-align:top}.preview_group.obvious_app .pic_app img{width:100%;vertical-align:top;margin-top:0}.preview_group.obvious_app .info_app{display:inline-block;width:38%;color:#8a8a8a;font-size:12px;box-sizing:border-box;-webkit-box-sizing:border-box;position:absolute;left:62%;top:0;height:100%}.preview_group.obvious_app .info_app .name_app{color:#000;font-size:15px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:3px}.preview_group.obvious_app .info_app .profile_app{line-height:10px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.obvious_app .info_app .profile_app span{padding:0 5px}.preview_group.obvious_app .info_app .profile_app span:first-child{padding-left:0}.preview_group.obvious_app .info_app .profile_app em{font-size:9px;line-height:16px;font-weight:400;font-style:normal;color:#dfdfdf}.preview_group.obvious_app .info_app .dm_app{line-height:20px;vertical-align:middle;position:absolute;left:0;bottom:5px}.preview_group.obvious_app .info_app .dm_app .ad_btn{display:block;color:#04be02;font-size:15px;padding-left:22px}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_download{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_download@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_install{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_install@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_installed{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_installed@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;color:#8a8a8a;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app .ad_btn.btn_open{background:transparent url(http:\/\/res.wx.qq.com\/mmbizwap\/zh_CN\/htmledition\/images\/ad\/icon58_open@3x.png) no-repeat 0 0;-webkit-background-size:19px 19px;background-size:16px 16px;-webkit-background-position:0 center;background-position:0 center}.preview_group.obvious_app .info_app .dm_app p{line-height:15px}.preview_group.obvious_app .info_app .dm_app .extra_info{font-size:9px}.preview_group.obvious_app .info_app .grade_app{height:11px;line-height:11px;font-size:12px;color:#888}.preview_group.obvious_app .info_app .grade_app .stars{display:inline-block;width:55px;height:11px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/star_sprite25624b.png) no-repeat 0 0;-webkit-background-size:55px 110px;background-size:55px 110px}.preview_group.obvious_app .info_app .grade_app .stars.star_half{backgroud-position:0}.preview_group.obvious_app .info_app .grade_app .stars.star_one{background-position:0 -11px}.preview_group.obvious_app .info_app .grade_app .stars.star_one_half{background-position:0 -22px}.preview_group.obvious_app .info_app .grade_app .stars.star_two{background-position:0 -33px}.preview_group.obvious_app .info_app .grade_app .stars.star_two_half{background-position:0 -44px}.preview_group.obvious_app .info_app .grade_app .stars.star_three{background-position:0 -55px}.preview_group.obvious_app .info_app .grade_app .stars.star_three_half{background-position:0 -66px}.preview_group.obvious_app .info_app .grade_app .stars.star_four{background-position:0 -77px}.preview_group.obvious_app .info_app .grade_app .stars.star_four_half{background-position:0 -88px}.preview_group.obvious_app .info_app .grade_app .stars.star_five{background-position:0 -99px}.preview_group.download_app_with_desc{border:0;color:#fff;font-weight:400}.preview_group.download_app_with_desc .preview_group_inner{position:relative;background-repeat:no-repeat;background-position:center;background-size:cover;height:100%;width:100%;box-sizing:border-box;padding:0;overflow:hidden}.preview_group.download_app_with_desc .preview_group_hd{position:relative;z-index:9;width:24%;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;float:right;margin-right:2.875%}.preview_group.download_app_with_desc .preview_group_hd .preview_card_avatar{width:45%;height:45%!important;margin:0;border-radius:18%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{display:block;font-weight:400;font-size:12px;padding-top:4%;padding-bottom:8%;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{display:block;margin:0 auto;font-size:14px;padding:6.5% 0;line-height:1;width:72%;text-align:center;border:1px solid #fff;border-radius:5px;color:#fff;-webkit-tap-highlight-color:transparent}.preview_group.download_app_with_desc .preview_group_hd_inner{-webkit-box-flex:1;-webkit-flex:1;flex:1}.preview_group.download_app_with_desc .preview_group_btn.with_processor{position:relative;overflow:hidden}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#04be02}.preview_group.download_app_with_desc .preview_group_btn.with_processor .btn_processor_value{position:relative}.preview_group.download_app_with_img .preview_card_avatar{box-shadow:0 -1px 2px rgba(0,0,0,0.2)}.preview_group.download_app_with_desc{overflow:hidden}.preview_group.download_app_with_desc .preview_group_bg{width:100%;height:100%;position:absolute;background-repeat:no-repeat;background-position:center;background-size:cover;z-index:0;-webkit-filter:blur(30px);-moz-filter:blur(30px);-o-filter:blur(30px);-ms-filter:blur(30px);filter:blur(30px)}.preview_group.download_app_with_desc .preview_group_bd{position:absolute;left:2.875%;right:26%;top:46%;transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center}.preview_group.download_app_with_desc .preview_group_ft{position:absolute;left:2.875%;right:26%;bottom:26%;transform:translateY(50%);-webkit-transform:translateY(50%);-moz-transform:translateY(50%);-ms-transform:translateY(50%);text-align:center}.preview_group.download_app_with_desc .preview_group_desc{display:block;font-size:17px;line-height:1.5;width:12em;margin:0 auto;overflow-x:hidden;white-space:nowrap}.preview_group.download_app_with_desc .preview_group_download_info{display:inline-block;font-size:9px}.preview_group.follow .preview_group_inner .preview_group_info .preview_group_desc{display:block}.preview_group.follow.with_tips .preview_group_desc{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.preview_group.follow .weak_tips{color:#bbb}.btn_plain_primary{color:#04be02;border:1px solid #04be02}.btn_plain_primary:active{border-color:#039702}.mpda_card .btn{padding:0;font-size:15px}.mpda_card .btn_inline{width:4em;line-height:2}.mpda_card .cardticket_hd{background-color:#fff;border-top-left-radius:5px;-moz-border-radius-topleft:5px;-webkit-border-top-left-radius:5px;border-top-right-radius:5px;-moz-border-radius-topright:5px;-webkit-border-top-right-radius:5px;border:1px solid #ececec;border-bottom-width:0}.mpda_card .cardticket_hd .radius_avatar{width:45px;height:45px}.mpda_card .cardticket_hd .cell_hd{padding-left:12px}.mpda_card .cardticket_hd .cell_bd{font-size:17px;padding-left:.5em}.mpda_card .cardticket_hd .cell_ft{padding-right:10px}.mpda_card .cardticket_ft{position:relative;margin-top:10px;padding:.35em 12px;font-size:12px;background-color:#fff;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;-webkit-border-bottom-left-radius:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-right-radius:5px;border:1px solid #ececec;border-top-width:0}.mpda_card .cardticket_theme{position:absolute;top:-10px;left:8px;right:8px;height:10px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle290773.png) no-repeat 0 0;background-repeat:repeat-x;-webkit-background-size:10px auto;background-size:10px auto}.mpda_card .cardticket_theme:before{content:\" \";position:absolute;left:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_left290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}.mpda_card .cardticket_theme:after{content:\" \";position:absolute;right:-8px;top:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/pic\/appmsg\/cardticket_theme\/pic_circle_right290773.png) no-repeat 0 0;width:8px;height:10px;vertical-align:middle;display:inline-block;-webkit-background-size:8px auto;background-size:8px auto}@media(max-width:354px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:16px;line-height:1.4}.preview_group.download_app_with_desc .preview_group_hd .preview_group_title{padding-top:3%;padding-bottom:6%}.preview_group.download_app_with_desc .preview_group_hd .preview_group_btn{font-size:13px}}@media(min-width:400px){.preview_group.download_app_with_desc .preview_group_bd{top:45%}.preview_group.download_app_with_desc .preview_group_desc{font-size:18px}}.wx_flex_layout{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_flex_bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;word-wrap:break-word;word-break:break-all}.wx_flex_ft{text-align:center}.mod_follow_with_img .wx_flex_ft{width:32%}.mod_follow_with_img .fwi_thumb{margin:0;display:block;width:100%}.mod_follow_with_img .radius_avatar{width:35px;height:35px;padding:0}.mod_follow_with_img .radius_avatar img{margin:0}.mod_follow_with_img .fwi_nickname{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;display:block;margin:.2em 1em .5em;font-weight:400;font-size:12px;color:#8c8c8c}.wx_min_plain_btn{display:inline-block;vertical-align:middle;padding:0 .85em;line-height:1.6em;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}.wx_min_plain_btn.primary{color:#1aad19;border:1px solid #1aad19}.wx_min_plain_btn.primary:active{color:rgba(26,173,25,0.6);border-color:rgba(26,173,25,0.6)}span.img_bg_cover{background-repeat:no-repeat;background-position:center center;background-size:cover}.ct_mpda_wrp{margin:38px 0 20px}.ct_mpda_area{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fcfcfc;border:1px solid #eaeaea;-webkit-user-select:none;user-select:none}.ct_mpda_area.show{border:0}.ct_mpda_placeholder{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.ct_mpda_tips{color:#d8d8d8;text-align:center;font-size:15px}.ct_mpda_inner{position:relative;width:100%;opacity:0;transition:opacity .6s;-webkit-transition:opacity .6s}.ct_mpda_area.show .ct_mpda_inner{opacity:1}.ct_mpda_main_img{width:100%;min-height:100px;display:block}.ct_mpda_bd{width:100%;position:relative;border-width:0 1px 1px 1px;border-style:solid;border-color:#eaeaea;box-sizing:border-box;white-space:nowrap}.ct_mpda_logo{width:35px;height:35px;display:inline-block;margin:15px 10px;vertical-align:middle;border-radius:50%;overflow:hidden}.ct_mpda_desc_box{font-size:0;display:inline-block;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;margin-left:-60px;padding-left:55px;padding-right:80px;box-sizing:border-box;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.ct_mpda_btn_more{position:absolute;right:10px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);display:inline-block;color:#576b95;font-size:13px;border:1px solid #576b95;border-radius:3px;line-height:2.2;padding:0 .75em}.ct_mpda_btn_more:active{border-color:#354567;color:#354567;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_title{font-size:14px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ct_mpda_details{display:inline-block;vertical-align:top;font-size:13px;color:#878787;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_details:after{content:'';display:inline-block;width:4px;height:4px;border-width:0 1px 1px 0;border-style:solid;border-color:#878787;-webkit-transform:rotate(45deg) translateY(-3px);transform:rotate(45deg) translateY(-4px);margin-left:3px}.ct_mpda_btn_about{display:none;font-size:13px;line-height:2.8;padding:0 1em;background:#fff;color:#576b95;border:1px solid #dfdfdf;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);border-radius:3px;position:absolute;bottom:-28px;left:55px;z-index:9;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ct_mpda_btn_about:active{background-color:#ececec}.db{display:block}.qqmusic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.qqmusic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.qqmusic_area .pic_qqmusic_default{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;width:37px;height:37px;display:none}.qqmusic_area.unsupport .unsupport_tips{display:block}.qqmusic_area.unsupport .pic_qqmusic_default{display:inline-block}.qqmusic_area.unsupport .icon_qqmusic_switch{display:none}.qqmusic_wrp{border:1px solid #ebebeb;line-height:1.6}.qqmusic_bd{position:relative;background-color:#fcfcfc;overflow:hidden}.qqmusic_ft{text-align:right;background-color:#f5f5f5;border-top:1px solid #ebebeb;line-height:2.5;overflow:hidden;font-size:11px;padding:0 .5em}.play_area{float:left;width:60px;height:60px;margin-right:12px;position:relative}.qqmusic_thumb{display:block;width:60px;height:60px!important}.access_area{display:block;color:#8c8c8c;min-height:60px;overflow:hidden;margin-right:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.qqmusic_songname,.qqmusic_singername{display:block;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.qqmusic_songname{padding:7px 0 3px;margin-bottom:-4px;font-size:16px;color:#3e3e3e}.qqmusic_singername{font-size:14px;margin-right:20px}.qqmusic_source{position:absolute;right:6px;bottom:6px}.qqmusic_source img{width:13px;height:13px;vertical-align:top;border:0}.qqmusic_love{position:relative;float:right;margin:10px 0 0 10px;height:54px;color:#607fa6;width:53px;text-align:center;font-size:13px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0}.qqmusic_love:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.qqmusic_love .icon_love{margin-top:16px}.qqmusic_love .love_num{display:block}.icon_qqmusic_switch{position:absolute;top:50%;left:50%;margin-top:-18.5px;margin-left:-18.5px;line-height:200px;overflow:hidden;cursor:pointer;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png) no-repeat 0 0;-webkit-background-size:37px auto;background-size:37px auto}.qqmusic_playing .icon_qqmusic_switch{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_qqmusic_play_sprite.2x26f1f1.png);background-position:0 -42px}.icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;margin-top:-0.2em;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png) no-repeat 0 0;-webkit-background-size:12px auto;background-size:12px auto}.loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x25ded2.png);background-position:0 -17px}.audio_area{display:block;margin:17px 1px 16px 0;font-size:0;position:relative;font-weight:400;text-decoration:none;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.audio_area .audio_title{font-weight:400;font-size:17px;margin-top:-2px;margin-bottom:-3px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.audio_area .audio_length{float:right;font-size:14px;margin-top:3px;margin-left:1em}.audio_area .audio_source{display:block;font-size:14px}.audio_area .progress_bar{position:absolute;left:0;bottom:0;background-color:#0cbb08;height:2px}.audio_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.audio_area .pic_audio_default{display:none;width:18px}.audio_area.unsupport .unsupport_tips{display:block}.audio_area.unsupport .pic_audio_default{display:inline-block}.audio_area.unsupport .icon_audio_playing{display:none}.audio_area.unsupport .icon_audio_default{display:none}.audio_wrp{border:1px solid #ebebeb;background-color:#fcfcfc;overflow:hidden;*zoom:1;padding:12px 20px 12px 12px}.audio_info_area{overflow:hidden;*zoom:1}.audio_play_area{float:left;margin:9px 22px 10px 5px;font-size:0;width:18px;height:25px}.playing .audio_play_area .icon_audio_playing{display:inline-block}.playing .audio_play_area .icon_audio_default{display:none}.audio_play_area .icon_audio_default{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_unread26f1f1.png) no-repeat 0 0;width:18px;height:25px;vertical-align:middle;display:inline-block;-webkit-background-size:18px auto;background-size:18px auto}.audio_play_area .icon_audio_playing{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_126f1f1.png) no-repeat 0 0;width:18px;height:25px;vertical-align:middle;display:inline-block;-webkit-background-size:18px auto;background-size:18px auto;-webkit-animation:audio_playing 1s infinite;display:none}@-webkit-keyframes audio_playing{30%{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_126f1f1.png)}31%{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_226f1f1.png)}61%{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_226f1f1.png)}62%{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_326f1f1.png)}100%{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/audio\/icon_audio_reading_326f1f1.png)}}.topic_area{display:block;margin:17px 1px 16px 0;font-weight:400;text-decoration:none;font-size:0;line-height:0;text-align:left;-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}.topic_area .unsupport_tips{display:none;padding:20px 20px 8px;line-height:1.6;font-size:16px}.topic_area.unsupport .unsupport_tips{display:block}.topic_wrp{border:1px solid #ebebeb;line-height:1.6;background-color:#fcfcfc;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;padding:8px 10px;display:block}.topic_thumb{float:left;width:75px;height:100px;margin-right:20px;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.topic_content{position:relative;display:block;overflow:hidden;height:100px}.topic_title{font-weight:400;font-size:16px;color:#3e3e3e}.topic_desc{color:#8c8c8c;font-size:14px}.topic_title,.topic_desc{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.topic_info{position:absolute;bottom:0;left:0;right:0;color:#8c8c8c}.topic_info_primary{float:left;margin-right:.5em;font-size:14px}.topic_info_extra{float:right;margin-left:.5em;font-size:14px}.icon_topic{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/topic\/icon_topic.2x2e4987.png) no-repeat 0 0;width:10px;height:11px;vertical-align:middle;display:inline-block;-webkit-background-size:100% auto;background-size:100% auto;margin:-2px 5px 0 0}.iframe_full_video{position:fixed!important;left:0;right:0;top:0;bottom:0;z-index:1000;background-color:#000;margin-top:0!important}.video_iframe{display:block}.video_ad_iframe{border:0;position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;background-color:#fff}@media(min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.mm_appmsg .rich_media_inner,.mm_appmsg .rich_media_meta,.mm_appmsg .discuss_list,.mm_appmsg .rich_media_extra,.mm_appmsg .title_tips .tips{font-size:17px}.mm_appmsg .meta_original_tag{font-size:15px}}@media(min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.mm_appmsg .rich_media_title{font-size:25px}}@media screen and (min-width:1024px){.rich_media{width:740px;margin-left:auto;margin-right:auto}.rich_media_inner{padding:20px}body{background-color:#fff}}@media screen and (min-width:1025px){body{font-family:\"Helvetica Neue\",Helvetica,\"Hiragino Sans GB\",\"Microsoft YaHei\",Arial,sans-serif}.rich_media{position:relative}.rich_media_inner{background-color:#fff;padding-bottom:100px}}@media screen and (min-width:1024px){.rich_media_meta{max-width:none}a.rich_media_meta_nickname{display:inline-block!important}span.rich_media_meta_nickname{display:none!important}.rich_media_content{min-height:350px}.rich_media_title{padding-bottom:10px;margin-bottom:14px;border-bottom:1px solid #e7e7eb}.discuss_container.access{width:740px;margin-left:auto;margin-right:auto;background-color:#fff}.discuss_container.editing .frm_textarea_box{margin:0}.frm_textarea_box{position:relative}.frm_textarea_box:before{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.frm_textarea_box:after{content:\" \";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #e7e6e4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5);left:auto;right:-2px}.rich_media_meta.nickname{max-width:none}.rich_tips.with_line .tips{background-color:#fff}}.text_unselecet{-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;user-select:none}.pay_reading_area{padding:60px 8px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.pay_tit_tips_wrp{position:relative}.pay_tit_tips_wrp:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e0e0e0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.pay_tit_tips{position:relative;top:-0.75em;padding:0 .5em;background-color:#fff;color:#8c8c8c}.pay_tit_sub_tips{word-wrap:break-word;word-break:break-all;margin:-12px 0 10px}.btn_pay_reading{width:180px;height:35px;line-height:35px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#0aba07;border:1px solid #0aba07;margin:5px 0 14px 0;display:inline-block}.btn_pay_reading.disabled{border-color:#d5d6d7;color:#c4c2c5;background-color:#fbfbfd}.pay_tips{font-size:14px}.pop_tips .inner{width:280px;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;background-color:#f7f7f9;position:fixed;left:50%;top:28%;margin-left:-140px;z-index:20}.pop_tips .inner .tips_title{font-size:16px;display:block;vertical-align:middle;max-width:98%;padding:15px 10px 0;color:#3e3e3e;text-align:center}.pop_tips .inner .tips_con{color:#888;font-size:14px;padding:10px 15px}.pop_tips .inner .tips_opr{line-height:50px;font-size:18px}.pop_tips .inner .tips_opr .ft_btn{position:relative;width:280px;display:block;text-align:center;color:#0aba07}.pop_tips .inner .tips_opr .ft_btn:before{content:\" \";position:absolute;top:0;right:0;height:1px;border-top:1px solid #ececec;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:0}.pop_tips .mask{width:100%;height:100%;position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.4);z-index:1}.wx_poptips_wrp.pay_reading{top:50%;margin-top:-60px}.wx_poptips_wrp.pay_reading .toast_content{margin-top:75px}";
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
r.isPc||r.isWp?i(e,"click",o,t,n):i(e,"touchend",o,function(e){
if(-1==r.tsTime||+new Date-r.tsTime>200)return r.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(r.y-n.clientY)<=5&&Math.abs(r.x-n.clientX)<=5?t.call(this,e):void 0;
},n);
}
function t(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function n(e,n,i){
for(;e&&!t(e,n);)e=e!==i&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function i(t,i,o,a,c){
var s,d,u;
return"input"==i&&r.isPc,t?("function"==typeof o&&(c=a,a=o,o=""),"string"!=typeof o&&(o=""),
t==window&&"load"==i&&/complete|loaded/.test(document.readyState)?a({
type:"load"
}):"tap"==i?e(t,a,c,o):("unload"==i&&"onpagehide"in window&&(i="pagehide"),s=function(e){
var t=a(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},o&&"."==o.charAt(0)&&(u=function(e){
var i=e.target||e.srcElement,a=n(i,o,t);
return a?(e.delegatedTarget=a,s(e)):void 0;
}),d=u||s,a[i+"_handler"]=d,t.addEventListener?void t.addEventListener(i,d,!!c):t.attachEvent?void t.attachEvent("on"+i,d,!!c):void 0)):void 0;
}
function o(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var a=navigator.userAgent,r={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(a),
tsTime:-1
};
return r.isPc||i(document,"touchstart",function(e){
var t=e.changedTouches[0];
r.x=t.clientX,r.y=t.clientY,r.tsTime=+new Date;
}),{
on:i,
off:o,
tap:e
};
});define("appmsg/test.js",[],function(){
"use strict";
var t=[],e=function(){
"undefined"==typeof getComputedStyle&&document.body.currentStyle&&(window.getComputedStyle=function(t){
return t.currentStyle;
});
},n=function(){
for(var e="/mp/jsmonitor?idkey=",n=[],r=0,o=t.length;o>r;++r){
var i=t[r],d=i.idkey.toString()+"_"+i.order.toString()+"_"+i.num.toString();
n.push(d);
}
e+=n.join(";"),t.length>0&&((new Image).src=e);
},r=function(){
try{
e(),o(),n();
}catch(t){
console.log(t);
}
},o=function(){
var e=10,n=top.window.user_uin||0,r=0!==n&&Math.floor(n/100)%1e3<e;
if(r){
var o=document.getElementsByTagName("img"),i=o.length,d=document.getElementById("img-content"),u=d.offsetWidth,a=0,g=0,c=getComputedStyle(d);
a=parseInt(c.paddingLeft)+parseInt(c.paddingRight),u-=a,u||(u=window.innerWidth-30);
for(var f=0;i>f;++f){
var m=o[f].getAttribute("data-src");
if(m){
var s=1*o[f].getAttribute("data-w")||u,p=1*o[f].getAttribute("data-ratio");
p&&p>0&&s>u&&g++;
}
}
g>0&&t.push({
idkey:28307,
order:22,
num:g
});
}
};
return r;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),/\d+/g.test(e[e.length-1])||e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});