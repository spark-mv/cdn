# Free video user experience statistics

This is a step-by-step guide to adding the free HolaCDN video statistics to your website.

**_Hola video statistics are and will always remain free_**

# Create an account

On the HolaCDN customer portal, you will be able to view user experience statistics such as video start time, buffering, video quality and other settings. You will also be able to configure your HolaCDN system.

Create an account on [https://holacdn.com](https://holacdn.com/). Hola will activate your account and send JavaScript code for it.

# Add Hola JS to your website

Hola will provide you with JS to add to your website. If you did not receive code, please email [cdn-help@hola.org](mailto:cdn-help@hola.org).

Note that you can safely add the JS code to your web page, it will not affect users in the field. Although the script will be loaded, it is disabled by default on the server side. This is to protect from accidental mass deployment.

After the code is on your web pages, you can enable it gradually in order to ensure a smooth deployment:

* First on your local machine

* Then to a subset of users

* Then to all users

Hola will email you detailed integration Instructions for your site. Below you can see an example:

Add the following line to the <head> tag of the video page

```<script async src="http://player.h-cdn.com/loader_**yourname**.js"></script>```

# Testing locally on your PC

Once the code is live on the webpage, remember it is still disabled by default on the server side. You can easily enable/disable it locally to test the live code locally. This is possible by either appending a command to your URL, or by entering commands in the browser developer console. 

## Configuring via address bar

To control HolaCDN via the address bar, simply append ```?hola_mode=xxx``` to your URL.

To enable CDN mode:	append ```?hola_mode=cdn```

To enable stats mode: 	append ```?hola_mode=stats```

To disable HolaCDN:	append ```?hola_mode=disabled```

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

# Deployment to production

## Enabling Hola in production

When you are satisfied with local testing, you can gradually enable the service. This can can be done using any of the following ways:

- Add the JS code only to a specific area/category of the site

- Enabling the service on a percentage of the traffic

- Enabling the JS only on specific platforms/browsers

You will soon be able to control #2,#3 from your portal account. Until that time, Hola support will work with you to enable a given percentage of users on specific platforms/browsers.

## Disabling Hola in production

You can disable Hola by logging into your portal page on [http://holacdn.com/](http://holacdn.com/) and clicking the "Disable" button. You can also re-enable Hola by clicking the same button to the same combination of users.
