# Introduction

Adding HolaCDN to your website is a simple process which can be completed in 15 minutes:

1. [Sign up for a new account](#signupAccount)
2. [Add the Hola JS to your website](#AddHolaJS)
3. [Configure your video server](#ConfigureVideoServer)
4. [Allow HolaCDN to collect statistics and download content](#CollectStatsDownloadContent)
5. [Enable HolaCDN on your machine for local testing](#EnableHolaLocally)
6. [Redirect your user's traffic to use HolaCDN or enable statistics collection](#RedirectTraffic)

Use the [Google Doc] (http://bit.ly/HolaCDN_ImplementationGuide) or [PDF](http://bit.ly/HolaCDN_ImplementationGuidePDF) version of this guide for additional screenshots and information.

# <a name="signupAccount"></a>1. Sign up for a new account

Sign up for [a new HolaCDN account][1], and note your customer ID which will be sent to you following the registration.

On the HolaCDN portal, you can configure your HolaCDN system and see user experience statistics such as video start time, buffering, video quality and more. Curious? Visit the [demo account][2].

# <a name="AddHolaJS"></a>2. Add Hola JS to your website

Note: This guide is for desktop browsers. To enable HolaCDN on your native apps, see the [Android] (https://github.com/hola/android_sdk) and/or [iOS] (https://github.com/hola/ios_sdk) github pages.

HolaCDN requires a client-side JavaScript in order to collect video statistics. The JavaScript is loaded asynchronously, and will not affect your page load time. For best results, HolaCDN recommends that the script be added to the 'head' element of the video HTML page.

Choose the correct implementation for your existing player. You can enable HolaCDN on:

* Any HTML5 based video player - [Native, JW player, Flowplayer](#HTML5Players) and others.
* Flash based players such as [JWPlayer](#JWPlayer), [FlowPlayer](#Flowplayer) or [VideoJS](#VideoJS).
* The [Hola VideoJS-based player](#HolaPlayer).
* [Your own Flash based player][3].

Add the JS code to your web page. It is safe to add this code because it is disabled by default on the server side to protect from accidental mass deployment. After the code is on your web pages, you will enable HolaCDN on your machine for [local testing](#EnableHolaLocally) and then gradually deploy to [real users](#RedirectTraffic).

Examples provided below use MP4 video, but same syntax is used for HLS (M3U8) or HDS (F4M) videos.

## <a name="HolaPlayer"></a>2.1 Using Hola VideoJS player
HolaCDN can work with your existing player, but we recommend using the Hola player. It is a VideoJS based video player with [additional features][4]. It is completely free to use and offers best performance and compatibility with HolaCDN. Again, this is totally optional.

1) Add Hola scripts to your page as follows:

```
<head>
...
    <script src="//cdn.jsdelivr.net/hola_player/1.0.2/hola_player.js?customer=XXXXX"></script>
...
</head>
```
* Replace XXXXX with your HolaCDN customer ID.

2) Create a video tag with the following classes: ```video-js vjs-default-skin```

```
  <video class="video-js vjs-default-skin" poster="//example.org/poster.jpg" 
  width="640" height="360" controls>
  <source src="//example.org/video.mp4" type="video/mp4">
  </video>
```

* Replace *example.org/poster.jpg* and *example.org/video.mp4* with your own links.

3) Add the following script after video tag to initialize Hola player:

```
  <script>
    (function(){
        window.hola_player();
    })();
  </script>
  .
  .
</body>
```

#### Live examples:
* Hola Player/Flash without HolaCDN: [MP4][5] | [HLS][6] | [HDS][7]
* Hola Player/Flash with HolaCDN: [MP4][8] | [HLS][9] | [HDS][10]

4) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

## <a name="HTML5Players"></a>2.2 HTML5 video players

When integrating with an HTML5 source, HolaCDN attaches itself to a <video> tag. A video tag can be embedded in the raw HTML itself, or it can be dynamically created by your video player (e.g. VideoJS).

1) Add the script to your page as follows:

```
<html>
...
<video src="//example.org/myVideo.mp4" controls></video>
<script async crossorigin="anonymous"  src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
<html>
```

* Replace XXXXX with your HolaCDN customer ID.

#### Live examples:
* HTML5 video Without HolaCDN [Chrome native][11] | [Flowplayer][12] | [JW player][13]
* HTML5 video With HolaCDN [Chrome native][14] | [Flowplayer][15] | [JW player][16]

2) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="VJS+Shaka"></a>2.2.1 HTML5/MPEG-DASH played with Shaka player
If you play MPEG-DASH videos over HTML5 tech with Shaka player, you need to perform the following steps:

1) Add the script to your page as follows:

```
<html>
...
<video src="//example.org/myVideo.mp4" controls></video>
<script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
<html>
```

* Replace XXXXX with your HolaCDN customer ID.

2) Replace Shaka player with Hola-enabled version:

* Download (using **right click > save link as**) the Hola-enabled version of Shaka player and place it on your server:
  - [Shaka 1.6.x][36]
* Replace original Shaka player with Hola-enabled version:
```
<script type="text/javascript" src="//example.com/static/hola-shaka-player-compiled.js"></script>
```

#### Live examples:
* MPEG-DASH without HolaCDN: [Shaka][37], [VideoJS+Shaka][39]
* MPEG-DASH with HolaCDN: [Shaka][38], [VideoJS+Shaka][40]

3) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="JWPlayer+HolaHLS"></a>2.2.2 HTML5/HLS played by JWPlayer with HolaHLS provider
In order to play HLS videos using HTML5 technology with HolaHLS provider in JWPlayer, you need to perform the following steps:

1) Add relevant scripts to your page and register HolaHLS provider as follows:

```
<html>
  ...
  <script src="//content.jwplatform.com/path/to/jwplayer.js"></script>
  <script>jwplayer.key="XXXxxxXXXxxxXXXxxxXXX==";</script>
  <script src="//client.h-cdn.com/svc/cdn/pub/hls.js"></script>
  <script src="//client.h-cdn.com/svc/cdn/pub/jwplayer_hls_provider.js"></script>
  <script type="text/javascript">
    window.jwplayer.api.registerProvider(window.jwplayer_hls_provider);
  </script>
  ...
</html>
```

2) Verify everything works right as expected.

3) Move **hls.js** and **jwplayer_hls_provider.js** to be hosted by your server instead of **client.h-cdn.com**. You can download (using **right click > save link as**) the scripts from here:
  - [hls.js][46]
  - [jwplayer_hls_provider.js][47]

4) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="FlowPlayer+HolaHLS"></a>2.2.3 HTML5/HLS played by Flowplayer with HolaHLS provider
In order to play HLS videos using HTML5 technology with HolaHLS provider in flowplayer, you need to perform the following steps:

1) Add relevant scripts to your page and register HolaHLS provider as follows:

```
<html>
  ...
  <script src="//releases.flowplayer.org/6.0.5/flowplayer.min.js"></script>
  + <script src="//client.h-cdn.com/bext/svc/cdn/pub/hls.js"></script>
  + <script src="//client.h-cdn.com/bext/svc/cdn/pub/flowplayer_hls_engine.js"></script>
  <script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=xxx"></script>
  ...
</html>
```

2) Verify everything works right as expected.

3) Move **hls.js** and **flowplayer_hls_engine.js** to be hosted by your server. You can download (using **right click > save link as**) the scripts from here:
  - [hls.js][46]
  - [flowplayer_hls_engine][48]

4) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="JWPlayer+HolaHLS"></a>2.2.4 HTML5/HLS played by VideoJS with HolaHLS provider
In order to play HLS videos using HTML5 technology with HolaHLS provider in VideoJS, you need to perform the following steps:

1) Add relevant scripts to your page and register HolaHLS provider as follows:

```
<html>
  ...
  <script src="//your.cdn/path/to/video.min.js"></script>
  <script src="//client.h-cdn.com/svc/cdn/pub/hls.js"></script>
  <script src="//client.h-cdn.com/svc/cdn/pub/vjs_hls_provider.js"></script>
  <script type="text/javascript">
    window.HolaProviderHLS.attach(window, videojs, window.Hls);
  </script>
  ...
</html>
```

2) Verify everything works right as expected.

3) Move **hls.js** and **vjs_hls_provider.js** to be hosted by your server instead of **client.h-cdn.com**. You can download (using **right click > save link as**) the scripts from here:
  - [hls.js][46]
  - [vjs_hls_provider.js][49]

4) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="ClapprPlayer"></a>2.2.5 HTML5/HLS played by Clappr Player
On top of including the script as shown in the begining, you also need to do the following step:

1) Save clappr player instance to a location, by default `window.hola_cdn.clappr`

