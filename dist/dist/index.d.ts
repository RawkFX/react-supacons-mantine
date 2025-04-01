import React from 'react';
export interface Props {
    onSelect?: (iconName: string) => void;
    config?: {
        resultsPerPage?: number;
        availableStyles?: string[];
        contentColor?: string;
        contentSize?: number;
        searchLabel?: string;
        paginationLabel?: string;
        buttonLabel?: string;
        buttonIconName?: string;
        buttonIconSize?: number;
        buttonIconColor?: string;
        buttonColor?: string;
        showBothIconAndText?: boolean;
        noIconsFoundText?: string;
    };
}
export interface IconType {
    name: string;
    type: string;
    subtypes: string[];
}
declare const PopoverSearchIcon: React.FC<Props>;
export default PopoverSearchIcon;
