# denurbit

An [Urbit](https://urbit.org/) API client implemented in
[Deno](https://deno.land/).

## Usage

```ts
import { Config, Ship } from 'https://deno.land/x/denurbit';

config = new Config(config_file: 'my_moon.json');
ship = new Ship(config);

ship.isAuthed
# > false

ship.authenticate

ship.isAuthed
# > true
```

## Test

Tests expect [a fake development ship](https://urbit.org/docs/development/environment/#creating-a-development-ship) to be running at `http://localost:80`

```sh
./bin/tests
```

## Roadmap

- [x] Config
- [ ] HTTP API Integration (*in progress*)
  - [x] Authentication
  - [ ] Open Channel
  - [ ] Close Channel
  - [ ] Send Message to Channel
  - [ ] React to Message from Channel
- [ ] Channel
- [ ] Message
- [ ] `graph-store` integration
- [ ] `group-store` integration
- [ ] `metadata-store` integration

## Contributing

All help is welcome! To test this lib locally, spin up a fake development ship and 