# Nova--- Playwright Automation Framework

A scalable **UI test automation framework built with Playwright and
TypeScript** for the NovaAid application.

The framework is designed around maintainability, reusability, reliable
authentication, dynamic test data, structured logging, failure
diagnostics, and CI/CD execution.

## 🚀 Project Highlights

-   Playwright + TypeScript based automation
-   Page Object Model (POM)
-   Custom Playwright fixtures
-   Authentication setup with `storageState`
-   Dynamic test data generation
-   Parallel execution in CI
-   Environment-based configuration using `.env`
-   Custom structured logging
-   HTML test reports
-   Screenshot, video, and trace capture on failure
-   GitHub Actions CI/CD integration
-   Chromium browser automation
-   Functional and negative test coverage

## 🧰 Tech Stack

  Technology                Purpose
  ------------------------- ---------------------------------------
  **Playwright**            Browser automation and test execution
  **TypeScript**            Strongly typed programming language
  **Node.js**               Runtime and package management
  **Page Object Model**     Page abstraction and maintainability
  **Playwright Fixtures**   Reusable test dependencies
  **dotenv**                Environment variable management
  **Git & GitHub**          Source control
  **GitHub Actions**        CI/CD execution
  **HTML Reporter**         Test result reporting

## 📁 Project Structure

``` text
nova-aid-playwright/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── LoginPage.ts
│   ├── TagsPage.ts
│   └── ChatbotProfilePage.ts
├── tests/
│   ├── auth.setup.ts
│   ├── LoginTest.spec.ts
│   ├── TagsTest.spec.ts
│   └── ChatbotProfileTest.spec.ts
├── utils/
│   ├── logger.ts
│   └── testData.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## 🏗️ Framework Architecture

``` text
                    ┌─────────────────────────┐
                    │       Test Cases        │
                    │       *.spec.ts         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Custom Fixtures      │
                    │    test.fixture.ts      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Page Objects       │
                    │ Login / Tags / Chatbot  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
          ┌──────────────────┐      ┌──────────────────┐
          │ Test Data Utility│      │  Logger Utility  │
          └──────────────────┘      └──────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Playwright         │
                    │ Browser + Assertions    │
                    └─────────────────────────┘
```

Tests focus on business scenarios while page objects contain UI
implementation details.

## 📌 Test Coverage

### 🔐 Authentication

-   Valid user login
-   Dedicated authentication setup
-   Reuse of authenticated browser state across feature tests

### 🏷️ Tags Management

Coverage includes:

-   Open Tags page
-   Create tag
-   Search tag by name
-   Search for a non-existing tag
-   Cancel tag creation
-   Validate required tag name
-   Create tag without description
-   Duplicate tag validation
-   Edit tag
-   Cancel tag editing
-   Archive tag
-   Restore archived tag

### 🤖 Chatbot Profile Management

Coverage includes:

-   Open Create Profile flow
-   Configure profile basics
-   Select profile status
-   Select supported channels
-   Select audience
-   View/configure behavior options
-   Configure answer mode
-   Configure post-answer behavior
-   Configure "can't answer" behavior
-   View Messages options
-   Configure intro and handover messages
-   Review configured profile
-   Create chatbot profile successfully

The current suite contains **20+ automated scenarios** across
authentication, Tags, and Chatbot Profile functionality.

## 🧱 Page Object Model

### `LoginPage.ts`

Handles login navigation, credential entry, sign-in, successful
navigation validation, and login logging.

### `TagsPage.ts`

Encapsulates tag navigation, creation, search, editing,
archiving/restoring, and modal interactions.

### `ChatbotProfilePage.ts`

Encapsulates the multi-step workflow:

``` text
Basics → Behavior → Messages → Review → Create Profile
```

## 🧩 Custom Fixtures

The framework extends Playwright's test object with reusable page
objects:

``` ts
test('Create Tag', async ({ tagsPage }) => {
    await tagsPage.navigateToTagsPage();
    // test steps...
});
```

Available fixtures:

-   `loginPage`
-   `tagsPage`
-   `chatbotProfilePage`

## 🔑 Authentication & Storage State

A dedicated `auth.setup.ts` performs login and saves browser state:

``` text
auth.setup.ts
      ↓
Login with credentials
      ↓
Save storage state
      ↓
playwright/.auth/user.json
      ↓
