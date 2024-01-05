"use strict";

document.addEventListener("DOMContentLoaded", main);

function main(){

  const convertFrom = document.querySelector('#convert-from').value;
  const convertTo = document.querySelector('#convert-to').value;
  const convertAmount = Number(document.querySelector('#currency-amount').value);
  const conversionResult = Number(document.querySelector('#conversion-result').innerText);
  
  const dcFrom = new DisplayCurrency(convertAmount, convertFrom);
  const dcTo = new DisplayCurrency(conversionResult, convertTo);

  const resultElem = document.querySelector('#currency-converted');
	
  
  if(resultElem) resultElem.innerHTML = `<p>${dcFrom.withSymbol()} is equal to <span style="color:green;">${dcTo.withSymbol()}</span>.</p>`
}

class DisplayCurrency{
  constructor(num, currency){
    this.num = num;
    this.currency = currency;
    this.locale = this.getLanguage();
  }

  getLanguage(){
    // guesses the local language from the browser.
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
  }

  withSymbol(){
    //Displays the currency with the applicable symbol.
    return new Intl
      .NumberFormat(this.locale, 
        { style: 'currency', currency: this.currency })
      .formatToParts(this.num)
      .map(val => val.value)
      .join('');
  }

  withoutSymbol(){
    //Displays the currency without the applicable symbol but formatted as currency.
    return new Intl
      .numberformat(this.locale, 
      { style: 'currency', currency: this.currency })
      .formattoparts(this.num)
      .slice(1)
      .map(val => val.value)
      .join('');
   }
}

