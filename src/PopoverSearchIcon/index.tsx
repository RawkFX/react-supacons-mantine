import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Button, Divider, Grid, Input, Loader, Popover} from "@mantine/core";
import Clipboard from "clipboard";
import {useDebouncedValue} from "@mantine/hooks";

export interface PopoverSearchIconConfig {
    resultsPerPage?: number;
    availableStyles?: string[];
    contentColor?: string;
    contentSize?: number;
    searchLabel?: string;
    paginationLabel?: string;
    buttonNode?: React.ReactNode;
    buttonLabel?: string;
    buttonIconName?: string;
    buttonIconSize?: number;
    buttonIconColor?: string;
    buttonColor?: string;
    showBothIconAndText?: boolean;
    noIconsFoundText?: string;
}

interface PopoverSearchIconProps {
    onSelect?: (iconName: string) => void;
    config?: PopoverSearchIconConfig;
}

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

interface IconType {
    name: string;
    type: string;
    subtypes: string[];
}

const DEFAULT_ICON_SUBTYPES = ["solid", "regular", "light", "thin", "duotone"];
const DEFAULT_ICONS_PER_PAGE = 48;

// Move this outside component to avoid recreation on each render
const copier = (icon: string) => {
    new Clipboard("#copy", {
        text: () => icon,
    });
};

// Cache promise to avoid duplicate requests
let iconsPromise: Promise<{ generic: IconType[]; brands: IconType[] }> | null = null;

const getIcons = async (): Promise<{ generic: IconType[]; brands: IconType[] }> => {
    if (!iconsPromise) {
        iconsPromise = Promise.all([
            import("./dist/icons/generic_icons.json"),
            import("./dist/icons/brand_icons.json")
        ]).then(([genericModule, brandModule]) => {
            const generic_icons = genericModule.default;
            const brand_icons = brandModule.default;

            const convertToArray = (icons: { [key: string]: string }, type: string): IconType[] => {
                return Object.keys(icons).map((name) => ({
                    name, type, subtypes: [],
                }));
            };

            return {
                generic: convertToArray(generic_icons, "generic"),
                brands: convertToArray(brand_icons, "brands"),
            };
        });
    }
    return iconsPromise;
};

const Icon: React.FC<IconProps> = ({
                                       name,
                                       type,
                                       subtypes,
                                       currentSubtype,
                                       size = 18,
                                       color = "black",
                                       clipboard: {copier}
                                   }) => {
    const copyIconTag = (type: string, subtype: string, name: string) => {
        copier(`${type === "sharp" ? "fa-sharp " : ""}fa-${subtype} fa-${name}`);
    };

    return (
        <Box
            id="copy"
            onClick={() => copyIconTag(type, currentSubtype, name)}
            title={name}
        >
            <i className={`${type === "sharp" ? "fa-sharp " : ""}fa-${currentSubtype} fa-${name}`}
               style={{fontSize: `${size}px`, color: color}}></i>
        </Box>
    );
};

