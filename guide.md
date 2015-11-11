# Overview

The objective of this document is to verify that your system is configured correctly for Hola CDN. Once settings are configured and verified, you can integrate Hola Javascript to your website and instantly enjoy Hola CDN benefits.

# Step 1: Create an account

Create an account on [https://holacdn.com](https://holacdn.com/). Hola will activate your account and analyze your site, in order to prepare JavaScript code for integration which will happen after the following steps are completed. You can continue to the next step, no need to wait.

# Step 2: Server-side settings 

Hola free bandwidth saver and CDN work by requesting your MP4/FLV files from the video server in chunks.

## How to verify existing CORS header configuration

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" < link to MP4/FLV file>```

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

Here is an example for the video used for the demo on Hola CDN website: 

[check and give both CURL example and response for http://player.h-cdn.org/static/mp4/exteriores_hd_pinturas_2.mp4

In case the response is different from the desired response, you need to configure the missing headers by enabling CORS on the web server(s) that is serving the video files. We suggest to go line by line to ensure all headers are configured correctly. 

## So, how do I configure CORS headers?

For step by step instructions regarding how to enable CORS on different web servers, see the [original CORS documentation](http://enable-cors.org/server.html). If you are using Amazon S3, please click [here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). Make sure you add all the required headers, not just '*' referenced in the instructions.

After committing the configuration changes, verify response headers to MP4/FLV files from this server(s) include required headers, as described above.

# Step 3: Content protection

In case your video URLs have some sort of content protection scheme, additional settings are required. This is because Hola’s CDN servers will initially attempt to download a copy of the video from your infrastructure to serve to future users. If content protection is used and no steps are taken, Hola servers will not be able to download videos.

There are a few ways of dealing with content protection.

## Whitelisting Hola CDN servers

Whitelisting the Hola CDN servers is the fastest way to enable Hola CDN to operate. Add the following servers to your list of whitelisted IPs:  [CHECK!!!!]

37.187.161.44

76.73.18.98

5.196.82.58

204.45.27.2

## Allow Hola servers to access with predefined key

In case whitelisting IPs is not an option, ……..of the video URL includes encoded information of the user’s IP, or another type of hash, Hola CDN servers still need to be able to download video. It is possible to set up a direct url link for Hola to access. Click here for an explanation on how to solve file protection

 

# Step 4: Add Hola JS to your website

The next steps is adding the Hola JS code into your web page.

Note that you can safely add the JS code to your web page. Hola CDN will not be turned on at this stage - it is disabled by default on the server side. This is to protect from accidental mass deployment.

After the code is on your web pages, you can enable Hola CDN gradually in order to ensure a smooth deployment:

* First on your local machine

* Then to a subset of users

* Then to all users

Hola will email you detailed integration Instructions for your site. Below you can see an example:

1. Add the following line to the <head> tag of the video page

```<script async src="http://player.h-cdn.com/loader_**yourname**.js"></script>```

2. After the call to setup the video pllayer, add the following script, where ##### is the video number ID:

```// SAMPLE CODE - DO NOT USE

function **yourname**_hola_init(){
    if (window.hola_cdn && window.hola_cdn.init_**yourname**_hola_init)
	window.hola_cdn.init_**yourname**_hola_init()
    else
	window.hola_cdn_on_load = true;
}

jwplayer("video-**_#####_**").onReady(**yourname**_hola_init);

// SAMPLE CODE - DO NOT USE```

# Step 5: Testing Hola CDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can easily enable it locally to test the live code locally on your machine. Simply run in the console

```hola_cdn.set_mode_cdn()```

And reload the page. Hola CDN is now enabled on your browser. Note, this is a persistent setting. 

To disable: ```hola_cdn.set_mode_disable()```

To view the mode: ```hola_cdn.mode```

To see all settings:```hola_cdn.help()```

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

# Step 6: Deployment to production

## Enabling Hola in production

When you are satisfied with local testing, you can gradually enable the service. This can can be done using any of the following ways:

1.     Add the JS code only to a specific area/category of the site

2.     Enabling the service on a percentage of the traffic

3.     Enabling the JS only on specific platforms/browsers

You will soon be able to control #2,#3 from your portal account. Until that time, Hola support will work with you to enable a given percentage of users on specific platforms/browsers.

## Disabling Hola in production

You can disable Hola by logging into your portal page on [http://holacdn.com/](http://holacdn.com/) and clicking the "Disable" button.

You can also re-enable Hola by clicking the same button to the same combination of users.

