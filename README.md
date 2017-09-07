# Plex Web Remote

<img src="https://raw.githubusercontent.com/maximelafarie/plex-web-remote/master/dist/img/icon.png" width="100">

Chrome Extension to remotely control Plex Web App wherever you are.

## How it works

PWR (Plex Web Remote) works with the keyboard media buttons. You simply have to load the extension in Chrome
and let the magic operate.

The extension looks for a tab that contains `plex.tv` or the port `3200` (default Plex port, in case your accessing 
Plex Web App through your server IP address). Feel free to change these values to fit your needs (e.g. if you change the
default Plex port or reverse address or custom domain).

The extension works when Chrome browser is open and you can use it even if the browser is not focused (e.g. if you're
coding, if you're playing and so on).


## Contribute
### Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

### Includes the following

* TypeScript
* Webpack
* jQuery

### Project Structure

* src: TypeScript source files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

### Setup

```
npm install
```

### Build by watch mode

```
npm run build
```

### Load extension to Chrome

Load `dist` directory

