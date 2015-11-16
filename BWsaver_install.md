# Hola Free Bandwidth Saver

This is a step-by-step guide to adding Hola Free Bandwidth Saver to your website.

**_Hola Bandwidth Saver is and will always remain free for commercial and non-commercial use_**

# 1. Create an account

On the HolaCDN customer portal, you will be able to view bandwidth savings, user experience statistics such as video start time, buffering, video quality and other settings. You will also be able to configure your HolaCDN system.

 

Create an account on [https://holacdn.com](https://holacdn.com/). Hola will activate your account and analyze your site, in order to prepare JavaScript code for it.

After creating the account, continue to the steps 2-3; no need to wait.

# 2. Server-side settings 

To ensure optimal operation of Hola CDN, certain HTTP headers need to be enabled on the video streaming servers. The following section described how to verify and if needed, enable these headers.

## CORS settings for MP4/FLV progressive video

Hola free bandwidth saver and CDN work by requesting your MP4/FLV files from the video server in chunks. For this to work, certain HTTP headers need to be enabled.

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

In case the response is different from the desired response, you need to configure the missing headers by enabling CORS on the web server(s) that is serving the video files. We suggest to go line by line to ensure all headers are configured correctly. Please see the ‘Configuring CORS headers’ section for instructions.

## 2.3 Handling redirects

In some cases, the first video URL is redirected to another URL. In this case, make sure that:

- Any video data links that redirect also respond to OPTIONS with CORS headers as detailed above.

- The response headers must respond to OPTIONS with 200/204 status, and not with 302.

## 2.4 Configuring CORS headers

For step by step instructions regarding how to enable CORS on different web servers, see the [original CORS documentation](http://enable-cors.org/server.html). If you are using Amazon S3, please click [here](https://github.com/hola/cdn/blob/master/progressive_download.md#using-amazon-s3). Make sure you add all the required headers, not just '*' referenced in the generic instructions.

After committing the configuration changes, verify response that headers to from this server(s) include required headers, as described above.

# 3. Add Hola JS to your website

Hola will provide you with JS to add to your website. If you did not receive code, please email .

Note that you can safely add the JS code to your web page, it will not affect users in the field. Although the script will be loaded, it is disabled by default on the server side. This is to protect from accidental mass deployment.

After the code is on your web pages, you can enable Hola CDN gradually in order to ensure a smooth deployment:

* First on your local machine

* Then to a subset of users

* Then to all users

Hola will email you detailed integration Instructions for your site. Below you can see an example:

3. Add the following line to the <head> tag of the video page

```<script async src="http://player.h-cdn.com/loader_**yourname**.js"></script>```

4. After the call to setup the video player, add the following script, where ##### is the video number ID:

```

// SAMPLE CODE - DO NOT USE

function **customer_name**_hola_init(){
    if (window.hola_cdn && window.hola_cdn.init_**customer_name**_hola_init)
	window.hola_cdn.init_**customer_name**_hola_init()
    else
	window.hola_cdn_on_load = true;
}

videoplayer("video-**_#####_**").onReady(**customer_name**_hola_init);

// SAMPLE CODE - DO NOT USE

```

# 4. Testing Hola CDN locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can easily enable/disable it locally to test the live code locally. This is possible by either appending a command to your URL, or by entering commands in the browser developer console. 

## Configuring via address bar

To control HolaCDN via the address bar, simply append ```?hola_mode=xxx``` to your URL.

To enable Hola BW saver:		append ```?hola_mode=bwsaver```

To enable stats mode: 		append ```?hola_mode=stats```

To disable Hola BW saver:		append ```?hola_mode=disabled```

Note that in order to check mode or see statistics, you will need to use the console, see below. 

## Configuring via browser console

In the browser developer console, enter one of the following commands:

To enable: 		```hola_cdn.set_mode_cdn()```

To disable:		```hola_cdn.set_mode_disable()```

To view the mode: 	```hola_cdn.mode```

To see statistics: 	```hola_cdn.get_stats()```

To see all settings:	```hola_cdn.help()```

Note: If your site includes frames, don’t forget to enter the console commands in the frame where the video player is located.

## Checking statistics on the portal

Login to your account on [www.holacdn.com](http://www.holacdn.com) and verify that statistics are written to your account. To view individual events, click on ‘debug mode’. Note that it may take a few minutes for statistics to appear on the portal.

# 5. Deployment to production

## 5.1 Enabling Hola in production

When you are satisfied with local testing, you can gradually enable the service. This can can be done using any of the following ways:

- Add the JS code only to a specific area/category of the site

- Enabling the service on a percentage of the traffic

- Enabling the JS only on specific platforms/browsers

You will soon be able to control #2,#3 from your portal account. Until that time, Hola support will work with you to enable a given percentage of users on specific platforms/browsers.

## 5.2 Disabling Hola in production

You can disable Hola by logging into your portal page on [http://holacdn.com/](http://holacdn.com/) and clicking the "Disable" button. You can also re-enable Hola by clicking the same button to the same combination of users.

