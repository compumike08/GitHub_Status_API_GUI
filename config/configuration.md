# Configuring The Application

This application uses a lightweight Express web server application to
serve the front-end code the appropriate configuration properties when
it first loads in a browser. This allows the configuration properties
used by the front-end code to be changed without having to re-compile
the front-end.

## Configuration for Development Environments

There is a [`default.json`](default.json) file in the `/config` directory
which is part of the source code. It contains default values for most of
the required configuration properties. However, there are several
properties which you **must** configure manually before you can this
application. To set up these properties in a development environment,
create a new file inside this `/config` directory named `development.json`
(this repository's `.gitignore` file will ignore any files created inside
of the `/config` directory except for `default.json` and `*.md` files).
Inside your `development.json` file, you must set at least the following
properties:
```json
{
  "configProps": {
    "CLIENT_ID": "<ENTER YOUR GITHUB OAUTH APP'S CLIENT ID HERE>",
    "GATEKEEPER_AUTH_URL": "<ENTER URL TO YOUR GATEKEEPER SERVER INSTANCE HERE>",
    "GITHUB_ACCOUNT_NAME": "<ENTER GITHUB USER/ORG ACCOUNT NAME HERE TO VIEW/ADD STATUSES IN THEIR REPOS>"
  }
}
```

In addition, you can override any default property values from `default.json`
by adding them in your `development.json` file as well. If a property is
definied in `development.json` which has the same name as one defined in
`default.json`, the value from `development.json` will take precedence in
development enviornments.

#### Explaination of Required Properties
1)  __GitHub Application Client ID:__ This is the Client ID which will be generated and provided to you by GitHub when you [register your new OAuth application](#using-oauth-with-github).
```json
{
  "configProps": {
    "CLIENT_ID": "abcdefghij0123456789"
  }
}
```
2)  __Gatekeeper Authentication URL:__ This is the URL where you deployed your instance of [Gatekeeper](#deploying-gatekeeper).
```json
{
  "configProps": {
    "GATEKEEPER_AUTH_URL": "https://your.server.domain/authenticate/"
  }
}
```
3) __GitHub Account Name:__ This is the GitHub account name for the account which owns the repositories you want to access (it does not have to be the same as the account you log into GitHub with, as long as your login account has been granted access to the repositories in question). It can also be an organziational account name.
```json
{
  "configProps": {
    "GITHUB_ACCOUNT_NAME": "anyuser123"
  }
}
```

## Configuration for Production Environments

For production environments, setting up the configuration properties works
the same way as setting them up for development environments, except you
should create a file named `production.json` instead of `development.json`.

**NOTE:** You can have both a `development.json` and a `production.json`
file in the `/config` directory at the same time. Which one is used in
addition to `default.json` will depend on the value of the `NODE_ENV`
environment variable set in the running instance
(see [`webpack.config.dev.js`](../webpack.config.dev.js)) and
[`webpack.config.prod.js`](../webpack.config.prod.js)).
