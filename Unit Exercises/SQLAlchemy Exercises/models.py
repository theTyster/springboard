"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()

def connect_db(app):
    '''
    Connects python to postgres.
    '''
    db.app = app
    db.init_app(app)


# MODELS/SCHEMA BELOW

class Users(db.Model):
    '''
    Users postgres model.
    '''
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(),
                     nullable=False,
                     unique=True)

    last_name = db.Column(db.String(),
                     nullable=False,
                     unique=True)

    image_url = db.Column(db.String())
