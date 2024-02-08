// Gestion du responsive pour les iframes Power BI
// v1.1
// Var globales
var _PwCFr_e1 = '';
var _PwCFr_e2 = '';
var _PwCFr_e3 = '';
var _PwCFr_e4 = '';


var _PwCFr_e1_id = '';
var _PwCFr_e2_id = '';
var _PwCFr_e3_id = '';
var _PwCFr_e4_id = '';

var _PwCFr_Pbi_Height = ''; // hauteur infographie
var _PwCFr_Pbi_Width = '';	// largeur infographie
var _PwCFr_Conteneur_width = ''; //Recup largeur physique de la fenêtre

var _PwCFr_t 				= ''; //stockIdTimeout
var _PwCFr_css_prefixes 	= ''; //gestion de prop CSS pour adapter à tous les navigateurs

var i= 0;

// Efface le texte indiquant le chargement en cours
function PwCFrIframeLoading(e) {
	
	this.setTimeout(function(){ e.innerHTML ='&nbsp;'; }, 3000);

}

// Dimensionne DIV conteneur-l1 et conteneur-l2 à l'arrivé sur la page
function PwcFrSetDivSize(e){
		
		e.style.height		=	_PwCFr_Pbi_Height  + 'px';
		e.style.width		=	_PwCFr_Pbi_Width + 'px';
		
}


// Redimensionne DIV conteneur-l2 si largeur : activer ensuite si conteneur-l1 < 960px
function PwcFrCalcDivNewSize(e){
		

		var PwcFr_calc_scale = _PwCFr_Conteneur_width / _PwCFr_Pbi_Width;
		e.style.height		=	( _PwCFr_Pbi_Height * PwcFr_calc_scale	) + 'px';
		e.style.width		=	( _PwCFr_Pbi_Width * PwcFr_calc_scale	) + 'px';

		this.console.log("pbi - PwcFrCalcDivNewSize : end --> " + e.style.width + " | " + e.style.height);
}

// Redimensionne DIV conteneur-l2 si largeur : activer ensuite si conteneur-l1 >= 960px
function PwcFrResetDivSize(e){
		

		e.style.height	=	(	_PwCFr_Pbi_Height + 0	) + 'px';
		e.style.width	=	(	_PwCFr_Pbi_Width + 0	) + 'px';

		this.console.log("pbi - PwcFrResetDivSize : end --> " + e.style.width + " | " + e.style.height);
}

// Redimentionne l'iframe et le div en fonction de la taille de la fenêtre
function PwCFrIframeAdaptSize(e1, e2){	
	

	var PwCFrTimeOut = this.setTimeout( function(){ 
		if(_PwCFr_Conteneur_width < _PwCFr_Pbi_Width){
			// redim iframe
			for(i=0; i < _PwCFr_css_prefixes.length; i++)
			{
				e1.style[_PwCFr_css_prefixes[i] + 'transform'] = 'scale( ' + _PwCFr_Conteneur_width / _PwCFr_Pbi_Width + ')';
			}

			// redim div pour supprimer espace vide suite a redim de l'iframe
			PwcFrCalcDivNewSize (e2);
		} else {
			// retour au format d'origine
			// redim iframe

			for(i=0; i < _PwCFr_css_prefixes.length; i++)
			{
				e1.style[_PwCFr_css_prefixes[i] + 'transform']	=	'scale(1)';
			}
			// redim conteneur
			PwcFrResetDivSize(e2);
		}
	}, 200);

	

	return PwCFrTimeOut; // Permet de stocker l'id du timeout

}

// Instruction à enclencher en cas d'événement qui change les dimensions. 
function PwCFrRedimEventAction(){
	

	if(_PwCFr_t !== ''){
		this.clearTimeout(_PwCFr_t); //evite que la fonction s'éxcute en continu lors du mouvement de redim
	}
	_PwCFr_Conteneur_width  = _PwCFr_e3.offsetWidth;
	_PwCFr_t = PwCFrIframeAdaptSize(_PwCFr_e1, _PwCFr_e2);

	
}



// Fonction des event 
// loading et mise à l'échelle au chargement
var PwcFrPowerBiIframeResponsivity_OnLoadEvent = function(){
	this.console.log("load event START");
	PwCFrIframeLoading(_PwCFr_e4);
	PwCFrIframeAdaptSize(_PwCFr_e1, _PwCFr_e2);
	this.console.log("load event END");
}

// mise à l'échelle au redimentionnement de la fenêtre du navigateur
var PwcFrPowerBiIframeResponsivity_OnResizedEvent = function(){
	this.console.log("Resize event START");
	PwCFrRedimEventAction();
	this.console.log("Resize event END");
}

// mise à l'échelle au changement d'orientation du terminal : Portrait <> Paysage
var PwcFrPowerBiIframeResponsivity_OrientationChangeEvent = function(){
	this.console.log("OrientationChange event START");
	PwCFrRedimEventAction();
	this.console.log("OrientationChange event END");
}

