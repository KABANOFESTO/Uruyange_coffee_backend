"use strict";
const logger = {
    log: (message) => console.log(`[LOG] ${new Date().toISOString()} - ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
};
module.exports = logger;
//# sourceMappingURL=logger.js.map