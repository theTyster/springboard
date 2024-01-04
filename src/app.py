#! /usr/bin/env python3
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    jsonify,
    session,
    url_for,
)
from flask_debugtoolbar import DebugToolbarExtension
from currency import Currency_converter

app = Flask(__name__)
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/', methods =['GET'])
def get_start_page():
    """
    The route for app.
    """

    cc = Currency_converter()
    currency_codes = list(cc.list_codes().keys())

    try:
        c_from = request.args['convert-from']
        c_to = request.args['convert-to']
        amount = request.args['currency-amount']

        result = cc.convert_currency(c_from, c_to, amount)

        if result['success']:
            return render_template('result.html', result=result, currency_codes=currency_codes)
        return render_template('error.html', result=result, currency_codes=currency_codes)

    except KeyError:
        return render_template('start.html', currency_codes=currency_codes)
