# Hola Video CDN

Hola CDN was specifically designed for video delivery. Fast start times, minimal buffering and low cost. It only handles video files; no HTML, CSS or other traffic types.

The Hola CDN includes two components

- FREE Client side module - reduces bandwidth usage via smart player management. Also, required for server side CDN.
- Server side CDN - high performance, low cost CDN for video - (coming soon)

# Client side module - free to use

The client side module is a JS component which manages progressive MP4/FLV downloads, typically reducing badnwidth consumption by ~20%. 
Your results may be lower hor higher, depending on the duration of your vidoes, connection speeds, and viewing habits. The easiest way to know is to simply test on a subset of your traffic!

## usage

#### Static loading of client side module loader_cdn.js (preferred)
```html
<script src="//hola.org/loader_cdn.js"></script>
```
#### Dynamic loading of client side module loader_cdn.js
Note: only load loader_cdn.js once (either static or dynamic)
```js
jQuery.getScript('http://hola.org/player/loader_cdn.js')
```

### How to test in under a minute
To test the client side mdoule quickly from the browser developer console, without enabling CORS on your websever:
* Temporarily launch Chrome with command line paremeter --disable-web-security (e.g. "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security).
* Go to your video page and launch the developer console (F12), then go to the actual console tab.
* In console, enter jQuery.getScript('http://hola.org/player/loader_cdn.js') and hit enter. Your player will reload. Click play to start the video.
* To verify that everything is working correctly, pause the video and the progress buffer should stop after 30 seconds. 
* If you're curious, you can also switch to the 'network' tab and see the video requested from the server in chunks and not as a single, large file.


## Features

* Manages player download so that only 30 seconds forward buffer is loaded, during play or on pause
* Enables seeking on implementations where seeking was previously not functional
* Smooth transition betweeh SD and HD modes

## Requirements

In order to allow the client side module to send byte-range requests, please enable CORS on your web server and verify response headers to MP4/FLV files include the following headers:

* Access-Control-Allow-Headers: Range
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Allow-Origin: *
* Access-Control-Expose-Headers: Content-Range, Date, Etag


Supported players: JWPlayer V6+

Supported browsers: Chrome, Firefox, IE 10,11

# Server side CDN - coming soon
