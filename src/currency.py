#! /usr/bin/env python3
import json
import requests as reqs

class Currency_converter:
    def __init__(self):
        self.base_url = 'http://api.exchangerate.host'
        self.access_key = 'access_key=2466bf3db1318d165c8fb5a3905ede2a'


    def convert_currency(self, c_from, c_to, amount):
        c_from = f'from={c_from}'
        c_to = f'to={c_to}'
        amount = f'amount={amount}'
        url = f'{self.base_url}/convert?{self.access_key}&{c_from}&{c_to}&{amount}'

        result = {}

        try:
            response = reqs.get(url)
            result = json.loads(response.text)
        except reqs.exceptions.RequestException as e:
            print(e)
            result = "Couldn't connect. Check logs."

        return result


    def list_codes(self):
        url = f'{self.base_url}/list?{self.access_key}'

        try:
            response = reqs.get(url)
            result = json.loads(response.text)
            result = result['currencies']
        except reqs.exceptions.RequestException as e:
            print(e)
            result = "Couldn't connect. Check logs."

        return result

    def is_currency(self, currency_code):
        return (currency_code in self.list_codes().keys())
