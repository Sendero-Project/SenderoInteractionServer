var config = module.exports = {

  //
  // Sendero Interaction Server's address.
  web: {
    ip: "localhost",
    port: 8081
  },

  //
  // RabbitMQ configurations
  rabbit: {
    address: "localhost",
    queues: [
      "dragging_queue",
      "testing_queue"
    ],
    publish_options: {
      expiration: 2000, // milliseconds to expire inside the queue
      persistent: false // if broker restarts, messagges will be deleted.
    }
  },

  //
  // Define the interactions that will be received.
  interactions: {
    // The keys in this dictionary are the names of the interactions received
    "drag": {
      // Interactions received with 'drag' name will be queued in all the RabbitMQ queues in the list.
      // The queue names must be defined in rabbit.queues (above).
      queues: ["dragging_queue"]
    },
    "test": {
      queues: ["testing_queue"]
    }
  }

};

