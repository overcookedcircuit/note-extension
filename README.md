# Notes Chrome Extension

Notes is a simple, lightweight Chrome extension for keeping quick notes close by while browsing. This is my first Chrome extension, and I mostly built it for fun and to experiment with how Chrome extensions work.

## Features

- Create notes with a title and content
- Edit existing notes without losing their original creation date
- Delete notes with a confirmation step
- Search notes by title or content as you type
- See recently updated notes first
- Store notes locally in Chrome so they remain available between browser sessions
- Use the extension offline without an account or backend
- Automatically follow your system's light or dark theme

## Installation

The extension may not be available on the Chrome Web Store, but you can install it manually from GitHub.

1. Open this repository on GitHub.
2. Click **Code**, then choose **Download ZIP**. If the repository has a packaged release, you can download that from the **Releases** page instead.
3. Extract the downloaded ZIP file to a folder on your computer.
4. Check whether the download already contains a built extension folder with both `manifest.json` and the compiled application files. This folder is usually named `dist`.
5. If you downloaded the source code and there is no ready-to-use `dist` folder, open a terminal in the extracted project folder and run:

   ```bash
   npm install
   npm run build
   ```

   This requires [Node.js](https://nodejs.org/) and creates the complete extension inside `dist/`.

6. Open Google Chrome and go to `chrome://extensions`.
7. Turn on **Developer mode** using the switch in the top-right corner.
8. Click **Load unpacked**.
9. Select the built extension folder containing `manifest.json`, normally the project's `dist/` folder.
10. Open Chrome's extensions menu and pin **Notes** if you want it to stay visible in the toolbar.

> Do not select the source-code folder unless it already contains a complete, prebuilt extension. For a source download, build the project first and select `dist/`.

## Development

To work on the extension locally, clone the repository and install its dependencies:

```bash
git clone <repository-url>
cd note-extension
npm install
```

Start the Vite development server with:

```bash
npm run dev
```

The regular Vite page is useful for UI development, but it does not provide Chrome's `chrome.storage.local` API. To test storage and the full extension behavior, create a production build and load `dist/` through `chrome://extensions`:

```bash
npm run build
```

Other available commands:

```bash
npm run lint
npm run preview
```

After rebuilding, click the extension's **Reload** button on `chrome://extensions` to test the latest version.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Chrome Extension Manifest V3
- Chrome Storage API (`chrome.storage.local`)
- Lucide React

## Contributing

This is my first Chrome extension, and I honestly just made it for fun. Feel free to fork it, modify it, improve it, or turn it into something better. Contributions and ideas are always welcome!

If you find a bug or have an idea, feel free to open an issue. Pull requests are welcome too.