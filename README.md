# GitHub Status API GUI

The GitHub Status API GUI is a React/Redux client-side web application which can be used to view and create GitHub commit [statuses](https://developer.github.com/v3/repos/statuses/) in any GitHub repository you have access to. The application uses OAuth to allow users to authenticate to GitHub using their own GitHub usernames and passwords.

## Prerequisites
- [Node.js](https://nodejs.org) version 8.x <sup>[see note](#compatibility_with_node6)</sup>
- Npm version 5.x or greater *(comes with Node.js version 8.x)*


## Using OAuth with GitHub
In order for your instance of the GitHub Status API GUI application to authenticate to GitHub using OAuth, you must first [register a new OAuth application](https://github.com/settings/applications/new) for your instance. For more information, see GitHub's [OAuth documentation for developers](https://developer.github.com/v3/oauth/#oauth).

## Gatekeeper
In order for OAuth authentication with GitHub to work, you must configure and deploy an instance of the open-source [Gatekeeper](https://github.com/prose/gatekeeper) application to a server. This is due to a security measure GitHub has put in place in it's OAuth authentication API to prevent client-side applications from directly authenticating with GitHub. This restriction ensures that application developers do not inadvertantly disclose their application's GitHub client secret to users by including it in client-side code.

##### Deploying Gatekeeper
You can easily deploy an instance of [Gatekeeper](https://github.com/prose/gatekeeper) directly to Heroku or Azure by clicking the appropriate button in Gatekeeper's [README.md](https://github.com/prose/gatekeeper#deploy-on-heroku) file.

Alternativly, you can clone the Gatekeeper repository and build/deploy Gatekeeper to any web server manually.

Make sure you follow the instructions for setting up Gatekeeper in Gatekeeper's [README.md](https://github.com/prose/gatekeeper#setup-your-gatekeeper) file, including setting the client secret you obtained from GitHub when [registering your OAuth application](#using-oauth-with-github). See Gatekeeper's [README.md](https://github.com/prose/gatekeeper#setup-your-gatekeeper) for more details.

## Configuring GitHub Status API GUI
See [Configuring The Application](config/configuration.md).

## Known Bugs/Limitations
- <a name="compatibility_with_node6"></a>__Compatibility with Node version 6.x__
    - GitHub Status API GUI version 0.7.0 and greater will not work out of the box with Node version 6.x and earlier. This is because Node version 6.x supported the `--harmony-proxies` flag, while Node version 7.x and later changed it to `--harmony`.

    - In order to make this project work with Node version 6.x and earlier, change the following line in the `scripts` section of `package.json`:
      ```javascript
      "test": "node --harmony node_modules/jest/bin/jest",
      ```
      to:
      ```javascript
      "test": "node --harmony_proxies node_modules/jest/bin/jest",
      ```
      *NOTE: You may also have to adjust the `engines.node` property in `package.json`.*

-   __The commits list page is the only page which currently supports [pagination](https://developer.github.com/v3/#pagination) of data returned from GitHub API.__

    -   For all other views, you can only see the first page of records returned from the GitHub API. By default, the maximum number of records per page of data is 30 (see GitHub issue [#45](https://github.com/compumike08/GitHub_Status_API_GUI/issues/45))

    -   *Full support for pagination of all data views in the GitHub Status API GUI application will be added in a future release.*

## Tools Used In Development
This development enviornment for this project was created using Cory House's [`react-slingshot`](https://github.com/coryhouse/react-slingshot) tool, which is [available under the MIT License](https://github.com/coryhouse/react-slingshot/blob/master/LICENSE).

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See [LICENSE](LICENSE) file for details.

## Copyright
Copyright &copy; 2017 Michael Hadjiosif
