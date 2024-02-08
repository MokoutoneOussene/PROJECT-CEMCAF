var shTerritorySelector = (function () {
    var selectElem;
   
    function handleDropdown(elemId) {
       

        selectElem = document.getElementById(elemId);
        selectElem.addEventListener('change',function(e){
            // e.preventDefault();
            var targetUrl = this.value;
            selectElem.setAttribute("disabled", "disabled");
            // window.location.replace(targetUrl);
            window.location.href = targetUrl;
        });
    }

    function init(args) {
        console.log('shTerritorySelector > init run',args);
        //selectElem = document.getElementById(args.elemId);
        handleDropdown(args.elemId);

    }
    return {
        init: init
    };

})();

