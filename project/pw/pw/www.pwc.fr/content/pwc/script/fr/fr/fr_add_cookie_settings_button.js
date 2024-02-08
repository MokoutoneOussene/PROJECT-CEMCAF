var lang = document.documentElement.lang;
var cookieSettingButton = "Cookie Settings";
if (lang == "fr"){
	cookieSettingButton = "Paramétrer les cookies";
}
var pageFooter = document.getElementById("pgFooter");
var cookieLink = document.createElement("A");
var linkText = document.createTextNode(cookieSettingButton);
cookieLink.appendChild(linkText);
cookieLink.href = "javascript:(function(){OneTrust.ToggleInfoDisplay();})()";
var listElem = document.createElement("li");
listElem.appendChild(cookieLink);
pageFooter.appendChild(listElem);