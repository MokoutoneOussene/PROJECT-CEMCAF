$(document).ready(function() {
	"use strict";
	const canonicalURL = document.querySelector("link[rel='canonical']");
	if(canonicalURL) {
		//console.log("canonicalURL.href", canonicalURL.href);
		if(canonicalURL.href.match(/^https?\:\/\/www\.pwc\.com\/gx/)) {
			$("a[href='/gx/en/content/pwc/global/forms/contactUs.en_gx.html?parentPagePath=/content/pwc/gx/en&style=']").attr("href","/gx/en/content/pwc/global/forms/contactUs.en_gx.html?source=footer&parentPagePath="+digitalData.page.content.contentFullPath.replace('.html',''))
		}
	}
});
