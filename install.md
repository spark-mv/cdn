# Introduction

Adding HolaCDN to your website is a two-step process which can be completed in 15 minutes:

1. Add the JS to your site and collect FREE user experience statistics. 
2. Enable HolaCDN and measure user experience and cost improvements.

If you have any questions, email cdn-help [at] hola [dot] org, or skype:holacdn.com 

# *Collect user experience statistics (FREE)*

# 1. Create an account

If you didn’t do so already, create [a HolaCDN account] (https://holacdn.com/cp), and note your customer ID which was sent to you following the registration.

On the HolaCDN portal, you can configure your HolaCDN system and see user experience statistics such as video start time, buffering, video quality and more. Curious? Visit the [demo account] (https://github.com/hola/cdn/blob/master/stats_install.md#curious-login-to-the-demo-account-for-live-data)

# 2. Add Hola JS to your website

You can enable HolaCDN on:

* Any HTML5 based video player - [Native, JW player, Flowplayer] (https://github.com/hola/cdn/blob/master/install.md#22-html5-video-players) and others.
* Flash based players such as [JWPlayer] (https://github.com/hola/cdn/blob/master/install.md#231-jw-player) or [VideoJS] (https://github.com/hola/cdn/blob/master/install.md#232-videojs)
* The [Hola VideoJS-based player] (https://github.com/hola/cdn/blob/master/install.md#21-using-hola-videojs-player)

You can safely add the JS code to your web page. It is disabled by default on the server side, to protect from accidental mass deployment.

After the code is on your web pages, you will enable HolaCDN. First on your local machine (step 4), and then, gradually, to real (step 5).

Examples provided throughout use MP4 video, but same syntax is used for HLS (M3U8) or HDS (F4M) videos.

## 2.1 Using Hola VideoJS player

Hola player is a VideoJS based video player with [additional features] (https://github.com/hola/video.js#features). It is completely free to use and offers best performance and compatibility with HolaCDN.

1) Add Hola scripts to your page as follows:

```
<head>
...
    <script src="//player.h-cdn.com/player_vjs5.js"></script>
    <script src="//player.h-cdn.com/loader.js?customer=XXXXX" async></script>
...
</head>
```

2) Create a video tag with the following classes: ```video-js vjs-default-skin```

```
  <video class="video-js vjs-default-skin" poster="//example.org/poster.jpg" width="640" height="360" controls>
    <source src="//example.org/video.mp4" type="video/mp4">
  </video>
```

3) Add the following script at the end of your body:

```
  <script>
    (function(){
        window.hola_player(function(player){
            player.init({}, function(){
                if (window.hola_cdn)
                    window.hola_cdn.init();
                else
                    window.hola_cdn_on_load = true;
            });
        });
    })();
  </script>
  .
  .
</body>
```

#### Live examples:

Hola Player/Flash without HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#hola_player) | [HLS] (http://hola.github.io/examples/cdn/#hola_player_hls) | [HDS] (http://hola.github.io/examples/cdn/#hola_player_hds)

Hola Player/Flash with HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#hola_player_cdn) | [HLS] (http://hola.github.io/examples/cdn/#hola_player_hls_cdn) | [HDS] (http://hola.github.io/examples/cdn/#hola_player_hds_cdn)

## 2.2 HTML5 video players

When integrating with an HTML5 source, HolaCDN attaches itself to a <video> tag. A video tag can be embedded in the raw HTML itself, or it can be dynamically created by your video player (e.g. VideoJS)

1) Add the script to your page as follows:

```
<html>
...
video src="//example.org/myVideo.mp4" controls
<script async src="//player.h-cdn.com/loader.js?customer=XXXXXX"></script>
<script>
    (function(){
        if (window.hola_cdn)
            window.hola_cdn.init();
        else
            window.hola_cdn_on_load = true;
    })();
</script>
...
<html>
```

#### Live examples:

HTML5 video Without HolaCDN [Chrome native] (http://hola.github.io/examples/cdn/#html5) | [Flowplayer] (http://hola.github.io/examples/cdn/#html5_flowplayer) | [JW player] (http://hola.github.io/examples/cdn/#html5_jwplayer)

HTML5 video With HolaCDN [Chrome native] (http://hola.github.io/examples/cdn/#html5_cdn) | [Flowplayer] (http://hola.github.io/examples/cdn/#html5_flowplayer_cdn) | [JW player] (http://hola.github.io/examples/cdn/#html5_jwplayer_cdn)

## 2.3 Flash based video players

### 2.3.1 JW Player

If your site uses JW Player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript" async src="//player.h-cdn.com/loader.js?customer=XXXXXX"></script>
...
</head>
```

2) Replace your JW player SWF with the Hola-enabled version. This is done by configuring ```{flashplayer: <url>}``` option in ```jwplayer(‘video-container’).setup(opt)``` call:
```
jwplayer(‘video-container’).setup({
    file: ‘//cdn.example.com/popular_videos/example.mp4’,
    flashplayer: ‘//example.com/static/<new-version-flashplayer>.swf’,
    primary: ‘flash’,
    width: 640,
    height: 360
});
```
Download the Hola-enabled version and place it on your own server. Get it from:

* JWPlayer 6.12.4956: [https://player.h-cdn.com/jwplayer.flash.hls.swf](https://player.h-cdn.com/jwplayer.flash.hls.swf)

* JWPlayer 7.1.0: [https://player.h-cdn.com/jwplayer.flash.7_1_0.swf](https://player.h-cdn.com/jwplayer.flash.7_1_0.swf)

3) Initialize HolaCDN loader right after the call to ```jwplayer(‘video-container’).setup(opt)```.
```
jwplayer(‘video-container’).setup({
    file: ‘//cdn.example.com/popular_videos/example.mp4’,
    flashplayer: ‘//example.com/static/<new-version-flashplayer>.swf’,
    primary: ‘flash’,
    width: 640,
    height: 360
});
if (window.hola_cdn)
    window.hola_cdn.init();  
else
    window.hola_cdn_on_load = true;**
```

Note: In case you load the player and its init code in a separate script which you can not modify, enable Hola as follows. Make sure that Hola init code is executed after ```jwplayer(‘video-container’).setup(opt)``` call:
```
<script src="https://content.jwplatform.com/players/<player_script>.js"></script>
<script>
if (window.hola_cdn)
    window.hola_cdn.init();
else
    window.hola_cdn_on_load = true;
</script>
```

#### Live examples:

JWPlayer/Flash without HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#jwplayer6) | [HLS] (http://hola.github.io/examples/cdn/#jwplayer6_hls) | [HDS] (http://hola.github.io/examples/cdn/#jwplayer6_hds)

JWPlayer/Flash with HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#jwplayer6_cdn) | [HLS] (http://hola.github.io/examples/cdn/#jwplayer6_hls_cdn) | [HDS] (http://hola.github.io/examples/cdn/#jwplayer6_hds_cdn)

### 2.3.2 VideoJS

If your site uses a videoJS based player with flash technology, follow these steps:

1) Add Hola loader to the 'head' element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript" async src="//player.h-cdn.com/loader.js?customer=XXXXXX"></script>
...
</head>
```

2) Initialize Hola at the end of the body:

```
<script>
    (function(){
        if (window.hola_cdn)
            window.hola_cdn.init();
        else
            window.hola_cdn_on_load = true;
    })();
</script>
.
.
</body>
```

#### Live Example

VJS5 without HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#vjs5) 

VJS5 with HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#vjs5_cdn) 

# 3. Test HolaCDN statistics locally

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by entering commands in the browser developer console. 

## 3.1 Configuring HolaCDN via browser console

Console commands must be entered in the frame containing th video player. If your site includes frames, enter the console commands in the correct frame.

Enable statistics by entering ```hola_cdn.set_mode_stats()```

Refresh the page and check that HolaCDN is in statistics mode by entering ```hola_cdn.mode```

To instantly see if HolaCDN attached itself to your player and is sending statistics, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()```

You should see printouts from HolaCDN with video timelime information.

You can enter other console commands, for example:
* Disable HolaCDN:	```hola_cdn.set_mode_disable()```
* Reset local settings:	```hola_cdn.set_mode_default()```
* See all commands:	```hola_cdn.help()```

## 3.2 Controlling HolaCDN via the address bar

You can also control HolaCDN via the address bar by appending a string to the URL of the video page.

* Enable stats mode: append ```?hola_mode=stats```
* Disable HolaCDN:	append ```?hola_mode=disabled```

# 4. Checking statistics on the portal

Play a few videos, and login to [your HolaCDN account] (http://www.holacdn.com/cp), then go to the 'detailed statistics' area to verify that statistics are recorded into your account.

The quickest way to see your recent activity is by clicking on 'debug mode' and then on the 'recent events' button. You should see a few lines, with your IP address and browser information. Events appear 5-10 seconds after you finish viewing a video.

You will only see detailed statistics in the 'disabled' column, since HolaCDN is only operating in statistics mode at this point. Note that it may take a few minutes for statistics to appear in the table.

# 5. Deploy to production

When you are satisfied with local testing, you can gradually enable statsitics collection for real users in production. Login to [your HolaCDN account] (http://www.holacdn.com/cp) and go to the 'configuration' section. Use the granular controls to enable Hola on different platforms/browsers. For example:

* Enable HolaCDN in statistics mode only for 10% of Chrome/Win users.
* Increase HolaCDN statistics collection to 100% of Chrome/Win users.
* Add more/browsers/platforms.

Make sure you save your settings. Changes will take up to 5 minutes to take effect. You will receive a confirmation email every time you change settings on the portal.

To verify that your changes took effect, remember to set HolaCDN to default mode (```hola_cdn.set_mode_default()```) to ensure the JS is initalized based on decisions on the server side, and not the local setting you entered earlier.

###_HolaCDN video user experience statistics collection is now active._###



To enable HolaCDN servers, offload your CDN and improve user experience, continue following the relevant steps below:

# *Enabling HolaCDN and measuring performance/cost improvements*

Enabling HolaCDN will result in performance increases and cost reductions by using both the cliet-side Javascript and HolaCDN servers around the world. And since HolaCDN statistics are now live on your site, enabling HolaCDN is simple; follow these steps. 

# 1. Configure your video server 

This section is only required if you are using progressive MP4/FLV/WebM video. 

If you are using adaptive protocls (e.g. HLS/HDS/Dash), [skip to section 2] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content).

## 1.1 CORS settings

Hola free bandwidth saver and CDN work by requesting your MP4/FLV/WEBM files from the video server in chunks. For this to work, certain HTTP headers need to be enabled.

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" <link to MP4/FLV/WEBM file>```

Note: If you are using Amazon S3, use:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H "Access-Control-Request-Headers: range" -H "Access-Control-Request-Method: GET" <link to MP4/FLV/WEBM file>```

The desired response is:

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

If the response is different from the desired response, configure the missing headers by enabling CORS on the web server(s) that is serving the video files. Go line by line to ensure all headers are configured correctly.

## 1.2 Configuring CORS headers

For step by step instructions regarding how to enable CORS on different web servers, see the [[original CORS documentation](http://enable-cors.org/server.html)] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the generic instructions.
If you are using Amazon S3, please click [[here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3)] (https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). 

After committing the configuration changes, verify response that headers to from this server(s) include required headers, as described above.

## 1.3 Handling redirects

In some implementations, the first video URL is redirected to another URL. In this case, make sure that:

- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.

- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

# 2. Allow HolaCDN to download content

## 2.1 Configuring video origin servers

HolaCDN’s servers need to download an initial copy of the video from your infrastructure to serve to future users. 

To configure where to download a copy from, go to the configuration page on the [your HolaCDN account] (http://www.holacdn.com/cp), and enter one or more video source(s). 

For example, if your video URL looks like http://video.myserver.com/static/mp4/video.mp4, the video source is video.myserver.com. 

For HDS/HLS video, enter server (s) for manifests (M3U8/F4M) and for video chunks (TS or Frag).

## 2.2 Handling content protection

If your video servers do not use any content protection algorithms, [skip to step 3] (https://github.com/hola/cdn/blob/master/install.md#3-test-holacdn-locally-on-your-pc).

In case your video URLs use content protection scheme, Hola servers will not be able to download videos. There are a few ways of dealing with content protection:

### 2.2.1 Whitelisting HolaCDN servers

Whitelisting a few HolaCDN servers is the fastest way to enable HolaCDN to operate. Add the following servers to your list of whitelisted IPs:

```
50.7.1.2
46.105.109.214
212.150.236.132
83.149.70.164
192.240.106.66
85.17.24.129
5.196.82.58
204.45.27.2
37.187.161.44
76.73.18.98
66.90.111.2
```

### 2.2.2 Allow Hola servers to access your videos using other methods 

If whitelisting IPs is not an option, you will need to work with Hola to define alternative ways to allow the Hola servers to download video files, for example: 

* Share the key generation algorithms with Hola, so that Hola servers will generate requests your servers will accept
* Set up a direct/hidden URL for Hola servers to download from
* Set-up a special key which will identify Hola servers

Contact Hola in order to determine the best way to address this issue.

# 3. Test HolaCDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by entering commands in the browser developer console. 

## 3.1 Configuring via browser console

Console commands must be entered in the frame containing th video player. If your site includes frames, enter the console commands in the correct frame.

Enable CDN mode by entering ```hola_cdn.set_mode_cdn()```

Refresh the page and check that HolaCDN is in CDN mode by entering ```hola_cdn.mode```

To instantly see if HolaCDN attached itself to your player and HolaCDN servers are sending traffic, play the video and while it is playing, print HolaCDN statistics by entering ```hola_cdn.get_stats()```

Look at the developer console for printouts from HolaCDN reporting how many bytes were downloaded from HolaCDN servers (zagent###.h-cdn.com). If you receive a console message starting with "Hola cdn skip", the settings on the portal did not take effect yet - try again in a few minutes.

You can enter other console commands, for example:
* Disable HolaCDN:	```hola_cdn.set_mode_disable()```
* Reset local settings:	```hola_cdn.set_mode_default()```
* See all commands:	```hola_cdn.help()```

## 3.2 Configuring via address bar

You can also control HolaCDN via the address bar by appending a string to the URL of the video page.

* Enable CDN mode: append ```?hola_mode=cdn```
* Enable stats mode: append ```?hola_mode=stats```
* Disable HolaCDN: append ```?hola_mode=disabled```

# 4. Checking statistics on the portal

Play a few videos, and login to [your HolaCDN account] (http://www.holacdn.com/cp), then go to the 'detailed statistics' area to verify that statistics are recorded by the portal.

The quickest way to see your recent activity is by clicking on 'debug mode' and then on the 'recent events' button. You should see a few lines, with your IP address and browser information. Events appear 5-10 seconds after you finish viewing a video.

Now that HolaCDN is enabled, when looking at the table, verify that statistics also begin to appear in the "enabled" column. Note that it may take a few minutes for statistics to appear in the table.

# 5. Deploy to production

When you are satisfied with local testing, you can gradually enable HolaCDN for real users in production. Login to [your HolaCDN account] (http://www.holacdn.com/cp) and go to the configuration section. Use the granular controls to enable Hola on different platforms/browsers. For example:

For example:

* Start by enabling HolaCDN for 10% of Chrome/Win users, and 90% only for statistics collection.
* Increase HolaCDN to 90% of Chrome/Win users and leave 10% in statistics mode, as a control group.
* Add more/browsers/platforms.

Make sure you save your settings. Changes will take up to 5 minutes to take effect. You will receive a confirmation email every time you change settings on the portal.

To verify that your changes took effect, remember to set HolaCDN to default mode (```hola_cdn.set_mode_default()```) to ensure the JS is initalized based on decisions on the server side, and not the local setting you entered earlier.

# Congratulations! HolaCDN is up and running #


# Advanced configuration settings

# 11. Optional - Configuring zones

If you have multiple websites under your customer ID, or you would like to experiment with different settings on parts of your website(s), you can create zones for each site or test.

Each zone can have its own set of video sources and activation rules. You can use regular expressions to define the zone.

'Gen' is a the default zone. It is applied when it is not overridden by another zone. The gen zone cannot be removed.

# 12. Optional - CORS settings for HLS/HDS video

HolaCDN works with modern, chunked video protocols by requesting video segments from multiple servers in parallel. Basic operation does not require any changes to CORS settings.

Hola recommends configuring certain HTTP headers. This allows HolaCDN to calculate bandwidth and maximize performance further. These changes are optional, and can be enabled at any time.

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS <link to m3u8/f4m manifest file>```

The desired response is:

```
HTTP/1.1 200 OK
Content-Length: 0
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: HEAD, GET, OPTIONS
Access-Control-Expose-Headers: Date, Etag
Access-Control-Max-Age: 600
Timing-Allow-Origin: *
```

In case the response is different from the desired response, configure the missing headers by enabling CORS on the web server(s) that is serving the video files. Go line by line to ensure all headers are configured correctly. Please see the ‘Configuring CORS headers’ section for instructions.
