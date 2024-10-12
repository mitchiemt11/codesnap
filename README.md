# SnipShot

SnipShot is a stylish code snippet uploader that leverages API technology to format and beautify code snippets. The app uses Pinata for secure, decentralized storage of all generated snippet images, ensuring users can easily store and share their creations.

This project was built using modern technologies, including React, Vite, TypeScript, Material-UI for the user interface, and hosted with Vercel for seamless deployment.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Pinata Integration](#pinata-integration)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Tech Stack

The following technologies were used to build SnipShot:

- React: A JavaScript library for building user interfaces
- TypeScript: For adding type safety and improving code quality
- Material-UI: A popular React UI framework for faster and easier web development
- Pinata: Secure, decentralized storage for all generated snippet images
- html2canvas: For capturing the formatted code as an image
- highlight.js: For syntax highlighting of code snippets
- react-spring: For smooth animations and transitions
- Vercel: Hosting platform for seamless deployment

## Features

- Code Formatting: Users can input code snippets which are automatically formatted and beautified
- Syntax Highlighting: Support for multiple programming languages with syntax highlighting
- Image Generation: Converts formatted code snippets into shareable images
- Pinata for Storage: Seamless and secure decentralized storage of all snippet images
- No Sign-up Required: Users can start creating and sharing snippets immediately
- Responsive Design: Built with Material-UI for a clean, modern, and responsive UI


## Getting Started

To run SnipShot locally, follow these steps.

### Prerequisites

- Node.js installed (v14 or higher)
- npm or yarn as the package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mitchiemt11/codescan.git
   cd codescan
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Pinata Integration

SnipShot leverages Pinata for secure and decentralized storage of snippet images. All images generated by users are stored on Pinata's IPFS, making them easily retrievable and securely stored.

### Steps to Integrate Pinata

To integrate Pinata into your local environment:

1. Sign up for a Pinata account at [Pinata](https://app.pinata.cloud/).
2. Generate an API Key from your Pinata dashboard.
3. Add your Pinata API Key and Pinata Secret Key to the `.env.local` file.

   ```bash
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_key
   ```

All image uploads will now be routed through Pinata for secure storage on the decentralized IPFS network.

## Environment Variables

To run SnipShot, you will need to set up environment variables. Create a `.env.local` file in the root directory and add the following:

```bash
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

Replace the placeholders with the respective values for your Pinata configuration.

## Running Locally

To run SnipShot locally for development purposes:

1. Clone the repository and install dependencies as mentioned in the Getting Started section.
2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

## Deployment

SnipShot can be hosted using Vercel. To deploy the app:

1. Create a Vercel account at [Vercel](https://vercel.com).
2. Link the project to your Vercel account.
3. Add the necessary environment variables in your Vercel project settings.
4. Deploy the application:
   ```bash
   vercel deploy
   ```

Your app will be deployed at `https://your-app-name.vercel.app`.

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

