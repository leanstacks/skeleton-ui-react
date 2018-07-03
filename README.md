# React Starter Project

## Acknowledgements

This is a [LEAN**STACKS**](https://leanstacks.com/) solution.

## Getting Started

This is a Single-Page Application (SPA) user interface application authored in JavaScript using the [React](https://reactjs.org/) framework.

## Languages

This project is primarily authored in:

* ECMAScript 2017 (JavaScript 8th Edition) with syntatic sugar via Babel
* HTML
* SASS

**Note:** Babel allows developers the flexibility to choose the 6th, 7th, or 8th edition of JavaScript. The Babel transpiler ensures a browser-compatible build.

## Installation

### Fork the Repository

Fork the [GitHub repo](https://github.com/leanstacks/skeleton-ui-react). Clone the project to the host machine.

### Dependencies

This project requires the following global dependencies on the host machine:

* Node 6+
* NPM 3+
* Yarn 1.3+

**Note:** This project has been tested with Node 8.11+ (Carbon) and 6.14+ (Boron).

After installing the global dependencies, initialize the project. Open a terminal window, navigate to the project base directory and issue this command:

```
yarn install
```

Yarn retrieves all project dependencies and installs them into the `/node_modules` sub-directory.

### Editors

You may use your preferred text editor. [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/) are recommended.

## Running

The project uses [Yarn commands](https://yarnpkg.com/lang/en/docs/cli/) for build, test, and local debugging workflow automation. The following Yarn commands are defined.

### Start

The **start** command performs the following workflow steps:

* starts the Webpack development server
* builds the application and loads it into memory
* watches source directories for changes
* republishes source files when changes occur
* reloads the application in the browser when changed source files are republished

The **start** command is designed to allow engineers the means to rapidly make application changes on their local machines. This task is not intended for use in a server environment.

To execute the **start** command, type the following at a terminal prompt in the project base directory:

```
yarn start
```

Open a browser and go to http://localhost:9000/ to use the application.

To stop the Webpack development server, press `ctrl-C` in the terminal window.

### Test

The **test** command performs the following workflow steps:

* executes tests once and exits

The **test** command is designed to allow engineers the means to run all tests contained within `*.test.js` files located in the `/src/tests/` sub-directory.

To execute the **test** command, type the following at a terminal prompt in the project base directory:

```
yarn test
```

To start the test environment and re-execute tests as source files are modified, use the `--watch` option.

```
yarn test --watch
```

To stop the test environment in watch mode, press `q` in the terminal window.

### Build

The **build** command performs the following workflow steps:

* starts the Webpack process
* creates a clean distribution `/dist` directory
* copies all static assets to the distribution directory
* transpiles, ugilifies, minifies, and maps source files into distribution bundles
* injects the distribution bundles into `link` and `script` tags within the `index.html` file

To execute the **build** command, type the following at a terminal prompt in the project base directory:

```
yarn build
```

The **build** command has environment-specific variants which allow for the injection of alternative values into environment variables via the [Webpack Define Plugin](https://webpack.js.org/plugins/define-plugin/). See the Define Plugin documentation for more information.

To execute the **build** command for a configured environment, type the following command at a terminal prompt in the base directory:

```
yarn build:dev

OR

yarn build:qa
```

## Deployment

This project is ideally suited to be hosted from a static web server (e.g. Apache or Nginx) or from a CDN (e.g. AWS CloudFront).

To prepare the application distribution for deployment, run the **build** Yarn command documented above.  Next, take all of the files and directories from the `/dist` directory and deploy them to your hosting environment.

### Web Server Configuration

#### Fallback to index.html

Routed applications must fall back to `index.html`. That means, if you are using SPA routing  you must configure the static web server to return to the base html page (`index.html`) when the router is asked to serve a route which does not exist.

A static web server commonly returns `index.html` when it receives a request for `http://www.example.com/`. But it returns a `404 - Not Found` error when processing `http://www.example.com/greetings/109` unless it is configured to return `index.html` instead.

Each static web server is configured for fallback in a different way. Here are a few examples for common scenarios.

##### Webpack Development Server

```
historyApiFallback: {
    disableDotRule: true,
    htmlAcceptHeaders: [text/html', 'application/xhtml+xml']
}
```

##### Apache

Add a rewrite rule to the `.htaccess` file as illustrated below.

```
RewriteEngine On
  # If an existing asset or directory is requested, go to it as it is
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^ - [L]
  # If the requested resource doesn't exist, use index.html
  RewriteRule ^ /index.html
```

##### NGinx

Use `try_files` as described in the [Front Controller Pattern Web Apps](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps) documentation.

```
try_files $uri $uri/ /index.html;
```

##### IIS

Add a rewrite rule to `web.config`, similar to the one illustrated below.

```
<system.webServer>
  <rewrite>
    <rules>
      <rule name="Angular Routes" stopProcessing="true">
        <match url=".*" />
        <conditions logicalGrouping="MatchAll">
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
        </conditions>
        <action type="Rewrite" url="/src/" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
```

## Technology Stacks

### Application

[React](https://reactjs.org/)  
[Redux](https://redux.js.org/)  
[React Router](https://reacttraining.com/react-router/)  
[Axios](https://github.com/axios/axios)  
[Lodash](https://lodash.com/)  
[Moment](https://momentjs.com/)  
[Numeral](http://numeraljs.com/)  
[Bootstrap](https://getbootstrap.com/)  
[Font Awesome](https://fontawesome.com/)  
[Google Fonts](https://fonts.google.com)  
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
[SASS](http://sass-lang.com/guide)  

### Test

[Jest](http://jestjs.io/)  
[Enzyme](http://airbnb.io/enzyme/)  
[Redux Mock Store](https://www.npmjs.com/package/redux-mock-store)  

### Build

[Babel](http://babeljs.io/)  
[Node.js](https://nodejs.org/)  
[Webpack](https://webpack.js.org/configuration/)  
[Yarn](https://yarnpkg.com/en/)  
