#! /usr/bin/env python3
'''
Tests App.py
'''
from unittest import TestCase
from app import app, sql
#from utils import SQLAlchemyUtils
from models import Users

class FlaskTests(TestCase):
    """
    Tests the flask app.
    """

    @classmethod
    def setUpClass(cls):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'

        cls.app = app.test_client()
        cls.app_context = app.app_context()
        cls.app_context.push()

        test_user_schema = Users(
            first_name = 'test',
            last_name = 'testerson',
            image_url = 'None'
        )

        sql.insert(test_user_schema)
        sql.commit()

        cls.user = sql.query(sql.db.select(Users).filter_by(first_name='test')).first()[0]


    @classmethod
    def tearDownClass(cls):
        sql.delete(cls.user)
        sql.commit()
        cls.app_context.pop()


    def test_redirects_root(self):
        """
        Tests redirects of the root page.
        """
        with app.test_client() as flask_client:
            res = flask_client.get('/')
            self.assertEqual(301, res.status_code)


    def test_users_page(self):
        '''
        Tests that the created test user exists in the database.
        '''
        with app.test_client() as flask_client:
            res = flask_client.get('/users')
            html = res.get_data(as_text=True)
            self.assertEqual(200, res.status_code)
            self.assertIn('<button>Add User</button>', html)
            self.assertIn(f'<li><a href="/users/{self.user.id}">test testerson</a></li>', html)

    def test_user_page(self):
        '''
        Tests that the user page returns correctly.
        '''
        with app.test_client() as flask_client:
            res = flask_client.get(f'/users/{self.user.id}')
            html = res.get_data(as_text=True)
            self.assertEqual(200, res.status_code)
            self.assertIn('<h1>test testerson</h1>', html)
            self.assertIn(f'<a href="/users/{self.user.id}/edit"', html)


    def test_zzz_edit_user_page(self):
        '''
        Note: This test should always run last.
        Tests that the /delete uri successfully deletes an object.

        This test makes part of the teardown unnecesary. However, the teardown
        class method will be included in spite of this for scalability.
        '''
        with app.test_client() as flask_client:
            res = flask_client.get(f'/users/{self.user.id}/delete')
            self.assertEqual(301, res.status_code)
            user = sql.query(sql.db.select(Users).filter_by(first_name='test')).first()
            self.assertIsNone(user)
