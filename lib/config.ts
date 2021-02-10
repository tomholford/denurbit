import { existsSync } from "https://deno.land/std/fs/mod.ts";
import ConfigOptions from "./types/config_options.ts"
export default class Config {
  code: string;
  host: string;
  name: string;
  port: string;
  config_file: string | null = null;
  
  static DEFAULT_CONFIG = {
    code: 'lidlut-tabwed-pillex-ridrup',
    host: 'http://localhost',
    name: '~zod',
    port: '80',
    config_file: 'denurbit.json'
  };

  constructor(options: ConfigOptions = {}) {
    if(options.config_file){
      this.config_file = options.config_file;

      if(existsSync(this.config_file)) {
        const loadedConfig: ConfigOptions = JSON.parse(Deno.readTextFileSync(this.config_file));
        
        options = {...options, ...loadedConfig};
      }
    }

    this.code = options.code || Config.DEFAULT_CONFIG.code;
    this.host = options.host || Config.DEFAULT_CONFIG.host;
    this.name = options.name || Config.DEFAULT_CONFIG.name;
    this.port = options.port || Config.DEFAULT_CONFIG.port;
  }

  get apiBaseUrl() {
    return `${this.host}:${this.port}`;
  }
}
