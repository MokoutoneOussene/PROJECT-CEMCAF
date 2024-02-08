var shTitle = (function () {
    var ctaBtn;

    function handleAnchorBtn(btnSelector) {
       console.log('handleAnchorBtn()');

        // selectElem = document.getElementById(elemId);
        // selectElem.addEventListener('change',function(e){
        //     // e.preventDefault();
        //     var targetUrl = this.value;
        //     selectElem.setAttribute("disabled", "disabled");
        //     // window.location.replace(targetUrl);
        //     window.location.href = targetUrl;
        // });
        ctaBtn = document.querySelector(btnSelector);
        console.log(ctaBtn,'ctaBtn');
        ctaBtn.addEventListener('click',function(e){
            console.log('clicked');
            e.preventDefault();
            var target = this.getAttribute('href');
            console.log(target,'target');
            document.querySelector(target).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
        });
        
    }

    function init(args) {
        console.log('shTitle > init run',args);
        //selectElem = document.getElementById(args.elemId);
        handleAnchorBtn(args.btnSelector);

    }
    return {
        init: init
    };
})();

/* Alter parallax bg behaviour to stay contained within the sh-title section, close to how native DPE aproaches parallax */
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(":not(.sh-title__img-panel-wrapper) > .sh-title__img-panel").forEach(e=>{Object.assign(e.parentNode.style,{position:"relative"});let t=document.createElement("div");t.classList.add("sh-title__img-panel-wrapper"),Object.assign(t.style,{position:"absolute",top:"0px",right:"0px",bottom:"0px",left:"0px",overflow:"hidden"}),e.parentNode.insertBefore(t,e),t.appendChild(e),Object.assign(e.style,{position:"absolute",transition:"translate 0.1s ease"});let s=()=>{let s=-t.getBoundingClientRect().top;e.style.transform=`translateY(${s}px)`};document.addEventListener("scroll",s),s()})});
