# Overview

This is a step-by-step guide to adding HolaCDN to your website. The is a two-step process:
1. Add the JS to your site and collect user experience statistics. 
2. Enable Hola and measure user experience and cost improvements.

If you have any questions during implementation, please email cdn-help [at] hola [dot] or skype:holacdn.com 

# Step 1: Collect current user experience statistics

# 1. Create an account

If you didn’t do so already, create an account on [https://holacdn.com](https://holacdn.com/), and note your customer ID which was sent to you following the registration.

On the HolaCDN customer portal, you will be able to view user experience statistics such as video start time, buffering, video quality and other settings. You will also be able to configure your HolaCDN system. To see a live portal account, login to the [demo account] (http://bit.ly/HolaCDNPortalDemo) with user: portal_demo@hola.org, password: holacdn.

# 2. Add Hola JS to your website

You can enable Hola CDN on your existing player, or use the Hola VideoJS-based player. The implementation varies slightly based on the video player used - see below.

Note that you can safely add the JS code to your web page, it is disabled by default on the server side in order to protect from accidental mass deployment. 

After the code is on your web pages, you can enable Hola CDN gradually in order to ensure a smooth deployment, first on your local machine (step 4) and then to a subset of users, then to all users (step 5).

Examples provided throughout use MP4 video, but same syntax is used for HLS (M3U8) or HDS (F4M) videos.

## 2.1 Using Hola VideoJS player

Hola player is a VideoJS based video player with [additional features] (https://github.com/hola/video.js#features). It is completely free to use and offers best performance and compatibility with Hola CDN.

[With HolaCDN] (http://js.do/gilad/html5_hola_player)

## 2.2 HTML5 video players

When integrating with an HTML5 source, HolaCDN attaches itself to a <video> tag. A video tag can be embedded in the raw HTML itself, or it can be dynamically created by your video player (e.g. VideoJS)

Add the script to your page as follows:

```
<html>
...
video src="http://example.com/uploads/myVideo.mp4" controls
<script async src="//player.h-cdn.com/loader.js?customer=XXXXXX"></script>
...
<html>
```

#### Live examples:

[Without Hola CDN] (http://js.do/gilad/html5_video)

[With HolaCDN] (http://js.do/hola/html5_video_with_hola_cdn)

## 2.3 Flash based video players

### 2.3.1 JW Player

If your site uses JW Player with flash technology, follow these steps:

1) Add Hola loader to the <head> element of the video HTML page, along with your customerID:
```
<head>
...
<script type="text/javascript” async src=”//player.h-cdn.com/loader.js?customer=XXXXXX”></script>
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

3) Initialize Hola CDN loader right after the call to ```jwplayer(‘video-container’).setup(opt)```.
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
<script type="text/javascript” src=”https://content.jwplatform.com/players/<player_script>.js”></script>
<script>
if (window.hola_cdn)
    window.hola_cdn.init();
else
    window.hola_cdn_on_load = true;
</script>
```

#### Live examples:

[JWPlayer/Flash/MP4 without Hola CDN](http://js.do/hola/jwplayer6_flash)

[JWPlayer/Flash/MP4 with Hola CDN] (http://js.do/hola/jwplayer6_flash_with_hola_cdn)

### 2.3.2 VideoJS

If your site uses a videoJS based player with flash technology, follow these steps:

#### Live Example

[With Hola CDN] (http://js.do/gilad/html5_vjs)


# 3. Testing Hola CDN statistics locally

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by either appending a command to your URL, or by entering commands in the browser developer console. 

## Configuring via address bar

To control HolaCDN via the address bar, append ```?hola_mode=xxx``` to the URL.
To enable stats mode: 	append ```?hola_mode=stats```
To disable HolaCDN:	append ```?hola_mode=disabled```

Note that in order to check mode or see statistics, you will need to use the console, see below. 

## Configuring via browser console

In the browser developer console, enter one of the following commands:

To enable: 		```hola_cdn.set_mode_stats()```
To disable:		```hola_cdn.set_mode_disable()```
To view the mode: 	```hola_cdn.mode```
To see statistics: 	```hola_cdn.get_stats()```
To see all settings:	```hola_cdn.help()```

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

## Checking statistics on the portal

Login to your account on [www.holacdn.com](http://www.holacdn.com) and verify that statistics are written to your account. Note that you will only see statistics in the 'disabled' column, since Hola CDN is only operating in statistics mode at this point. To view individual events, click on ‘debug mode’. Note that it may take a few minutes for statistics to appear on the portal.

# 4. Deployment to production

When you are satisfied with local testing, you can gradually enable the service in production. Login to your portal account and go to the configuration section. Use the granular controls to enable Hola on different platforms/browsers

For example:

* Start by enabling Hola CDN in statistics mdoe for 10% of Chrome/Win users.
* Increase Hola CDN statistics collection to 100% of Chrome/Win users.
* Add more/browsers/platforms.

Changes take effect immediately, and you will receive a confirmation email every time you change settings on the portal.

# Step 2:  Enabling Hola CDN and measuring performance/cost improvements

Now that you have the code on your site collecting statistics, you can easily turn on Hola CDN, by following the next steps. 

Enabling g Hola CDN which will result in performance increases and cost reductions by using both the cliet-side Javascript and Hola CDN servers around the world.

Note that some of the instructions below are relevant to progressive download, and some to adaptive protocols.

# 5. Video server configuration 

To ensure optimal operation of Hola CDN, certain HTTP headers need to be enabled on the servers serving video files. The following section describes how to verify and if needed, enable these headers.

## 5.1 CORS settings for MP4/FLV/WEBM progressive video

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

## 5.2 Optional: CORS settings for HLS/HDS

Hola CDN works with modern, chunked video protocols by requesting video segments from multiple servers in parallel. Basic operation does not require any changes to CORS settings.

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

## 5.3 Configuring CORS headers

For step by step instructions regarding how to enable CORS on different web servers, see the [[original CORS documentation](http://enable-cors.org/server.html)] (http://enable-cors.org/server.html). If you are using Amazon S3, please click [[here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3)] (https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). Make sure you add all the required headers, not just '*' referenced in the generic instructions.

After committing the configuration changes, verify response that headers to from this server(s) include required headers, as described above.

## 5.4 Handling redirects

In some implementations, the first video URL is redirected to another URL. In this case, make sure that:

- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.

- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

# 6. Allowing Hola CDN to download content

Hola’s CDN servers need to download a first copy of the video from your infrastructure to serve to future users. 

## 6.1 Configuring video origin servers

Hola’s CDN needs to know where to download a copy of the video from your infrastructure to serve to future users. Please email cdn-help [at] hola [dot] with your customer ID and a list of the video servers. 

For example, if the URL to your video file looks like

[http://video.example.org/content/sample_video.mp4](http://video.example.org/content/sample_video.mp4)
, or
[http://video.example.org/content/sample_video.m3u8](http://video.example.org/content/sample_video.m3u8)

simply send ‘video.example.org’ with your customerID to HolaCDN. 

## 6.2 Handling content protection

If your video servers do not use any content protection algorithms, skip to step 4.

In case your video URLs use content protection scheme, Hola servers will not be able to download videos, and Hola CDN will not be able to function. There are a few ways of dealing with content protection:

### 6.2.1 Whitelisting Hola CDN servers

Whitelisting the Hola CDN servers is the fastest way to enable Hola CDN to operate. Add the following servers to your list of whitelisted IPs:

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

### 6.2.2 Allow Hola servers to access your videos using other methods 

In case whitelisting IPs is not an option, you will need to work with Hola to define alternative ways to allow the Hola servers to download video files. 

There are a few ways: 

* Share the key generation algorithms with Hola, so that Hola servers will generate valid requests
* Set up a direct/hidden URL
* Set-up a special key which will identify Hola servers.

Please contact Hola in order to determine the best way to address this issue.

# 7. Testing Hola CDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can test the live code locally by either appending a command to your URL, or by entering commands in the browser developer console. 

## Configuring via address bar

To control HolaCDN via the address bar, append ```?hola_mode=xxx``` to the URL.
To enable CDN mode:	append ```?hola_mode=cdn```
To enable stats mode: 	append ```?hola_mode=stats```
To disable HolaCDN:	append ```?hola_mode=disabled```

Note that in order to check mode or see statistics, you will need to use the console, see below. 

## Configuring via browser console

In the browser developer console, enter one of the following commands:

To enable: 		```hola_cdn.set_mode_cdn()```
To enable: 		```hola_cdn.set_mode_stats()```
To disable:		```hola_cdn.set_mode_disable()```
To view the mode: 	```hola_cdn.mode```
To see statistics: 	```hola_cdn.get_stats()```
To see all settings:	```hola_cdn.help()```

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

## Checking statistics on the portal

Login to your account on [www.holacdn.com](http://www.holacdn.com) and verify that statistics begin to appear in the "enabled" column. To view individual events, click on ‘debug mode’. Note that it may take a few minutes for statistics to appear on the portal.

# 8. Deployment to production

When you are satisfied with local testing, you can gradually enable the service in production. Login to your portal account and go to the configuration section. Use the granular controls to enable Hola on different platforms/browsers

For example:

* Start by enabling Hola CDN for 10% of Chrome/Win users, and 90% only for statistics collection.
* Increase Hola CDN to 90% of Chrome/Win users, and leave 10% for statistics.
* Add more/browsers/platforms.

Changes take effect immediately, and you will receive a confirmation email every time you change settings on the portal.
