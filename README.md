# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Custom components

### Gallery

Displays a responsive grid of images. Registered globally via [src/theme/MDXComponents.js](src/theme/MDXComponents.js), so it's available in any `.md`/`.mdx` file (docs, blog posts, and pages) with no import needed.

```mdx
<Gallery>

![alt text](./photo-a.jpg)
![alt text](./photo-b.jpg)
![alt text](./photo-c.jpg)

</Gallery>
```

Keep a blank line before/after and between each image — that's what makes MDX treat each one as its own paragraph, which the gallery's CSS then unwraps into a grid.

Defaults to 3 columns (2 on mobile). Override with `columns`:

```mdx
<Gallery columns={4}>
```

Each image still gets click-to-zoom for free from the site-wide `docusaurus-theme-zoom-image` theme.

Source: [src/components/Gallery](src/components/Gallery)

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Error: Panic occurred at runtime. react-router-config.js not found

```bash
# Clear Docusaurus cache
npm run clear # or yarn clear / pnpm clear

# Remove dependencies and lockfiles
rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml

# Reinstall cleanly
npm install # or yarn install / pnpm install
```

## TODO

- Remove unused gfonts
- SEO
- Accessibility
- Link checker in pipeline