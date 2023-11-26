#! /usr/bin/env python3
from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    session,
    url_for,
)
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/', methods =['GET'])
def start():
    return render_template('start.html')


@app.route('/', methods = ['POST'])
def check_for_match():

    result = {None:None}

    if request.form and request.form.get('guess'):
        guess = request.form['guess']
        board = session['board']
        is_match = boggle_game.check_valid_word(board, guess)
        result = {'result': str(is_match)}

    elif request.json and request.json['type'] == 'game over':
        if not session.get('games_played'):
            session['games_played'] = 1
            session['games'] = {session['games_played']: request.json}
            result = session['games']
        else:
            session['games_played'] += 1
            session['games'].update({str(session['games_played']): request.json})
            result = session['games']

    result = jsonify(result)

    return result


@app.route('/board', methods = ['GET'])
def board():
    session['board'] = boggle_game.make_board()
    return render_template('board.html')
