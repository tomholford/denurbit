import APIClient from "./api_client.ts";
import Channel from "./channel.ts";
import Config from "./config.ts";
import asyncForEach from './utils/async_for_each.ts'

export default class Ship {
  client: APIClient;
  config: Config;
  openChannels: Channel[] = [];

  constructor(config = new Config()) {
    this.config = config;
    this.client = new APIClient(this.config);

    this.ensureChannelsClosed();
  }

  async authenticate() {
   await this.client.authenticate(); 
  }

  private ensureChannelsClosed() {
    window.addEventListener("unload", this.closeAllChannels);
  }

  closeAllChannels = async (_evt?: Event): Promise<void> => {
    // TODO: print this and other diagnostics in debug mode
    // console.log(`[ship:shutdown] closing ${this.openChannels.length} open channels ...`);

    await asyncForEach(this.openChannels, async (channel: Channel, idx: number, ary: Channel[]) => {
      // console.log(`[ship:shutdown] closing ${channel.uid} ...`);
      await channel.close();
    })
  };
}
