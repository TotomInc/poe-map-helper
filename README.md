# PoE Mapper Assistant

> A tool for the Path of Exile endgame. Track your income per map with detailed graphs and few player-interaction.

## Usage

1. Set your map as a queued map by pressing `CTRL+C` with your cursor over the map item.
2. Activate the map in the *Map Device* from your hideout.
3. Run the map. You can even use multiple portals from the map, it will not disturb the mapper assistant.
4. Once the map is finished, put your loot into the *stash-tab* you selected in the setup screen.
5. Repeat from step 1.

## How it works

1. The mapper assistant will only scan the selected *stash-tab* from the setup screen.
2. It will scan your stash-tab when you will enter your next map, as the PoE API is only updated when a player change zone.
3. Once your income from your last map is calculated, this map will be added in your mapping history.

## Project setup

### Install dependencies

```bash
yarn install
```

### Compiles and hot-reloads for development (with Electron)

```bash
yarn run electron:serve
```

### Compiltes and build for production (with Electron)

```bash
yarn run electron:build
```

### Lints and fixes files

```bash
yarn run lint
```

### Customize configuration

This tool is made with TypeScript, Vue and TailwindCSS.

You can see the [configuration reference](https://cli.vuejs.org/config/) for a `vue-cli@3` project.
