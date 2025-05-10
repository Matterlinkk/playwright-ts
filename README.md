# Playwright Testing Framework

![Playwright Tests](https://github.com/Matterlinkk/playwright-ts/actions/workflows/pipeline.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive automated testing solution built with Playwright and TypeScript, implementing Page Object Model design pattern. This framework supports both API and End-to-End testing with CI/CD integration via GitHub Actions.

## Features

- **Page Object Model** architecture for maintainable test code
- **TypeScript** for type safety and better code completion
- **Docker** support for containerized test execution
- **GitHub Actions** CI/CD pipeline for automated regression testing
- **API and E2E** test examples with clean separation of concerns
- **Reporting** with Playwright HTML reporter

## Project Structure

```
playwright-ts/
├── .github/                             # GitHub configuration files
│   └── workflows/                       # GitHub Actions workflow definitions
│       └── pipeline.yml                 # CI/CD pipeline configuration
├── src/                                 # Source code
│   ├── api/                             # API testing utilities
│   │   ├── builders/
│   │   │   └── restful-book-builder.ts  # Builder pattern for API data
│   │   └── clients/
│   │       └── booking-clients.ts       # API client implementations
│   ├── data/
│   │   └── coffeeData.ts                # Test data for coffee cart tests
│   ├── helper/
│   │   ├── constants.ts                 # Constants used across tests
│   │   └── helper.ts                    # Helper functions
│   ├── pages/                           # Page Object Models
│   │   ├── baseComponent.ts             # Base component class
│   │   ├── baseElement.ts               # Base element class
│   │   ├── basePage.ts                  # Base page class
│   │   ├── coffee-cart/                 # Coffee cart application pages
│   │   │   ├── components/              # Reusable UI components
│   │   │   │   ├── checkoutComponent.ts
│   │   │   │   └── menuConfirmationModalComponent.ts
│   │   │   ├── cartPage.ts              # Cart page object
│   │   │   └── menuPage.ts              # Menu page object
│   │   └── qa-practice/                 # QA practice site pages
│   │       ├── components/              # Reusable UI components
│   │       │   └── modalWindowComponent.ts
│   │       └── popUpPage.ts             # Popup page object
│   └── support/                         # Test support utilities
│       └── fixtures.ts                  # Playwright test fixtures
├── tests/                               # Test files
│   ├── api/                             # API tests
│   │   └── restful-booker.api.spec.ts   # API tests for Restful Booker
│   └── e2e/                             # End-to-End tests
│       ├── coffee-cart.e2e.spec.ts      # E2E tests for Coffee Cart app
│       └── qa-practice.e2e.spec.ts      # E2E tests for QA Practice site
├── .env.example                         # Environment variables example
├── .eslintignore                        # ESLint ignore file
├── .gitignore                           # Git ignore file
├── .prettierrc.json                     # Prettier configuration
├── Dockerfile                           # Docker configuration
├── LICENSE                              # MIT license file
├── eslint.config.mjs                    # ESLint configuration
├── package-lock.json                    # NPM lock file
├── package.json                         # NPM package configuration
├── playwright.config.ts                 # Playwright configuration
└── tsconfig.json                        # TypeScript configuration
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Matterlinkk/playwright-ts.git
   cd playwright-ts
   ```

2. Install dependencies:

   ```bash
     npm install
   ```

3. Install Playwright browsers:
   ```bash
     npx playwright install
   ```

# Configuration

This project uses separate configurations for E2E and API tests in the playwright.config.ts file:

E2E tests: Run against Chromium browser
API tests: Run against the configured API base URL

# Environment variables:

```dotenv
API_BASE_URL: 'Base URL for API tests (default: https://restful-booker.herokuapp.com)'
API_USERNAME: 'Username for API authentication'
API_PASSWORD: 'Password for API authentication'
```

# Running Tests

## Run all tests

```bash
  npm run tests:all
```

## Run only E2E tests

```bash
  npm run tests:e2e
```

## Run only API tests

```bash
  npm run tests:api
```

# Linting and Code Quality

```bash
# Run linting checks
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run prettier
```

# Run in Docker

```bash
# Build Docker image
npm run docker:build

# or directly with Docker
docker build -t playwright-tests .

# Run tests in Docker
docker run playwright-tests npm run tests:all
```

# Test Applications

The example tests interact with the following applications:

- RESTful Booker API: A booking API service (https://restful-booker.herokuapp.com)
- Coffee Cart: A demo coffee ordering application (https://coffee-cart.app)
- QA Practice: A test practice site with various UI elements (https://www.qa-practice.com/)

# Data Building

API test data is created using the Builder pattern in restful-book-builder.ts, which provides:

Type-safe data creation
Flexible data manipulation
Validation during build process
