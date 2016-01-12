## Server side configuration for MP4/FLV/WebM progressive download

In order to allow the client side module to send byte-range requests, please enable CORS on the HTTP server(s) that is serving the video files and verify response headers to MP4/FLV files from this server(s) include the following headers:

* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: HEAD, GET, OPTIONS
* Access-Control-Expose-Headers: Content-Range, Date, Etag, X-Cache
* Access-Control-Allow-Headers: Content-Type, Origin, Accept, Range, Cache-Control
* Access-Control-Max-Age: 600
* Timing-Allow-Origin: *

For step by step instructions regarding how to enable CORS on different web servers, see the original [CORS documentation] (http://enable-cors.org/server.html). Make sure you add all the required headers, not just '*' referenced in the instructions.

#### Testing server headers
```curl -v -H "Origin: <site origin link>" -X OPTIONS -H "Access-Control-Request-Headers: range" <video link>```  
Verify response:
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
#### Using Amazon S3 

If you are using Amazon S3 to store videos, you should configure your bucket to allow cross-origin requests, you create a CORS configuration, an XML document with rules that identify the origins that you will allow to access your bucket, the operations (HTTP methods) will support for each origin, and other operation-specific information. You can add up to 100 rules to the configuration. You add the XML document as the cors subresource to the bucket.

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

For step by step instructions regarding how to enable CORS on Amazon S3, see the [Amazon documentation] (http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).

## Finished with CORS configuration? You can [go back to enabling HolaCDN] (https://github.com/hola/cdn/blob/master/install.md#2-allow-holacdn-to-download-content)


For any questions, please contact cdn-help [at] hola [dot] org.
