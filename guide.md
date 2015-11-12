# Overview

The objective of this document is to verify that your system is configured correctly for Hola CDN. Once settings are configured and verified, you can integrate Hola Javascript to your website and instantly enjoy Hola CDN benefits.

# 1. Create an account

Create an account on [https://holacdn.com](https://holacdn.com/). Hola will activate your account and analyze your site, in order to prepare JavaScript code for integration which will happen after the following steps are completed. You can continue to the next step, no need to wait.

# 2. Server-side settings 

To ensure optimal operation of Hola CDN, certain HTTP headers need to be enabled on the video streaming servers. The following section described how to verify and if needed, enable these headers.

Different headers are needed for MP4/FLV progressive video and for HLS/HDS/MPEG-DASH protocols. Please select the relevant section.

## 2.1 Settings for MP4/FLV progressive video

Hola free bandwidth saver and CDN work by requesting your MP4/FLV files from the video server in chunks. For this to work, certain HTTP headers need to be enabled.

### How to verify existing CORS header configuration

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" <link to MP4/FLV file>```

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

In case the response is different from the desired response, you need to configure the missing headers by enabling CORS on the web server(s) that is serving the video files. We suggest to go line by line to ensure all headers are configured correctly. Please see the ‘How do I configure CORS’ section for instructions.

## 2.2 Settings for HLS/HDS/MPEG-DASH

Hola CDN works by requesting video segments from multiple servers. For this to work, certain HTTP headers need to be enabled.

### How to verify existing CORS header configuration

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" <link to manifest file>```

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

In case the response is different from the desired response, you need to configure the missing headers by enabling CORS on the web server(s) that is serving the video files. We suggest to go line by line to ensure all headers are configured correctly. 

### How to verify existing CORS header configuration

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" <link to MP4/FLV file>```

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

In case the response is different from the desired response, you need to configure the missing headers by enabling CORS on the web server(s) that is serving the video files. We suggest to go line by line to ensure all headers are configured correctly. Please see the ‘How do I configure CORS’ section for instructions.

## 2.3 So, how do I configure CORS headers?

For step by step instructions regarding how to enable CORS on different web servers, see the [original CORS documentation](http://enable-cors.org/server.html). If you are using Amazon S3, please click [here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). Make sure you add all the required headers, not just '*' referenced in the generic instructions.

After committing the configuration changes, verify response headers to MP4/FLV files from this server(s) include required headers, as described above.

# 3. Handling content protection

Hola’s CDN servers will initially attempt to download a copy of the video from your infrastructure to serve to future users. In case your video URLs have some sort of content protection scheme, additional settings are required. If content protection is used and no steps are taken, Hola servers will not be able to download videos, and Hola CDN will not be able to function.

There are a few ways of dealing with content protection.

## 3.1 Whitelisting Hola CDN servers

Whitelisting the Hola CDN servers is the fastest way to enable Hola CDN to operate. Add the following servers to your list of whitelisted IPs:

```

50.7.1.2
46.105.109.214
185.18.206.193
85.17.24.129
37.187.161.44
76.73.18.98
5.196.82.58
204.45.27.2

```

## 3.2 Allow Hola servers to access your videos using other methods 

In case whitelisting IPs is not an option, you will need to work with Hola to define alternative ways to allow the Hola servers to download video files. 

There are a few ways: 

* Share the key generation algorithms with Hola, so that Hola servers will generate valid requests

* Set up a direct/hidden URL

* Set-up a special key which will identify Hola servers.

Please contact Hola in order to determine the best way to address this issue.

# 4. Add Hola JS to your website

Hola will provide you with JS to add to your website. If you did not receive code, please email .

Note that you can safely add the JS code to your web page, it will not affect users in the field. Although the script will be loaded, it is disabled by default on the server side. This is to protect from accidental mass deployment.

After the code is on your web pages, you can enable Hola CDN gradually in order to ensure a smooth deployment:

* First on your local machine

* Then to a subset of users

* Then to all users

Hola will email you detailed integration Instructions for your site. Below you can see an example:

1. Add the following line to the <head> tag of the video page

```<script async src="http://player.h-cdn.com/loader_**yourname**.js"></script>```

2. After the call to setup the video player, add the following script, where ##### is the video number ID:

```

// SAMPLE CODE - DO NOT USE

function **yourname**_hola_init(){
    if (window.hola_cdn && window.hola_cdn.init_**yourname**_hola_init)
	window.hola_cdn.init_**yourname**_hola_init()
    else
	window.hola_cdn_on_load = true;
}

jwplayer("video-**_#####_**").onReady(**yourname**_hola_init);

// SAMPLE CODE - DO NOT USE

```

# 5. Testing Hola CDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can easily enable/disable it locally to test the live code locally on your machine. In the browser developer console, enter one of the following commands:

To enable: 		```hola_cdn.set_mode_cdn()```

To disable:		```hola_cdn.set_mode_disable()```

To view the mode: 	```hola_cdn.mode```

To see statistics: 	```hola_cdn.get_stats()```

To see all settings:	```hola_cdn.help()```

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

# 6. Deployment to production

## 6.1 Enabling Hola in production

When you are satisfied with local testing, you can gradually enable the service. This can can be done using any of the following ways:

1.     Add the JS code only to a specific area/category of the site

2.     Enabling the service on a percentage of the traffic

3.     Enabling the JS only on specific platforms/browsers

You will soon be able to control #2,#3 from your portal account. Until that time, Hola support will work with you to enable a given percentage of users on specific platforms/browsers.

## 6.2 Disabling Hola in production

You can disable Hola by logging into your portal page on [http://holacdn.com/](http://holacdn.com/) and clicking the "Disable" button. You can also re-enable Hola by clicking the same button to the same combination of users.

