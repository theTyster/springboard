#! /usr/bin/env python3
"""Models for Pet Adoption Website"""
from utils import SQLAlchemyUtils

sql = SQLAlchemyUtils()

class Pets(sql.db.Model):
    '''
    Model for pets describing their eligibility for adoption.
    '''

    __tablename__ = 'pets'

    id = sql.db.Column(sql.db.Integer,
                       primary_key=True,
                       autoincrement=True)
    name = sql.db.Column(sql.db.String,
                         nullable=False)

    species = sql.db.Column(sql.db.String,
                         nullable=False)

    image = sql.db.Column(sql.db.String)

    age = sql.db.Column(sql.db.Integer)

    notes = sql.db.Column(sql.db.String)

    available = sql.db.Column(sql.db.Boolean, default=True)