Feature tests reuse authenticated state
```

This avoids performing a full login before every feature test.

The authentication state is excluded from Git through `.gitignore`.

## 🧪 Dynamic Test Data

Unique test data is generated with timestamps:

``` ts
export function generateUniqueTagName(): string {
    return `Automation Tag ${Date.now()}`;
}

export function generateUniqueProfileName(): string {
    return `Automation Profile ${Date.now()}`;
}
```

This reduces duplicate-data failures during repeated executions.

## 📝 Logging

`utils/logger.ts` provides:

``` text
[INFO]
[ERROR]
[WARN]
[DEBUG]
```

Logging is focused on meaningful events such as navigation, major
business actions, login success/failure, and test execution status.

Credentials and passwords are never logged.

## 📊 Reporting & Failure Diagnostics

The framework uses the Playwright HTML reporter.

Failure diagnostics:

``` text
Screenshot → only-on-failure
Video      → retain-on-failure
Trace      → retain-on-failure
```

These artifacts help investigate locator, timing, navigation, and
CI-specific failures.

## ⚙️ Configuration

`playwright.config.ts` manages:

-   Chromium execution
-   Environment-based `BASE_URL`
-   Headed execution locally
-   Headless execution in GitHub Actions
-   CI parallel workers
-   Authentication dependency
-   HTML reporting
-   Failure screenshots
-   Failure videos
-   Failure traces

## 🔐 Environment Variables

Create a local `.env` file:

``` env
BASE_URL=https://your-environment-url
LOGIN_EMAIL=your-email
LOGIN_PASSWORD=your-password
```

**Never commit `.env` or authentication state to GitHub.**

## ▶️ Installation

``` bash
git clone <repository-url>
cd nova-aid-playwright
npm install
npx playwright install
```

## ▶️ Run Tests

Complete suite:

``` bash
npx playwright test
```

Tags:

``` bash
npx playwright test tests/TagsTest.spec.ts
```

Chatbot Profile:

``` bash
npx playwright test tests/ChatbotProfileTest.spec.ts
```

Headed mode:

``` bash
npx playwright test --headed
```

Run by title:

``` bash
npx playwright test -g "create Tag"
```

## 🐞 Debugging

Debug mode:

``` bash
npx playwright test --debug
```

Open the latest HTML report:

``` bash
npx playwright show-report
```

Failed executions retain screenshots, videos, and traces for
investigation.

## 🔄 CI/CD --- GitHub Actions

Workflow:

``` text
.github/workflows/playwright.yml
```

The pipeline runs on pushes and pull requests targeting `main` or
`master`.

### Pipeline

``` text
Push / Pull Request
        ↓
Checkout Code
        ↓
Setup Node.js
        ↓
npm ci
        ↓
Install Playwright Browsers
        ↓
Run Test Suite
        ↓
Generate HTML Report
        ↓
Upload Report Artifact
```

Required GitHub repository secrets:

``` text
BASE_URL
LOGIN_EMAIL
LOGIN_PASSWORD
```

Credentials are injected through GitHub Actions secrets rather than
stored in source code.

## 🧠 Framework Design Principles

-   Keep tests readable and business-focused
-   Keep locators and UI implementation inside Page Objects
-   Reuse common functionality through fixtures
-   Avoid hard-coded data where possible
-   Generate unique data for create operations
-   Reuse authentication state
-   Capture diagnostics when useful
-   Keep logs meaningful
-   Never commit credentials or auth state
-   Keep CI execution reproducible

## 📈 Future Enhancements

-   API automation integration
-   API + UI end-to-end validation
-   Schema/contract validation
-   Enhanced test data management
-   Environment-specific configuration
-   Test tagging and selective execution
-   Dockerized test execution
-   Advanced CI/CD stages
-   Scheduled regression execution
-   Test-result notifications

## 👩‍💻 Author

**Ayushi Goyal**\
QA Automation Engineer

**Skills demonstrated:** `Playwright` · `TypeScript` · `JavaScript` ·
`POM` · `Test Automation` · `Git` · `GitHub` · `GitHub Actions` ·
`CI/CD`

## ⭐ Project Purpose

This project is continuously developed as a practical automation
framework demonstrating how a modern QA automation solution can be
structured, maintained, debugged, and executed locally and in CI/CD
environments.
