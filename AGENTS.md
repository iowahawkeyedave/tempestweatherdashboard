# Project Documentation for AI Agents

## Project Overview

This is an **Astro 5** web application with **React** integration. It was created using the Astro "Basics" starter template and is configured as a hybrid static site that can leverage both Astro components and React components.

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | ^5.17.1 | Static site generator and web framework |
| React | ^19.2.4 | UI component library for interactive components |
| React DOM | ^19.2.4 | React renderer for the browser |
| TypeScript | (via Astro) | Type-safe JavaScript development |
| Biome | ^2.3.14 | Code formatting and linting |

## Project Structure

```
/
├── public/                 # Static assets served directly
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/             # Images, fonts, and other assets
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/         # Reusable UI components (Astro/React)
│   │   └── Welcome.astro
│   ├── layouts/            # Page layout templates
│   │   └── Layout.astro
│   └── pages/              # Route definitions (file-based routing)
│       └── index.astro
├── .vscode/                # VS Code configuration
│   ├── extensions.json     # Recommended extensions
│   └── launch.json         # Debug configurations
├── astro.config.mjs        # Astro configuration
├── biome.json              # Biome formatter/linter config
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── .gitignore              # Git ignore patterns
```

## Build and Development Commands

All commands are run from the project root:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |

### VS Code Debugging

A launch configuration is provided for VS Code. Press `F5` or go to **Run > Start Debugging** to launch the development server with debugger attached.

## Code Style Guidelines

This project uses **Biome** for code formatting and linting. Key conventions:

### Formatting
- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for JavaScript/TypeScript
- **Line endings**: Platform-appropriate (handled by Biome)

### Linting
- All recommended rules are enabled
- VCS integration with Git is enabled
- The `.gitignore` file is respected

### Import Organization
Biome automatically organizes imports on save. Run `npm run astro -- check` to manually check for issues.

## Component Architecture

### Astro Components (`.astro` files)
- Used for static content and page layouts
- Server-side rendered by default
- Use the `---` frontmatter fence for server-side JavaScript/TypeScript
- Reference: [Astro Components](https://docs.astro.build/en/basics/astro-components/)

### React Components
- Used for interactive UI requiring client-side JavaScript
- Can be imported into Astro components
- React JSX is supported via `@astrojs/react` integration
- Reference: [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)

### File Locations
- **Pages**: `src/pages/` - Each file becomes a route (file-based routing)
- **Components**: `src/components/` - Reusable UI components
- **Layouts**: `src/layouts/` - Page layout wrappers
- **Assets**: `src/assets/` - Processed and optimized assets

## TypeScript Configuration

- Uses Astro's strict TypeScript configuration (`astro/tsconfigs/strict`)
- JSX is configured for React (`jsx: "react-jsx"`)
- Generated types from `.astro/types.d.ts` are included
- The `dist/` folder is excluded from compilation

## Deployment

The project builds to a static site in the `./dist/` directory. This can be deployed to any static hosting service:

- **Vercel**: Zero-config deployment for Astro
- **Netlify**: Drag-and-drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Cloudflare Pages**: Native Astro support

## Security Considerations

1. **Environment Variables**: 
   - Store secrets in `.env` or `.env.production` files
   - These files are gitignored by default
   - Use `import.meta.env` to access environment variables in Astro components

2. **Content Security**:
   - Review any external scripts or styles added to layouts
   - The default Layout component includes inline styles

3. **Dependencies**:
   - Keep dependencies updated (`npm audit`)
   - React 19 is the latest major version with improved security features

## Recommended VS Code Extensions

The project recommends the following VS Code extension:
- `astro-build.astro-vscode` - Official Astro language support

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Biome Documentation](https://biomejs.dev)
