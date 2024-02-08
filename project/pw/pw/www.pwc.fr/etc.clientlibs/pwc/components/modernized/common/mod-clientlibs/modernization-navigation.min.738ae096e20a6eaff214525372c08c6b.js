$(document).ready(function(){var n,C,q,B,z,x,a,k,h,E,m,e,y,p,t,D,u,s,F,A,f;
var i,o,b,d,w,v;
p=function(H){if(H&&H.breadcrumbs&&H.breadcrumbs.length>0&&$("#breadcrumb-template-footer").length){var G=Handlebars.compile($("#breadcrumb-template-footer").html());
$("div.breadcrumb-main-footer").append(G(H))
}};
n=function(H){if(H&&H.breadcrumbs&&H.breadcrumbs.length>0){var G=Handlebars.compile($("#breadcrumb-template").html());
$("div.slimnav-breadcrumb").append(G(H))
}};
a=function(I,H){var M={signInHref:I,createAccountHref:H+window.location.href,myAccountHref:F};
var G=Handlebars.compile($("#overlay-template").html());
if(s){$("div.login-data").append(G(M))
}var L=$(".mod_userLoginStatus").val();
if(L==="false"&&s){$(".mod_signInHref").attr("value",I);
$(".mod_createAccountHref").attr("value",H);
if($("#access-control-section").length>0){var N=$("#access-control-section");
var K=$("#access-control-section").find($("#pwc-access-button"));
var J=$(K).find("a");
$(J).attr("href",I);
$(N).find("#access-control-footer a").attr("href",$("a.register.userreg").attr("href"))
}}};
fetchAllJson=function(){var G="";
if($("#modnavigationid")&&$("#modnavigationid").val()!==""){G=$("#modnavigationid").val().substring(0,$("#modnavigationid").val().length-1)
}if((G===""&&$("#navmode").val()==="publish")&&window.location.pathname&&window.location.pathname.indexOf("/content/pwc/userReg")==-1&&window.location.pathname.indexOf("/content/pwc/global/forms/")==-1&&window.location.pathname.indexOf("/content/pwc/global/access-control")==-1){G=window.location.pathname.substring(0,window.location.pathname.indexOf(".html"))
}var H=$.Deferred();
if($(".mod__header-v2").length>0){G=G+"/_jcr_content.dynamic.json";
var I=$.get(G,null,"json");
$.when(I).done(function(K){try{K=JSON.parse(K)
}catch(J){K=K
}q=K.breadcrumbData;
siteSection(q);
k=K.languageSelectorData;
h=K.territorySelectorData;
E=K.templatePath;
m=K.findATerritoryText;
e=K.territoryNotFoundText;
y=K.langSelectorTitleText;
u=K.signInHref;
D=K.createAccountHref;
if(K.geoTerritories&&K.languageCode){F="/"+K.geoTerritories.toLowerCase()+"/"+K.languageCode.toLowerCase()
}if(K.referrerURL!==""&&K.userDetailsPagePath!==""){F+=K.userDetailsPagePath+"?referrerUrl="+K.referrerURL
}s=K.enableUserReg;
i=K.currentPageTerritoryName;
o=K.jcrlanguage;
f=K.languageCode;
b=K.geoTerritories;
v=K.redirectUrl;
H.resolve()
}).fail(function(L,J,K){H.reject(K)
})
}return H.promise()
};
B=function(I){if(I&&I.alternateLanguages&&I.alternateLanguages.length>0){var H=Handlebars.compile($("#language-selector-template").html());
var G={langSelectorTitleText:y,languageSelectorData:I,languageCode:f};
$(".option-language").append(H(G))
}};
z=function(G){if(G.alternateLanguages.length>1){B(G)
}else{$(".option-language").addClass("no-margin")
}};
x=function(H){if(H&&H.length>0){var I=Handlebars.compile($("#territory-selector-template").html());
var G={findATerritoryText:m,territoryNotFoundText:e,territories:H,currentPageTerritoryName:i,jcrlanguage:o,geoTerritories:b};
$(".option-country").append(I(G))
}};
A=function(){};
w=function(){var H=$(".slimnav-v2-breadcrumbs a");
if($(".slimnav-v2-breadcrumbs").length>0){if($(".slimnav-v2-breadcrumbs")._overflown()===true){for(var G=0;
G<=$(".slimnav-v2-breadcrumbs a").length;
G++){$(H[G]).addClass("bc-hidden");
$(H[G]).attr("tabindex","-1");
if($(".slimnav-v2-breadcrumbs")._overflown()===false){break
}}}else{for(G=$(".slimnav-v2-breadcrumbs a").length;
G>=0;
G--){$(H[G]).removeClass("bc-hidden");
$(H[G]).attr("tabindex","");
if($(".slimnav-v2-breadcrumbs")._overflown()===true){$(H[G]).addClass("bc-hidden");
$(H[G]).attr("tabindex","-1");
break
}}}}$(".slimnav-v2-breadcrumbs .bc-hidden").length<=0&&$(".breadcrumbs-show-all").length<=0?$(".slimnav-v2-bc-toggle").addClass("is-hidden"):$(".slimnav-v2-bc-toggle").removeClass("is-hidden")
};
d=function(){$(".option-country > button").on("click",function(I){if(windowWidth()<992&&$(I.target).hasClass("close-options")===false){$(this).parents(".location-options").addClass("location-options-fixed show-country")
}else{if(windowWidth()>=992){$(this).parent(".option-country").toggleClass("option-country--open");
if($("#countrySearch").length){$("#countrySearch").focus()
}var H={lstId:"lstTerritory",listboxNode:document.getElementById("lstTerritory")};
H.activeDescendant=H.listboxNode.getAttribute("aria-activedescendant");
document.addEventListener("keydown",function(J){if($("span.option-country").hasClass("option-country--open")){switch(J.keyCode){case KEYCODE.UP:ARIA_LIST_movePrevious(H);
break;
case KEYCODE.DOWN:ARIA_LIST_moveNext(H);
break;
case (J.shiftKey&&KEYCODE.TAB)||KEYCODE.TAB:if(document.activeElement.id==="countrySearch"){if(H.activeDescendant){setTimeout(function(){$('a[id="'+H.activeDescendant+'"]').focus().addClass(" is-highlight")
},0)
}else{ARIA_LIST_focusFirstItem(H)
}}else{setTimeout(function(){ARIA_LIST_defocusItem(H.activeDescendant);
$("#countrySearch").focus()
},500)
}J.preventDefault();
break;
case KEYCODE.ESC:$("span.option-country.levelOneLink").removeClass("option-country--open");
$('span.option-country.levelOneLink > button[tabindex="6"]').focus();
break
}}});
$(".lo-backsplash").toggleClass("lo-backsplash--show");
$(".option-language").removeClass("option-language--open")
}}return false
});
$("#countrySearch").on("keyup",function(L){var J=$(this).parents(".option-country").find(".territory-selector-list");
var I,K,H=0;
$("a",J).each(function(){K=L.target.value.toLowerCase();
I=$(this).text().toLowerCase();
if(I.indexOf(K)!=-1){H=H+1;
$(this).removeClass("hide-lang")
}else{$(this).addClass("hide-lang")
}});
H===0?$("p.territory-no-results",J).addClass("is-visible"):$("p.territory-no-results",J).removeClass("is-visible")
});
$(".options-language > .open-lang-options").on("click",function(J){if(windowWidth()<992&&$(J.target).hasClass("close-options")===false){var K=$(this).parents(".location-options");
K.hasClass("location-options-fixed")?"":K.addClass("location-options-fixed show-language")
}else{if(windowWidth()>=992){$(this).parents(".option-language").toggleClass("option-language--open");
var H={lstId:"lstLang",listboxNode:document.getElementById("lstLang")};
H.activeDescendant=H.listboxNode.getAttribute("aria-activedescendant");
if(H.activeDescendant){$("a#"+H.activeDescendant).addClass(" is-highlight").attr("aria-selected",true).focus()
}else{var I=$("#"+H.lstId+' a[role="option"]:not(.hide-lang)').first();
I.addClass(" is-highlight").attr("aria-selected",true).focus();
H.activeDescendant=I.attr("id");
H.listboxNode.setAttribute("aria-activedescendant",I.attr("id"))
}document.addEventListener("keydown",function(L){if($("span.option-language").hasClass("option-language--open")){switch(L.keyCode){case KEYCODE.UP:ARIA_LIST_movePrevious(H);
break;
case KEYCODE.DOWN:ARIA_LIST_moveNext(H);
break;
case L.shiftKey&&KEYCODE.TAB:ARIA_LIST_movePrevious(H);
L.preventDefault();
break;
case KEYCODE.TAB:ARIA_LIST_moveNext(H);
L.preventDefault();
break;
case KEYCODE.ESC:$("span.option-language").removeClass("option-language--open");
$('span.option-language > div > button[tabindex="7"]').focus();
break
}}});
$(".lo-backsplash").toggleClass("lo-backsplash--show");
$(".option-country").removeClass("option-country--open")
}}return false
});
$(".close-options").on("click",function(H){H.preventDefault();
var I=$(".location-options");
I.removeClass("location-options-fixed");
I.removeClass("show-country");
I.removeClass("show-language")
});
$(".slimnav-v2-bc-toggle").on("click",function(){$(".slimnav-breadcrumb").toggleClass("breadcrumbs-show-all");
w()
});
$(".option-country .territory-selector-list a").sort(G).appendTo(".option-country .territory-selector-list");
function G(I,H){return($(H).attr("data-value"))<($(I).attr("data-value"))?1:-1
}$(".region-global").detach().prependTo(".territory-selector-list")
};
var c=function(){if(l("pwc-id")!=null){$("#checkUserLoginOrNot").val("true");
$(".authenticated-user-options").removeClass("hidden");
$(".user-options").addClass("hidden")
}else{if(window.location.pathname.includes("/content/pwc/userReg/profile-completion")){$(".user-options").addClass("hidden")
}else{$(".user-options").removeClass("hidden")
}}};
var l=function(H){var J=encodeURIComponent(H)+"=";
var G=document.cookie.split(";");
for(var I=0;
I<G.length;
I++){var K=G[I];
while(K.charAt(0)===" "){K=K.substring(1,K.length)
}if(K.indexOf(J)===0){return decodeURIComponent(K.substring(J.length,K.length))
}}return null
};
function r(){if($(".mod__header-v2").length>0){c();
return false
}}function j(){if($(".slimnav-breadcrumb").length>0){setTimeout(function(){w();
$(".slimnav-breadcrumb").addClass("is-visible")
},300)
}}(function(){fetchAllJson().then(function(){if(E!=="/conf/pwc/settings/wcm/templates/territory-homepage-template"){if(!(window.location.pathname.substring(0,window.location.pathname.indexOf(".html")).includes("userReg")||window.location.pathname.substring(0,window.location.pathname.indexOf(".html")).includes("global/forms"))){n(q)
}}else{$("body").addClass("longform-territory-homepage-template")
}x(h);
z(k);
p(q);
a(u,D);
A();
r();
j();
d()
},function(G){})
}());
$(".headerv2-container").on("click",".sign-in.userreg",function(G){g("saml-redirect-url",v,0.005,"/");
window.location.href=$(G.target).data("href")
});
$("#pwc-access-button a").click(function(){g("saml-redirect-url",v,0.005,"/")
});
function g(H,L,I,J){var G="expires=0";
if(I!=0){var K=new Date();
K.setTime(K.getTime()+(I*24*60*60*1000));
G="expires="+K.toGMTString()
}document.cookie=H+"="+L+"; "+G+"; path=/;"
}});
var KEYCODE={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};
ARIA_LIST_focusFirstItem=function(a){var b;
b=$("#"+a.lstId+' a[role="option"]:not(.hide-lang)').first();
if(b.length){ARIA_LIST_focusItem(a,b)
}};
ARIA_LIST_focusItem=function(a,b){ARIA_LIST_defocusItem(a.activeDescendant);
$("#"+b.attr("id")).addClass("is-highlight").attr("aria-selected",true).focus();
a.listboxNode.setAttribute("aria-activedescendant",b.attr("id"));
a.activeDescendant=b.attr("id");
if(a.listboxNode.scrollHeight>a.listboxNode.clientHeight){var d=a.listboxNode.clientHeight+a.listboxNode.scrollTop;
var c=b.offsetTop+b.offsetHeight;
if(c>d){a.listboxNode.scrollTop=c-a.listboxNode.clientHeight
}else{if(b.offsetTop<a.listboxNode.scrollTop){this.listboxNode.scrollTop=b.offsetTop
}}}};
ARIA_LIST_defocusItem=function(a){if(!a){return
}$("#"+a).removeClass("is-highlight").removeAttr("aria-selected").blur()
};
ARIA_LIST_moveNext=function(b){var a=$('a[id="'+b.activeDescendant+'"]').next('a[role="option"]');
if(!a.length){var c=$('a[id="'+b.activeDescendant+'"]').next("p#option_noresult");
if(c.next('a[role="option"]').length){a=c.next('a[role="option"]')
}}if(a.length){$('a[id="'+b.activeDescendant+'"]').removeClass(" is-highlight").removeAttr("aria-selected");
a.addClass(" is-highlight").attr("aria-selected",true).focus();
b.activeDescendant=a.attr("id");
b.listboxNode.setAttribute("aria-activedescendant",a.attr("id"))
}};
ARIA_LIST_movePrevious=function(b){var a=$('a[id="'+b.activeDescendant+'"]').prev('a[role="option"]');
if(!a.length){var c=$('a[id="'+b.activeDescendant+'"]').prev("p#option_noresult");
if(c.prev('a[role="option"]').length){a=c.prev('a[role="option"]')
}}if(a.length){$('a[id="'+b.activeDescendant+'"]').removeClass(" is-highlight").removeAttr("aria-selected");
a.addClass(" is-highlight").focus().attr("aria-selected",true);
b.activeDescendant=a.attr("id");
b.listboxNode.setAttribute("aria-activedescendant",a.attr("id"))
}};