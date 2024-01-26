#! /usr/bin/env python3
"""Models for Blogly."""
from utils import SQLAlchemyUtils
from datetime import datetime

sql = SQLAlchemyUtils()

class Users(sql.db.Model):
    '''
    Users postgres model.
    '''
    __tablename__ = 'users'

    id = sql.db.Column(sql.db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = sql.db.Column(sql.db.String,
                     nullable=False)

    last_name = sql.db.Column(sql.db.String,
                     nullable=False)

    image_url = sql.db.Column(sql.db.String)

    posts = sql.db.relationship(
        'Posts',
        backref='user',
        cascade='all, delete-orphan',
        lazy=True
    )


class Posts(sql.db.Model):
    '''
    User Posts postgres model.
    '''
    __tablename__ = 'posts'

    id = sql.db.Column(sql.db.Integer,
                       primary_key=True,
                       autoincrement=True,
                       )

    title = sql.db.Column(sql.db.String,
                          nullable=False)

    content = sql.db.Column(sql.db.String,
                            nullable=False)

    created_at = sql.db.Column(sql.db.DateTime,
                               default=datetime.utcnow,
                               nullable=False)

    user_id = sql.db.Column(sql.db.Integer,
                            sql.db.ForeignKey('users.id'),
                            nullable=False)


class Tags(sql.db.Model):
    '''
    Tags postgres model.
    '''
    id = sql.db.Column(sql.db.Integer,
                       primary_key=True,
                       autoincrement=True)

    name = sql.db.Column(sql.db.String,
                         unique=True,
                         nullable=False)

    posts = sql.db.relationship('Posts',
                                secondary='post_tag',
                                cascade="all, delete",
                                backref='tags',
                                lazy=True)


class PostTag(sql.db.Model):
    '''
    Relationships between Posts and Tags Postgres Model.
    '''
    __tablename__ = 'post_tag'
    post_id = sql.db.Column(sql.db.Integer,
                            sql.db.ForeignKey('posts.id'),
                            primary_key=True)

    tag_id = sql.db.Column(sql.db.Integer,
                           sql.db.ForeignKey('tags.id'),
                           primary_key=True)
