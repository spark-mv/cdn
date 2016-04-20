# Introduction

Adding HolaCDN to your website is a simple process which can be completed in 15 minutes:

1. [Sign up for a new account][1]
2. [Add the Hola JS to your website][43]
3. [Configure your video server][44]
4. [Allow HolaCDN to collect statistics and download content][36]
5. [Enable HolaCDN on your machine for local testing][9]
6. [Redirect your user's traffic to use HolaCDN or enable statistics collection][10]

If you have any questions, email us at cdn-help@hola.org, or skype: holacdn

# 1. Sign up for a new account

Sign up for [a new HolaCDN account][1], and note your customer ID which will be sent to you following the registration.

On the HolaCDN portal, you can configure your HolaCDN system and see user experience statistics such as video start time, buffering, video quality and more. Curious? Visit the [demo account][2].

# 2. Add Hola JS to your website

HolaCDN requires a client-side JavaScript in order to collect video statistics. The JavaScript is loaded asynchronously, and will not affect your page load time. 

Choose the correct implementation for your existing player. You can enable HolaCDN on:

* Any HTML5 based video player - [Native, JW player, Flowplayer][3] and others.
* Flash based players such as [JWPlayer][4], [FlowPlayer][5] or [VideoJS][6].
* The [Hola VideoJS-based player][7].
* [Your own Flash based player][8].

Add the JS code to your web page. It is safe to add this code because it is disabled by default on the server side to protect from accidental mass deployment. After the code is on your web pages, you will enable HolaCDN on your machine for [local testing][9] and then gradually deploy to [real users][10].

Examples provided below use MP4 video, but same syntax is used for HLS (M3U8) or HDS (F4M) videos.

## 2.1 Using Hola VideoJS player

HolaCDN can work with your existing player, but we recommend using the Hola player. It is a VideoJS based video player with [additional features][11]. It is completely free to use and offers best performance and compatibility with HolaCDN. Again, this is totally optional.

1) Add Hola scripts to your page as follows:

```
<head>
...
    <script src="//player.h-cdn.com/player_vjs5.js"></script>
    <script async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
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
        window.hola_player(function(player){ player.init(); });
    })();
  </script>
  .
  .
</body>
```

#### Live examples:
* Hola Player/Flash without HolaCDN: [MP4][12] | [HLS][13] | [HDS][14]
* Hola Player/Flash with HolaCDN: [MP4][15] | [HLS][16] | [HDS][17]

4) Done adding the code? You can [test it locally on your browser][9] or continue to [configuring the server side][18].

## 2.2 HTML5 video players

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
* HTML5 video Without HolaCDN [Chrome native][19] | [Flowplayer][20] | [JW player][21]
* HTML5 video With HolaCDN [Chrome native][22] | [Flowplayer][23] | [JW player][24]

2) Done adding the code? You can [test it locally on your browser][9] or continue to [configuring the server side][18].

## 2.3 Flash based video players

### 2.3.1 JW Player

If your site uses JW Player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript" async src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
</head>
```
* Replace XXXXX with your HolaCDN customer ID.

2) Replace your JW player SWF with the Hola-enabled version. 

Download (using **right click > save link as**) the Hola-enabled JWPlayer version that matches the version you are using, and place it on your own server. Choose your version from:

* JWPlayer  [V6.12.4xx][25], [V7.1.0xx][26], [V7.1.4xx][27], [V7.2.4xx][28]

Once you downloaded the file, continue by configuring ```{flashplayer: <url>}``` option in ```jwplayer(‘video-container’).setup(opt)``` call:
```
jwplayer(‘video-container’).setup({
    file: ‘//cdn.example.com/popular_videos/example.mp4’,
    flashplayer: ‘//example.com/static/<new-version-flashplayer>.swf’,
    primary: ‘flash’,
    width: 640,
    height: 360
});
```

* Replace *cdn.example.com/popular_videos/example.mp4* with your own link.

#### Live examples:
* JWPlayer/Flash without HolaCDN: [MP4][29] | [HLS][30] | [HDS][31]
* JWPlayer/Flash with HolaCDN: [MP4][45] | [HLS][46] | [HDS][47]

3) Done adding the code? You can [test it locally on your browser][9] or continue to [configuring the server side][18].

### 2.3.2 VideoJS

If your site uses a videoJS based player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript" async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXXX"></script>
...
</head>
```

* Replace XXXXX with your HolaCDN customer ID.

2) [Flash/HLS only] If you play HLS videos with flash technology on your site, you also need to replace videojs SWF with the Hola-enabled version.

