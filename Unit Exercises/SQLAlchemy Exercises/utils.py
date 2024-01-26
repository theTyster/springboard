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
        return self.db.init_app(app)


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


    def get_rows(self, model, id_, value):
        '''
        Get's a user from the database.
        '''
        return self.query(self.db.select(model).filter(id_==value))


    def get_table(self, model):
        '''
        Get's all the contents of a table from the database.
        '''
        return self.query(self.db.select(model)).all()

    def get_joins(
            self,
            table1,
            table2,
            junction_table,
            junction1,
            junction2
        ):
        '''
        Get's data joined by the two tables.
        '''
        return self.db.session.query(table1, table2)\
                   .select_from(junction_table)\
                   .join(table1, table1.id == junction1)\
                   .join(table2, table2.id == junction2)\
                   .all()
