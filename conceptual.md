### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
    Javascript is primarily a front-end language and Python is primarily a back-end language.
    There are obvious syntactic differences. For example Javascript uses `this` to reference the parent object that a function calls. Python uses `self`. JS uses `//` to deliminate comments, Python uses `#`.
    Some of the biggest differences between Python and Javascript have to deal with their general design. Javascript uses prototypes to compile global variables at runtime python does not follow this design pattern, rather looking up globals at runtime.
    Another design diference has to do with how these languages handle white space. Python treats white space as a character. White space has value. It can be used to delineate the start of a code block. Javascript completely ignores most white space other than needed spaces between words and characters so that the code can be readable.


- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you can try to get a missing key (like "c") *without* your programming crashing.

    1. Create a test that checks whether `c` exists before attempting to use it.
    In python:
    ```python
    dic = {"a": 1, "b": 2}
    if 'c' in dic.keys():
        print(dic['c'])
    ```
    2. Access it with .get().
    in Python:
    ```python
    dic = {"a": 1, "b": 2}
    print(dic.get('c')) # None
    ```
    Of course none of this is necessary in JavaScript where if you access a key that doesn't exist it is automatically returned `undefined`.

- What is a unit test?
    A unit test is a type of programming test that tests individual pieces or "units" of code. In object oriented programming this typically means testing individual functions to see if they return the expected values.

- What is an integration test?
    An integration test is a type of programming test that tests whether programs work together in an expected way. An integration test might test that a back end is returning the right HTML to the front end when a specific request is made.

- What is the role of web application framework, like Flask?
    Web application frameworks provide the groundwork for building applications. In short, they help speed up the development process. Providing programmers with environments that almost every web application will need like routing functionality, GET and POST request responses, or templates for creating dynamic content.

- You can pass information to Flask either as a parameter in a route URL (like '/foods/pretzel') or using a URL query param (like 'foods?type=pretzel'). How might you choose which one is a better fit for an application?
    In general, query strings are best used to serve dynamic content. While URI's are best for static content. Query strings are typically easier to work with when trying to accept data from a user.

- How do you collect data from a URL placeholder parameter using Flask?
    like this:
    ```python
    @app.route('some/page/<variable>')
    def some_page(variable):
      print(variable)
    ```

- How do you collect data from the query string using Flask?
    `request.args`.
    So for example if our query string looks like `/route?foo=bar` we would access it like this: `request.args.get('foo')`.

- How do you collect data from the body of the request using Flask?
    `requst.data`

- What is a cookie and what kinds of things are they commonly used for?
    A cookie is a small text file stored in a browser that typically holds a cryptographical secret for a login. It can however be used for many other things such as storing the history of a users browsing, or recording the state of an app.

- What is the session object in Flask?
    The session object provides a way to create secure and secret cookies. It is easier to use the flask session object than it is to use regular cookies.

- What does Flask's `jsonify()` do?
    As one might guess, it turns something into json. Typically used to return a response to the front-end in json.
