import React from 'react';
import { Box } from "@mantine/core";

interface IconProps {
    name: string;
    type: string;
    subtypes: string[];
    currentSubtype: string;
    size?: number;
    color?: string;
    clipboard: {
        copier: (text: string) => void;
    };
}

const Icon: React.FC<IconProps> = ({ name, type, subtypes, currentSubtype, size = 18, color = "black", clipboard: { copier } }) => {
    const copyIconTag = (type: string, subtype: string, name: string) => {
        copier(`${type === "sharp" ? "fa-sharp " : ""}fa-${subtype} fa-${name}`);
    };

    return (
        <Box
            id="copy"
            onClick={() => copyIconTag(type, currentSubtype, name)}
            title={name}
        >
            <i className={`${type === "sharp" ? "fa-sharp " : ""}fa-${currentSubtype} fa-${name}`} style={{ fontSize: `${size}px`, color: color }}></i>
        </Box>
    );
};

export default Icon;
