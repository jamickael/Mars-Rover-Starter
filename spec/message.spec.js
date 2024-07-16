const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {

    it("4. throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () { new Message(); }).toThrow(new Error("Message name required."));
    })

    it("5. constructor sets name", function () {
        expect(new Message('bob likes burgers')).toHaveProperty('messageName');
    })

    it("6. constructor sets a value passed in as the 2nd argument", function () {
        expect(new Message('bob like burgers', 'do 12 jumping jacks')).toHaveProperty('commands', 'do 12 jumping jacks');
    })

});
