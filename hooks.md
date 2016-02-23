# Adding HolaCDN hooks to your own player

HolaCDN hooks are required for use with HolaCDN's JavaScript component. HolaCDN supports [most commercial players] (https://github.com/hola/cdn/blob/master/install.md#2-add-hola-js-to-your-website).

If you use your own Flash based player, you can use the code below to enable HolaCDN on your player. 

Note that the HolaCDN hooks do not affect the performance or functionality of your player. When the HolaCDN JavaScript is disabled, or not present on the page, your player will behave like it does without the hooks.

Choose your player and protocol from the list below: 

## HDS

* Your own player - use [HolaCDN OSMF] (https://github.com/hola/osmf)
* [VideoJS5] (https://github.com/hola/videojs5-osmf)

## HLS
* [FlashHLS] (https://github.com/hola/flashls)
* [Flowplayer] (https://github.com/hola/flowplayer-hlsjs)
* [VideoJS] (https://github.com/hola/videojs-contrib-hls)

## MP4
* Coming soon

# Testing

* To test the HolaCDN hooks with your player without HolaCDN, deploy the modified player to parts of your site and compare its performance to your baseline player. Results should be identical.
* To test the full HolaCDN solution working with your player, follow the [step by step instructions] (https://github.com/hola/cdn/blob/master/install.md)

If you have any questions, email cdn-help [at] hola [dot] org, or skype:holacdn
