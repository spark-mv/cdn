# Hola Video CDN

Hola CDN is a set of tools specifically designed for video delivery. It only handles video files; no HTML, CSS or other traffic types.

The Hola video CDN includes two components:

- Client side module - reduces bandwidth usage via smart player management - 100% Free to use
- Server side CDN - high performance, low cost CDN for video - (coming soon)

# Client side module - free to use

The client side module is a JS component which manages progressive MP4/FLV downloads, typically reducing badnwidth consumption between 20% to 40%.

The client solution works with any existing CDN or hosting solution you currently have in place.

Your results may be lower or higher, depending on the duration of your vidoes, user connection speeds and viewing habits. The easiest way to know is to simply test on a subset of your traffic!

## Usage

#### Static loading of client side module loader_cdn.js (preferred)
```html
<script src="[coming soon]"></script>
```
#### Dynamic loading of client side module loader_cdn.js
```js
jQuery.getScript('http://hola.org/player/loader_cdn.js')
```
Note: only load loader_cdn.js once (either static or dynamic)

### How to test in under a minute
You can test the client side mdoule quickly on your site, from the browser developer console, without enabling CORS on your web sever.
* Temporarily launch Chrome with command line paremeter `--disable-web-security`: `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security`
* Go to your video page and launch the developer console (F12), then go to the actual console tab.
* In console, enter `jQuery.getScript('http://hola.org/player/loader_cdn.js')` and hit enter. Your player will reload. Click play to start the video.
* To verify that client module is working, pause the video and the progress buffer should stop after 30 seconds. 
* If you're curious, you can also switch to the 'network' tab and verify that the video requested from the server in chunks and not as a single, large file.
* Note: since this is only a simple demo, if you navigate to another video, you may need to reload the JS module.

## Features

* Manages player download so that during play, only 30 seconds forward buffer is loaded
* Manages player download so that during pause, only 30 seconds forward buffer is loaded, and not entire file
* Enables seeking on implementations where seeking was previously not functional
* Smooth transition betweeh SD and HD modes

## Requirements

In order to allow the client side module to send byte-range requests, please enable CORS on your web server and verify response headers to MP4/FLV files include the following headers:

* Access-Control-Allow-Headers: Range
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Allow-Origin: *
* Access-Control-Expose-Headers: Content-Range, Date, Etag

Supported players: JWPlayer V5+. Other players coming soon.

Supported browsers: Chrome, Firefox, IE 10, 11

# Server side CDN

Hola Video CDN offers fast start times, minimal buffering and low cost.

The Hola CDN requires the use of the client CDN module.
