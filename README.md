# Hola Free Bandwidth Saver for Video 

Hola Bandwidth Saver is JavaScript module that saves over 52% bandwidth, cutting your CDN costs by half. It's free and extremely easy to [test in under 5 minutes] (https://github.com/hola/cdn#test-it-in-under-a-minute-with-chrome).

**_This module is completly free for both non-commercial and commercial use._**

In addition to the free functionality, the module includes optional features to boost initial video load time (reduce start time), and reduce buffering events during video play, powered by the Hola CDN network. More info on [the Hola website] (http://hola.org/publishers#cdn)

## Features

* Saves over 52% bandwidth of video serving, using smart client side chunked streaming management.
* Supports MP4 videos in progressive download mode.
* Allows psuedo streaming and seekiung also for servers not supporting psuedo streaming.
* Works with any existing kind of video hosting, including CDNs.
* Free for both non-commercial and commercial use.

## Usage

#### Static loading of client side module loader_cdn.js (preferred)
```html
<script src="http://hola.org/player/loader_cdn.js"></script>
```
#### Dynamic loading of client side module loader_cdn.js with jQuery
```js
jQuery.getScript('http://hola.org/player/loader_cdn.js')
```
followed by
```js
hola_cdn.init()
```
#### Dynamic loading of client side module loader_cdn.js without jQuery
```js
var script = document.createElement('script');
 script.src = '//hola.org/player/loader_cdn.js';
 script.type = 'text/javascript';
 document.getElementsByTagName('head')[0].appendChild(script);
 ```
followed by
```js
hola_cdn.init()
```

Note: only load loader_cdn.js once (either static or dynamic)

### Test it in under 5 minutes using Chrome
You can test the client side mdoule quickly on your site, from the browser developer console.
* First, make sure you meet the [requirements] (https://github.com/hola/cdn#requirements)
* Exit Chrome and make sure no Chrome processes are running. Then, temporarily launch Chrome with command line paremeter `--disable-web-security`. For example: `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security`. Note that the location of your chrome.exe might be different. You can also edit the Chrome shortcut to include the parameter. In Mac, launch Chrome from a terminal window.
* Go to your website's video page and launch the developer console (F12), then click the console tab.
* In console, enter `jQuery.getScript('http://hola.org/player/loader_cdn.js')` followed by `hola_cdn.init()`. Your player will reload. Click play to start the video.
* To verify that client module is working, pause the video and the progress buffer should stop after 30 seconds. You will also see the video never loads past 30 seconds from the viewing location. This saves significant bandwidth.
* If you're curious, you can also switch to the 'network' tab and verify that the video requested from the server in chunks and not as a single, large file.
* Note: since this is only a simple demo, if you navigate to another video, you may need to reload the JS module.

## Requirements

Supported video types: MP4, progressive download. FLV support coming soon.

Supported players: [Hola Player] (https://github.com/hola/player), JWPlayer V6+, VideoJS HTML5 players. Other players coming soon.

Supported browsers: Chrome (Win/Mac), IE 10, 11. Firefox support coming soong.

## Server side configuration

In order to allow the client side module to send byte-range requests, please enable CORS on your web server and verify response headers to MP4/FLV files include the following headers:

* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Expose-Headers: Content-Range, Date, Etag
* Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
* Access-Control-Max-Age: 600

For step by step instructions regarding hgow to enable CORS on different web servers, see the original [CORS documentation] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the instructions.

### Testing server headers
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

# Hola video CDN

Hola Video CDN offers fast start times, minimal buffering and low cost.

The Hola CDN requires the use of the client CDN module.
