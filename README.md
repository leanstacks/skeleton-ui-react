# Starter React UI

A serverless, progressive, responsive starter user interface (UI) with React at the core of the technology stack.

[![CI](https://github.com/leanstacks/skeleton-ui-react/actions/workflows/ci.yml/badge.svg)](https://github.com/leanstacks/skeleton-ui-react/actions/workflows/ci.yml)

## About

This project was bootstrapped with the [Create React App](https://github.com/facebook/create-react-app) template.

The technology stack includes:

- Create React App - the foundation
- React Router Dom - routing
- TanStack React Query - data manipulation and caching
- Axios - http client
- Formik - form management
- Yup - validation
- React Spring - animation
- Lodash - utility functions
- DayJS - date utility functions
- TanStack React Table - tables and datagrids
- Tailwind - styling
- Material Symbols - icons
- Testing Library React - tests
- Jest - tests
- MSW - API mocking
- TypeScript

### Repository

This repository uses [trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development). The latest code is located on the `main` branch. The `main` branch is always ready for deployment.

Features are developed on branches named `feature/NNNNN` which are created from the `main` branch. The feature name used in the branch contains an issue identifier or a short name, e.g. `feature/123-do-something`.

Releases are created on branches named `release/MM.mm.pp` which are created from the `main` branch. The release name follows the [semantic versioning](https://semver.org/) specification.

Hotfixes are created on branches named `release/MM.mm.pp` which are created from the appropriate `release/MM.mm.pp` branch.

A pull request must be opened requesting merge from any branch back to `main`. GitHub actions perform continuous integration, CI, checks against the PR source branch. At least one code review approval is required to complete the pull request.

See also: [Feature flags](https://www.atlassian.com/continuous-delivery/principles/feature-flags)

### Issue Management

This project uses [GitHub Issues](https://github.com/leanstacks/skeleton-ui-react/issues).

### Code Formatting

The project includes a configuration file for the [Prettier](https://prettier.io/docs/en/configuration.html) code formatter. This allows all project contributors to share the same code formatting rules.

Adjust the Prettier configuration as desired.

## Installation

### Prerequistes

It is strongly recommended that you install Node Version Manager, [`nvm`][nvm]. Node Version Manager simplifies working on multiple projects with different versions of Node.js.

### Clone the Repository

Open the [repository][repo] in a browser. Follow the instructions to clone the repository to your local machine.

### Install Node

Open a terminal window and navigate to the project base directory. Issue the following command to install the version of Node and NPM used by the application:

```bash
# If you already have this version of Node, simply switch to it...
nvm use

# If you do NOT have this version of Node, install it...
nvm install
```

Node Version Manager inspects the `.nvmrc` file in the project base directory and uses or installs the specified version of Node and the Node Package Manager, npm.

### Install the Dependencies

To install the project dependencies, issue the following commands at a terminal prompt in the project base directory:

```bash
# Switch to the project node version...
nvm use

# Install project dependencies
npm install
```

### After Installation

The installation is now complete! You may open the project in your favorite source code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/)).

We recommend the following VS Code extensions:

- Prettier - Code formatter (required)
- Tailwind CSS IntelliSense (required)
- Indent Rainbow (optional)
- GitLens (optional)
- Dotenv Official +Vault (optional)
- GitHub Actions (optional)

Install the _Prettier_ extension to ensure that all project participants' contributions are formatted using the same rules. The extension leverages project-specific rules found in the `.prettierrc` file in the project base directory.

The _Tailwind CSS IntelliSense_ extension is a must-have companion in all projects using Tailwind. The extension ensures that Tailwind CSS classes are named and ordered correctly and flags any conflicting classes.

## Configuration

The application is configured using Environment Variables. Because single-page applications are static, environment variable values are injected into the application during the build. The environment variables may be sourced from the environment or `.env` files as described in the [Create React App documentation](https://create-react-app.dev/docs/adding-custom-environment-variables).

### `.env` files

> **NOTE:** Because they may contain sensitive information, `.env` files are not committed to the repository.

After project installation and before running the application locally, create the following `.env` files in the project base directory.

#### `.env.local`

The `.env.local` configuration file provides the configuration values when the application is started on a developer's local machine.

```
# Provided by Pipeline (Simulated)
REACT_APP_BUILD_DATE=1970-01-01
REACT_APP_BUILD_TIME=00:00:00
REACT_APP_BUILD_TS=1970-01-01T00:00:00+0000
REACT_APP_BUILD_COMMIT_SHA=local
REACT_APP_BUILD_ENV_CODE=local
REACT_APP_BUILD_WORKFLOW_NAME=local
REACT_APP_BUILD_WORKFLOW_RUN_NUMBER=1
REACT_APP_BUILD_WORKFLOW_RUN_ATTEMPT=1

# API Configuration
REACT_APP_BASE_URL_API=https://jsonplaceholder.typicode.com

# Toasts Configuration
REACT_APP_TOAST_AUTO_DISMISS_MILLIS=5000
```

#### `.env.test`

The `.env.test` configuration file provides configuration values used when unit tests are executed on a developer's local machine.

> **NOTE:** Use the same values when running tests in a CI/CD pipeline.

```
# Provided by Pipeline (Simulated)
REACT_APP_BUILD_DATE=1970-01-01
REACT_APP_BUILD_TIME=00:00:00
REACT_APP_BUILD_TS=1970-01-01T00:00:00+0000
REACT_APP_BUILD_COMMIT_SHA=test
REACT_APP_BUILD_ENV_CODE=test
REACT_APP_BUILD_WORKFLOW_NAME=test
REACT_APP_BUILD_WORKFLOW_RUN_NUMBER=1
REACT_APP_BUILD_WORKFLOW_RUN_ATTEMPT=1

# API Configuration
REACT_APP_BASE_URL_API=https://jsonplaceholder.typicode.com

# Toasts Configuration
REACT_APP_TOAST_AUTO_DISMISS_MILLIS=1500
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:ci`

Executes the test runner in `CI` mode and produces a coverage report. With `CI` mode enabled, the test runner executes all tests one time and prints a summary report to the console. A code coverage report is printed to the console immediately following the test summary.

A detailed test coverage report is created in the `./coverage` directory.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

> **WARNING:** this is a one-way operation. Once you `eject`, you can’t go back!

> **TIP:** if you are thinking of ejecting, consider using [`craco`](https://craco.js.org/) instead.

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## DevOps

### Cloud Resources

The AWS resources for this application component are provisioned via AWS CloudFormation. The `template.yml` file is the CloudFormation template.

The resources provisioned are:

| Resource                | Description                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| S3 Bucket               | Contains the published application.                                           |
| S3 Bucket Policy        | Provides access to the S3 Bucket from AWS CloudFront.                         |
| CloudFront Distribution | A CloudFront distribution to serve the SPA application.                       |
| CloudFront Distribution | A CloudFront distribution to serve the full-stack application (UI, API, etc). |
| Route53 RecordSet       | An `A` record for the application distribution.                               |
| Route53 RecordSet       | An `AAAA` record for the application distribution.                            |

### CI/CD Pipelines

This project uses GitHub Actions to perform DevOps automation activities such as Continuous Integration and Continous Deployment. See all project [GitHub Actions workflow runs](https://github.com/leanstacks/skeleton-ui-react/actions).

| Workflow              | Trigger                        | Description                                                                          |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| CI                    | Pull Request for `main` branch | Builds, lints, and tests the application. Validates the AWS CloudFormation template. |
| Deploy to Development | Push to `main` branch          | Deploys AWS CloudFormation stack. Builds and deploys the application.                |
| Deploy to QA          | Push to `release/*` branch     | Deploys AWS CloudFormation stack. Builds and deploys the application.                |
| Deploy to Production  | Publish a Release              | Deploys AWS CloudFormation stack. Builds and deploys the application.                |

## Related Information

- [Create React App][cra]
- [TanStack][tanstack]
- [Axios][axios]
- [Formik][formik]
- [Yup][yup]
- [Tailwind CSS][tailwind]
- [Material Symbols][icons]
- [Testing Library][testing-library]
- [GitHub Actions][ghactions]

[repo]: https://github.com/leanstacks/skeleton-ui-react 'GitHub Repository'
[nvm]: https://github.com/nvm-sh/nvm 'Node Version Manager'
[cra]: https://create-react-app.dev/ 'Create React App'
[axios]: https://axios-http.com/ 'Axios'
[formik]: https://formik.org/ 'Formik'
[yup]: https://github.com/jquense/yup 'Yup'
[tailwind]: https://tailwindcss.com/ 'Tailwind CSS'
[icons]: https://fonts.google.com/icons 'Material Symbols'
[tanstack]: https://tanstack.com/ 'TanStack'
[testing-library]: https://testing-library.com/ 'Testing Library'
[ghactions]: https://docs.github.com/en/actions 'GitHub Actions'
