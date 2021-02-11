import APIClient from "./api_client.ts";
import Config from "./config.ts";

export default class Ship {
  client: APIClient;
  config: Config;

  constructor(config = new Config()) {
    this.config = config;
    this.client = new APIClient(this.config);
  }

  async authenticate() {
   await this.client.authenticate(); 
  }
}
