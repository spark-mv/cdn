# Server side configuration for MP4/FLV/WebM progressive download


## 1. Configuring CORS headers

### 1.1 CORS configuration for most web servers

For step by step instructions regarding how to enable CORS on different web servers, see the [[original CORS documentation](http://enable-cors.org/server.html)] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the generic instructions.

After committing the configuration changes, verify response that headers to from this server(s) include required headers, as described above.

#### Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content)

### 1.2 CORS configuration for Amazon AWS

Note: If the bucket used to store the video files is not the same bucket used to store the
page that loads the video, then the following must be configured for all related buckets.

From your AWS console go to S3 and follow the steps:

1. Select the relevant bucket.
2. Click on “Properties”.
3. Click “Permissions”.
4. Click “Edit CORS Configuration”.
5. A popup will open. Paste the XML below to the popup, and click “Save”.
```
<CORSConfiguration>
 <CORSRule>
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>HEAD</AllowedMethod>
  <AllowedMethod>GET</AllowedMethod>
  
  <AllowedHeader>Content-Type</AllowedHeader>
  <AllowedHeader>Origin</AllowedHeader>
  <AllowedHeader>Accept</AllowedHeader>
  <AllowedHeader>Range</AllowedHeader>
  <AllowedHeader>Cache-Control</AllowedHeader>
  
  <ExposeHeader>Content-Range</ExposeHeader>
  <ExposeHeader>Date</ExposeHeader>
  <ExposeHeader>Etag</ExposeHeader>
  
  <MaxAgeSeconds>600</MaxAgeSeconds>
 </CORSRule>
</CORSConfiguration>
```

Uppon completion, [verify CORS configuration] (#verifyAWS).

If you require a more in-depth guide to customizing your S3 bucket configuration, see [Amazon documentation] (http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html)

#### Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content)


### 1.3. CORS configuration for MaxCDN

Please refer to [these instructions] (https://docs.google.com/document/d/12wQr79BXaTJ4WF9_-oueEW9Cx0FMvsNOCcMBifzfzIE) for step by step instructions on how to set-up CORS on MaxCDN.

#### Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content)


## 2. Verify current CORS settings

Instrcuctions for verifying and configuring CORS settings for different web servers are below. 

If you have any questions, email cdn-help [at] hola [dot] org, or skype:holacdn

### 2.1 Verification for most web servers

Hola free bandwidth saver and CDN work by requesting your MP4/FLV/WEBM files from the video server in chunks. For this to work, certain HTTP headers need to be enabled.

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H  "Access-Control-Request-Headers: range" <link to MP4/FLV/WEBM file>```

Another way to quickly to see if your HTTP server is configured correctly is using the Chrome develope console. Open the 'network' tab, load your page, and click on the line with the MP4. In the 'headers' tab look at the response headers.

In both cases, the desired response is:

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

### <a name="verifyAWS"></a> 2.2 Verification for Amazon AWS

If you are using Amazon S3 to store videos, you should configure your bucket to allow cross-origin requests, you create a CORS configuration, an XML document with rules that identify the origins that you will allow to access your bucket, the operations (HTTP methods) will support for each origin, and other operation-specific information. 

Test to see if your HTTP server is configured correctly by using:

```curl -v -H "Origin: <site origin link>" -X OPTIONS -H "Access-Control-Request-Headers: range" -H "Access-Control-Request-Method: GET" <link to MP4/FLV/WEBM file>```
