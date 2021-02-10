# denurbit

An [Urbit](https://urbit.org/) API client implemented in [Deno](https://deno.land/).

## Setup

TBD :)

## Usage

```ts
import { Config, Ship } from 'denurbit';

config = new Config(config_file: 'my_moon.json');
ship = new Ship(config);

ship.isAuthed
# > false

ship.authenticate

ship.isAuthed
# > true
```

## Test

```sh
./bin/tests
```

## Roadmap

- [x] Config
- [ ] Ship
  - [x] Authentication
  - [ ] Open Channel
  - [ ] Close Channel
  - [ ] Send Message to Channel
  - [ ] React to Message from Channel
- [ ] Channel
- [ ] Message
