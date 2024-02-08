function cq5forms_isArray(a){return typeof a.length=="number"&&a.item
}function cq5forms_showMsg(e,l,d,j){var h=document.forms[e].elements[l];
if(document.getElementById("longformform")!=null){var m=$('input[name=":formid"]').attr("value");
var c=$("#"+m);
var g=$(":input:not(input[type=button],input[type=submit],input[type=reset],button):visible",c);
var n=[];
g.each(function(){n.push($(this).attr("name"))
});
for(var a=0;
a<n.length;
a++){if("DD/MM/YYYY"==document.getElementsByName(n[a])[0].placeholder||"MM/DD/YYYY"==document.getElementsByName(n[a])[0].placeholder||"YYYY/MM/DD"==document.getElementsByName(n[a])[0].placeholder||"YYYY/DD/MM"==document.getElementsByName(n[a])[0].placeholder){var k=document.getElementsByName(n[a])[0].onblur+"";
k=k.replace("function","").replace("onblur(event)","").replace("{","").replace("}","");
k=k.replace("onlineformValidation","").replace("(","").replace(")","").replace(";","").replace(/'/g,"");
var b=k.split(",");
onlineformValidation(document.getElementsByName(n[a])[0],b[1],b[2],"text")
}else{document.getElementsByName(n[a])[0].focus();
document.getElementsByName(n[a])[0].blur()
}}}else{alert(d)
}if(!cq5forms_isArray(h)||h.type=="select-one"){h.focus();
$("html, body").animate({scrollTop:$(h).offset().top-200},300)
}else{if(!j){j=0
}h[j].focus();
$("html, body").animate({scrollTop:$(h[j]).offset().top-200},300)
}checkcaptcha()
}function cq5forms_isEmpty(b){if(b===undefined){return false
}var a=true;
if(cq5forms_isArray(b)){for(i=0;
i<b.length;
i++){if(b[i].type=="radio"||b[i].type=="checkbox"){if(b[i].checked){a=false
}}else{if(b[i].localName=="option"){if(b[i].selected){a=false
}}else{if(b[i].value.length>0){a=false
}}}}}else{if(b.type=="radio"||b.type=="checkbox"){if(b.checked){a=false
}}else{if(b.value.length>0){a=false
}}}if(b.type=="select-one"){if(b.value.trim().length==0){a=true
}if(b.value.trim().length>0){a=false
}}return a
}function cq5forms_regcheck(f,d){var b=false;
var c=d.exec(f);
if(c){var a=f.length;
var e=c[0].length;
b=(e==a)
}return b
}function cq5forms_multiResourceChange(a,b,c){if(!c){if(!a){a=window.event
}if(a.keyCode<48&&a.keyCode!=8&&a.keyCode!=46){return
}}try{document.getElementById(b).checked=true
}catch(d){}};