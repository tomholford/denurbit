import Config from "./config.ts";
import RequestOptions from "./types/request_options.ts";

export default class APIClient {
  // TODO: persist TTL from cookie, auto re-auth when expired
  authCookie: string | null = null;
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  get isAuthed() {
    return this.authCookie != null;
  }

  authenticate = async () => {
    const response = await this.makeRequest({
      url: `${this.config.apiBaseUrl}/~/login`,
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `password=${this.config.code}`,

    });

    // TODO: handle this better
    if (response === undefined) return;
 
    const cookie = response.headers.get("set-cookie");
    if (cookie) this.authCookie = cookie.split(";")[0];
  };

  async makeRequest(options: RequestOptions) {
    const response = await fetch(
      options.url,
      {
        method: options.method,
        headers: { ...options.headers, ...this.authHeader },
        body: options.body,
      },
    );

    if (response.ok) {
      return response;
    } else {
      console.log("auth error :(");
      console.log(response);
      console.log(await response.text());
    }
  }

  private get authHeader(): Record<string, string> {
    return this.authCookie ? { 'Cookie' : this.authCookie } : {};
  }
}
