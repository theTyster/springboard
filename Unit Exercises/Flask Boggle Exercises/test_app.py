from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_get_start(self):
        '''
        Test that the root route returns the start pages html.
        '''
        with app.test_client() as flask_client:
            res = flask_client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(200, res.status_code)
            self.assertIn('<button>Start the timer!</button>', html)


    def test_get_board(self):
        '''
        Test that the board route returns a board.
        '''
        with app.test_client() as flask_client:
            res = flask_client.get('/board')
            html = res.get_data(as_text=True)

            self.assertEqual(200, res.status_code)
            self.assertRegex(html, r'<td>\n\t\t\t[A-Z]')


    def test_post_guess(self):
        '''
        Test that the server is responding to guesses correctly.
        '''
        with app.test_client() as flask_client:
            with flask_client.session_transaction() as new_session:
                new_session['board'] = [
                    ['T', 'D', 'B', 'J', 'J'],
                    ['E', 'U', 'F', 'Q', 'X'],
                    ['S', 'V', 'P', 'W', 'W'],
                    ['T', 'M', 'C', 'A', 'O'],
                    ['M', 'C', 'G', 'C', 'B']
                ]

            ok_res = flask_client.post('/', data={'guess': 'test'})
            not_word_res = flask_client.post('/', data={'guess': 'Test'})
            not_on_board_res = flask_client.post('/', data={'guess': 'testa'})


            self.assertEqual(200, ok_res.status_code)
            self.assertIn('ok', ok_res.get_data(as_text=True))
            self.assertIn('not-word', not_word_res.get_data(as_text=True))
            self.assertIn('not-on-board', not_on_board_res.get_data(as_text=True))

    def test_post_stat(self):
        '''
        Test that stats are being generated correctly.
        '''

        with app.test_client() as flask_client:
            res = flask_client.post('/', json={'type': 'game over', 'test stat': 'test'})

            self.assertEqual(200, res.status_code)
            self.assertEqual(1, session['games_played'])
            self.assertIn('test stat', session['games'][session['games_played']])

            with flask_client.session_transaction() as new_session:
                new_session['games_played'] = 5

            new_res = flask_client.post('/', json={'type': 'game over', 'test stat': 'test'})

            self.assertEqual(6, session['games_played'])


    def test_post_json(self):
        '''
        Test that post requests are always responded with json.
        '''

        with app.test_client() as flask_client:
            res = flask_client.post('/')
            alt_res = flask_client.post('/', json={'type': 'game over', 'test stat': 'test'})

            self.assertRegex(res.get_data(as_text=True), r'{\".*?\":.*}')
            self.assertRegex(alt_res.get_data(as_text=True), r'{\".*?\":.*}')
