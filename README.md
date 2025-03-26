
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/60a8492c-89fd-4543-b4e3-da8619e560dd

## Current Status

This project is a shoe e-commerce application with:
- Homepage to view all products
- Detail page to see product details
- Login/logout functionality
- Cart functionality
- Admin page to manage products

Currently, the application is using a mock API client (src/lib/api.ts) for all data operations.

## Next Steps to Create Monorepo

To properly set up this project as a monorepo with separate frontend and backend:

1. Create a proper monorepo structure using a tool like Nx, Turborepo, or Yarn Workspaces
2. Move the current React application to a 'frontend' package
3. Create a 'backend' package with Express.js for handling API requests
4. Create a 'shared' package for types and utilities used by both frontend and backend

For the backend, we'll need Express.js and related packages:
```sh
# To be run in the backend package directory once monorepo is set up
npm install express cors body-parser uuid
```

These steps should be done as a separate process from the current web application.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/60a8492c-89fd-4543-b4e3-da8619e560dd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/60a8492c-89fd-4543-b4e3-da8619e560dd) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
