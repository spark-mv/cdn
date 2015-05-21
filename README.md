# Hola Video CDN

Hola CDN is client side JavaScript module that saves over 52% bandwidth, cutting your CDN costs by half.
This module is completly free for both non-commercial and commercial use.

This module also includes optional premium features to boost initial video load time (reduce start time), and reduce buffering events during video play, powered by the Hola CDN network. More info on these add-ons: http://hola.org/publishers#cdn

## Features

* Saves over 52% bandwidth of video serving, using smart client side chunked streaming management.
* Supports MP4 and FLV videos in progressive download mode.
* Allows psuedo streaming and seekiung also for servers not supporting FLV and MP4 psuedo streaming.
* Works with any existing CDN.
* Free for both non-commercial and commercial use.

## Usage

#### Static loading of client side module loader_cdn.js (preferred)
```html
<script src="http://hola.org/player/loader_cdn.js"></script>
```
#### Dynamic loading of client side module loader_cdn.js
```js
jQuery.getScript('http://hola.org/player/loader_cdn.js')
```
followed by
```js
hola_cdn.init()
```

Note: only load loader_cdn.js once (either static or dynamic)

### How to test in under a minute
You can test the client side mdoule quickly on your site, from the browser developer console, without enabling CORS on your web sever.
* Temporarily launch Chrome with command line paremeter `--disable-web-security`. For example: `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security` (location of your chrome.exe might be different)
* Go to your website's video page and launch the developer console (F12), then go to the actual console tab.
* In console, enter `jQuery.getScript('http://hola.org/player/loader_cdn.js')` followed by `hola_cdn.init()`. Your player will reload. Click play to start the video.
* To verify that client module is working, pause the video and the progress buffer should stop after 30 seconds. You will also see the video never loads past 30 seconds from the viewing location. This saves significant bandwidth.
* If you're curious, you can also switch to the 'network' tab and verify that the video requested from the server in chunks and not as a single, large file.
* Note: since this is only a simple demo, if you navigate to another video, you may need to reload the JS module.

## Requirements

In order to allow the client side module to send byte-range requests, please enable CORS on your web server and verify response headers to MP4/FLV files include the following headers:

* Access-Control-Allow-Headers: Range
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Allow-Origin: *
* Access-Control-Expose-Headers: Content-Range, Date, Etag
* Access-Control-Max-Age: 600

Supported players: JWPlayer V5+. Other players coming soon.

Supported browsers: Chrome (Win/Mac), IE 10, 11. Firefox support coming soong.

# Server side CDN

Hola Video CDN offers fast start times, minimal buffering and low cost.

The Hola CDN requires the use of the client CDN module.
