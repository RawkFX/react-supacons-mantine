/**
 * Registry of available components
 */
const components = {
    PopoverSearchIcon: {
        description: 'A search icon component that opens a popover with a search input',
        sourcePath: 'PopoverSearchIcon',
        dependencies: {
            "@mantine/core": "^6.0.21",
            "@mantine/hooks": "^6.0.21",
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "clipboard": "^2.0.11"
        },
        recommendedImport: "import { PopoverSearchIcon } from './components/PopoverSearchIcon';",
        exampleUsage: `<PopoverSearchIcon 
  onSearch={(value) => console.log('Searching for:', value)} 
/>`
    }, // Add more components here as needed
};

module.exports = components;