import React from 'react';
interface Props {
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
declare const PopoverSearchIcon: React.FC<Props>;
export default PopoverSearchIcon;
