describe("submitPaymentInfo()", function(){
  beforeEach(function(){
    billAmtInput.value = 90;
    tipAmtInput.value = 90;
    submitPaymentInfo();
  });
  it("should add a curPayment object to allPayments", function(){
    expect(allPayments.payment1).toBeTruthy();
  });

  it("should update the html with payment info", function(){
    expect(paymentTbody.children[0]).toBeTruthy();
  });
  it("should reset html input values", function(){
    expect(billAmtInput.value).toBeFalsy();
    expect(tipAmtInput.value).toBeFalsy();
  });
  afterEach(function(){
    allPayments = {};
    paymentId = 0;
    paymentTbody.children[0].remove();
    for (let td of summaryTds){
      td.innerText = "";
    }
  });
});

describe("createCurPayment()", function(){

  it("should return an object", function(){
    billAmtInput.value = 90;
    tipAmtInput.value = 90;
    expect(createCurPayment()).toEqual({billAmt:"90", tipAmt:"90", tipPercent:calculateTipPercent(billAmtInput.value, tipAmtInput.value)});
  });
  it("should return undefined if inputs are empty", function(){
    billAmtInput.value = "";
    tipAmtInput.value = "";
    expect(createCurPayment()).toEqual(undefined);
  })
  it("should require a positive billAmt", function(){
    billAmtInput.value = "-1";
    tipAmtInput.value = 90;
    expect(createCurPayment()).nothing();
  })
  it("should accept a zero tip", function(){
    billAmtInput.value = 90;
    tipAmtInput.value = "0";
    expect(createCurPayment()).toEqual({billAmt:"90", tipAmt:"0", tipPercent:calculateTipPercent(billAmtInput.value, tipAmtInput.value)});
  })
  afterEach(function(){
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
    paymentId = 0;
    for (let td of summaryTds){
      td.innerText = "";
    }
  })
});

describe("appendPaymentTable()", function(){
  beforeEach(function(){
    billAmtInput.value = 90;
    tipAmtInput.value = 90;
  })
  it("should create a row element under payment summary.", function(){
    appendPaymentTable(createCurPayment());
    expect(paymentTbody.children[0]).toBeTruthy();
  })
  afterEach(function(){
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
    paymentId = 0;
    paymentTbody.children[0].remove();
  })
})

describe("updateSummary()", function(){
  beforeEach(function(){
    billAmtInput.value = 90;
    tipAmtInput.value = 90;
    submitPaymentInfo();
    updateSummary();
  })
  it("should create a row with the sum of all payments", function(){
    expect(summaryTds[0].innerText).toEqual("$90");
  })
  afterEach(function(){
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
    paymentId = 0;
    paymentTbody.children[0].remove();
    for (let td of summaryTds){
      td.innerText = "";
    }
  })
})
