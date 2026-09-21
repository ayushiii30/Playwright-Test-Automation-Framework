import fs from 'fs';
import path from 'path';

export class Logger {

    private static logDirectory = path.join(
        process.cwd(),
        'logs'
    );

    private static logFile = path.join(
        Logger.logDirectory,
        'test.log'
    );

    private static initialized = false;

    private static initialize() {

        if (Logger.initialized) {
            return;
        }

        if (!fs.existsSync(Logger.logDirectory)) {
            fs.mkdirSync(Logger.logDirectory, {
                recursive: true
            });
        }

        // Start every test run with a fresh log file
        fs.writeFileSync(
            Logger.logFile,
            '',
            'utf-8'
        );

        Logger.initialized = true;
    }

    private static writeLog(
        level: string,
        message: string
    ) {

        Logger.initialize();

        const timestamp = new Date().toISOString();

        const logMessage =
            `[${timestamp}] [${level}] ${message}\n`;

        fs.appendFileSync(
            Logger.logFile,
            logMessage,
            'utf-8'
        );
    }

    static info(message: string) {
        Logger.writeLog('INFO', message);
    }

    static error(message: string) {
        Logger.writeLog('ERROR', message);
    }

    static warn(message: string) {
        Logger.writeLog('WARN', message);
    }

    static debug(message: string) {
        Logger.writeLog('DEBUG', message);
    }
}