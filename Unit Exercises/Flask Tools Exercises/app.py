#! /usr/bin/env python3
from flask import (
    Flask,
    render_template,
    request,
    abort,
    redirect,
    flash
)
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

# AS QUESTIONS ARE ANSWERED, THEY GET STORED HERE.
responses = []

s_survey = surveys['satisfaction'] # start with this one.
p_survey = surveys['personality']

@app.route('/')
def start_page():
    title = s_survey.title
    instructions = s_survey.instructions
    return render_template('survey_title.html', title=title, instructions=instructions)

@app.route('/question/<int:question_num>', methods=['GET'])
def get_question_pages(question_num):
    print(responses, question_num, len(responses))

    if len(responses) == question_num:
        try:
            title = s_survey.title
            current = s_survey.questions[question_num]
            question = {
                'q': current.question,
                'choices': current.choices,
            }
            return render_template('questions.html',
                question_num=question_num,
                title=title,
                question=question,
            )
        except IndexError:
            return redirect('/thanks')
    else:
        flash('Question out of order')
        return redirect(f'/question/{len(responses)}')

@app.route('/question/<int:question_num>', methods=['POST'])
def post_question_pages(question_num):
    responses.append(request.form['answer'])
    print("redirected")
    flash('processing...')
    return redirect(f'/question/{question_num}')


@app.route('/thanks')
def thankyou_page():
    return render_template('thanks.html')
