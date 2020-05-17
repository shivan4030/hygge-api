## Update the creds in credentials.js
  - NODESMITH_API= to your end point.
  - PRIVATE_KEY = private key to your wallet.

# Babel 7 Node API Starter base

- Babel 7 so you can use all the babel goodness you want on your server
- Nodemon for your development reloading bliss
- Morgan for your logging needs
- Helmet to help secure your application
- Jest for testing & coverage
- Prettier and ESLint for formatting and linting
- Husky for git hooks

## Running your API
- `npm start` and start coding
- Save your files and the server will automatically reload

## Running your tests
### Unit Tests
- `npm test`
- See [Jest](https://www.npmjs.com/package/jest) docs for how to write your tests
- See `/src/main/controller.test.js` for an example of a test

### Coverage
`npm run coverage`

## Deploying your API
1. `npm run build` to create a build of your code
1. `npm run serve` to serve the code up from your `/build` directory

## Logs
- Logs use [`morgan`](https://www.npmjs.com/package/morgan) for formatting the messages
- All logs will be output into the `/logs` directory
- Rotation policy on both `app.log` and `error.log` is 10Mb and/or 1 day
- 4xx & 5xx errors will be placed into your `error.log`
- All traffic will be recorded in `app.log`

### Configuring logs
- `/src/express/logs.js` contains the logging setup
- You can add a new rotation policy (see [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream) for options)
- You can also add another express middleware for writing new/different logs

## Routing
- Any `routes.js` file within the `/src` directory will automatically be picked up on application load
- See `/src/main/routes.js` for an example

