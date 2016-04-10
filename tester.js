// LICENSE CODE ZON
(function(w){
'use strict'; /*jsling brwoser:true*/
console.log('checker loaded');
var players = {
    jwplayer,
    flowplayer,
    videojs,
    hola_player
};
function detect_player(){
    if (w.jwplayer)
    {
        console.log('jwplayer');
    }
    else if (w.flowplayer)
    {
        console.log('flowplayer');
    }
    else if (w.videojs)
    {
        console.log('videojs');
    }
    else if (w.hola_player)
    {
        console.log('hola_player');
    }
}
detect_player();
})(window);
