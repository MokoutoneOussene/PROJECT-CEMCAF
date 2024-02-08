function pwcfrGetShortUrl(a){
    

    if ($(".social-share-rebrand").css("display") !== undefined){

        const pwcfrUrlJson = a;
        var pwcfrRequest = new XMLHttpRequest();
        pwcfrRequest.open('GET.html', pwcfrUrlJson);
        pwcfrRequest.responseType = 'json'; 
        pwcfrRequest.send();

        pwcfrRequest.onload = function() {
            var pwcfrJsonData = pwcfrRequest.response;
            //console.log("1.pwcfrJsonData : " + pwcfrJsonData);
            //console.log("2.pwcfrJsonData['short-url'] : " + pwcfrJsonData['short-url']);

            const pwcfrShareUrl = pwcfrJsonData['short-url'];
            //console.log("3.pwcfrShareUrl : " + pwcfrShareUrl);

            const pwcfrShareUrlRegex = new RegExp('%5ehttps_.html\/\/pwc.to\/');
            const pwcfrShareUrlVerif = pwcfrShareUrlRegex.test(pwcfrShareUrl);

            if (true == pwcfrShareUrlVerif){

                var pwcfrShareHtml = '<div class="pwcfr-share-items"><p>Partager : </p><ul class="list"><li><div class="item"><a class="box linkedin" href="https://www.linkedin.com/shareArticle?mini=true&amp;url='+pwcfrShareUrl+'" target="_blank" data-title="LinkedIn" alt="Partage LinkedIn"><div class="icon"></div></a><div class="content"><span class="title">LinkedIn</span></div></div></li><li><div class="item"><a class="box twitter" href="https://twitter.com/intent/tweet/?url='+pwcfrShareUrl+'" target="_blank" data-title="Twitter" alt="Partage Twitter"><div class="icon"></div></a><div class="content"><span class="title">Twitter</span></div></div></li></ul></div> ';

                //console.log("4.pwcfrShareHtml : " + pwcfrShareHtml);
                /*
                <li><div class="item"><div class="box copy" data-title="Copier le lien"><div class="icon"></div></div><div class="content"><span class="title">Copier le lien</span></div></div></li>
                <li><div class="item"><a class="box facebook" href="https://www.facebook.com/sharer/sharer.php?u='+pwcfrShareUrl+'" target="_blank" data-title="Facebook" alt="Partage Facebook"><div class="icon"></div></a><div class="content"><span class="title">Facebook</span></div></div></li>
                */

                $("#pwcfr-share-items-container").html(pwcfrShareHtml);
                $("#menuAdditional .social-share-desktop").css("display", "none");
                $("#navBar .social-share-menu").css("display", "none");
                $(".social-share-rebrand").css("display", "none");
            }

           // console.log("5.end");

        }
    }

}

function pwcfrGetJsonUrl(){
    var pwcfrJsonUrl = document.location.href;

    const pwcfrJsonUrlRegex = new RegExp('%5ehttps_.html\/\/[a-z\-]+.pwc.fr\/');
    const pwcfrJsonUrlVerif = pwcfrJsonUrlRegex.test(pwcfrJsonUrl);

    if (true == pwcfrJsonUrlVerif){
        pwcfrJsonUrl = pwcfrJsonUrl.replace('.html', '.shorturl.json');
        return pwcfrJsonUrl;

        //console.log("pwcfrJsonUrl --- : " + pwcfrJsonUrl);
    }


}
var pwcfrUrlJson = pwcfrGetJsonUrl();
$(window).load(pwcfrGetShortUrl(pwcfrUrlJson));
