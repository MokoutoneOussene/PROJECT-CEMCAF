//	Fonction de génération de la cookie box pour l'acceptation des cookies 
//	indispensable pour afficher Power Bi

var pwcfr_fn_CookieBoxPowerBi = function(l){

	//	Var ciblage et créa DOM
	var pwcrfrTargetParentDiv = document.getElementById("pwcfr-powerbi-iframe").parentNode;
	var pwcrfrTargetChildDiv = document.getElementById("pwcfr-powerbi-iframe");
	var pwcrfrNewNodeForCookie = document.createElement("div");
	pwcrfrNewNodeForCookie.setAttribute('id', 'pwcrfrNewNodeForCookie');

	
	//	text
	var pwcfrTextForCookieNodeFR = '<div style="padding:12px; padding-left:16px; background-color:#f2f2f2; text-align:left; margin-bottom:20px;"><h4>Graphique PowerBi <img style="float:right; width:25px; height:22px; margin-top:4px" src="../../../../../www.pwc.nl/nl/assets/images/alert-50x44.png"></h4><p>Veuillez accepter les cookies de performances pour afficher le graphique PowerBi.</p><p class="optanon-cookie-policy-group-description text-center"><a class="optanon-toggle-display btn btn--transparent">Paramètres des cookies</a></p><br></div>';

	var pwcfrTextForCookieNodeEN = '<div style="padding:12px; padding-left:16px; background-color:#f2f2f2; text-align:left; margin-bottom:20px;"><h4>PowerBi Graphic<img style="float:right; width:25px; height:22px; margin-top:4px" src="../../../../../www.pwc.nl/nl/assets/images/alert-50x44.png"></h4><p>Please accept performance cookies to display the PowerBi graphic.</p><p class="optanon-cookie-policy-group-description text-center"><a class="optanon-toggle-display btn btn--transparent">Cookie settings</a></p><br></div>';

	// lang
	switch (l) {
		case 'fr':
			pwcrfrNewNodeForCookie.innerHTML = pwcfrTextForCookieNodeFR;
		break;
		case 'en':
			pwcrfrNewNodeForCookie.innerHTML = pwcfrTextForCookieNodeEN;
		break;

		default:
			pwcrfrNewNodeForCookie.innerHTML = pwcfrTextForCookieNodeFR;
	}

	//	Insertion de l'encart pour les cookies
	pwcrfrTargetParentDiv.insertBefore(pwcrfrNewNodeForCookie, pwcrfrTargetChildDiv);
};



// Cookie box si cookies perf pas activé
var _pwcfr_setInterval = "";
var _lang = "fr";
var pwcfr_fn_PowerbiIframeDetectForCookies = function(){
	var pwcfr_PowerbiIframeDetectForCookies = document.getElementById("pwcfr-powerbi-iframe-responsivity_iframe");
	var pwcfr_CookiesBox = document.getElementById("pwcrfrNewNodeForCookie");
	
	if( null == pwcfr_PowerbiIframeDetectForCookies ){
		if(null == pwcfr_CookiesBox){
			pwcfr_fn_CookieBoxPowerBi(_lang);
		}
	} else {
		$( "#pwcrfrNewNodeForCookie" ).remove();
		clearInterval(_pwcfr_setInterval);
	}
};


