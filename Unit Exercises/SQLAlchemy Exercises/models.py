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

    first_name = sql.db.Column(sql.db.String(),
                     nullable=False)

    last_name = sql.db.Column(sql.db.String(),
                     nullable=False)

    image_url = sql.db.Column(sql.db.String())

    posts = sql.db.relationship(
        'Posts',
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
                       autoincrement=True)

    title = sql.db.Column(sql.db.String(),
                          nullable=False)

    content = sql.db.Column(sql.db.String(),
                            nullable=False)

    created_at = sql.db.Column(sql.db.DateTime,
                               default=datetime.utcnow)

    user_id = sql.db.Column(sql.db.Integer(),
                            sql.db.ForeignKey('users.id'),
                            nullable=False)

    user = sql.db.relationship(Users, lazy=True)
