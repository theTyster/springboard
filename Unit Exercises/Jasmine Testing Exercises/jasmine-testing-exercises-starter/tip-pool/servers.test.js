describe("SubmitServerInfo()", function() {
  beforeEach(function() {
    // initialization logic
    serverNameInput.value = 'Test';

    submitServerInfo();
  });

  it('should add a new server to allServers)', function() {
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Test');
  });

  it("should add server name to html", function(){
    for(let serverNumber in allServers){
      const serverNameInDOM  = document.querySelector(`#${serverNumber}`).children[0].innerText;
      expect(serverNameInDOM).toMatch(/Test/);
    }
  });

  it("should reset html input", function(){
    const testValue = document.getElementById("serverName").value
    expect(testValue).toBeFalsy();
  })

  afterEach(function() {
    for (let serverNumber in allServers){
      if(document.querySelector(`#${serverNumber}`))
        document.querySelector(`#${serverNumber}`).remove();
      delete allServers[serverNumber];
    }
    serverId = 0;
  });
});

describe("updateServerTable()", function(){
  beforeEach(function(){
    allServers = {server1: {serverName: "Test"}};
    updateServerTable();
    })

  it("should create a table row element", function(){
    expect(serverTbody.children.length).toEqual(1);
  })
  
  afterEach(function(){
    for (let serverNumber in allServers){
      if(document.querySelector(`#${serverNumber}`))
        document.querySelector(`#${serverNumber}`).remove();
      delete allServers[serverNumber];
    }

  })
})
