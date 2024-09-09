# LLM Chat Bot

## Overview

This Vue 3/Node.js application demonstrates the integration of a large language model (LLM) API, specifically the Tongyi Qianwen (通义千问) API, into a customer-facing chatbot. It illustrates how to harness advanced AI capabilities to enhance user interaction and deliver intelligent responses.

## Project Setup

To set up the project, follow these steps:

1. Ensure you have Node.js and npm installed.
2. Clone the repository or download the project files.
3. Install the project dependencies:

```sh
npm install
```

4. Install the backend dependencies:

```sh
cd backend
npm install
```

## Configuration

Before running the backend, you need to set up the environment configuration:

```sh
cd backend
cp .env.example .env
```

Edit the newly created `.env` file and add your `ALIBABA_API_KEY` to the appropriate field.

## Development

To compile and hot-reload for development:

```sh
npm run dev
```

This command will start both the Vue 3 frontend and the Node.js backend, allowing for real-time development.

## Production Build

For production deployment, compile and minify the application:

```sh
npm run build
```

This optimizes the application for performance and reduces file sizes.

## Linting

To maintain code quality, lint your code using ESLint:

```sh
npm run lint
```

This will check your code against the project's ESLint rules.

## Running the Backend

To run the Node.js backend with the configured API key in development mode:

```sh
cd backend
npm run dev
```

To run the Node.js backend in production mode:

```sh
cd backend
npm run start
```

This will start the server, which will handle API requests from the frontend.

## Credits

This project is inspired by and references the work found at

- [vue3-openai-chatbot](https://github.com/alex-bowers/vue3-openai-chatbot).
  The original project has been a valuable resource in the development of this application.
