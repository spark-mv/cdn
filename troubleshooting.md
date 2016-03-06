# HolaCDN troubleshooting page

HolaCDN may generate warnings and errors to the browser's developer console. Search this page for the relevant error message to understand possible causes and solutions.

## disabled no_browser_match
#### Possible causes
1. HolaCDN is disabled on the server side for the browser you are using. This is the default starting configuration for all browsers, and is meant to prevent accidental mass deployments.

#### Solutions
1. Define which browsers will be activated in each mode on the control panel.
  * Login to [your account] (http://holacdn.com/signin?utm_source=holaext) and go to the configuration section
  * Add the relevant browsers
  * Save your settings, which will take a few minutes to go into effect
  * Reload the page.
  * HolaCDN will load in one of three modes - disabled, stats or CDN - according to probabilities specified in the control panel.

## disabled random
#### Possible causes
1. This is actually not an error message - it simply means that the HolaCDN client was explicitly instructed by the server to be loaded in disabled mode. This will happen if the total of CDN + stats percentages in the control panel is under 100%. Any percentage not allocated to stats or CDN will be disabled. 

#### Solutions
1. Ensure the total of CDN and statistics percentages adds up to 100% in the control panel.
  * Login to [your account] (http://holacdn.com/signin?utm_source=holaext) and go to the configuration section
  * Adjust CDN and stats percentages
  * Save your settings, which will take a few minutes to go into effect
  * Reload the page.
  * HolaCDN will load either in stats or CDN - according to probabilities specified in the control panel.

## disabled browser_unsupported
### Possible causes
1. HolaCDN requires Media Source Extensions (MSE) to be enabled on the web browsr. Older versions of browsers which do not support MSE are not supported by HolaCDN. Here is the [full list of supported platforms] (http://holacdn.com/faq#in_platforms).  

### Solutions
1. Use a supported browser

## hola skip
### Possible causes
1. HolaCDN client cannot find sources for the given video URL, because no video sources are defined on the HolaCDN control panel. It is therefore skipped (played without HolaCDN). 

### Solutions
1. Define one or more video sources for the video. Note that the matching is done for the full domain.
  * Login to [your account] (http://holacdn.com/signin?utm_source=holaext)
  * Go to the configuration section and scroll down to the video zone source
  * Add one or more video sources
  * Save your settings, which will take a few minutes to go into effect
  * Reload the page.
  * The error should disappear and video will be downloaded from HolaCDN.


## wrapper detached from player
#### Possible causes
1. HolaCDN servers cannot download a copy of the video from your servers. The HolaCDN client therefore detaches from the player, and the video plays normally. 

#### Solutions
1. Allow HolaCDN servers access to your CDN or origin servers. 
  * See additional information in the [setup instructions] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content)
  * Go to the configuration section and scroll down to the video zone source
  * Add one or more video sources

## Error 403
#### Possible causes
1. Incorrectly configured CORS.
2. Browser doesn't correctly manage persistent cache.

#### Solutions
1. [CORS.md](Verify CORS configuration)
2. Clearing browser's persistent cache.<br/>
Open your browser's Developer Tools and remove the relevant locally stored keys.
![Clear persistent local cache](/resources/clear_local_cache.png)

## Request canceled error
The following error type is expected and does not indicate HolaCDN is not working properly.
![Canceled error example](/resources/canceled_error_2.png)
![Canceled error example](/resources/canceled_error_1.png)

## Statistics don't work / seeing only zone_init events
#### Possible causes
1. Incorrect Video Source(s) configuration.

#### Solutions
1. Set the Video Source(s) to specific sources your videos are coming from, or `*` for any location.
![Video Source configuration](/resources/video_sources.png)

## cdn is not attached

## fallback error