```
var player = new Clappr.Player({source: "http://your.video/here.mp4", parentId: "#player"});
if (window.hola_cdn)
	window.hola_cdn.clappr = player;
else
	window.hola_cdn = {clapper: player};
```	

2) Verify everything works right as expected.

3) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

## 2.3 Flash based video players

### <a name="JWPlayer"></a>2.3.1 JW Player

If your site uses JW Player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
</head>
```
* Replace XXXXX with your HolaCDN customer ID.

2) Replace your JW player SWF with the Hola-enabled version.

Select the URL for your version of JWPlayer:

| Version | URL |
| ------- | --- |
| V6.12.4xx | `//player.h-cdn.com/jwplayer.flash.6_12_4956.swf` |
| V7.1.0xx | `//player.h-cdn.com/jwplayer.flash.7_1_0.swf` |
| V7.1.4xx | `//player.h-cdn.com/jwplayer.flash.7_1_4.swf` |
| V7.2.4xx | `//player.h-cdn.com/jwplayer.flash.7_2_4.swf` |
| V7.3.3xx | `//player.h-cdn.com/jwplayer.flash.7_3_3.swf` |
| V7.3.4xx | `//player.h-cdn.com/jwplayer.flash.7_3_4.swf` |
| V7.4.3xx | `//player.h-cdn.com/jwplayer.flash.7_4_3.swf` |
| V7.4.4xx | `//player.h-cdn.com/jwplayer.flash.7_4_4.swf` |
| V7.5.0xx | `//player.h-cdn.com/jwplayer.flash.7_5_0.swf` |
| V7.6.0xx | `//player.h-cdn.com/jwplayer.flash.7_6_0.swf` |
| V7.7.0xx | `//player.h-cdn.com/jwplayer.flash.7_7_0.swf` |
| V7.7.1xx | `//player.h-cdn.com/jwplayer.flash.7_7_1.swf` |
| V7.7.4xx | `//player.h-cdn.com/jwplayer.flash.7_7_4.swf` |
| V7.8.1xx | `//player.h-cdn.com/jwplayer.flash.7_8_1.swf` |
| V7.8.4xx | `//player.h-cdn.com/jwplayer.flash.7_8_4.swf` |
| V7.8.6xx | `//player.h-cdn.com/jwplayer.flash.7_8_6.swf` |
| V7.8.7xx | `//player.h-cdn.com/jwplayer.flash.7_8_7.swf` |
| V7.9.0xx | `//player.h-cdn.com/jwplayer.flash.7_9_0.swf` |
| V7.9.1xx | `//player.h-cdn.com/jwplayer.flash.7_9_1.swf` |

Continue by configuring ```{flashplayer: <url>}``` option in ```jwplayer(‘video-container’).setup(opt)``` call:
```
jwplayer(‘video-container’).setup({
    file: ‘//cdn.example.com/popular_videos/example.mp4’,
    flashplayer: ‘//player.h-cdn.com/<new-version-flashplayer>.swf’,
    primary: ‘flash’,
    width: 640,
    height: 360
});
```

* Replace *cdn.example.com/popular_videos/example.mp4* with your own link. Changing the SWF does not impact the user interface of the player.
* Note: if you have multiple jwplayers playing on the same page, make sure they use the same version of hola-enabled swf file

#### Live examples:
* JWPlayer/Flash without HolaCDN: [MP4][21] | [HLS][22] | [HDS][23]
* JWPlayer/Flash with HolaCDN: [MP4][33] | [HLS][34] | [HDS][35]

3) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="VideoJS"></a>2.3.2 VideoJS

If your site uses a videoJS based player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
</head>
```

* Replace XXXXX with your HolaCDN customer ID.

2) [Flash/HLS only] If you play HLS videos with flash technology on your site, you also need to replace videojs SWF with the Hola-enabled version.

* Configure videojs to use the new version.
```
<script type="text/javascript" src="//example.com/static/video.js"></script>
<script type="text/javascript">
  videojs.options.flash.swf = "//client.h-cdn.com/bext/svc/cdn/pub/videojs-flashls.swf";
</script>
```

* Replace *example.com/static/video.js* with your own link. Changing the SWF does not impact the user interface of the player.

#### Live Examples:
* VJS5 without HolaCDN: [MP4][25]
* VJS5 with HolaCDN: [MP4][26]

3) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

### <a name="Flowplayer"></a>2.3.3 Flowplayer (HLS only; HDS, MP4 coming soon)

If your site plays HLS video using Flowplayer with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
</head>
```

