# Part One: Solidify Terminology

>In your own terms, define the following terms:

1. What is HTTP?
Hyper Text Transfer Protocol. A protocol that governs how data is communicated on the internet.
1. What is a URL?
Unique Resource Locator. A human-readable address that specifies which resources you want to request.
1. What is DNS?
Domain Name System. A system of servers that, when requested, turn human-readable urls into IP addresses.
1. What is a query string?
A string, typically at the end of a URL that serves as a GET request header on the server. example would be: https://wikipedia.org?q=DNS
1. What are two HTTP verbs and how are they different?
	1. GET: Specifies a request for a resource.
	2. POST: Specifies a return of a resource.
1. What is an HTTP request?
A request is analagous to a query one computer makes to another for a specific resource. like an HTML page. or an image.
1. What is an HTTP response?
A response is usually done by a server and comes headed with a number code that describes what happened to the client. A status of 200 means OK. and the following body of the response would contain the resources specified in the GET request.
1. What is an HTTP header? Give a couple examples of request and response headers you have seen.
An HTTP header is like an option given to a server that describes what information the client would like to recieve.
Two examples I have seen today are:
	1. "Accept-language:fr"
	2. "apllication:json"
1. What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
As I understand it:

- You press enter in the search bar.
- Your browser checks the cache for an IP address stored for that website.
- Assuming it hasn't found an IP address in local cache, it makes a request to a DNS for the IP address of that site. Using http. Meaning it requests it from port 80.
- The DNS responds with a few A or AAAA records that provide the IP address to the client.
- The browser checks the local cache for the resource specified in the URL to see if it contains it already.
- if it does, I guess it then checks the TTL of the resource to see if it needs to be refreshed.
- The browser uses that address to make a request with a "host" or "location" header describing the url that was used to the server.
- the server parses the request using the url slug and query parameter to locate the specified resourse.
- the server sends back a response code followed by the body of the response which contains the specified resources.
- the browser parses these resources for other URL's and makes additional requests to the server as necessary.
- rinse and repeat.
