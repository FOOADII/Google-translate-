# Google Translate Clone

A modern Google Translate clone built with Next.js 14, featuring authentication with Clerk, translation services powered by Azure Translator, and data storage using MongoDB/Cosmos DB.

## Features

- Real-time text translation
- Multiple language support
- User authentication and history tracking
- Responsive modern UI
- Save favorite translations
- Language detection

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Azure Translator API
- MongoDB/Cosmos DB
- Headless UI
- Hero Icons

## Prerequisites

Before running this project, you need:

1. Node.js (LTS version)
2. npm (comes with Node.js)
3. A Clerk account for authentication
4. An Azure account for translation services
5. A MongoDB/Cosmos DB account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Azure Translator
AZURE_TRANSLATOR_KEY=your_azure_translator_key
AZURE_TRANSLATOR_REGION=your_azure_region
AZURE_TRANSLATOR_ENDPOINT=your_azure_endpoint

# MongoDB/Cosmos DB
MONGODB_URI=your_mongodb_uri
COSMOS_DB_CONNECTION_STRING=your_cosmos_connection_string
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and API configurations
- `/src/types` - TypeScript type definitions
- `/src/styles` - Global styles and Tailwind configurations

## Contributing

Feel free to submit issues and enhancement requests! 