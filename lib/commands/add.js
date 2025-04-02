const path = require('path');
const fs = require('fs'); // Add this line
const logger = require('../utils/logger');
const fsUtils = require('../utils/fs-utils');
const components = require('../registry/components');
const {execSync} = require('child_process');

/**
 * Get the source directory for a component within the package
 * @param {string} componentName - Name of the component
 * @returns {string} - Path to the component source directory
 */
function getComponentSourceDir(componentName) {
    // Get the path to the package's src directory
    const packageDir = path.dirname(path.dirname(path.dirname(__filename)));
    console.log(packageDir);
    return path.join(packageDir, 'src', components[componentName].sourcePath);
}

/**
 * Add import statement to main index.tsx file
 * @param {string} targetDir - Target project directory
 * @param {string} componentName - Name of the component
 * @param {string} componentPath - Path to the component relative to src
 * @returns {boolean} - True if import was added successfully
 */
function addImportToMainIndex(targetDir, componentName, componentPath) {
    const indexPath = path.join(targetDir, 'src', 'index.tsx');

    if (!fs.existsSync(indexPath)) {
        logger.warning('Main index.tsx not found. Skipping import.');
        return false;
    }

    const importStatement = `import "${componentPath}/${componentName}/ImportStyles";\n`;

    return fsUtils.updateFilePrepend(indexPath, importStatement, (content) => content.includes(`import "${componentPath}/${componentName}/ImportStyles"`));
}

/**
 * Check for and install missing dependencies
 * @param {object} dependencies - Object with dependencies and their versions
 */
function checkAndInstallDependencies(dependencies) {
    const missingDependencies = [];

    for (const [dep, version] of Object.entries(dependencies)) {
        try {
            require.resolve(dep);
        } catch (error) {
            missingDependencies.push(`${dep}@${version}`);
        }
    }

    if (missingDependencies.length > 0) {
        logger.info('Installing missing dependencies...');
        execSync(`npm install ${missingDependencies.join(' ')}`, {stdio: 'inherit'});
        logger.success('Dependencies installed successfully.');
    } else {
        logger.success('All dependencies are already installed.');
    }
}

/**
 * Add a component to the project
 * @param {string} componentName - Name of the component to add
 * @param {object} options - Command options
 */
function addComponent(componentName, options) {
    logger.info(`Adding ${componentName} component to your project...`);

    // Check if component exists in registry
    if (!components[componentName]) {
        logger.error(`Component "${componentName}" not found in registry.`);
        logger.info('Available components:');
        Object.keys(components).forEach(name => {
            logger.info(`  - ${name}: ${components[name].description}`);
        });
        return;
    }

    // Get paths
    const targetDir = process.cwd();
    const componentPath = options.path || 'src/components';
    const relativeComponentPath = componentPath.replace(/^src\//, '');

    const sourceDir = getComponentSourceDir(componentName);
    const targetComponentsDir = path.join(targetDir, componentPath);
    const targetComponentDir = path.join(targetComponentsDir, componentName);

    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
        logger.error(`Source component not found at: ${sourceDir}`);
        return;
    }

    // Create target directories
    fsUtils.ensureDirectoryExists(targetComponentsDir);

    // Copy component files
    logger.info(`Copying ${componentName} files...`);
    fsUtils.copyFilesRecursively(sourceDir, targetComponentDir);

    // Add import to main index.tsx if option is not disabled
    if (options.import !== false) {
        addImportToMainIndex(targetDir, componentName, relativeComponentPath);
    }

    // Check and install dependencies
    const {dependencies} = components[componentName];
    if (dependencies && Object.keys(dependencies).length > 0) {
        checkAndInstallDependencies(dependencies);
    }

    // Show usage information
    logger.success(`${componentName} component has been successfully installed!`);
    logger.info('You can now use it in your components:');
    logger.code(`
${components[componentName].recommendedImport}

function MyComponent() {
  return (
    ${components[componentName].exampleUsage}
  );
}
`);
}

module.exports = {addComponent};

