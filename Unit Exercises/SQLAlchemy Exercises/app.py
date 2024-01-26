#! /usr/bin/env python3
# The requirements.txt file that Colt uses is outdated.
# This app was built using modern tools.
# See: https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/queries/#legacy-query-interface
"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import Users, Posts, Tags, PostTag, sql

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
    users = sql.get_table(Users)

    return render_template(
        'users/users.html',
        title='Users',
        users=users
    )


@app.route('/users/<int:user_id>')
def user_view(user_id):
    '''
    Displays user information.
    '''
    user = sql.get_rows(Users, Users.id, user_id).first()[0]
    return render_template(
        'users/user.html',
        title='View User',
        user=user
    )


@app.route('/users/new', methods=['GET'])
def get_new_users_view():
    '''
    Displays form for adding new users.
    '''
    return render_template('users/create-user.html', title='Create User')


@app.route('/users/new', methods=['POST'])
def post_new_users():
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


@app.route('/users/<int:user_id>/edit', methods=['GET'])
def get_edit_user_view(user_id):
    '''
    Display user edit page.
    '''
    user = sql.get_rows(Users, Users.id, user_id).first()[0]

    return render_template(
        'users/edit-user.html',
        title='Edit User',
        user=user
    )


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def post_edit_user(user_id):
    '''
    Accepts edits from the edit page.
    '''

    new_first_name = request.form['first-name']
    new_last_name = request.form['last-name']
    new_image_url = request.form['image-url']

    user = sql.get_rows(Users, Users.id, user_id).first()[0]

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
    user = sql.get_rows(Users, Users.id, user_id).first()[0]

    sql.delete(user)
    sql.commit()
    flash('Processing....')
    return redirect('/users')


@app.route('/posts/<int:post_id>')
def blog_view(post_id):
    '''
    Displays blog posts.
    '''
    post = sql.get_rows(Posts, Posts.id, post_id).first()[0]
    return render_template(
        'posts/post.html',
        title='Blogly Posts',
        post=post
    )


@app.route('/users/<int:user_id>/posts/new', methods=['GET'])
def get_new_blog_view(user_id):
    '''
    Gets the view for editing posts.
    '''

    user = sql.get_rows(Users, Users.id, user_id).first()[0]

    # get all of the tags as a list.
    tags = sql.get_table(Tags)
    tags = [tag[0] for tag in tags]

    return render_template(
        'posts/create-post.html',
        title='Create Post',
        user=user,
        tags=tags
    )


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def post_new_user_blog(user_id):
    '''
    Receives data from the front end for creating a post.
    '''

    blog_title = request.form['blog-title']
    blog_content = request.form['blog-content']
    tags = request.form.getlist('tag-id[]')

    # create the post from data in the form.
    post = Posts(title=blog_title, content=blog_content, user_id=user_id)

    # attach tags as a list.
    post.tags = [sql.get_rows(Tags, Tags.id, tag_id).first()[0] for tag_id in tags]

    # commit the post to the database.
    sql.insert(post)
    sql.commit()

    flash('Processing.....')
    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>/edit', methods=['GET'])
def get_edit_blog_view(post_id):
    '''
    Gets the edit screen for blog posts.
    '''

    post = sql.get_rows(Posts, Posts.id, post_id).first()[0]

    # get all of the tags as a list.
    tags = sql.get_table(Tags)
    tags = [tag[0] for tag in tags]

    # get only the selected tags as a list.
    selected_tags = post.tags

    return render_template(
        'posts/edit-post.html',
        title='Edit Posts',
        post=post,
        tags=tags,
        selected_tags=selected_tags
    )


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def post_edit_blog(post_id):
    '''
    Recieves data sent from the front end for editing posts.
    '''

    # this post
    post = sql.get_rows(Posts, Posts.id, post_id).first()[0]

    # this posts tags.
    post_tags = sql.get_rows(PostTag, PostTag.post_id, post_id).all()

    # submitted tags
    mod_tags = request.form.getlist('tag-id[]')

    # deletes all previous tags.
    for row in post_tags:
        sql.delete(row[0])

    # sets new tags to be whatever was submitted in the form.
    for tag in mod_tags:
        new_tag = PostTag(
            tag_id=int(tag),
            post_id=post_id
        )
        sql.insert(new_tag)

    # modifies the post.
    new_post_title = request.form['blog-title']
    new_post_content = request.form['blog-content']

    post.title = new_post_title
    post.content = new_post_content
    sql.commit()

    flash('Processing.....')
    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete')
def delete_blog_view(post_id):
    '''
    Deletes a post.
    '''

    post = sql.get_rows(Posts, Posts.id, post_id).first()[0]
    user_id = post.user_id
    sql.delete(post)
    sql.commit()

    flash('Processing....')
    return redirect(f'/users/{user_id}')


@app.route('/tags')
def tags_view():
    '''
    Displays a list of tags in the database.
    '''

    tags = sql.get_table(Tags)

    return render_template('tags/tags.html', tags=tags, title='Tags')


@app.route('/tags/<int:tag_id>')
def tag_view(tag_id):
    '''
    Displays posts a tag is attached to.
    '''
    tag = sql.get_rows(Tags, Tags.id, tag_id).first()[0]
    posts = sql.get_table(PostTag)

    return render_template(
        'tags/tag.html',
        tag=tag,
        posts=posts,
        title='View Tag'
    )


@app.route('/tags/new', methods=['GET'])
def get_new_tags():
    '''
    Returns template for creating tags.
    '''
    return render_template('tags/create-tag.html', title='New Tag')


@app.route('/tags/new', methods=['POST'])
def post_new_tags():
    '''
    Accepts data from the new tag form.
    '''

    tag_name = request.form['tag-name']
    new_tag = Tags(
        name = tag_name
    )

    sql.insert(new_tag)
    sql.commit()

    flash("Processing....")
    return redirect('/tags', code=301)


@app.route('/tags/<int:tag_id>/edit', methods=['GET'])
def get_tags_edit(tag_id):
    tag = sql.get_rows(Tags, Tags.id, tag_id).first()[0]
    return render_template('/tags/edit-tag.html', tag=tag, title='Edit Tag')


@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def post_tags_edit(tag_id):
    '''
    Accepts edits from the edit tags page.
    '''

    new_tag_name = request.form['tag-name']

    tag = sql.get_rows(Tags, Tags.id, tag_id).first()[0]

    tag.name = new_tag_name

    sql.commit()
    flash('Processing....')
    return redirect('/tags')


@app.route('/tags/<int:tag_id>/delete')
def post_tag_delete(tag_id):
    '''
    Deletes tag.
    '''

    tag = sql.get_rows(Tags, Tags.id, tag_id).first()[0]

    sql.delete(tag)
    sql.commit()

    flash('Processing....')
    return redirect('/tags')
