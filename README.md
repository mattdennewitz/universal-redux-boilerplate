# Redux/Router/Webpack Boilerplate

This example boilerplate is meant to demonstrate building a universal,
SEO-ready redux application.

This boilerplate was built off of [react-transform-boilerplate])https://github.com/gaearon/react-transform-boilerplate)
but also owes design decision debts to [redux-blog-example](https://github.com/GetExpert/redux-blog-example)
and others.

---

## Under construction

<img src="http://i.imgur.com/jQmU4Lb.jpg"
    alt="under construction"
    style="width: 360px" />

**Warning**: this repo is being developed against `redux` libraries
in alpha, beta, or release candidate states. APIs often change
without warning.

---

## What's in the stack?

- [express](http://expressjs.com/) as the application server.
    In `NODE_ENV=dev` mode (enabled by default), express is given
    Webpack's middleware for compilation and hot reloading.
    Additionally, redux reloading is enabled as a Babel plugin
    (see `.babelrc`).
- [react](http://facebook.github.io/react)
- [webpack](https://webpack.github.io/)
    - [babel-loader](https://github.com/babel/babel-loader)
- [redux](https://rackt.github.io/redux)
- [react-router](https://rackt.github.io/react-router)
- [redux-router](https://rackt.github.io/redux-router)
- [redux-thunk](https://github.com/gaearon/redux-thunk), which allows
    actions to return promises rather than simple description objects
- [react-helmet](https://github.com/nfl/react-helmet), for building
    a proper `<head>` from within React components

## How can I get started with this?

1. Clone this repo
2. `npm install` to install all components
3. Read the comments in `server.js` to understand how the application server
    does its job
4. Start the example API server. This is a single-endpoint Express server
    that lives outside of our example application, and is meant to illustrate
    fetching data from a REST api via `axios`.

   Start this via `node api/index.js`.
4. Run `npm run dev` to start the boilerplate server, and then visit at
    [http://localhost:3000](http://localhost:3000).

If everything is running correctly, should see the "Home" page.
If you view the source, you'll see that the page was
rendered completely on the server. You should also see that if you visit the
"Posts" page, posts fetched from the example API server are loaded
by `PostList.componentWillMount`. Reload the page and check the source -
now they're rendered on the server thanks to `utils/fillStore`.
Read through the `server.js` source for a detailed overview of
what's happening here.

And then begin to add your own components, routes, actions, and reducers!

## On the docket...

- Additional documentation and project maturation
- Authentication layer with Passport
- Yeoman generator
