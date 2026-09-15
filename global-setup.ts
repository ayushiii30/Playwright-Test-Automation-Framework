import { createAllureEnvironment } from './utils/allureEnvironment';

async function globalSetup() {
    createAllureEnvironment();
}

export default globalSetup;