import Ship from "./ship.ts";

export default class Channel {
  ship: Ship;
  lastSentId = 0;
  opened = false;
  uid: string;

  constructor(ship: Ship) {
    this.ship = ship;
    this.uid = this.initUid();
  }

  async openChannel() {
    if (this.opened) return;

    const response = await this.ship.client.makeRequest({
      url: this.channelUrl,
      method: 'PUT',
      body: this.openPayload(),
      headers: { "Content-Type" : "application/json" }
    });

    // TODO: handle this better
    if (response === undefined) return;

    if (response.ok) {
      this.opened = true;
      this.lastSentId += 1;
    }
  }

  async closeChannel() {
    if (!this.opened) return;

    const response = await this.ship.client.makeRequest({
      url: this.channelUrl,
      method: 'PUT',
      body: this.closePayload(),
      headers: { "Content-Type" : "application/json" },
    });

    // TODO: handle this better
    if (response === undefined) return;

    if (response.ok) {
      this.opened = false;
      this.lastSentId += 1;
    }
  }

  get channelUrl() {
    return `${this.ship.config.apiBaseUrl}/~/channel/${this.uid}`;
  }

  openPayload() {
    return JSON.stringify([{
      "id": this.lastSentId, // Required. A sequential ID. Keep track of which messages you have sent.
      "action": "poke", // Required. The action to take. poke is the most basic way of sending data, like HTTP POST
      "ship": this.ship.config.untildedName, // Required by poke. The ship on which to perform the poke. You can only poke foreign ships with JSON, but this is the authenticated ship.
      "app": "hood", // Required by poke. The Urbit app to which to send the data.
      "mark": "helm-hi", // Required by poke. The "mark," or type, of data being sent.
      "json": "Opening airlock", // Required by poke. The actual data being sent.
    }]);
  }

  closePayload() {
    return JSON.stringify([{
      "id": this.lastSentId, // Required. A sequential ID. Keep track of which messages you have sent.
      'action': 'delete' // Required.
    }]);
  }

  private initUid() {
    const unixTime = Math.round((Date.now() / 1000));
    const chars = `${this.randomChars(6)}`;

    return `${unixTime}-${chars}`;
  }

  private randomChars(n: number) {
    return Array(n).fill(0).map((elt: number) => {
      return Math.ceil(Math.random() * 35).toString(36);
    }).join("");
  }
}
