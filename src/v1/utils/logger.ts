interface Logger {
    log: (message: string) => void;
    error: (message: string) => void;
}

const logger: Logger = {
    log: (message: string): void => console.log(`[LOG] ${new Date().toISOString()} - ${message}`),
    error: (message: string): void => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
};

module.exports = logger;