#! /usr/bin/env python3
# The requirements.txt file that Colt uses is outdated.
# This app was built using modern tools.
# See: https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/queries/#legacy-query-interface
"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import Users, Posts, sql

# SETUP
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '🤫'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

with app.app_context():
    sql.start_db(app)

# ROUTES
@app.route('/')
def root_route():
    '''
    Root domain. Reroutes to users.
    '''
    return redirect('/users', code=301)


@app.route('/users', methods=['GET'])
def users_view():
    '''
    Displays Users.
    '''
    users = sql.query(sql.db.select(Users)).all()

    return render_template(
        'users/users.html',
        title='Users',
        users=users
    )


@app.route('/users/new', methods=['GET'])
def get_new_users_view():
    '''
    Displays form for adding new users.
    '''
    return render_template('users/create-user.html', title='Create User')


@app.route('/users/new', methods=['POST'])
def post_new_users_view():
    '''
    Accepts data from the new user form.
    '''

    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    new_user = Users(
        first_name = first_name,
        last_name = last_name,
        image_url = image_url
    )

    sql.insert(new_user)
    sql.commit()

    flash("Processing....")
    return redirect('/users', code=301)


@app.route('/users/<int:user_id>')
def user_view(user_id):
    '''
    Displays user information.
    '''
    user = sql.get_row(Users, user_id)
    return render_template(
        'users/user.html',
        title='View User',
        user=user
    )


@app.route('/users/<int:user_id>/edit', methods=['GET'])
def get_edit_user_view(user_id):
    '''
    Display user edit page.
    '''
    user = sql.get_row(Users, user_id)

    return render_template(
        'users/edit-user.html',
        title='Edit User',
        user=user
    )


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def post_edit_user_view(user_id):
    '''
    Accepts edits from the edit page.
    '''

    new_first_name = request.form['first-name']
    new_last_name = request.form['last-name']
    new_image_url = request.form['image-url']

    user = sql.get_row(Users, user_id)

    user.first_name = new_first_name
    user.last_name = new_last_name
    user.image_url = new_image_url

    sql.commit()

    flash('Processing....')
    return redirect('/users', code=301)


@app.route('/users/<int:user_id>/delete')
def delete_user_view(user_id):
    '''
    Deletes users.
    '''
    user = sql.get_row(Users, user_id)

    sql.delete(user)
    sql.commit()
    return redirect('/users', code=301)


@app.route('/posts/<int:post_id>')
def view_blogs(post_id):
    '''
    Displays blog posts.
    '''
    post = sql.get_row(Posts, post_id)
    return render_template(
        'posts/post.html',
        title='Blogly Posts',
        post=post
    )


@app.route('/users/<int:user_id>/posts/new', methods=['GET'])
def get_new_user_blogs(user_id):

    user = sql.get_row(Users, user_id)

    return render_template(
        'posts/create-post.html',
        title='Create Post',
        user=user
    )


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def post_new_user_blogs(user_id):

    blog_title = request.form['blog-title']
    blog_content = request.form['blog-content']

    post = Posts(title=blog_title, content=blog_content, user_id=user_id)
    sql.insert(post)
    sql.commit()

    flash('Processing.....')
    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>/edit', methods=['GET'])
def get_edit_blogs(post_id):

    post = sql.get_row(Posts, post_id)

    return render_template(
        'posts/edit-post.html',
        title='Edit Posts',
        post=post
    )


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def post_edit_blogs(post_id):

    post = sql.get_row(Posts, post_id)

    new_post_title = request.form['blog-title']
    new_post_content = request.form['blog-content']

    post.title = new_post_title
    post.content = new_post_content
    sql.commit()

    flash('Processing.....')
    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete')
def delete_blogs(post_id):

    post = sql.get_row(Posts, post_id)
    user_id = post.user_id
    sql.delete(post)
    sql.commit()

    flash('Processing....')
    return redirect(f'/users/{user_id}')
