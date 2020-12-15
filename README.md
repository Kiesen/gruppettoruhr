# gruppettoruhr.cc

This is the official repository of the gruppettoruhr cycling club. The repository is open source under the [LICENSE.md](LICENSE.md) license, feel free to contribute and make the website better for you and the club. Please follow the official [contribution guidelines](#Contributing).

## Development setup

This section should help you to setup a local development environment with a running instance of the gruppettoruhr.cc website.

### Prerequisites

The setup might run with other LTS or major versions releases of node and npm but the following version are recommended to avoid issues with the development environment.

- `node ^14.0.0`
- `npm ^6.14.9`

### Installation of dependencies

If you fulfill the prerequisites you should be able to install all project dependencies with the following command:

```bash
npm install
```

### Start of the development server

After you have successfully installed all project dependencies you should be able to start a development server with the following command:

```bash
npm run dev
```

The server will run on your local machine on port `3000`. If you want to change the port you can easily do this by adding the `-- -p 3030` option followed by the port number you want to open (e.g. `npm run dev -- -p 3030`).

### Where to start

An important note is that the gruppettoruhr website is powered by [next.js](https://nextjs.org), which means the project structure strictly follows the guidelines given by the [next.js](https://nextjs.org) team. This also means that you will find every page inside the `src/page` directory, which is a good place to start and try things out. Besides the `src/pages` directory we have a directory for all common components like the footer, it can be found under `src/components`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- **Frederik Aulich** - _Initial work_ - [Kiesen](https://github.com/Kiesen)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