const PopoverSearchIcon: React.FC<PopoverSearchIconProps> = ({onSelect, config}) => {
    const [allIcons, setAllIcons] = useState<IconType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [iconClicked, setIconClicked] = useState<string | null>(null);

    const iconSubtypes = config?.availableStyles || DEFAULT_ICON_SUBTYPES;
    const defaultSubtype = iconSubtypes[0] || DEFAULT_ICON_SUBTYPES[0];
    const [selectedSubtype, setSelectedSubtype] = useState<string>(defaultSubtype);
    const iconsPerPage = config?.resultsPerPage || DEFAULT_ICONS_PER_PAGE;

    // Memoize filtered icons
    const filteredIcons = useMemo(() => {
        const searchTerm = debouncedSearch.toLowerCase().replace(/[-_\s]/g, "");
        return allIcons.filter(({name}) => name.toLowerCase().includes(searchTerm));
    }, [debouncedSearch, allIcons]);

    // Memoize grouped icons by subtype
    const groupedIcons = useMemo(() => {
        return filteredIcons.reduce((acc, icon) => {
            icon.subtypes.forEach(subtype => {
                if (!acc[subtype]) {
                    acc[subtype] = [];
                }
                acc[subtype].push(icon);
            });
            return acc;
        }, {} as { [key: string]: IconType[] });
    }, [filteredIcons]);

    // Memoize current page icons
    const currentPageIcons = useMemo(() => {
        const start = (currentPage - 1) * iconsPerPage;
        const end = currentPage * iconsPerPage;
        return groupedIcons[selectedSubtype]?.slice(start, end) || [];
    }, [groupedIcons, selectedSubtype, currentPage, iconsPerPage]);

    // Use useCallback for handlers
    const handleIconClick = useCallback((icon: IconType) => {
        const className = `${icon.type === "sharp" ? "fa-sharp " : ""}fa-${selectedSubtype} fa-${icon.name}`;
        setIconClicked(icon.name);
        setTimeout(() => {
            setIconClicked(null);
            onSelect?.(className); // Return the full className
            setPopoverOpened(false);
        }, 300); // Adjust the timeout duration as needed
    }, [onSelect, selectedSubtype]);

    const paginate = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber);
    }, []);

    const handleSubtypeChange = useCallback((subtype: string) => {
        setCurrentPage(1);
        setSelectedSubtype(subtype);
    }, []);

    const handlePopoverOpen = useCallback(() => {
        setSearch("");
        setSelectedSubtype(defaultSubtype);
        setTimeout(() => {
            setPopoverOpened(true);
        }, 300);
    }, [defaultSubtype]);

    const handlePopoverClose = useCallback(() => {
        setPopoverOpened(false);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
        setCurrentPage(1);
    }, []);

    // Load icons when popover opens
    useEffect(() => {
        if (!popoverOpened) return;

        setLoading(true);

        const fetchIcons = async () => {
            try {
                const icons = await getIcons();
                const flattenIcons: IconType[] = [
                    ...icons.generic.map(icon => ({
                        ...icon, type: "classic", subtypes: DEFAULT_ICON_SUBTYPES
                    })),
                    ...icons.brands.map(icon => ({
                        ...icon, type: "brands", subtypes: ["brands"]
                    }))
                ];
                setAllIcons(flattenIcons);
            } catch (error) {
                console.error("Failed to load icons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIcons();
    }, [popoverOpened]);

    // Update selected subtype when search changes
    useEffect(() => {
        if (filteredIcons.length < 1) return;

        const availableSubtypes = Object.keys(groupedIcons);
        if (availableSubtypes.length > 0 && !availableSubtypes.includes(selectedSubtype)) {
            setSelectedSubtype(availableSubtypes[0]);
        }
    }, [debouncedSearch, groupedIcons, selectedSubtype, filteredIcons.length]);

    // Memoize the button content
    const buttonContent = useMemo(() => {
        if (config?.buttonNode) {
            return config?.buttonNode;
        } else if (config?.showBothIconAndText && config?.buttonIconName && !config?.buttonNode) {
            return (
                <>
                    <Icon
                        name={config.buttonIconName}
                        size={config.buttonIconSize}
                        color={config.buttonIconColor}
                        type="solid"
                        subtypes={[]}
                        currentSubtype="solid"
                        clipboard={{copier}}
                    />
                    <span style={{marginLeft: "10px"}}>{config?.buttonLabel || "Select Icon"}</span>
                </>
            );
        } else if (!config?.showBothIconAndText && config?.buttonIconName) {
            return (
                <Icon
                    name={config.buttonIconName}
                    size={config.buttonIconSize}
                    color={config.buttonIconColor}
                    type="solid"
                    subtypes={[]}
                    currentSubtype="solid"
                    clipboard={{copier}}
                />
            );
        }
        return config?.buttonLabel || "Select Icon";
    }, [config]);

    // Fixed icons for navigation and subtype indicators
    const subtypeIndicatorIcons = useMemo(() => {
        const indicators: Record<string, string> = {
            brands: "chrome",
            default: "apartment"
        };

        const availableSubtypes = config?.availableStyles || Object.keys(groupedIcons);

        return availableSubtypes.map(subtype => ({
            subtype,
            iconName: subtype === "brands" ? indicators.brands : indicators.default
        }));
    }, [groupedIcons, config?.availableStyles]);

    return (
        <Popover
            shadow="md"
            width={500}
            defaultOpened={false}
            opened={popoverOpened}
            onOpen={handlePopoverOpen}
            onClose={handlePopoverClose}
            position="bottom-start"
            withinPortal={true}
        >
            <Popover.Target>
                {config?.buttonNode ? (
                    <Box onClick={() => setPopoverOpened((o) => !o)}>{buttonContent}</Box>
                ) : (
                    <Button style={{backgroundColor: config?.buttonColor}} onClick={() => setPopoverOpened((o) => !o)}>{buttonContent}</Button>
                )}
            </Popover.Target>

            <Popover.Dropdown>
                <Input
                    placeholder={config?.searchLabel || "Search icons"}
                    value={search}
                    onChange={handleSearchChange}
                />
                <Box style={{position: "relative", width: "100%", minHeight: "20vh"}}>
                    {loading && (
                        <Box
                            style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <Loader/>
                        </Box>
                    )}

                    {!loading && Object.keys(groupedIcons).length > 0 && groupedIcons[selectedSubtype]?.length > 0 && (
                        <>
                            <h3>{selectedSubtype.charAt(0).toUpperCase() + selectedSubtype.slice(1)}</h3>
                            <Grid>
                                {currentPageIcons.map((icon, i) => (
                                    <Grid.Col span={1} key={i}>
                                        <Box
                                            onClick={() => handleIconClick(icon)}
                                            style={{
                                                cursor: "pointer",
                                                textAlign: "center",
                                                transition: "transform 0.2s",
                                                transform: iconClicked === icon.name ? "scale(0.9)" : "scale(1)"
                                            }}
                                        >
                                            <Icon
                                                name={icon.name}
                                                type={icon.type}
                                                size={config?.contentSize}
                                                color={config?.contentColor}
                                                subtypes={icon.subtypes}
                                                currentSubtype={selectedSubtype}
                                                clipboard={{copier}}
                                            />
                                        </Box>
                                    </Grid.Col>
                                ))}
                            </Grid>
                        </>
                    )}

                    {!loading && (filteredIcons.length === 0 || allIcons.length === 0) && (
                        <Box
                            style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <h3>{config?.noIconsFoundText || "No icons found"}</h3>
                        </Box>
                    )}

                    {!loading && Object.keys(groupedIcons).length > 0 && (
                        <Grid justify="center" style={{paddingTop: "5%"}}>
                            <Divider style={{width: "100%"}}/>
                            {subtypeIndicatorIcons.map(({subtype, iconName}) => (
                                <Grid.Col span={1} key={subtype}>
                                    <Box
                                        style={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            backgroundColor: subtype === selectedSubtype ? "lightgray" : "transparent"
                                        }}
                                        onClick={() => handleSubtypeChange(subtype)}
                                    >
                                        {allIcons
                                            .filter(icon => icon.name === iconName && icon.subtypes.includes(subtype))
                                            .map((icon, i) => (
                                                <Icon
                                                    key={i}
                                                    name={icon.name}
                                                    type={icon.type}
                                                    size={config?.contentSize}
                                                    color={config?.contentColor}
                                                    subtypes={icon.subtypes}
                                                    currentSubtype={subtype}
                                                    clipboard={{copier}}
                                                />
                                            ))}
                                    </Box>
                                </Grid.Col>
                            ))}
                            <Divider style={{width: "100%"}}/>
                        </Grid>
                    )}

                    {!loading && filteredIcons.length > iconsPerPage && (
                        <div style={{display: "flex", justifyContent: "space-around", paddingTop: "5%"}}>
                            <Button
                                style={{backgroundColor: config?.buttonColor}}
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                {allIcons
                                    .filter(icon => icon.name === "arrow-left-to-arc")
                                    .map((icon, i) => (
                                        <Icon
                                            key={i}
                                            name={icon.name}
                                            type={icon.type}
                                            size={config?.contentSize}
                                            color={config?.buttonIconColor}
                                            subtypes={icon.subtypes}
                                            currentSubtype="solid"
                                            clipboard={{copier}}
                                        />
                                    ))}
                            </Button>
                            <span>
                                {config?.paginationLabel?.replace("%d", currentPage.toString()).replace("%s", Math.ceil(filteredIcons.length / iconsPerPage).toString()) || `Page ${currentPage} of ${Math.ceil(filteredIcons.length / iconsPerPage)}`}
                            </span>
                            <Button
                                style={{backgroundColor: config?.buttonColor}}
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage * iconsPerPage >= filteredIcons.length}
                            >
                                {allIcons
                                    .filter(icon => icon.name === "arrow-right-to-arc")
                                    .map((icon, i) => (
                                        <Icon
                                            key={i}
                                            name={icon.name}
                                            type={icon.type}
                                            size={config?.contentSize}
                                            color={config?.buttonIconColor}
                                            subtypes={icon.subtypes}
                                            currentSubtype="solid"
                                            clipboard={{copier}}
                                        />
                                    ))}
                            </Button>
                        </div>
                    )}
                </Box>
            </Popover.Dropdown>
        </Popover>
    );
};

export default PopoverSearchIcon;
