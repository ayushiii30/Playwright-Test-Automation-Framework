import fs from 'fs';
import path from 'path';

export function createAllureEnvironment(): void {

    const resultsDir = path.resolve('allure-results');

    fs.mkdirSync(resultsDir, { recursive: true });

    const environment = [
        'Application=NovaAid',
        `Environment=${process.env.TEST_ENV ?? 'QA'}`,
        `Browser=${process.env.BROWSER ?? 'Chromium'}`,
        'Framework=Playwright',
        'Language=TypeScript',
        `Execution=${process.env.CI ? 'CI' : 'Local'}`
    ].join('\n');

    fs.writeFileSync(
        path.join(resultsDir, 'environment.properties'),
        `${environment}\n`,
        'utf8'
    );
}