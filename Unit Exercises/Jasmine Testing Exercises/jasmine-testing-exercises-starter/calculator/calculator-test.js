describe("Loan Calculator", ()=>{
  const defaultValues = {amount:10000, years:3, rate:4.25};

  it('should calculate the monthly rate correctly', function () {
    expect(calculateMonthlyPayment(defaultValues)).toEqual("3541.73");
  });


  it("should return a result with 2 decimal places", function() {
    const payment = calculateMonthlyPayment(defaultValues).split(".")[1];
    expect(payment).toBeLessThan(100);
  });

  it("should return a string", ()=>{
    expect(calculateMonthlyPayment(defaultValues)).toBeInstanceOf(String);
  })

});
