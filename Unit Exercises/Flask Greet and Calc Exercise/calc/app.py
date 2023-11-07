#! /usr/bin/env python3
from flask import Flask
from flask import request
from operations import *

app = Flask(__name__)


@app.route('/add')
def addition():
    a = request.args['a']
    b = request.args['b']

    result = add(int(a), int(b))
    return str(result)


@app.route('/sub')
def subtraction():
    a = request.args['a']
    b = request.args['b']

    result = sub(int(a), int(b))
    return str(result)


@app.route('/mult')
def multiplication():
    a = request.args['a']
    b = request.args['b']

    result = mult(int(a), int(b))
    return str(result)


@app.route('/div')
def division():
    a = request.args['a']
    b = request.args['b']

    result = div(int(a), int(b))
    return str(result)

