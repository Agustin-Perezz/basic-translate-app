# AI-Powered Translation Assistant

A minimal web app for translating text between multiple languages using OpenAI's GPT models. Built with SvelteKit, Tailwind CSS, and TypeScript. Features a modern UI, instant translation, and language swapping.

## Features

- Translate text between popular languages
- Powered by OpenAI GPT models
- Swap source and target languages instantly
- Responsive, modern UI with Tailwind CSS
- Built with SvelteKit and TypeScript
- E2E tested with Playwright

## Technologies

- SvelteKit
- TypeScript
- Tailwind CSS
- OpenAI API
- Playwright (E2E testing)
- ESLint & Prettier
- Husky (Git hooks)
- Vite

## Getting Started

Install dependencies:

```
pnpm install
```

Start the development server:

```
pnpm run dev
```

Build for production:

```
pnpm run build
```

Preview the production build:

```
pnpm run preview
```

Lint and format code:

```
pnpm run lint
pnpm run format
```

Run type checks:

```
pnpm run check
```

Run E2E tests:

```
pnpm run test
```

## Environment Variables

Set the following variables in your .env file:
It is not recommended to put the API key in the client; the API key for this project is limited the budget to 5 USD.

```
VITE_OPEN_AI_API_KEY=your_openai_api_key
```

## CI/CD

GitHub Actions workflow runs on push to main:

- Installs dependencies
- Lints and formats code
- Runs type checks
- Installs Playwright browsers
- Runs E2E tests
- Builds the app
- Deploys to GitHub Pages

## Husky Git Hooks

- pre-commit: runs lint-staged
- pre-push: runs tests
