![Sendero](http://sendero.uy/images/logo-white.png)

Sendero Interaction Server
==========================

A Node.js + Socket.IO server that receives Sendero Web Clients interactions and multiplexes them to RabbitMQ queues in order to let the corresponding Sendero Client receive them.

Usage
=====

This server requires a running RabbitMQ instance. Its address and all other required configuration settings are set in `config.js` file. 

Here is an example of configurations set.

```
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
```

The server expects to receive JavaScript objects in the following format:

```
{
  'name': '<interaction_name>',
  'data': "string with data related to the interacton"
}
```

The data is queued in all queues defined in `config.interactions.<interaction_name>.queues` as soon as they arrive to the server. 

In the AMQP message queued, the Socket.IO client id is set as a header with key `web_client_id`. The type attribute of the message is set to "interaction_data" and when a client disconnects, an AMQP message with type `client_disconnected` is queued in every queue.

--------
For more information about Sendero Project go to the [base repository](https://github.com/Sendero-Project/Sendero).