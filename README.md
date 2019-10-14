# PoE Mapper Assistant

> A tool for the Path of Exile endgame. Track your income per map with detailed graphs and share it with friends.

## Disclaimer

Due to PoE's API limitations, this service is only available as an Electron app. Since PoE's API have a strict CORS, a browser is not able to do the API calls used in this software as a Node.js backend **can** bypass this restriction (which is the reason why Electron is used).

However, PoE's web-team is working on a OAuth API. This web app will switch on the OAuth API as soon as it is available so you will be able to use it on the web, instead of requiring to download the software.

## Usage

### Manual

1. Set your map as a queued map by pressing `CTRL+C` with your cursor over the map item.
2. Activate the map in the *Map Device* from your hideout.
3. Run the map. You can even use multiple portals from the map, it will not disturb the mapper assistant.
4. Once the map is finished, put your loot into the *stash-tab* you selected in the setup screen.
5. Repeat from step 1.

### Automatic

An automatic mode is being worked on.

You will not need anymore to manually register a map using `CTRL+C` (automatic detection of player entering a map) but this mode can be less accurate (i.e. enter same map multiple times will register the same map multiple times).

## How it works

1. The mapper assistant will only scan the selected *stash-tab* from the setup screen.
2. It will scan your stash-tab when you will enter your next map, as the PoE API is only updated when a player change zone.
3. Once your income from your last map is calculated, this map will be added in your mapping history.

## Project setup

### Install dependencies

```bash
yarn install
```

### Compiles and hot-reloads for development (browser version)

```bash
yarn run serve
```

### Compiles build for production (browser version)

```bash
yarn run build
```

### Compiles and hot-reloads for development (with Electron)

```bash
yarn run electron:serve
```

### Compiles and build for production (with Electron)

```bash
yarn run electron:build
```

### Lints and automatically fixes files

```bash
yarn run lint
```

### Customize configuration

This tool is made with TypeScript, Vue and TailwindCSS.

You can see the [configuration reference](https://cli.vuejs.org/config/) for a `@vue/vue-cli@3` project.

## Technologies used

- TypeScript
- Vue.js 2 with class-based components (using `vue-class-component`)
- [TailwindCSS](https://tailwindcss.com/)
- Third-party libs like [vue-good-table](https://github.com/xaksis/vue-good-table), [vue-notifications](https://www.npmjs.com/package/vue-notification), ...
