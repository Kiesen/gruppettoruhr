# gruppettoruhr.cc

This is the official repository of the [gruppettoruhr cycling club](https://gruppettoruhr.cc). Feel free to contribute and enhance the website with more features that help our club, especially our members. If you want to contribute, please follow the official [contribution guidelines](#Contributing).

## Development environment

This section should help you to set up a local development environment with a running instance of the gruppettoruhr.cc website.

### Prerequisites

The environment might run with other LTS or major version releases of node and npm, but the following versions are recommended to avoid issues.

- `node ^14.0.0`
- `npm ^6.14.9`

### Installation of project dependencies

If you fulfil the prerequisites you should be able to install the development dependencies with the following command:

```bash
npm install
```

The development dependencies are needed to bootstrap the project packages (e.g. website/backend). It is worth mentioning that we are using [lerna](https://lerna.js.org) to manage multiple independent node projects inside one repository. After a successful installation you should be able to install the package dependencies with the following command:

```bash
npm run bootstrap
```

### Start of the development server

After you have successfully installed all dependencies, you should be able to start a development server with the following command:

```bash
npm run start
```

The server will run on port `3000`, and you can reach the frontend at [localhost:3000](http://localhost:3000).

## Where to start

The projects is split into two parts:

1. Frontend - contains the website/frontend
2. Backend - contains a headless CMS

Depending on your idea/implementation you might need to update/add code in both packages.

### Frontend

The frontend makes use of the [next.js](https://nextjs.org) framework, which bundles [node.js](https://nodejs.org) and [react.js](https://reactjs.org) together to let you easily use techniques like server-side rendering. To make use of all features next.js provides, the folder structure and configuration must strictly match the [next.js](https://nextjs.org/docs/getting-started) guidelines and requirements. A good place to start is the [pages](packages/website/pages) folder inside the [website](packages/website) package, which lets you easily add a new page.

### Backend

In progress

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests and the documentation as appropriate.

## Authors

- **Frederik Aulich** - _Initial work_ - [Kiesen](https://github.com/Kiesen)

## License

This project is licensed under the MIT license - for details take a look at [LICENSE.md](LICENSE.md)