// Ajout des events
function PwcFrPowerBiIframeResponsivity_addEvent(e){
	// Init event
	if (e.addEventListener) {
		//e.addEventListener('load',			PwcFrPowerBiIframeResponsivity_OnLoadEvent, 			false); --> Plus utile en jquery qui charge en load event
		e.addEventListener('resize',			PwcFrPowerBiIframeResponsivity_OnResizedEvent, 			false);
		e.addEventListener('orientationchange',	PwcFrPowerBiIframeResponsivity_OrientationChangeEvent, 	false);
		this.console.log("addEventListener event");
	} else if(e.attachEvent) {
		//e.attachEvent('onload',				PwcFrPowerBiIframeResponsivity_OnLoadEvent, 			false); --> Plus utile en jquery qui charge en load event
		e.attachEvent('onresize',				PwcFrPowerBiIframeResponsivity_OnResizedEvent, 			false);
		e.attachEvent('orientationchange',		PwcFrPowerBiIframeResponsivity_OrientationChangeEvent, 	false);
		this.console.log("attachEvent event");
	} else {/**/
		//e.onload = 			PwcFrPowerBiIframeResponsivity_OnLoadEvent;	 --> Plus utile en jquery qui charge en load event
		e.onresize = 			PwcFrPowerBiIframeResponsivity_OnResizedEvent;
		e.orientationchange = 	PwcFrPowerBiIframeResponsivity_OrientationChangeEvent;
		this.console.log("e.event");
	}/**/

	
}

// Initialisation de la func responsive
function PwcFrPowerBiIframeResponsivity_init(e){ // e=targeted element

	//init var
	_PwCFr_e1 				= e.document.getElementById('pwcfr-powerbi-iframe-responsivity_iframe');
	_PwCFr_e2 				= e.document.getElementById('pwcfr-powerbi-iframe-responsivity_conteneur-l2');
	_PwCFr_e3 				= e.document.getElementById('pwcfr-powerbi-iframe-responsivity_conteneur-l1');
	_PwCFr_e4				= e.document.getElementById('pwcfr-powerbi-iframe-responsivity_chargement');

	_PwCFr_Pbi_Height 		= parseInt(	_PwCFr_e1.height, 		10	); // hauteur infographie
	_PwCFr_Pbi_Width		= parseInt( _PwCFr_e1.width, 		10	);	// largeur infographie
	_PwCFr_Conteneur_width 	= parseInt( _PwCFr_e3.offsetWidth, 	10	); //Recup largeur physique de la fenêtre

	_PwCFr_t 				= ''; //stockIdTimeout	
	_PwCFr_css_prefixes 	= new Array ('-o-', '-moz-', '-webkit-', '-ms-', '-khtml-', ''); //esttion de prop CSS pour adapter à tous les navigateurs

	this.console.log("pbi - e : " + e);
	this.console.log("pbi - _PwCFr_e1 : " + _PwCFr_e1);
	this.console.log("pbi - _PwCFr_Pbi_Height : " + _PwCFr_Pbi_Height);
	this.console.log("pbi - _PwCFr_Pbi_Width : " + _PwCFr_Pbi_Width);
	
	// Définit  taille du conteneur l2 par rapport à la taille de l'iframe
	PwcFrSetDivSize(_PwCFr_e2);
	this.console.log("PwcFrPowerBiIframeResponsivity_init : this --> " + this);
	this.setTimeout(PwcFrPowerBiIframeResponsivity_addEvent(this), 500);
	
	//	Ajout pour gérer le conflit avec l'event jqueryload
	this.setTimeout(PwcFrPowerBiIframeResponsivity_OnLoadEvent(), 500);
}

// Génération du code DOM 
// l --> Language: "fr" ou "en"
// w --> width
// h --> height
// u --> URL
function PwcFrPowerBiIframeResponsivity(l,w,h,u){
	
	
	var loading_msg = new Array();
	loading_msg['en'] = 'Loading Power BI graphs...';
	loading_msg['fr'] = 'Chargement des graphiques Power BI en cours...';
	
	//init var
	var PwCFr_e0_id = 'pwcfr-powerbi-iframe'
	_PwCFr_e1_id = 'pwcfr-powerbi-iframe-responsivity_iframe';
	_PwCFr_e2_id = 'pwcfr-powerbi-iframe-responsivity_conteneur-l2';	
	_PwCFr_e3_id = 'pwcfr-powerbi-iframe-responsivity_conteneur-l1';
	_PwCFr_e4_id = 'pwcfr-powerbi-iframe-responsivity_chargement';
	
	
	var node_0 = this.document.createElement("p");
	this.console.log('node_0 : ' + node_0);
	
	node_0.setAttribute("id", _PwCFr_e4_id);
	node_0.setAttribute("align", "center");
	this.document.getElementById(PwCFr_e0_id).appendChild(node_0);
	this.document.getElementById(_PwCFr_e4_id).innerHTML = loading_msg[l];
		
	var node_1 = this.document.createElement("div");
	node_1.setAttribute("id", _PwCFr_e3_id);
	this.document.getElementById(PwCFr_e0_id).appendChild(node_1);
	
	var node_2 = this.document.createElement("div");
	node_2.setAttribute("id", _PwCFr_e2_id);
	this.document.getElementById(_PwCFr_e3_id).appendChild(node_2);
			
	var node_3 = this.document.createElement("iframe");
	node_3.setAttribute("id", _PwCFr_e1_id);
	node_3.setAttribute("src", u);
	node_3.setAttribute("width", w);
	node_3.setAttribute("height", h);
	node_3.setAttribute("style", "transform: scale(1);");
	node_3.setAttribute("allowfullscreen", "true");
	this.document.getElementById(_PwCFr_e2_id).appendChild(node_3);
	
	
	
	// initialisation
	this.console.log("PwcFrPowerBiIframeResponsivity : this --> " + this);
	this.setTimeout(PwcFrPowerBiIframeResponsivity_init(this), 500);
}






