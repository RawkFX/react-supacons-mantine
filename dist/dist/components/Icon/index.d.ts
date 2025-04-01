import React from 'react';
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
declare const Icon: React.FC<IconProps>;
export default Icon;