* Download (using **right click > save link as**) the [Hola-enabled version][32] and place it on your own server.
* Configure videojs to use the new version.
```
<script type="text/javascript" src="//example.com/static/video.js"></script>
<script type="text/javascript">
  videojs.options.flash.swf = "//example.com/static/videojs-flashls.swf";
</script>
```

* Replace *example.com/static/video.js* and *example.com/static/videojs-flashls.swf* with your own links.

#### Live Examples:
* VJS5 without HolaCDN: [MP4][33] 
* VJS5 with HolaCDN: [MP4][34]

3) Done adding the code? You can [test it locally on your browser][9] or continue to [configuring the server side][18].

### 2.3.3 Flowplayer (HLS only; HDS, MP4 coming soon)

If your site plays HLS video using Flowplayer with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript" async crossorigin="anonymous" src="//player.h-cdn.com/loader.js?customer=XXXXX"></script>
...
</head>
```

* Replace XXXXX with your HolaCDN customer ID.

2) Replace your Flowplayer SWF with the Hola-enabled version. 

Download (using **right click > save link as**) the [Hola-enabled version][35] and place it on your own server.

Once you have downloaded the SWF, continue by configuring ```{swf: <url>, swfHls: <url>}``` option in ```flowplayer(‘video-container’, opt)``` call:
```
var container = document.getElementById('video-container');
var player = flowplayer(container, {
   swf: '//example.com/static/<new-version-flashplayer>.swf',
   swfHls: '//example.com/static/<new-version-flashplayer>.swf',
   clip: {
       sources: [{
           type: "application/x-mpegurl",
           src:  "//cdn.example.com/popular_videos/example.m3u8",
       }]
   }
});
```
Both ```swf``` and ```swfHls``` are changed to the same file. 

3) Done adding the code? You can [test it locally on your browser][9] or continue to [configuring the server side][18].

# 3. Configure your video server 

This section is mandatory only if you are using progressive MP4/FLV/WebM video. 

If you are using adaptive protocls (e.g. HLS/HDS/Dash), [skip to section 4][36].

## 3.1 CORS settings

Hola free bandwidth saver and CDN work by requesting your MP4/FLV/WEBM files from the video server in chunks. For this to work, certain HTTP headers need to be enabled. [Read more][37] about CORS configuration in HolaCDN.

If you do not implement these settings, HolaCDN will still work but performance will be degraded. As such, see [how to verify and configure CORS][38].

## 3.2 Handling redirects

In some implementations, the first video URL is redirected to another URL. In this case, make sure that:
- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.
- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

# 4. Allow HolaCDN to collect statistics and download content

HolaCDN’s servers need to download an initial copy of the video from your infrastructure to serve to future users. HolaCDN uses a 'pull' model. There is no need to proactively push content to HolaCDN. The same server will also be used for statistics gathering.

To configure where to download a copy from:

1. Open [your HolaCDN account][1]. 
2. Go to the configuration page ('conf').
3. You will arrive to the default zone ('gen'). In this zone, click "Insert a new video source group" and enter one or more video source(s). For example, if your video URL looks like *http://video.myserver.com/static/mp4/video.mp4*, the video source is *video.myserver.com*. For HDS/HLS video, enter server(s) for manifests (M3U8/F4M) and for video chunks (TS or Frag).

* If your video servers use content protection algorithms, [check out the advanced settings][39].

* To simplify testing, HolaCDN is configured with video source '*'. Make sure to change it to your real video source(s). 

Finished? You can now [test HolaCDN locally on your PC][9]

# 5. Enable HolaCDN on your machine for local testing

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by entering commands in the browser developer console. 

Console commands must be entered in the frame containing the video player. If your site includes frames, select the video frame from the drop down box in the console, and enter the console commands in the correct frame.

## 5.1 Enable HolaCDN for statisics purpose only

1. Enable statistics by entering ```hola_cdn.set_mode_stats()```. You should get the response: ```cdn/loader: enable mode stats, need refresh```.
2. Refresh the page.
3. Check that HolaCDN is in statistics mode by entering ```hola_cdn.mode```. You should get the response: ```"stats"```.
4. To instantly see if HolaCDN attached itself to your player and is sending statistics, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()```
5. You should see printouts from HolaCDN with video timelime information.

## 5.2 Enable HolaCDN on your browser

Now you will enable HolaCDN for content download as well. Again, this is only for testing purposes on your browser locally.

