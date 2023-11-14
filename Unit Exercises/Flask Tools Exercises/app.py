#! /usr/bin/env python3
from flask import (
    Flask,
    render_template,
    request,
    abort,
    redirect,
    flash,
    make_response,
    session
)
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

s_survey = surveys['satisfaction']
#p_survey = surveys['personality']

@app.route('/')
def start_page():
    """
    The route that begins the survey
    """
    title = s_survey.title
    instructions = s_survey.instructions
    return render_template('survey_title.html', title=title, instructions=instructions)


@app.route('/question/<int:question_num>', methods=['GET', 'POST'])
def get_question_pages(question_num):
    """
    Route which handles each question.
    """

    if request.form:
        session[f'{question_num}'] = request.form['answer']

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
        flash("Processing.... Thanks for completing our survey!")
        return redirect('/thanks')

@app.route('/thanks')
def thankyou_page():
    """
    Route which handles the thank you page.
    """
    return render_template('thanks.html')
