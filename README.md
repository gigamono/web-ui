<div align="center">
    <a href="#" target="_blank">
        <img src="https://raw.githubusercontent.com/appcypher/gigamono-assets/main/avatar-gigamono-boxed.png" alt="Gigamono Logo" width="140" height="140"></img>
    </a>
</div>

<h1 align="center">Web UI</h1>

`web-ui` is the web user interface for managing the Gigamono framework and it also provides access to apps and extensions hosted on the platform.

> Information provided here is for folks working on this package. If your goal is to get started with the Gigamono framework, check the [Gigamono repo](https://github.com/gigamono/gigamono) on how to do that.

##

### Content

1. [Getting Started](#getting-started)

2. [Single-Page App Mode](#spa-mode)

##

### Getting Started <a name="getting-started" />

- Install the dependencies

  ```bash
  yarn
  ```

- Start dev server.

  ```bash
  yarn dev
  ```

- Navigate to `http://localhost:5000` in your browser.

  ```bash
  open http://localhost:5000
  ```

##

### Single-Page App Mode <a name="spa-mode" />

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```
