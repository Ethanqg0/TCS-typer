# Project Documentation

## Overview

This project is a web-based typing test application designed to measure typing speed and accuracy. It includes various tests, customizable settings, and sound effects to enhance the user experience. The application is built using TypeScript and structured to support easy expansion and customization.

## Project Structure

The project is organized into several key directories and files:

- [``.gitignore``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2F.gitignore%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/.gitignore"): Specifies intentionally untracked files to ignore.
- [``assets/``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fassets%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/assets/"): Contains static assets divided into `images/` and `sounds/`.
- [`[`data/`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A193%2C%22character%22%3A6%7D%5D "src/test/test-logic.ts")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fdata%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/data/"): Stores JSON and text data, including `quotes.json` for typing tests and `words.txt`.
- [``package.json``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/package.json"): Manages project dependencies and scripts.
- [``previous.txt``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fprevious.txt%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/previous.txt"): (Purpose not specified in the provided context).
- [``Readme.md``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2FReadme.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/Readme.md"): A markdown file intended to provide an overview of the project (this document).
- [`[`src/`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A222%2C%22character%22%3A2%7D%5D "src/test/test-logic.ts")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/src/"): The source code directory.
  - `index.html`: The main entry point of the application.
  - [`pages/`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A227%2C%22character%22%3A2%7D%5D "src/test/test-logic.ts"): Contains HTML files for different pages ([`settings.html`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A31%2C%22character%22%3A2%7D%5D "src/test/test-logic.ts"), `test.html`).
  - `test/`: Includes TypeScript files for test logic, sound, theme, and a main test file.
- [``tsconfig.json``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/tsconfig.json"): Configuration file for TypeScript compiler options.

## Key Components

### Typing Test Logic ([`[`src/test/test-logic.ts`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A222%2C%22character%22%3A2%7D%5D "src/test/test-logic.ts")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/src/test/test-logic.ts"))

Implements the core functionality of the typing tests, including:
- [`TypingTest`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A54%2C%22character%22%3A0%7D%5D "src/test/test-logic.ts") class: Represents a typing test, handling the initialization, quote generation, and timing.
- [`TestConfig`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A214%2C%22character%22%3A0%7D%5D "src/test/test-logic.ts") type: Configuration for individual tests, mapping HTML elements and stopwatch IDs.
- Event listeners: Handle keydown events to process user input and provide visual feedback.

### Sound Configuration

Sound effects are configurable and loaded based on user preferences stored in [`localStorage`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FApplications%2FVisual%20Studio%20Code.app%2FContents%2FResources%2Fapp%2Fextensions%2Fnode_modules%2Ftypescript%2Flib%2Flib.dom.d.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A28116%2C%22character%22%3A0%7D%5D "../../../../Applications/Visual Studio Code.app/Contents/Resources/app/extensions/node_modules/typescript/lib/lib.dom.d.ts"). The application supports multiple sound effects for key presses, allowing users to choose their preferred typing sound.

### Test Configuration

Tests are configured using the [`pathToTestMap`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A221%2C%22character%22%3A0%7D%5D "src/test/test-logic.ts") object, which maps URL paths to specific test configurations. This allows the application to initialize the correct test based on the current page.

## Development

### Setup

To set up the project for development, ensure you have Node.js installed, then run:

```sh
npm install
```

This will install all necessary dependencies as defined in [``package.json``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/package.json").

### Building

The project uses TypeScript, which requires compilation to JavaScript. To compile the project, run:

```sh
tsc
```

Ensure the [``tsconfig.json``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/tsconfig.json") is correctly configured for your environment. The project is currently set to target ES2016 and uses CommonJS modules.

### Running Tests

Unit tests are located in the [`[`src/test/`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2Ftest-logic.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A222%2C%22character%22%3A2%7D%5D "src/test/test-logic.ts")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fethangutierrez%2FDesktop%2FCustomTypingTest%2Fsrc%2Ftest%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/ethangutierrez/Desktop/CustomTypingTest/src/test/") directory. To run these tests, ensure you have a test runner that supports TypeScript configured in your development environment.

## Contributing

Contributions to the project are welcome. Please follow the existing code structure and document any new functionality. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate.

## License

(Please specify the license here, or state that it's unlicensed if applicable.)