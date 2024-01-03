from unittest import TestCase
from app import app
from currency import Currency_converter

class FlaskTests(TestCase):

    def test_get_start(self):
        with app.test_client() as flask_client:
            res = flask_client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(200, res.status_code)
            self.assertIn('<button>Submit</button>', html)
            self.assertNotIn('<h3 id="currency-converted">', html)
            self.assertIn('<option value="USD">USD</option>', html)

    def test_get_converted(self):
        with app.test_client() as flask_client:
            res = flask_client.get(
                '/',
                query_string={
                    'convert-from':'USD',
                    'convert-to':'USD',
                    'currency-amount':'10'
            })

            html = res.get_data(as_text=True)
            self.assertIn('<span id="conversion-result" style="color:green;">10</span>', html)


    def test_get_invalid_currency(self):
        with app.test_client() as flask_client:
            res = flask_client.get(
                '/',
                query_string={
                    'convert-from':'invalid',
                    'convert-to':'USD',
                    'currency-amount':'10'
                })

            html = res.get_data(as_text=True)
            self.assertIn('<span style="color:red">You have entered an invalid &#34;from&#34; property. [Example: from=EUR]</span>', html)

        with app.test_client() as flask_client:
            res = flask_client.get(
                '/',
                query_string={
                    'convert-from':'USD',
                    'convert-to':'invalid',
                    'currency-amount':'10'
                })

            html = res.get_data(as_text=True)
            self.assertIn('<span style="color:red">You have entered an invalid &#34;to&#34; property. [Example: to=GBP]</span>', html)

        with app.test_client() as flask_client:
            res = flask_client.get(
                '/',
                query_string={
                    'convert-from':'USD',
                    'convert-to':'USD',
                    'currency-amount':'invalid'
                })

            html = res.get_data(as_text=True)
            self.assertIn('<span style="color:red">You have not specified an amount to be converted. [Example: amount=5]</span', html)
