### Conceptual Exercise

Answer the following questions below:


- What is PostgreSQL?
    PostgreSQL is a kind of software. Specifically, it is a Relational databse management system. It allows you to store data securely in relational tables for quick and modular recall. PostgreSQL is a good SQL database to begin learning on because it adheres very closely to the SQL standard and is very widely used.


- What is the difference between SQL and PostgreSQL?
    SQL stands for Simple Querying Language. It is a standardized language used to access information stored in SQL databases. PostgreSQL is a software or RDBMS that utilizes this standardized language to make queries to the data stored in the postgreSQL database.


- In `psql`, how do you connect to a database?
    `$ \c <database-name>`


- What is the difference between `HAVING` and `WHERE`?
    *** 
    ***  DOUBLE CHECK THIS  ***
    ***
    the `HAVING` keyword in SQL filters for a specified row name.
    the `WHERE` keyword in SQL filters for a specified row value.


- What is the difference between an `INNER` and `OUTER` join?


- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?


- What is an ORM? What do they do?
    *** 
    ***  DOUBLE CHECK THIS  ***
    ***
    An ORM is an `Object Relational Management` system. It essentially provides a kind of API to interact with with SQL databases. SQLAlchemy is a kind of ORM.


- What are some differences between making HTTP requests using `AJAX` (on the front end) and `requests` (on the backend)?
    Besides the differences in how they are integrated into the overall archetecture of the app, (one being on the front end and one being on the back end) handling http requests with `AJAX` versus `requests` have some key differnces.

    First of all, when handling http requests with `AJAX` there doesn't necessarily need to be an entire HTML reflow in order to make the request. This can make handling API calls faster for the client. The browser does not need to refresh the page.
    Second, `AJAX` requests are visible to the end user. This can have some security implications. Whereas http requests using `requests` on the back end will never be visible to the end user unless they are explicitly made so.
    Finally, the main difference from a programming standpoint concerns how data is passed around. Some data only needs to be visible to the front end. Some only needs to be visible to the back end. When planning the architecture of an application a development team shuold consider how they will separate these concerns with libraries like `AJAX` and `requests`.


- What is CSRF? What is the purpose of the CSRF token?
    *** 
    ***  DOUBLE CHECK THIS  ***
    ***
    CSRF stands for: _____________
    A CSRF token helps validate HTML forms securely. There are two ways CSRF tokens do this. The first, is by embedding a cryptographic token into a `hidden` input of an html form. This input is not explicitly visible when the browser parses the HTML and paints the page. But a user could potentially find this token if they knew how to inspect the HTML code being sent by the server. Thus, this must be a cryptographically secure token to prevent spoofing form submissions from unathorized third parties.
    A CSRF token can also be submitted through session cookies. This can be valuable if the CSRF token will be used in more complex ways. Since a session cookie is already by nature encrypted, this means that the CSRF token is doubly encrypted and still secured. When using a CSRF token this way the end user may not even be aware that a CSRF token is being used to validate data being sent back.
    In both cases the CSRF token is used when data is sent back to the back end of the server to validate that the data recieved was sent by an identified user. CSRF tokens help ensure that data recieved on the back end has come from a verified source.


- What is the purpose of `form.hidden_tag()`?
    Using flask's WTFlask library to create WTForms, the `form.hidden_tag` method can be used to create hidden elements in a form. This can be used as described in the question above.
