# HLS/ FLV

**_FLV is coming soon._**

**_This module is completly free for both non-commercial and commercial use._**

## Hola CDN solution includes
* Free video analytics tool for your web-site 
* Free [Hola player] (https://github.com/hola/player) (optional)

## Table of contents
* [Test Hola CDN in less than 5 minutes] (https://github.com/hola/cdn/blob/master/hls.md#test-hola-cdn-in-less-than-5-minutes)
* [Integrate free tool for your web-site] (https://github.com/hola/cdn/blob/master/hls.md#integrate-free-tool-for-your-web-site)
* [Server side configuration] (https://github.com/hola/cdn/blob/master/hls.md#server-side-configuration)

## Test Hola CDN in less than 5 minutes
You can locally test the client side module quickly on your site, from the Chrome browser developer console.

#### Prerequisites
* Supported players: [Hola player] (https://github.com/hola/player), JWPlayer , VideoJS HTML5 players. 
* Supported browsers: Chrome (Win/Mac), IE 10, 11. Firefox support coming soon.

#### Flow
**Disable security**
* Exit Chrome and make sure no Chrome processes are running. 
* Temporarily launch Chrome with command line parameter `--disable-web-security`. For example:

  `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security`.

Notes:
* The location of your chrome.exe might be different. 
* You can also edit the Chrome shortcut to include the parameter. 
* In Mac, launch Chrome from a terminal window.

**Launch developer console**
* Go to your website's video page and launch the developer console (F12), then click the console tab.

**Load Hola CDN**
* In console, enter `jQuery.getScript('http://client.h-cdn.com/loader_demo.js')`.

**Init Hola CDN**

CDN init command varies according to the video player used:
  * For JWplayer 6+, VideoJS or Hola player, use `hola_cdn.init()`. 
  * For an old version of JWPlayer (V4,V5), use 
`hola_cdn.init({autostart: true, jwplayer_version: 'auto'})`
  * For Kernel player, use 
`hola_cdn.init({video_url: decodeURIComponent(flashvars.video_url), autostart: true})` 

**Play movie**
* Following the init command, the player will reload. Click play to start the video.

**Demo results**
* You can switch to the 'network' tab and verify that the video chunks are requested from multiple servers, and not from a single IP address.
* You can also use ‘getstats’ in console to see some statistics.

Note: If you navigate to another video, you may need to reload the JS module. When embedding the script into your page, you will require to do so.

## Integrate free tool for your web-site

#### Static loading of client side module loader_demo.js (preferred)
```html
<script src="http://client.h-cdn.com/loader_demo.js"></script>
```
#### Dynamic loading of client side module loader_demo.js with jQuery
```js
jQuery.getScript('http://client.h-cdn.com/loader_demo.js')
```
followed by
```js
hola_cdn.init()
```
#### Dynamic loading of client side module loader_demo.js without jQuery
```js
var script = document.createElement('script');
 script.src = '//client.h-cdn.com/loader_demo.js';
 script.type = 'text/javascript';
 document.getElementsByTagName('head')[0].appendChild(script);
 ```
followed by
```js
hola_cdn.init()
```

Notes:
* It is strongly recommended to NOT to host a local copy of the JS, as this will prevent any updates/bug fixes from reaching you.
* Only load loader_demo.js once (either static or dynamic)

## Server side configuration

In order to allow the client side module to send byte-range requests, please enable CORS on the HTTP server(s) that is serving the video files and verify response headers to MP4/FLV files from this server(s) include the following headers:

* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Expose-Headers: Content-Range, Date, Etag, X-Cache
* Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
* Access-Control-Max-Age: 600

For step by step instructions regarding hgow to enable CORS on different web servers, see the original [CORS documentation] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the instructions.

#### Testing server headers
```curl -v -H "Origin: <site origin link>" -X OPTIONS -H "Access-Control-Request-Headers: range" <video link>```  
Verify response:
```
HTTP/1.1 200 OK
Content-Length: 0
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: HEAD, GET, OPTIONS
Access-Control-Expose-Headers: Content-Range, Date, Etag
Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
Access-Control-Max-Age: 600
```

For any questions, please contact cdn-help [at] hola [dot] org.

