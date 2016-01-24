# This page is for troubleshooting

Search the page for the error message you see on the developer console.


## disabled no_browser_match

### Possible causes
1. HolaCDN is disabled on the server side. This is the default starting configuration, and is meant to prevent accidental mass deployments.

### Solutions
1. Define which browsers will be activated in each mode on the control panel.
  a. Login to [your account] (http://holacdn.com/signin?utm_source=holaext)
  b. Go to the configuration section
  c. Add the relevant browsers
  d. Save your settings, which will take a few minutes to go into effect
  e. Reload the page.
  f. HolaCDN will load in one of three modes - disabled, stats or CDN - according to probabilities specified in the control panel.

## disabled random

## fallback error

## hola skip

### Possible causes
1. HolaCDN client cannot find sources for the given video URL, because no video sources are defined on the HolaCDN control panel. It is therefore skipped (played without HolaCDN). 

### Solutions
1. Define one or more video sources for the video. Note that the matching is done for the full domain.
  a. Login to [your account] (http://holacdn.com/signin?utm_source=holaext)
  b. Go to the configuration section and scroll down to the video zone source
  c. Add one or more video sources
  d. Save your settings, which will take a few minutes to go into effect
  e. Reload the page.
  f. The error should disappear and video will be downloaded from HolaCDN.


## wrapper detached from player
### Possible causes
1. HolaCDN servers cannot download a copy of the video from your servers. The HolaCDN client therefore detaches from the player, and the video plays normally. 

### Solutions
1. Allow HolaCDN servers access to your CDN or origin servers2. 

## browser_unsupported


## cdn is not attached


