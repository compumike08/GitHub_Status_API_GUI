# Configuration Instructions

Before you can run this application, you must configure several property values by creating a `configProps.json` file.

### Development Environment
To configure the property values for use in your development environment, create a new file in this `configs`
folder named `configProps.json`. This file must contain the following _(add the values that should be used in
your dev environment for these properties inside the empty double quotes)_:
```json
{
  "CLIENT_ID": "",
  "GATEKEEPER_AUTH_URL": "",
  "GITHUB_ACCOUNT_NAME": ""
}
```

**NOTE:** Any `.json` files created inside this `configs` folder will automatically be
excluded from Git source control.

### Production Environment
To configure the property values for use in a deployed production environment, first build the production
application by running the `npm run build` command. This will create a new `dist` folder *(which is excluded from
Git source control)* containing the application compiled for use in production. After the build is complete, create
a new folder named `configs` **inside** of the generated `dist` folder. Then, follow the instructions in the
_Development Environment_ section above to create a `configProps.json` file inside that new `dist/configs/` folder.
