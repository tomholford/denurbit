import Config from "./config.ts";

export default class Ship {
  authCookie: string | null = null;
  config: Config;

  constructor(config = new Config()) {
    this.config = config;
  }

  get isAuthed() {
    return this.authCookie != null;
  }

  authenticate = async () => {
    const response = await fetch(
      `${this.config.apiBaseUrl}/~/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `password=${this.config.code}`,
      },
    );

    if (response.ok) {
      const cookie = response.headers.get("set-cookie");

      if (cookie) this.authCookie = cookie.split(";")[0];
    } else {
      console.log("auth error :(");
      console.log(response);
    }
  };
}
