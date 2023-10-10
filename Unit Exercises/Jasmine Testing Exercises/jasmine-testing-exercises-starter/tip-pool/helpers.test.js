
describe("sumPaymentTotal()", function(){
  beforeEach(function(){
    billAmtInput.value = 90;
    tipAmtInput.value = 90;
    allPayments = {payment1: {billAmt:"90", tipAmt:"90", tipPercent:calculateTipPercent(billAmtInput.value, tipAmtInput.value)}}
  })
  it("should accept 'tipAmt', 'billAmt', and 'tipPercent'", function(){
    expect(sumPaymentTotal("tipAmt")).toEqual(90);
    expect(sumPaymentTotal("billAmt")).toEqual(90);
    expect(sumPaymentTotal("tipPercent")).toEqual(100);
  })
  afterEach(function(){
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
  })
})

describe("calculateTipPercent()", function(){
  it("should convert bill and tip to tip percent", function(){
    expect(calculateTipPercent(90, 90)).toEqual(100);
  })
})

describe("appendTd()", function(){
  it("should expect a tr element", function(){
    expect(()=> appendTd("", "test")).toThrowError();
  })
  it("should append a td element to an existing tr passed in", function(){
    const tr = document.createElement("tr");
    tr.classList.add("test");
    const table = document.querySelector("#summaryTable > tbody")
    table.append(tr);

    appendTd(tr, "Test");

    expect(document.querySelector(".test").children[0].innerText).toEqual("Test");
  })
})

describe("appendDeleteBtn()", function(){
  beforeEach(function(){
    allServers = {server1: {serverName: "Test"}};
    updateServerTable();
  })
  it("should append a row to the server table with a", function(){
    appendDeleteBtn(document.querySelector("#server1"));
    expect(document.querySelector("#server1").children[2].innerText).toEqual("X");
  });
  afterEach(function(){
    allServers = {};
  });
  afterEach(function(){
    allServers = {};
    document.querySelector("#server1").remove();
  })
})
