# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --add mdsvex --install npm hyuckkim.github.io
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Post content structure

Posts and post-specific assets are co-located under `static/posts/<slug>/`.

- Markdown file: `static/posts/<slug>/index.md`
- Post assets: `static/posts/<slug>/assets/...`
- Frontmatter thumbnail path example: `cover.png`

Inside a post markdown file, media paths are resolved against that post automatically.

- `cover.png` -> `/posts/<slug>/assets/cover.png`
- `assets/cover.png` -> `/posts/<slug>/assets/cover.png`
- `./assets/cover.png` -> `/posts/<slug>/assets/cover.png`

The home and detail loaders fetch markdown from `/posts/<slug>/index.md`.
