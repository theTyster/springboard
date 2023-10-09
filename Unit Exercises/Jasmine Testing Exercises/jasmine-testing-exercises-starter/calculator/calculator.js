window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const UIValues = getCurrentUIValues();

  if (UIValues.amount === 0)
    document.getElementById("loan-amount").value = 10000;
  if (UIValues.years === 0)
    document.getElementById("loan-years").value = 3;
  if (UIValues.rate === 0)
    document.getElementById("loan-rate").value = 4.25;

  const updatedUIValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(updatedUIValues);
  return monthlyPayment;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const monthlyPayment = setupIntialValues();
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const {amount:P, years, rate} = values;
  const i = rate /12;
  const n = years *12;

  return ((P*i)/(1-(1+i)**(-n))).toFixed(2).toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const p = document.createElement("p");
  const span = document.getElementById("monthly-payment");
  p.innerText = `$${monthly}`;
  span.classList.add("payment-amaount");
  span.append(p);
}
