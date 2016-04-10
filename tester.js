// LICENSE CODE ZON
(function(w, d){
'use strict'; /*jsling brwoser:true*/
console.log('checker loaded');
var players = {
    jwplayer6: {
        name: 'jwplayer',
        version: function(){
            return w.jwplayer.version;
        }
    },
    jwplayer7: {
        name: 'jwplayer',
        version: function(){
            return w.jwplayer().version;
        }
    },
    flowplayer: {
        name: 'flowplayer',
        version: function(){
            return w.flowplayer.version;
        }
    },
    videojs: {
        name: 'videojs',
        version: function(){
            return w.videojs.VERSION;
        }
    },
    hola: {
        name: 'hola_player',
        version: function(){
            // XXX ziv no impl for version in hola_player
            return 'unkwon';
        }
    },
    native: {
        name: 'native',
        version: function(){
            return null;
        }
    }
};
function detect_player(){
    if (w.jwplayer)
    {
        var ver = w.jwplayer.version||w.jwplayer().version;
        if (!ver)
            throw new Error('unknown version of jwplayer detected');
        var major = ver.match(/\d+/);
        if (!major)
            throw new Error('unable to determine jwplayer version');
        var major = major[0];
        if (major=='6')
            return players.jwplayer6;
        else if (major=='7')
            return players.jwplayer7;
        throw new Error('jwplayer version '+major+' is not supported');
    }
    else if (w.flowplayer)
        return players.flowplayer;
    else if (w.videojs)
        return players.videojs;
    else if (w.hola_player)
        return players.hola;
    else if (d.getElementsByTagName('video').length)
        return players.native;
    throw new Error('unrecognized player');
}
function main(){
    var player = detect_player();
    console.log(player.name, player.version());
}
main();
})(window, document);
