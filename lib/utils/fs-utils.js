const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * File system utilities for working with components
 */
class FsUtils {
    /**
     * Ensures that a directory exists, creating it if necessary
     * @param {string} dirPath - Path to the directory
     * @returns {boolean} - True if directory exists or was created
     */
    ensureDirectoryExists(dirPath) {
        if (fs.existsSync(dirPath)) {
            return true;
        }

        try {
            fs.mkdirSync(dirPath, {recursive: true});
            logger.success(`Created directory: ${dirPath}`);
            return true;
        } catch (error) {
            logger.error(`Failed to create directory: ${dirPath}`);
            logger.error(error.message);
            return false;
        }
    }

    /**
     * Copy a file from source to destination
     * @param {string} sourcePath - Source file path
     * @param {string} destPath - Destination file path
     * @returns {boolean} - True if copy was successful
     */
    copyFile(sourcePath, destPath) {
        try {
            fs.copyFileSync(sourcePath, destPath);
            logger.success(`Copied: ${path.basename(destPath)}`);
            return true;
        } catch (error) {
            logger.error(`Failed to copy file: ${sourcePath} -> ${destPath}`);
            logger.error(error.message);
            return false;
        }
    }

    /**
     * Write content to a file
     * @param {string} filePath - Path to the file
     * @param {string} content - Content to write
     * @returns {boolean} - True if write was successful
     */
    writeFile(filePath, content) {
        try {
            fs.writeFileSync(filePath, content);
            logger.success(`Created: ${path.basename(filePath)}`);
            return true;
        } catch (error) {
            logger.error(`Failed to write file: ${filePath}`);
            logger.error(error.message);
            return false;
        }
    }

    /**
     * Recursively copy files from source directory to destination directory
     * @param {string} sourceDir - Source directory path
     * @param {string} destDir - Destination directory path
     * @returns {boolean} - True if all files were copied successfully
     */
    copyFilesRecursively(sourceDir, destDir) {
        if (!this.ensureDirectoryExists(destDir)) {
            return false;
        }

        try {
            const entries = fs.readdirSync(sourceDir, {withFileTypes: true});

            for (const entry of entries) {
                const sourcePath = path.join(sourceDir, entry.name);
                const destPath = path.join(destDir, entry.name);

                if (entry.isDirectory()) {
                    this.copyFilesRecursively(sourcePath, destPath);
                } else {
                    this.copyFile(sourcePath, destPath);
                }
            }

            return true;
        } catch (error) {
            logger.error(`Failed to copy directory contents: ${sourceDir} -> ${destDir}`);
            logger.error(error.message);
            return false;
        }
    }

    /**
     * Updates a file by prepending content
     * @param {string} filePath - Path to the file
     * @param {string} contentToPrepend - Content to prepend
     * @param {function} checkFn - Function to check if update is needed
     * @returns {boolean} - True if update was successful
     */
    updateFilePrepend(filePath, contentToPrepend, checkFn) {
        if (!fs.existsSync(filePath)) {
            logger.warning(`File not found: ${filePath}`);
            return false;
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8');

            if (checkFn && checkFn(content)) {
                logger.warning('File already contains the content to be added. Skipping update.');
                return false;
            }

            fs.writeFileSync(filePath, `${contentToPrepend}${content}`);
            logger.success(`Updated: ${path.basename(filePath)}`);
            return true;
        } catch (error) {
            logger.error(`Failed to update file: ${filePath}`);
            logger.error(error.message);
            return false;
        }
    }

    /**
     * Find a file that matches one of the possible names
     * @param {string} dir - Directory to search in
     * @param {string[]} possibleNames - Array of possible file names
     * @returns {string|null} - Name of the first matching file or null
     */
    findFileByPossibleNames(dir, possibleNames) {
        for (const name of possibleNames) {
            const filePath = path.join(dir, name);
            if (fs.existsSync(filePath)) {
                return name;
            }
        }
        return null;
    }
}

module.exports = new FsUtils();