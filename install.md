# Overview

This is a step-by-step guide to adding HolaCDN to your website. The is a two-step process:

1. Add the JS to your site and collect FREE user experience statistics. 
2. Enable HolaCDN and measure user experience and cost improvements.

The entire implementation can be completed in 15 minutes.

If you have any questions during implementation, please email cdn-help [at] hola [dot] or skype:holacdn.com 

# *Step 1: Collect user experience statistics (FREE)*

# 1. Create an account

If you didn’t do so already, create an account on [https://holacdn.com](https://holacdn.com/), and note your customer ID which was sent to you following the registration.

On the HolaCDN customer portal, you will be able to view user experience statistics such as video start time, buffering, video quality and other settings. You will also be able to configure your HolaCDN system. 

In order to see a live portal account, login to the [demo account] (http://bit.ly/HolaCDNPortalDemo) with user: portal_demo@hola.org, password: holacdn.

# 2. Add Hola JS to your website

You can enable HolaCDN on:

* Any [HTML5 based video player] (https://github.com/hola/cdn/blob/master/install.md#22-html5-video-players)
* Flash based players such as [JWPlayer] (https://github.com/hola/cdn/blob/master/install.md#231-jw-player) or [VideoJS] (https://github.com/hola/cdn/blob/master/install.md#232-videojs)
* The [Hola VideoJS-based player] (https://github.com/hola/cdn/blob/master/install.md#21-using-hola-videojs-player)

Note that you can safely add the JS code to your web page, it is disabled by default on the server side in order to protect from accidental mass deployment. 

After the code is on your web pages, you can enable HolaCDN gradually in order to ensure a smooth deployment, first on your local machine (step 4) and then to a subset of users, then to all users (step 5).

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
  <video class="video-js vjs-default-skin" poster="http://poster.jpg" width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
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
video src="http://example.com/uploads/myVideo.mp4" controls
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

[Without HolaCDN] (http://hola.github.io/examples/cdn/#html5)

[With HolaCDN] (http://hola.github.io/examples/cdn/#html5_cdn)

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
</body>
```

#### Live Example

VJS5 without HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#vjs5) 

VJS5 with HolaCDN: [MP4] (http://hola.github.io/examples/cdn/#vjs5_cdn) 

# 3. Test HolaCDN statistics locally

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by either appending a command to your URL, or by entering commands in the browser developer console. 

## 3.1 Configuring via address bar

To control HolaCDN via the address bar, append ```?hola_mode=xxx``` to the URL.

* To enable stats mode: 	append ```?hola_mode=stats```
* To disable HolaCDN:	append ```?hola_mode=disabled```

Note that in order to check mode or see statistics, you will need to use the console, see below. 

## 3.2 Configuring via browser console

In the browser developer console, enter one of the following commands:

* To check mode: 	```hola_cdn.mode```
* To enable: 		```hola_cdn.set_mode_stats()```
* To disable:		```hola_cdn.set_mode_disable()```
* To see statistics: 	```hola_cdn.get_stats()``` (while video is playing)
* To see all settings:	```hola_cdn.help()```
* To reset settings:	```hola_cdn.set_mode_default()```

To instantly see if HolaCDN attached itself to your player and is sending statistics, play the video and while it is playing, enter ```hola_cdn.get_stats()```. You should see printouts from HolaCDN with video timelime information.

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

# 4. Checking statistics on the portal

Login to your account on [www.holacdn.com](http://www.holacdn.com) and verify that statistics are written to the video analytics section. Note that it may take a few minutes for statistics to appear on the portal.

The quickest way to see your recent activity is by clicking on 'debug mode' and then on the 'recent events' button.

When looking at the table, note that you will only see statistics in the 'disabled' column, since HolaCDN is only operating in statistics mode at this point. 

# 5. Deploy to production

When you are satisfied with local testing, you can gradually enable the service in production. Login to your portal account and go to the configuration section. Use the granular controls to enable Hola on different platforms/browsers

For example:

* Start by enabling HolaCDN in statistics mdoe for 10% of Chrome/Win users.
* Increase HolaCDN statistics collection to 100% of Chrome/Win users.
* Add more/browsers/platforms.

To verify that your changes took effect, don't forget to set HolaCDN to default mode (		```hola_cdn.set_mode_default()```) so that it will be initalized based on decisions on the server side, and not the local setting you entered earlier.

Changes take effect immediately, and you will receive a confirmation email every time you change settings on the portal.

###_HolaCDN video user experience statistics collection is now active._###



If you would like to enable the HolaCDN, continue following the relevant steps below:

# *Step 2:  Enabling HolaCDN and measuring performance/cost improvements*

Now that you have the code on your site collecting statistics, you can easily turn on HolaCDN, by following the next steps. 

Enabling HolaCDN which will result in performance increases and cost reductions by using both the cliet-side Javascript and HolaCDN servers around the world.

Note that some of the instructions below are relevant to progressive download, and some to adaptive protocols.

# 6. Configure your video server 

To ensure optimal operation of HolaCDN, certain HTTP headers need to be enabled on the servers serving video files. The following section describes how to verify and if needed, enable these headers.

## 6.1 CORS settings for MP4/FLV/WEBM progressive video

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

If the response is different from the desired response, configure the missing headers by enabling CORS on the web server(s) that is serving the video files. Go line by line to ensure all headers are configured correctly. See the ‘Configuring CORS headers’ section for instructions.

## 6.2 Optional: CORS settings for HLS/HDS

HolaCDN does not require any changes to CORS settings when working with HLS/HDS video. However, Hola recommends configuring certain HTTP headers. This allows HolaCDN to calculate bandwidth and maximize performance further. These changes are optional, and can be enabled at any time. They are described in step 12.

## 6.3 Configuring CORS headers

For step by step instructions regarding how to enable CORS on different web servers, see the [[original CORS documentation](http://enable-cors.org/server.html)] (http://enable-cors.org/server.html). If you are using Amazon S3, please click [[here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3)] (https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). Make sure you add all the required headers, not just '*' referenced in the generic instructions.

After committing the configuration changes, verify response that headers to from this server(s) include required headers, as described above.

## 6.4 Handling redirects

In some implementations, the first video URL is redirected to another URL. In this case, make sure that:

- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.

- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

# 7. Allow HolaCDN to download content

HolaCDN’s servers need to download a first copy of the video from your infrastructure to serve to future users. 

## 7.1 Configuring video origin servers

HolaCDN’s needs to know where to download a copy of the video from your infrastructure to serve to future users.

Go to the configuration page on the HolaCDN portal, and enter video source(s) for the 'gen' (general) zone. 

For example, if your video URL looks like http://video.myserver.com/static/mp4/video.mp4, the video source is video.myserver.com.

See more on zones in the [advanced configuration section] (https://github.com/hola/cdn/blob/master/install.md#11-optional---configuring-zones)


## 7.2 Handling content protection

If your video servers do not use any content protection algorithms, skip to step 8.

In case your video URLs use content protection scheme, Hola servers will not be able to download videos, and HolaCDN will not be able to function. There are a few ways of dealing with content protection:

### 7.2.1 Whitelisting HolaCDN servers

Whitelisting the HolaCDN servers is the fastest way to enable HolaCDN to operate. Add the following servers to your list of whitelisted IPs:

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

### 7.2.2 Allow Hola servers to access your videos using other methods 

In case whitelisting IPs is not an option, you will need to work with Hola to define alternative ways to allow the Hola servers to download video files. 

There are a few ways: 

* Share the key generation algorithms with Hola, so that Hola servers will generate valid requests
* Set up a direct/hidden URL
* Set-up a special key which will identify Hola servers.

Please contact Hola in order to determine the best way to address this issue.

# 8. Test HolaCDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by either appending a command to your URL, or by entering commands in the browser developer console. 

## 8.1 Configuring via address bar

To control HolaCDN via the address bar, append ```?hola_mode=xxx``` to the URL.

* To enable CDN mode:	append ```?hola_mode=cdn```
* To enable stats mode: 	append ```?hola_mode=stats```
* To disable HolaCDN:	append ```?hola_mode=disabled```

Note that in order to check mode or see statistics, you will need to use the console, see below. 

## 8.2 Configuring via browser console

In the browser developer console, enter one of the following commands:

* To check mode: 	```hola_cdn.mode```
* To enable CDN: 	```hola_cdn.set_mode_cdn()```
* To enable stats: 	```hola_cdn.set_mode_stats()```
* To disable:		```hola_cdn.set_mode_disable()```
* To see statistics:```hola_cdn.get_stats()```  (while video is playing)
* To see all settings:	```hola_cdn.help()```
* To reset settings:```hola_cdn.set_mode_default()```

To instantly see if HolaCDN is working, play the video look at the developer console for printouts from HolaCDN reporting how many bytes were downloaded from HolaCDN servers.

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

# 9. Checking statistics on the portal

Login to your account on [www.holacdn.com](http://www.holacdn.com) and verify that statistics are written to the video analytics section. Note that it may take a few minutes for statistics to appear on the portal.

The quickest way to see your recent activity is by clicking on 'debug mode' and then on the 'recent events' button.

Now that HolaCDN is enabled, when looking at the table, verify that statistics also begin to appear in the "enabled" column.

# 10. Deploy to production

When you are satisfied with local testing, you can gradually enable the service in production. Login to your portal account's configuration section. Use the granular controls to enable Hola on different platforms/browsers

For example:

* Start by enabling HolaCDN for 10% of Chrome/Win users, and 90% only for statistics collection.
* Increase HolaCDN to 90% of Chrome/Win users, and leave 10% for statistics.
* Add more/browsers/platforms.

To verify that your changes took effect, don't forget to set HolaCDN to default mode (using 		```hola_cdn.set_mode_default()```) so that it will be initalized based on the server side, and not the local setting you entered earlier.

Changes take effect immediately, and you will receive a confirmation email every time you change settings on the portal.

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
