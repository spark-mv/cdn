# Progressive download

**_This module is completly free for both non-commercial and commercial use._**

## Hola CDN solution includes
* Free video analytics tool for your web-site 
* Free bandwidth saver solution for your player 
* Free [Hola player] (https://github.com/hola/player) (optional)

## Table of contents
* [Test Hola CDN in less than 5 minutes](#TestHola)
* [Integrate free tool for your web-site](#FreeTool)
* [Server side configuration](#ServerConfig)

## <a name="TestHola"></a>Test Hola CDN in less than 5 minutes
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
* In console, enter `jQuery.getScript('http://client.h-cdn.com/loader.js')`.

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
* To verify that client module is working, pause the video and the progress buffer should stop after 30 seconds. You will also see the video never loads past 30 seconds from the viewing location. This saves significant bandwidth.
* You can also switch to the 'network' tab and verify that the video requested from the server in chunks and not as a single, large file.

Note: If you navigate to another video, you may need to reload the JS module. When embedding the script into your page, you will require to do so.

## <a name="FreeTool"></a>Integrate free tool for your web-site

#### Static loading of client side module loader.js (preferred)
```html
<script src="http://client.h-cdn.com/loader.js?customer=demo"></script>
```
#### Dynamic loading of client side module loader.js with jQuery
```js
jQuery.getScript('http://client.h-cdn.com/loader.js?customer=demo')
```
followed by
```js
hola_cdn.init()
```
#### Dynamic loading of client side module loader.js without jQuery
```js
var script = document.createElement('script');
script.src = '//client.h-cdn.com/loader.js?customer=demo';
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

## <a name="ServerConfig"></a>Server side configuration

In order to allow the client side module to send byte-range requests, please enable CORS on the HTTP server(s) that is serving the video files and verify response headers to MP4/FLV files from this server(s) include the following headers:

* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Expose-Headers: Content-Range, Date, Etag, X-Cache
* Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
* Access-Control-Max-Age: 600
* Timing-Allow-Origin: *

For step by step instructions regarding how to enable CORS on different web servers, see the original [CORS documentation] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the instructions.

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
Timing-Allow-Origin: *
```
#### Using Amazon S3 

If you are using Amazon S3 to store videos, you should configure your bucket to allow cross-origin requests, you create a CORS configuration, an XML document with rules that identify the origins that you will allow to access your bucket, the operations (HTTP methods) will support for each origin, and other operation-specific information. You can add up to 100 rules to the configuration. You can add the XML document as the cors subresource to the bucket.

```
<CORSConfiguration>
 <CORSRule>
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>HEAD</AllowedMethod>
  <AllowedMethod>GET</AllowedMethod>
  <AllowedHeader>Content-Type</AllowedHeader>
  <AllowedHeader>Origin</AllowedHeader>
  <AllowedHeader>Accept</AllowedHeader>
  <AllowedHeader>Range</AllowedHeader>
  <AllowedHeader>Cache-Control</AllowedHeader>
  <ExposeHeader>Content-Range</ExposeHeader>
  <ExposeHeader>Date</ExposeHeader>
  <ExposeHeader>Etag</ExposeHeader>
  <MaxAgeSeconds>600</MaxAgeSeconds>
 </CORSRule>
</CORSConfiguration>
```

For step by step instructions regarding how to enable CORS on Amazon S3, see the [Amazon documentation] (http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).

For any questions, please contact cdn-help@hola.org.

