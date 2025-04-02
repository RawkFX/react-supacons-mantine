const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

/**
 * Logger utility for consistent CLI output
 */
class Logger {
    info(message) {
        console.log(`${colors.blue}INFO:${colors.reset} ${message}`);
    }

    success(message) {
        console.log(`${colors.green}SUCCESS:${colors.reset} ${message}`);
    }

    warning(message) {
        console.log(`${colors.yellow}WARNING:${colors.reset} ${message}`);
    }

    error(message) {
        console.error(`${colors.red}ERROR:${colors.reset} ${message}`);
    }

    highlight(message) {
        console.log(`${colors.cyan}${message}${colors.reset}`);
    }

    code(message) {
        console.log(`${colors.green}${message}${colors.reset}`);
    }
}

module.exports = new Logger();