* Replace XXXXX with your HolaCDN customer ID.

2) Replace your Flowplayer SWF with the Hola-enabled version. 

```
var container = document.getElementById('video-container');
var player = flowplayer(container, {
   swf: '//client.h-cdn.com/flowplayerhls.6.0.5.hola.swf',
   swfHls: '//client.h-cdn.com/flowplayerhls.6.0.5.hola.swf',
   clip: {
       sources: [{
           type: "application/x-mpegurl",
           src:  "//cdn.example.com/popular_videos/example.m3u8",
       }]
   }
});
```
Both ```swf``` and ```swfHls``` are changed to the same file. Changing the SWF does not impact the user interface of the player.

3) Done adding the code? You can [test it locally on your browser](#EnableHolaLocally) or continue to [configuring the server side](#ConfigureVideoServer).

# <a name="ConfigureVideoServer"></a>3. Configure your video server 

## <a name="CORSSettings"></a>3.1 CORS settings

Hola free bandwidth saver and CDN work by requesting your MP4/FLV/WEBM/TS files from the video server in chunks. For this to work, certain HTTP headers need to be enabled. [Read more][28] about CORS configuration in HolaCDN.

If you do not implement these settings, HolaCDN will still work but performance will be degraded. As such, see [how to verify and configure CORS][29].

## 3.2 Handling redirects

In some implementations, the first video URL is redirected to another URL. In this case, make sure that:
- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.
- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

# 4. <a name="CollectStatsDownloadContent"></a>Allow HolaCDN to collect statistics and download content

HolaCDN’s servers need to download an initial copy of the video from your infrastructure to serve to future users. HolaCDN uses a 'pull' model. There is no need to proactively push content to HolaCDN. The same server will also be used for statistics gathering.

To configure where to download a copy from:

1. Open [your HolaCDN account][1]. 
2. Go to the configuration page ('conf').
3. You will arrive to the default zone ('gen'). In this zone, click "Insert a new video source group" and enter one or more video source(s). For example, if your video URL looks like *http://video.myserver.com/static/mp4/video.mp4*, the video source is *video.myserver.com*. For HDS/HLS video, enter server(s) for manifests (M3U8/F4M) and for video chunks (TS or Frag).

* If your video servers use content protection algorithms, [check out the advanced settings](#AdvancedConfig).

* To simplify testing, HolaCDN is configured with video source '*'. Make sure to change it to your real video source(s). 

Finished? You can now [test HolaCDN locally on your PC](#EnableHolaLocally)

# 5. <a name="EnableHolaLocally"></a>Enable HolaCDN on your machine for local testing

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by entering commands in the browser developer console. 

Console commands must be entered in the frame containing the video player. If your site includes frames, select the video frame from the drop down box in the console, and enter the console commands in the correct frame.

## 5.1 Enable HolaCDN for statisics purpose only

1. Enable statistics by entering ```hola_cdn.set_mode_origin_cdn()```. You should get the response: ```cdn/loader: enable mode origin_cdn, need refresh```.
2. Refresh the page.
3. Check that HolaCDN is in statistics mode by entering ```hola_cdn.get_mode()```. You should get the response: ```"origin_cdn"```.
4. To instantly see if HolaCDN attached itself to your player and is sending statistics, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()``` (if you enabled multiplayer mode, use ```hola_cdn.get_stats(N)``` to see stats of Nth player and so on)
5. You should see printouts from HolaCDN with video timelime information.

## 5.2 Enable HolaCDN on your browser

Now you will enable HolaCDN for content download as well. Again, this is only for testing purposes on your browser locally.

1. Enable CDN mode by entering ```hola_cdn.set_mode_hola_cdn()```. You should get the response: ```cdn/loader: enable mode hola_cdn, need refresh```.
2. Refresh the page.
3. Check that HolaCDN is in CDN mode by entering ```hola_cdn.get_mode()```. You should get the response: ```"hola_cdn"```.
4. To instantly see if HolaCDN attached itself to your player and HolaCDN servers are sending traffic, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()``` (if you enabled multiplayer mode, use ```hola_cdn.get_stats(N)``` to see stats of Nth player and so on)
5. Look at the developer console for printouts from HolaCDN reporting how many bytes were downloaded from HolaCDN servers (zagent###.h-cdn.com). 
6. While the video is playing, you can also look at the network tab of the developer console. You will see some video chunks coming from your own server, and some from HolaCDN servers.

If you receive a console message starting with "Hola cdn skip", the settings on the portal did not take effect yet - try again in a few minutes.

You can enter other console commands, for example:
* Disable HolaCDN:	```hola_cdn.set_mode_disabled()```
* Reset local settings:	```hola_cdn.set_mode_default()```
* See all commands:	```hola_cdn.help()```

## 5.3 Checking statistics on the portal

In order to verify that the video statistics are recorded into your account:

1. Login to [your HolaCDN account][1].
2. Go to 'stats' page.
3. In order to see that your latest CDN events were recorded, click on 'Recent events'.
4. 
You should see a table with your IP address and browser information, which will look like:
![Recent events example](/resources/recent_events.png)

If you see ```bwsaver_report``` events, go back to the detailed statistics table. In case HolaCDN is currently in statistics mode,  you will see numbers only in the 'All' column.
Note that it may take a few minutes for statistics to appear in the table.

To protect you from accidental mass deployment, at this stage HolaCDN is still disabled on the server side. You will see an ```using zone gen mode disabled (no_browser_match)``` error message on any device trying to play a video with HolaCDN. This is by design and expected. Continue to the next step to gradually enable in production.

Next step is to [start collecting statistics from real users](#RedirectTraffic).

# 6. <a name="RedirectTraffic"></a>Redirect your user's traffic to use HolaCDN or enable statistics collection

When you are satisfied with local testing, you can gradually enable statsitics collection and/or redirect user's CDN traffic for real users in production. 

1. Login to [your HolaCDN account][1].
2. Go to the 'configuration' section and find the the 'gen' zone.
3. Click 'New rule' and define one or more rules that will determine how HolaCDN will be enabled on different platforms/browsers. For example:
	* Enable CDN mode for 10% of Chrome/Win users, and 90% for statistics collection.
	![Rule 1 example](/resources/Rule_1.png)
	* Enable HolaCDN in statistics mode for 10% of Chrome/Win users. 
	![Rule 2 example](/resources/Rule_2.png)
	* Add more/browsers/platforms.
4. Click the 'Save and apply' button to save your settings. Changes will take effect within 5 minutes. You will receive a confirmation email every time you change settings on the portal.
5. Verify that your changes take effect: Set HolaCDN to default mode using the ```hola_cdn.set_mode_default()``` console command, and refresh. This will ensure the JS is initalized based on decisions on the server side, and not the local setting you entered earlier.

###_Congratulations! HolaCDN is up and running_###

# Reporting bugs	

If you think you have found a bug, please report it to HolaCDN:

1. In the developer console, enter ```hola_cdn.bug_report()```.
2. Copy the URL that was generated by the command.
3. Send it to HolaCDN support: cdn-help@hola.org.

# <a name="AdvancedConfig"></a>Advanced configuration settings

# 1. Optional - Configuring zones

If you have multiple websites under your customer ID, or you would like to experiment with different settings on parts of your website(s), you can create zones for each site or test.

Each zone can have its own set of video sources and activation rules. You can use regular expressions to define the zone.

'Gen' is a the default zone. It is applied when it is not overridden by another zone. The gen zone cannot be removed.

# 2. CORS settings for HLS/HDS video

HolaCDN works with modern, chunked video protocols by requesting video segments from multiple servers in parallel. Basic operation does not require any changes to CORS settings.

HolaCDN recommends configuring certain HTTP headers. This allows HolaCDN to calculate bandwidth and maximize performance further. These changes are optional, and can be enabled at any time.

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS <link to m3u8/f4m manifest file>```

The desired response is:

```
HTTP/1.1 200 OK
Content-Length: 0
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: HEAD, GET, OPTIONS
Access-Control-Expose-Headers: Date, Etag, Cache-Control
Access-Control-Max-Age: 600
Timing-Allow-Origin: *
```

In case the response is different from the desired response, configure the missing headers by enabling CORS on the web server(s) that is serving the video files. Go line by line to ensure all headers are configured correctly. [Click here](#CORSSettings) for CORS configuration instructions.

# 3. Video platforms

## 3.1 Brightcove

HolaCDN offers a 'plug and play' integration with the Brightcove video platform. 

There is no need to specify any parameters. Simply include HolaCDN loader at the END of the body, just before the closing </body> tag:

```
.
.
<script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX" ></script>
.
</body>
```

* Replace XXXXX with your HolaCDN customer ID.

## 3.2 Kaltura

HolaCDN offers a 'plug and play' integration with the Kaltura video platform if the Kaltura HTML5 player is used. 

Note that integration steps below are applied only on your page, under your control. There is no need to seek assistance from Kaltura support.

To add hola script into Kaltura player iframe:

1. Use Kaltura 'Dynamic embed' if it is not already enabled - see http://player.kaltura.com/docs/kwidget
2. in the 'readyCallback' callback function, add the following block:

```kWidget.embed({
    // ... other params
    'readyCallback': function( playerId ){
        // ... your code
        // inject hola script
        var kiframe = document.getElementById(playerId + '_ifp');
        var hola_script = document.createElement('script');
        hola_script.src = '//client.h-cdn.com/loader.js?customer=XXXX';
        hola_script.type = 'text/javascript';
        kiframe.contentWindow.document.head.appendChild(hola_script);
    }
})
```
* Replace XXXXX with your HolaCDN customer ID.
* In monetization plugin DoubleClick settings, untick LeadWithFlash option if it's ticked

## 3.3 Nimble Streamer live streaming

[Nimble Streamer] (https://wmspanel.com/nimble) is supported out of the box, but needs to be configured to allow HolaCDN servers to download content - [instructions here][30].
# 4. Shortcut: controlling HolaCDN via the address bar

As a shortcut, you can also control HolaCDN via the address bar by appending a string to the URL of the video page.

* Enable HolaCDN mode: append ```?hola_mode=hola_cdn```
* Enable Origin CDN mode: append ```?hola_mode=origin_cdn```
* Disable HolaCDN: append ```?hola_mode=disabled```

# <a name="HandlingContentProtection"></a>5. Handling content protection

In case your video URLs use content protection scheme, HolaCDN servers will not be able to download videos. There are a few ways of dealing with content protection:

## 5.1 Whitelisting HolaCDN servers

Whitelisting a few HolaCDN servers is the fastest way to enable HolaCDN to operate. You can find a link to the list of IP addresses to whitelist in your HolaCDN portal's 'integration' page.

## 5.2 Allow HolaCDN servers to access your videos using other methods 

If whitelisting IPs is not an option, you will need to work with HolaCDN team to define alternative ways to allow the HolaCDN servers to download video files, for example: 

* Share the key generation algorithms with HolaCDN, so that HolaCDN servers will generate requests your servers will accept
* Set-up a direct/hidden URL for HolaCDN servers to download from
* Set-up a special key which will identify HolaCDN servers

Contact HolaCDN team in order to determine the best way to address this issue.

# 6. Ad Serving

## 6.1 HolaCDN player + VAST
HolaCDN player supports [video.js vast plugin][31]. An example on how to setup the player for serving ads can be found [here][32].

## 6.2 HolaCDN player + IMA SDK
HolaCDN player supports [video.js IMA plugin][44]. An example on how to setup the player for serving ads can be found [here][45].

## 6.3 Adblock issues

Adblock extensions, which are pretty popular these days, may lead to unexpected exceptions thrown during ad init. So it sometimes (e.g. when executed in scope of player configuration) breaks the player init sequence and as a result HolaCDN cannot detect it.

Here is one of examples: **videojs+ima+adblock**
```
videojs(element, {}, function(){
    this.ima({id: this.id(), adTagUrl: '<ad_tag_url>'});
});
videojs.players => {} // no player instance detected, even though videojs successfully initialized.
```

The solution to the problem is to wrap ad init to be exception-safe. Thus the example above could be fixed to:
```
videojs(element, {}, function(){
    try { this.ima({id: this.id(), adTagUrl: '<ad_tag_url>'}); }
    catch(e){ console.log('failed to initialize ad plugin, running with adblock?'); }
});
videojs.players => {my_vjs_player: a}
```
.
[1]: https://holacdn.com/cp "HolaCDN account"
[2]: https://github.com/hola/cdn/blob/master/stats_install.md#curious-login-to-the-demo-account-for-live-data "Demo account"
[3]: /hooks.md "FLASH-based players"
[4]: https://github.com/hola/hola_player#features "Hola VideoJS player features"
[5]: http://hola.github.io/examples/cdn/#hola_player "MP4 example without HolaCDN"
[6]: http://hola.github.io/examples/cdn/#hola_player_hls "HLS example without HolaCDN"
[7]: http://hola.github.io/examples/cdn/#hola_player_hds "HDS example without HolaCDN"
[8]: http://hola.github.io/examples/cdn/#hola_player_cdn "MP4 example with HolaCDN"
[9]: http://hola.github.io/examples/cdn/#hola_player_hls_cdn "HLS example with HolaCDN"
[10]: http://hola.github.io/examples/cdn/#hola_player_hds_cdn "HDS example with HolaCDN"
[11]: http://hola.github.io/examples/cdn/#html5 "HTML5 native player example without HolaCDN"
[12]: http://hola.github.io/examples/cdn/#html5_flowplayer "Flowplayer example without HolaCDN"
[13]: http://hola.github.io/examples/cdn/#html5_jwplayer "JW player example without HolaCDN"
[14]: http://hola.github.io/examples/cdn/#html5_cdn "HTML5 native player example with HolaCDN"
[15]: http://hola.github.io/examples/cdn/#html5_flowplayer_cdn "Flowplayer example with HolaCDN"
[16]: http://hola.github.io/examples/cdn/#html5_jwplayer_cdn "JW player example with HolaCDN"
[21]: http://hola.github.io/examples/cdn/#jwplayer6 "MP4 example without HolaCDN"
[22]: http://hola.github.io/examples/cdn/#jwplayer6_hls "HLS example without HolaCDN"
[23]: http://hola.github.io/examples/cdn/#jwplayer6_hds "HDS example without HolaCDN"
[25]: http://hola.github.io/examples/cdn/#vjs5 "MP4 example without HolaCDN"
[26]: http://hola.github.io/examples/cdn/#vjs5_cdn "MP4 example with HolaCDN"
[28]: http://holacdn.com/faq#imp-cors "CORS in Hola FAQ"
[29]: /CORS.md "CORS configuration"
[30]: https://docs.google.com/document/d/1uGCPMMxMynltCA7xbgIJDk2ObgW7ZeT-Zw0hmzzYrQk/edit?usp=sharing "Nimble configuration"
[31]: https://github.com/hola/videojs-vast-vpaid/tree/feature/videojs-v5 "Video JS-VAST-VPAID plugin"
[32]: http://hola.github.io/examples/cdn/#hola_player_vast "Vast example with HolaCDN"
[33]: http://hola.github.io/examples/cdn/#jwplayer6_cdn "MP4 example with HolaCDN"
[34]: http://hola.github.io/examples/cdn/#jwplayer6_hls_cdn "HLS example with HolaCDN"
[35]: http://hola.github.io/examples/cdn/#jwplayer6_hds_cdn "HDS example with HolaCDN"
[36]: https://cdn.rawgit.com/hola/shaka-player/v1.6.x/shaka-player.compiled.js "Right click > Save link as > Shaka player v1.6.x"
[37]: http://hola.github.io/examples/cdn/#shaka "Shaka example playing MPEG-DASH video without HolaCDN"
[38]: http://hola.github.io/examples/cdn/#shaka_cdn "Shaka example playing MPEG-DASH video without HolaCDN"
[39]: http://hola.github.io/examples/cdn/#vjs5_shaka "VideoJS+Shaka example playing MPEG-DASH video without HolaCDN"
[40]: http://hola.github.io/examples/cdn/#vjs5_shaka_cdn "VideoJS+Shaka example playing MPEG-DASH video with HolaCDN"
[44]: https://github.com/googleads/videojs-ima "videojs-ima"
[45]: http://hola.github.io/examples/cdn/#hola_player_ima "Hola player + IMA + preroll midroll postroll"
[46]: https://client.h-cdn.com/svc/cdn/pub/hls.js "Right click > Save link as > Dailymotion (hls.js)"
[47]: https://client.h-cdn.com/svc/cdn/pub/jwplayer_hls_provider.js "Right click > Save link as > JWPlayer HLS provider"
[48]: https://client.h-cdn.com/bext/svc/cdn/pub/flowplayer_hls_engine.js "Right click > Save link as > Flowplayer HLS Engine"
[49]: https://client.h-cdn.com/svc/cdn/pub/vjs_hls_provider.js "Right click > Save link as > VideoJS HLS provider"
