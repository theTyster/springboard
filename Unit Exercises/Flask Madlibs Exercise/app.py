#! /usr/bin/env python3
from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story, stories


app = Flask(__name__)
app.config['SECRET_KEY'] = 'sssssssecretssss🐍'

debug = DebugToolbarExtension(app)


# RENDERS HOME PAGE TO CHOOSE A STORY
@app.route('/')
def choose_story():
    return render_template('choose_story.html', story_options=stories.keys())


# RENDERS FORM PAGE WHERE USER COMPLETES THE MADLIBS QUESTIONS
@app.route('/form')
def form():
    story_choice = request.args['story_choice']
    story = stories[story_choice]

    prompts = story.prompts
    return render_template('form.html', prompts=prompts, story_choice=story_choice)


# RENDERS THE COMPLETED MADLIBS STORY
@app.route('/story')
def story_page():
    story_choice = request.args['story_choice']
    story = stories[story_choice]

    answers = {}
    for prompt in story.prompts:
        print(prompt)
        answers.update({ prompt: request.args[prompt] })

    story_words = story.generate(answers)
    return render_template('story_page.html', story_words=story_words)


