"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cupcake(db.Model):
    '''
    Class for Cupcakes in postgres.
    '''

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    flavor = db.Column(db.String,
                       nullable=False)

    size = db.Column(db.String,
                     nullable=False)

    rating = db.Column(db.Float,
                       nullable=False)

    image = db.Column(db.String,
                      nullable=False,
                      default='https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg')
