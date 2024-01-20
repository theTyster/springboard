#! /usr/bin/env python3
'''
Utilities for SQLAlchemy.
'''
from flask_sqlalchemy import SQLAlchemy

class SQLAlchemyUtils:
    '''
    Utilities to make the SQLAlchemy library easier to use.
    '''

    def __init__(self):
        self.db=SQLAlchemy()


    def start_db(self, app):
        '''
        Connects python to postgres and creates database.
        '''
        self.db.app = app
        self.db.init_app(app)
        return True


    def query(self, query):
        '''
        Wrapper utility for making SQL queries.
        '''
        return self.db.session.execute(query)


    def insert(self, sql_object):
        '''
        Wrapper utility for updating SQL data.
        '''
        return self.db.session.add(sql_object)


    def commit(self):
        '''
        Wrapper utility for committing data to the SQL Database
        '''
        return self.db.session.commit()


    def delete(self, sql_object):
        '''
        Wrapper utility for updating SQL data.
        '''
        return self.db.session.delete(sql_object)

    def get_row(self, model, row_id):
        '''
        Get's a user from the database.
        '''
        return self.query(self.db.select(model).filter_by(id=row_id)).first()[0]

    def get_fullname(self, model, user_id):
        '''
        Concatenates the users first and last name.
        '''
        user = self.query(self.db.select(model).filter_by(id=user_id)).first()[0]
        return f'{user.first_name} {user.last_name}'
