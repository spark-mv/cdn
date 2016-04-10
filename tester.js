// LICENSE CODE ZON
(function(w){
'use strict'; /*jsling brwoser:true*/
console.log('checker loaded');
var players = {
    jwplayer6: {
        name: 'jwplayer',
        version: function(){
            return '6.x';
        }
    },
    jwplayer7: {
        name: 'jwplayer',
        version: function(){
            return w.jwplayer().version;
        }
    },
    flowplayer: {},
    videojs: {},
    hola: {},
    native: {}
};
function detect_player(){
    if (w.jwplayer) /// XXX ziv this is too open assumption
    {
        var ver = w.jwplayer.version||w.jwplayer().version;
        console.log(ver);
        return ver;
    }
    else if (w.flowplayer)
        return players.flowplayer;
    else if (w.videojs)
        return players.videojs;
    else if (w.hola_player)
        return players.hola;
    else
    {
        console.log('implement look for native');
    }
}
function main(){
    var player = detect_player();
    
    //console.log(player.name, player.version())
}
main();
})(window);
