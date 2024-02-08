//Combined video video player for html5 VIDEO
var shVideoUi = (function () {
    var mobileBreakpoint = 990,
        $win,
        winWidth,
        isMobile,
        resizeTimer,
        rafTimer;

    //
    var videoCompElems, allYtPlayers, allHtml5Players;
    
    //Fallbacks
    function objectFitPolyfill() {
        console.log('objectFitPolyfill()...');

        if('objectFit' in document.documentElement.style === false) {
            console.log('no object fit support'); //leave comment until tested in DPE
            var imgs = document.querySelectorAll('.sh-video__preview img');

            for (var i = 0; i < imgs.length; i++) { 
                const container = imgs[i].parentNode;
                const imgUrl = imgs[i].getAttribute('src');

                container.style.backgroundImage = 'url(' + imgUrl + ')';
                container.classList.add('jsCompatObjectFit');
            }
        } 
    }

    //Common UI
    function displayPlayerUi(compElem) {

        compElem.classList.add('jsShowVideo');
        compElem.classList.add('jsHideLaunchBtn');
        compElem.classList.remove('jsHideCloseBtn');
        compElem.classList.add('jsShowCloseBtn');
        setTimeout(function() {
            compElem.classList.add('jsEnablePlayer');
        }, 1000);
    }

    function closePlayerUi(compElem) {

        compElem.classList.remove('jsEnablePlayer');
        compElem.classList.remove('jsShowVideoText');
        compElem.classList.remove('jsShowVideo');
        compElem.classList.remove('jsExpandPreview');
        compElem.classList.add('jsHideCloseBtn');
        compElem.classList.remove('jsShowCloseBtn');

        setTimeout(function() {
            compElem.classList.remove('jsHideLaunchBtn');
            compElem.classList.remove('jsHideTextContent');
        }, 500);
    }

    //YouTube API 
    function initYouTubeVideo() {
        
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var YT;
        var playersArr = [];

        document.addEventListener("DOMContentLoaded", function() {
            window.onYouTubeIframeAPIReady = function() { 
                YT = window.YT;
        
                
                // var allYtPlayers = document.querySelectorAll('.yt-video');
                for (var i = 0; i < allYtPlayers.length; i++) { 
                    var aPlayer = allYtPlayers[i]; 
                    var aPlayerId = aPlayer.getAttribute('id');
                    var ytVideoId = aPlayer.getAttribute("data-youtube-videoid"); 
                    // console.log(aPlayerId,'aPlayerId');
                    console.log(allYtPlayers[i],'allYtPlayers[i]');
                    console.log(
                        {
                            'ytVideoId':ytVideoId,
                            'aPlayerId':aPlayerId
                        }
                    );
                    var newPlayer = createPlayers(aPlayerId,ytVideoId);    
                    playersArr.push(newPlayer);
                }
            }
        });

        function createPlayers(playerId, videoId) { 
            //todo: specific ORIGIN ON api request
            
            var _player = new YT.Player(playerId, { 
                height: '390', 
                width: '640', 
                videoId: videoId,
                // playerVars: { 'autoplay': 1, 'controls': 0 } ,
                playerVars: { 
                    'modestbranding': 1, 
                    rel: 0 
                } ,
                events: { 
                    'onReady': onYTPlayerReady, 
                    'onStateChange': onYTPlayerStateChange 
                }
            });
            playersArr.push(_player);
        }

        function onYTPlayerReady(event) {
            
            var targetVideo = event.target;
            var targetWrapElem = event.target.m;
            var compElement = document.getElementById(targetWrapElem.getAttribute('data-comp-id'));
            var playBtnElem = document.querySelector('[data-video-target="'+ targetWrapElem.getAttribute('id') +'"][data-launch-video="true"]');
            var closeBtnElem = document.querySelector('[data-video-target="'+ targetWrapElem.getAttribute('id') +'"][data-close-video="true"]');

            playBtnElem.addEventListener('click', function(e) {
                 e.preventDefault();

                var compElem = document.getElementById(this.getAttribute('data-comp-id'));
                var transitionMode = 'panels';
                var tmpIsMobile = checkIsMobile();

                compElem.classList.add('jsHideTextContent');
                compElem.classList.add('jsHideLaunchBtn');
                compElem.classList.remove('jsHideCloseBtn');
                compElem.classList.add('jsShowCloseBtn');
                

                if(!tmpIsMobile) {
                    setTimeout(function() {
                        compElem.classList.add('jsShowVideoText');
                    }, 600);
                }

                setTimeout(function() {
                    compElem.classList.add('jsExpandPreview');
                }, 200);

                setTimeout(function() {
                    compElem.classList.add('jsShowVideo');
                    compElem.classList.add('jsEnablePlayer');
                    targetVideo.playVideo();
                }, 1200);
            });

            closeBtnElem.addEventListener('click', function(e) {   
                e.preventDefault();
                var compElem = document.getElementById(this.getAttribute('data-comp-id'));

                // //YouTube specific
                stopVideo(targetVideo);

                // //Handle common UI
                closePlayerUi(compElem);
            });

            //Reveal UI
            compElement.classList.add('jsYtVideoUiReady');
            
        }

        var done = false;
        function onYTPlayerStateChange(event) {
            //todo...??
            if (event.data == YT.PlayerState.PLAYING && !done) {
                //setTimeout(stopVideo, 6000);
                done = true;
            }
        }
        function stopVideo(player) {
            console.log('stopVideo > ', player);
            player.stopVideo();
        }
    }


    //HTML5 Video
    function initHtml5Video() {
        document.addEventListener("DOMContentLoaded", function() {
            
            // var allYtPlayers = document.querySelectorAll('.yt-video');
            for (var i = 0; i < allHtml5Players.length; i++) { 
                var aPlayer = allHtml5Players[i]; 
                var aPlayerId = aPlayer.getAttribute('id');
                var videoUrl = aPlayer.getAttribute('data-video-url'); 

                var newPlayer = setupHtml5Player(aPlayerId,videoUrl);    

            }  
        });

        function setupHtml5Player(aPlayerId,videoUrl) {
            //todo - improve to support multiple videos on the page (phase 2)
            
            const video =document.createElement('video');
            const akamaiInit = function(url) {
                const videoContainer = document.getElementById(aPlayerId+'Player')
                video.setAttribute('src', url)
                video.setAttribute('autoplay', false);
                video.setAttribute("controls", 'controls');
                video.setAttribute("controlsList", 'nodownload');
                video.setAttribute("width", '1280');
                video.setAttribute("height", '720');
                videoContainer.appendChild(video);
             }
            
            var playBtnElem = document.querySelector('[data-launch-video="true"][data-video-type="html5"]')
            var closeBtnElem = document.querySelector('[data-close-video="true"][data-video-type="html5"]');
            var compElement = document.getElementById(playBtnElem.getAttribute('data-comp-id'));
             
            playBtnElem.addEventListener('click', function(e) {
                e.preventDefault();
                var compElem = document.getElementById(this.getAttribute('data-comp-id'));
                var videoWrapElem = document.getElementById(this.getAttribute('data-video-target'));//data-video-target
                var targetVideo = videoWrapElem.getAttribute('data-video-url');
                var tmpIsMobile = checkIsMobile();

                document.getElementById(aPlayerId).innerHTML = '<div id="'+aPlayerId+'Player"></div>';
                akamaiInit(targetVideo);

                compElem.classList.add('jsHideTextContent');
                compElem.classList.add('jsHideLaunchBtn');
                compElem.classList.remove('jsHideCloseBtn');
                compElem.classList.add('jsShowCloseBtn');
                

                if(!tmpIsMobile) {
                    setTimeout(function() {
                        compElem.classList.add('jsShowVideoText');
                    }, 600);
                }

                setTimeout(function() {
                    compElem.classList.add('jsExpandPreview');
                }, 200);

                setTimeout(function() {
                    compElem.classList.add('jsShowVideo');
                    compElem.classList.add('jsEnablePlayer');

                    // //HTML5 video specific
                    video.play();
                }, 1200);
            });

            closeBtnElem.addEventListener('click', function(e) {
                
                e.preventDefault();
                var compElem = document.getElementById(this.getAttribute('data-comp-id'));
               
                // //HTML5 video specific
                video.pause();

                // //Handle common UI
                closePlayerUi(compElem);

            });

            //Reveal video UI
            compElement.classList.add('jsH5VideoUiReady');

        }
    }
    function checkIsMobile() {
        winWidth = window.innerWidth;
        if(typeof winWidth !== undefined && winWidth < mobileBreakpoint) {
            isMobile = true;
        } else {
            isMobile = false; 
        }
        return isMobile;
    }

    function init(args) {
        checkIsMobile();

        //Collect videos 
        allYtPlayers = document.querySelectorAll('.sh-video__yt-elem');
        if(allYtPlayers.length) {
            initYouTubeVideo();
        }

        allHtml5Players = document.querySelectorAll('.sh-video__html5-elem');
        if(allHtml5Players.length) {
            initHtml5Video();
        }

        objectFitPolyfill();
    }
    return {
        init: init
    };
})();