1. Enable CDN mode by entering ```hola_cdn.set_mode_cdn()```. You should get the response: ```cdn/loader: enable mode cdn, need refresh```.
2. Refresh the page.
3. Check that HolaCDN is in CDN mode by entering ```hola_cdn.mode```. You should get the response: ```"cdn"```.
4. To instantly see if HolaCDN attached itself to your player and HolaCDN servers are sending traffic, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()```.
5. Look at the developer console for printouts from HolaCDN reporting how many bytes were downloaded from HolaCDN servers (zagent###.h-cdn.com). 
6. While the video is playing, you can also look at the network tab of the developer console. You will see some video chunks coming from your own server, and some from HolaCDN servers.

If you receive a console message starting with "Hola cdn skip", the settings on the portal did not take effect yet - try again in a few minutes.

You can enter other console commands, for example:
* Disable HolaCDN:	```hola_cdn.set_mode_disable()```
* Reset local settings:	```hola_cdn.set_mode_default()```
* See all commands:	```hola_cdn.help()```

## 5.3 Checking statistics on the portal

In order to verify that the video statistics are recorded into your account:

1. Login to [your HolaCDN account][1].
2. Click on 'debug mode'. 
3. In order to see that your latest CDN events were recorded, click on 'Show recent events'.
4. 
You should see a few lines with your IP address and browser information, which will look like:
```
ID	            Timestamp               IP	            Zone    Country Browser	    Platform
bwsaver_report	10-Jan-2016 16:55:25	212.235.66.73	gen	    il      chrome 47   Win32
video_init      10-Jan-2016 16:53:39	212.235.66.73	gen	    il      chrome 47   Win32
```

If you see ```bwsaver_report``` events, go back to the detailed statistics table. In case HolaCDN is currently in statistics mode,  you will see numbers only in the 'Your CDN' column. 
Note that it may take a few minutes for statistics to appear in the table.

To protect you from accidental mass deployment, at this stage HolaCDN is still disabled on the server side. You will see an ```using zone gen mode disabled (no_browser_match)``` error message on any device trying to play a video with HolaCDN. This is by design and expected. Continue to the next step to gradually enable in production.

Next step is to [start collecting statistics from real users][10].

# 6. Redirect your user's traffic to use HolaCDN or enable statistics collection

When you are satisfied with local testing, you can gradually enable statsitics collection and/or redirct user's CDN traffic for real users in production. 

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

# Advanced configuration settings

# 1. Optional - Configuring zones

If you have multiple websites under your customer ID, or you would like to experiment with different settings on parts of your website(s), you can create zones for each site or test.

Each zone can have its own set of video sources and activation rules. You can use regular expressions to define the zone.

'Gen' is a the default zone. It is applied when it is not overridden by another zone. The gen zone cannot be removed.

# 2. Optional - CORS settings for HLS/HDS video

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

In case the response is different from the desired response, configure the missing headers by enabling CORS on the web server(s) that is serving the video files. Go line by line to ensure all headers are configured correctly. Please see the ‘Configuring CORS headers’ section for instructions.

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

## 3.1 Nimble live streaming

Nimble is supported out of the box, but needs to be configured to allow HolaCDN servers to download content - [instructions here][40].
# 4. Shortcut: controlling HolaCDN via the address bar

As a shortcut, you can also control HolaCDN via the address bar by appending a string to the URL of the video page.

* Enable CDN mode: append ```?hola_mode=cdn```
* Enable stats mode: append ```?hola_mode=stats```
* Disable HolaCDN: append ```?hola_mode=disabled```

# 5. Handling content protection

In case your video URLs use content protection scheme, HolaCDN servers will not be able to download videos. There are a few ways of dealing with content protection:

## 5.1 Whitelisting HolaCDN servers

Whitelisting a few HolaCDN servers is the fastest way to enable HolaCDN to operate. Add the following servers to your list of whitelisted IPs:

```
103.27.232.194
192.240.106.66
204.45.27.2
209.58.176.3
212.150.236.132
37.187.161.44
46.105.109.214
5.196.82.58
50.7.1.2
66.90.111.2
76.73.18.98
82.80.17.117
83.149.70.164
85.17.24.129
```

## 5.2 Allow HolaCDN servers to access your videos using other methods 

If whitelisting IPs is not an option, you will need to work with HolaCDN team to define alternative ways to allow the HolaCDN servers to download video files, for example: 

* Share the key generation algorithms with HolaCDN, so that HolaCDN servers will generate requests your servers will accept
* Set-up a direct/hidden URL for HolaCDN servers to download from
* Set-up a special key which will identify HolaCDN servers

Contact HolaCDN team in order to determine the best way to address this issue.

# 6. Ad Serving

## 6.1 HolaCDN player + VAST
HolaCDN player supports [video.js vast plugin][41]. An example on how to setup the player for serving ads can be found [here][42].

## 6.2 Adblock issues

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
[3]: /install.md#22-html5-video-players "HTML5-based players"
[4]: /install.md#231-jw-player "JW player"
[5]: /install.md#233-flowplayer-hls-only-hds-mp4-coming-soon "Flowplayer"
[6]: /install.md#232-videojs "VideoJS player"
[7]: /install.md#21-using-hola-videojs-player "Hola VideoJS player"
[8]: /hooks.md "FLASH-based players"
[9]: /install.md#5-enable-holacdn-on-your-machine-for-local-testing "Enable HolaCDN for local testing"
[10]: /install.md#6-redirect-your-users-traffic-to-use-holacdn-or-enable-statistics-collection "HolaCDN configuration"
[11]: https://github.com/hola/video.js#features "Hola VideoJS player features"
[12]: http://hola.github.io/examples/cdn/#hola_player "MP4 example without HolaCDN"
[13]: http://hola.github.io/examples/cdn/#hola_player_hls "HLS example without HolaCDN"
[14]: http://hola.github.io/examples/cdn/#hola_player_hds "HDS example without HolaCDN"
[15]: http://hola.github.io/examples/cdn/#hola_player_cdn "MP4 example with HolaCDN"
[16]: http://hola.github.io/examples/cdn/#hola_player_hls_cdn "HLS example with HolaCDN"
[17]: http://hola.github.io/examples/cdn/#hola_player_hds_cdn "HDS example with HolaCDN"
[18]: /install.md#3-configure-your-video-server "Configure your HolaCDN video server"
[19]: http://hola.github.io/examples/cdn/#html5 "HTML5 native player example without HolaCDN"
[20]: http://hola.github.io/examples/cdn/#html5_flowplayer "Flowplayer example without HolaCDN"
[21]: http://hola.github.io/examples/cdn/#html5_jwplayer "JW player example without HolaCDN"
[22]: http://hola.github.io/examples/cdn/#html5_cdn "HTML5 native player example with HolaCDN"
[23]: http://hola.github.io/examples/cdn/#html5_flowplayer_cdn "Flowplayer example with HolaCDN"
[24]: http://hola.github.io/examples/cdn/#html5_jwplayer_cdn "JW player example with HolaCDN"
[25]: https://player.h-cdn.com/jwplayer.flash.6_12_4956.swf "Right click > Save link as > JW player 6.12.4"
[26]: https://player.h-cdn.com/jwplayer.flash.7_1_0.swf "Right click > Save link as > JW player 7.1.0"
[27]: https://player.h-cdn.com/jwplayer.flash.7_1_4.swf "Right click > Save link as > JW player 7.1.4"
[28]: https://player.h-cdn.com/jwplayer.flash.7_2_4.swf "Right click > Save link as > JW player 7.2.4"
[29]: http://hola.github.io/examples/cdn/#jwplayer6 "MP4 example without HolaCDN"
[30]: http://hola.github.io/examples/cdn/#jwplayer6_hls "HLS example without HolaCDN"
[31]: http://hola.github.io/examples/cdn/#jwplayer6_hds "HDS example without HolaCDN"
[32]: https://client.h-cdn.com/bext/svc/cdn/pub/videojs-flashls.swf "Right click > Save link as > Hola Video JS player"
[33]: http://hola.github.io/examples/cdn/#vjs5 "MP4 example without HolaCDN"
[34]: http://hola.github.io/examples/cdn/#vjs5_cdn "MP4 example with HolaCDN"
[35]: https://holacdn.com/flowplayerhls.6.0.5.hola.swf "Right click > Save link as > Hola enabled Flowplayer"
[36]: /install.md#4-allow-holacdn-to-collect-statistics-and-download-content "Configure videw groups"
[37]: http://holacdn.com/faq#imp-cors "CORS in Hola FAQ"
[38]: /CORS.md "CORS configuration"
[39]: /install.md#advanced-configuration-settings "HolaCDN Advanced configuration"
[40]: http://blog.wmspanel.com/2015/06/cdn-friendly-streaming.html "Nimble configuration"
[41]: https://github.com/hola/videojs-vast-vpaid/tree/feature/videojs-v5 "Video JS-VAST-VPAID plugin"
[42]: http://hola.github.io/examples/cdn/#hola_player_vast "Vast example with HolaCDN"
[43]: /install.md#2-add-hola-js-to-your-website "Add Hola JavaScript to your website"
[44]: /install.md#3-video-platforms "Video platforms"
[45]: http://hola.github.io/examples/cdn/#jwplayer6_cdn "MP4 example with HolaCDN"
[46]: http://hola.github.io/examples/cdn/#jwplayer6_hls_cdn "HLS example with HolaCDN"
[47]: http://hola.github.io/examples/cdn/#jwplayer6_hds_cdn "HDS example with HolaCDN"
