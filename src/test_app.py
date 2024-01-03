from unittest import TestCase
from app import app
from currency import Currency_converter

class FlaskTests(TestCase):

    def test_get_start(self):
        with app.test_client() as flask_client:
            res = flask_client.get('/')
            html = res.get_data(as_text=True)
            print(html)

            self.assertEqual(200, res.status_code)
            self.assertIn('<button>Submit</button>', html)

    def test_get_converted(self):
        with app.test_client() as flask_client:
            res = flask_client.get('/', query_string={'from':'USD', 'to':'USD', 'amount':'10'})
            html = res.get_data(as_text=True)

            self.assertIn('<h3 id="currency-converted">10</h3>', html)

#    def test_get_invalid_currency(self):
#        with app.test_client() as flask_client:
#            
