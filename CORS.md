# Server side configuration for MP4/FLV/WebM progressive download

Instructions for configuring and verifying CORS settings for different web servers are below. 

If you have any questions, email cdn-help@hola.org, or skype:holacdn

### Test CORS using HolaCDN console command
First enable hola_debug. Either by adding url param `?hola_debug=true` when accessing the page,  or type in console `hola_cdn.debug_mode()`.

Now enter in console:
```
hola_cdn.test_cors()
```

The current status of CORS settings will be displayed.

If you see ```CORS status: full support```, your CORS settings are correct. Otherwise, continue following this guide to configure and verify your settings using one of the following guides:
- [CORS setup for most web servers](#configMostServers)
- [CORS setup for Amazon AWS S3](#configAWS)
- [CORS setup for MaxCDN](#configMaxCDN)
- [CORS setup for Fastly](#configFastly)

### <a name="configMostServers"></a>CORS configuration for most web servers

For step by step instructions regarding how to enable CORS on different web servers, see the [[original CORS documentation](http://enable-cors.org/server.html)] (http://enable-cors.org/server.html). Make sure you add all the required headers (**header fields are comma separated**), not just '*' referenced in the generic instructions:

- Access-Control-Allow-Origin: * 
- Access-Control-Allow-Methods: HEAD, GET, OPTIONS
- Access-Control-Expose-Headers: Content-Range, Date, Etag, Cache-Control, Last-Modified
- Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
- Access-Control-Max-Age: 600
- Timing-Allow-Origin: *

After committing the configuration changes, [verify it works](https://docs.google.com/document/d/1aLFKeQIbs3EnSMXKjXQrseVf_XkeOlDNMDYbxnbH2N8/edit?usp=sharing)

**Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#4-allow-holacdn-to-download-content)**

### <a name="configAWS"></a>CORS configuration for Nginx
A sample conf statements is given below. Not that they have to be in the same nested level
```
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Methods' 'HEAD, POST, GET, OPTIONS';
  add_header 'Access-Control-Expose-Headers' 'Content-Range, Date, Etag, Cache-Control, Last-Modified';
  add_header 'Access-Control-Allow-Headers' 'Content-Type, Origin, Accept, Range, Cache-Control';
  add_header 'Access-Control-Max-Age' '600';
  add_header 'Timing-Allow-Origin' '*';
```


### <a name="configAWS"></a>CORS configuration for Amazon AWS

Please refer to [these instructions](https://docs.google.com/document/d/1RrWA7gfCLDXcjgCQOQRGs0A3IRSlvn3Ktu9zHp9j-po/edit?usp=sharing) for a step-by-step guide on how to configure and verify CORS for Amazon AWS S3.

For Amazon's official document on setting CORS on S3, see [here](http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).

If you're using CloudFront, please refer to [Amazon's documentation](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html#header-caching-web-cors) for to how to configure CloudFront to respect cross-origin resource sharing (CORS).

**Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#4-allow-holacdn-to-download-content)**

### <a name="configMaxCDN"></a>CORS configuration for MaxCDN

Please refer to [these instructions] (https://docs.google.com/document/d/12wQr79BXaTJ4WF9_-oueEW9Cx0FMvsNOCcMBifzfzIE/edit?usp=sharing) for a step-by-step guide on how to setup CORS on MaxCDN.

**Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#4-allow-holacdn-to-download-content)**

### <a name="configFastly"></a>CORS configuration for Fastly

Please refer to [these instructions] (https://docs.google.com/document/d/1zIMMQe4lSy7ubcWv9FDxzsWw6acjv9_o6yZrhgoyit0/edit?usp=sharing) for a step-by-step guide on how to setup CORS on Fastly.

**Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#4-allow-holacdn-to-download-content)**
