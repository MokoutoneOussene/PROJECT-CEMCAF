"use strict";
var shTitle = (function () {
    var ctaBtn;
   
    function handleAnchorBtn(btnSelector) {
        //console.log("handleAnchorBtn()");

        // selectElem = document.getElementById(elemId);
        // selectElem.addEventListener('change',function(e){
        //     // e.preventDefault();
        //     var targetUrl = this.value;
        //     selectElem.setAttribute("disabled", "disabled");
        //     // window.location.replace(targetUrl);
        //     window.location.href = targetUrl;
        // });
        ctaBtn = document.querySelector(btnSelector);
        //console.log(ctaBtn, "ctaBtn");
        ctaBtn.addEventListener("click", function(event) {
            // console.log("clicked");
            event.preventDefault();
            var target = this.getAttribute("href");
            // console.log(target, "target");
            document.querySelector(target).scrollIntoView({ 
                behavior: "smooth",
                block: "start"
              });
        });
        
    }

    function init(args) {
        console.log("shTitle > init run", args);
        // selectElem = document.getElementById(args.elemId);
        if(args.parallax || document.querySelector("section.transparent-to-parallax")) {
            enableParallaxEffect();
        }
        if(args.btnSelector) {
            handleAnchorBtn(args.btnSelector);
        }
    }
    
    function findAncestorByClassName(element, className) {
        while ((element = element.parentElement) && !element.classList.contains(className));
        return element;
    }

    function enableParallaxEffect() {
        const parallaxBlock = document.createElement("div");
        parallaxBlock.classList.add("parallax-block");
        document.body.insertBefore(parallaxBlock, document.body.firstChild);
    }

    return {
        init: function(args) {
            if(document.readyState === "interactive" || document.readyState === "complete") {
                init(args || {});
            }
            document.addEventListener("DOMContentLoaded", function(event) {
                init(args || {});
            });
        }
    };
})();

/* Alter parallax bg behaviour to stay contained within the sh-title section, close to how native DPE aproaches parallax */
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(":not(.sh-title__img-panel-wrapper) > .sh-title__img-panel").forEach(e=>{Object.assign(e.parentNode.style,{position:"relative"});let t=document.createElement("div");t.classList.add("sh-title__img-panel-wrapper"),Object.assign(t.style,{position:"absolute",top:"0px",right:"0px",bottom:"0px",left:"0px",overflow:"hidden"}),e.parentNode.insertBefore(t,e),t.appendChild(e),Object.assign(e.style,{position:"absolute",transition:"translate 0.1s ease"});let s=()=>{let s=-t.getBoundingClientRect().top;e.style.transform=`translateY(${s}px)`};document.addEventListener("scroll",s),s()})});
