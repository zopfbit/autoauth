[AutoAuth]

AutoAuth is a lightweight browser extension that assists with Two-Factor Authentication (2FA) by autofilling identity matrix codes on supported login pages.

## Features
- Autofills matrix-based 2FA codes for supported sites
- Allows you to store, edit, and upload your identity matrix
- Simple popup UI for matrix management

## How to Install as a Temporary Add-on

You can load AutoAuth as a temporary extension in your browser for development or testing:

### Firefox
1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` file from this project folder.
4. The extension will appear in your browser toolbar. You can now use and test AutoAuth.

## Usage
1. Click the AutoAuth icon in your browser toolbar.
2. Use the popup to edit your identity matrix.
3. Visit a supported login page; the extension will autofill the required codes.

## Development

- The upload feature is still in work

