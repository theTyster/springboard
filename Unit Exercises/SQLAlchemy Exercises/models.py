#! /usr/bin/env python3
"""Models for Blogly."""
from utils import SQLAlchemyUtils

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
