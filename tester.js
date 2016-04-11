// LICENSE CODE ZON
(function(w, d){
'use strict'; /*jsling brwoser:true*/
function Player(mapper){
    if (!(this instanceof Player))
        return new Player(mapper);
    var p = mapper.obj;
    this.version = mapper.version(p);
    this.type = mapper.type(p).toLowerCase();
    this.video_src = mapper.video_src(p);
}

var players = {
    jwplayer6: {
        name: 'jwplayer',
        obj: w.jwplayer,
        version: function(p){
            return p.version;
        },
        type: function(p){
            return p().getRenderingMode();
        },
        video_src: function(p){
            return p().getPlaylistItem()['file'];
        }
    },
    jwplayer7: {
        name: 'jwplayer',
        obj: w.jwplayer,
        version: function(p){
            return p().version;
        },
        type: function(p){
            return p().getProvider().name;
        },
        video_src: function(p){
            return p().getPlaylistItem()['file'];
        }
    },
    flowplayer: {
        name: 'flowplayer',
        obj: w.flowplayer,
        version: function(p){
            return p.version;
        },
        type: function(p){
            return p().engine.engineName;
        },
        video_src: function(p){
            return p().video.src;
        }
    },
    videojs: {
        name: 'videojs',
        obj: w.videojs,
        version: function(p){
            return p.VERSION;
        },
        type: function(p){
            return this._player(p).techName_; // XXX find a method
        },
        video_src: function(p){
            return this._player(p).currentSrc();
        },
        _player: function(p){ // XXX ziv return first player only
            var ps = p.getPlayers();
            return ps[Object.keys(ps)[0]];
        }
    },
    // XXX need impl
    hola: {
        name: 'hola_player',
        obj: w.hola_player
    },
    native: {
        name: 'native',
        obj: null
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
    var player = Player(detect_player());
    console.log('Player');
    console.log('-------------------------------------');
    console.log('name          ', player.name);
    console.log('version       ', player.version);
    console.log(player);
}
main();
})(window, document);
