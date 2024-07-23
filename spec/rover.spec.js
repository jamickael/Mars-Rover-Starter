const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("7. constructor sets position and default values for mode and generatorWatts", function () {
    expect(new Rover(500)).toEqual({'position' : 500, 'mode' : 'NORMAL', 'generatorWatts' : 110});
  })

  it("8. response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover(400);
    let message = new Message("bob makes a burger");
    let response = rover.receiveMessage(message);
    expect(response).toHaveProperty("message", "bob makes a burger");
  })


  it("9. response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(2000);
    let commands = [
      new Command('MOVE', 4321),
      new Command('MOVE', 45)];
    let message = new Message("bob sucks", commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toHaveLength(2);
  })

  it("10. responds correctly to the status check command", function () {
    let rover = new Rover(350);
    let commands = [
      new Command('STATUS_CHECK')];
    let message = new Message("Ricky Bobby was the best racecar driver of all time", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toEqual(350);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  })

  it("11. responds correctly to the mode change command", function () {
    let rover = new Rover(350);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER')
      ];
    let message = new Message("Bob Ross never makes mistakes, only has happy little accidents.", commands);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response.results[0].completed).toBeTruthy();
  })

  it("12. responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let rover = new Rover(200);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 6000)];
    let message = new Message("Bobbert", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(200);
  })

  it("13 responds correctly to the move command", function () {
    let rover = new Rover(350);
    let commands = [
      new Command('MOVE', 100),
      new Command('MOVE', 6000)];
    let message = new Message("Bob the Builder can probably build a better program them me.", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({completed: true})
    expect(response.results[1]).toEqual({completed: true})
    expect(rover.position).toEqual(6000);
  })

});