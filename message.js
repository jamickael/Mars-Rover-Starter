class Message {
   constructor(messageName, commands = "No commands given") {
      this.messageName = messageName;
      if (!messageName) {
        throw Error("Message name required.");
      }
      this.commands = commands;
    }
}

module.exports = Message;