// LICENSE CODE ZON
(function(w, d){
'use strict'; /*jsling brwoser:true*/

function debug(){
    console.log.apply(console, arguments);
}

function Player(mapper){
    if (!(this instanceof Player))
        return new Player(mapper);
    console.log(mapper);
    this.m = mapper;
    this.o = mapper.obj;
}
Player.prototype.name = function() { return this.m.name; }
Player.prototype.version = function() { return this.m.version(this.o); }
Player.prototype.type = function() { return this.m.type(this.o).toLowerCase(); }
Player.prototype.video_src = function() { return this.m.video_src(this.o); }

var mappers = {
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
            return mappers.jwplayer6;
        else if (major=='7')
            return mappers.jwplayer7;
        throw new Error('jwplayer version '+major+' is not supported');
    }
    else if (w.flowplayer)
        return mappers.flowplayer;
    else if (w.videojs)
        return mappers.videojs;
    else if (w.hola_player)
        return mappers.hola;
    else if (d.getElementsByTagName('video').length)
        return mappers.native;
    throw new Error('unrecognized player');
}

function cors(url, handler){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
        handler(xhr);
    }
    xhr.onerror = function(){
        throw new Error('error requesting '+ url, xhr);
    }
    xhr.send();
}

function main(){
    debug('start');
    var player = Player(detect_player());
    debug('player', player);
    return;
    cors(player.video_src(), done);
    
    function output(){
        console.log('Player');
        console.log('-------------------------------------');
        console.log('name          ', player.name);
        console.log('version       ', player.version);
        console.log('type          ', player.type);
        console.log('video         ', player.video_src);
        console.log(player);
    }
    
    function done(xhr){
        console.log(xhr.getAllResponseHeaders());
        /*
        if (xhr.readyState!=4 || xhr.status!=200)
            return;
        console.log(xhr);
        
        console.log(xhr.responseText);
        output();
        */
    }
}
main();
})(window, document);
