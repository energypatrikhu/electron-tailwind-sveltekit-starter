# WELCOME
Template for TypeScript + Electron + Tailwind + Sveltekit

This template comes with:
- PreConfigured SVG loader
- Opt-In Auto Updater
- Auto `extraResources` include
    - Create a folder in root: `src/resources/extraResources` and put your extra files there
- Auto GitHub Release creator with [Release-It](https://github.com/release-it/release-it)
- dotenv support with [cross-env-file](https://github.com/marcojakob/cross-env-file) (prod & dev)

# HEADS-UP
- if you want to use it with Auto Update:
    - configure your dotenv files with your GH_TOKENS
    - enable Auto Update in `src/electron/libs/updater.ts`
        - `private enabled = false;` -> `private enabled = true;`
    - configure your github info in `build.config.json`
- if you edit any files related to electron in dev mode, you have to restart the dev server each time to re-build your electron scripts (needs fix)
- when importing custom scripts into your electron script, you have to append your files with `.js` to work
    - Example: `import func from './libs/func';` -> `import func from './libs/func.js';`
- if you want to build a release to your github repo run `[npm/yarn/pnpm] run release`, else run `[npm/yarn/pnpm] run build`

# .ENV (IMPORTANT)
- remove the `(dot)` from the begining of your dotenv files
- the dotenv files are JSON formated

## Creating GH_TOKEN
- go to https://github.com/settings/tokens
- click `Generate new token` -> `Generate new token (classic)`
- add a note name
- set no expiration
- select `repo` in scopes
- save
- copy your generated GH_TOKEN and paste it into your dotenv files
