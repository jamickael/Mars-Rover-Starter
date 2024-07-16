class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {};//final object
      let results = [];//array of responses from commands
      for (let i = 0; i < message.commands.length; i++) {
         let thisResult = {};//object of results of command to be added to the array that is returned as a part of the response object
         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               thisResult.completed = false; //adding result to reponse object
            } else {
            this.position = message.commands[i].value; //updating rover position in rover object
            thisResult.completed = true; //adding result to reponse object
            }   
         } else if (message.commands[i].commandType === 'STATUS_CHECK') {
            let roverStatus = {}; //creating roverStatus object to return 
            roverStatus.mode = this.mode;
            roverStatus.generatorWatts = this.generatorWatts;
            roverStatus.position = this.position;

            thisResult.completed = true; //adding result to reponse object
            thisResult.roverStatus = roverStatus; //adding array to reponse object
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value; //updates rover mode
            thisResult.completed = true; //adding result to response object
         }

         results.push(thisResult); //adding result from this singular command to the results array (to be added after as one unit to the response object at the end of the loop)
      }
      response.message = message.messageName;
      response.results = results;
      return response;
   }
}

module.exports = Rover;