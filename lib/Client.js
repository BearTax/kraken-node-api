const ClientBase = require('./ClientBase');

class Client extends ClientBase {

  constructor(apiKey, apiSecret) {
    super(apiKey, apiSecret);

  }

}

module.exports = Client;
