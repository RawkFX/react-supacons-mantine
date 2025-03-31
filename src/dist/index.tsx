import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Divider, Grid, Input, Loader, Popover} from "@mantine/core";
import Icon from "./components/Icon";
import Clipboard from "clipboard";
import {useDebouncedValue} from "@mantine/hooks";

interface Props {
    onClick?: (data: any) => void;
}

interface IconType {
    name: string;
    type: string;
    subtypes: string[];
}

const iconSubtypes: string[] = ["solid", "regular", "light", "thin", "duotone"];

const copier = (icon: string) => {
    new Clipboard("#copy", {
        text: () => icon,
    });
};

const getIcons = async (): Promise<{ generic: IconType[]; brands: IconType[] }> => {
    const generic_icons = (await import("./icons/generic_icons.json")).default;
    const brand_icons = (await import("./icons/brand_icons.json")).default;

    const convertToArray = (icons: { [key: string]: string }, type: string): IconType[] => {
        return Object.keys(icons).map((name) => ({
            name, type, subtypes: [], // Add appropriate subtypes if needed
        }));
    };

    return {
        generic: convertToArray(generic_icons, "generic"), brands: convertToArray(brand_icons, "brands"),
    };
};

const Index: React.FC<Props> = ({onClick}) => {
    const [allIcons, setAllIcons] = useState<IconType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedSubtype, setSelectedSubtype] = useState<string>(iconSubtypes[0]);
    const iconsPerPage = 48;

    const filteredIcons = useMemo(() => {
        const searchTerm = debouncedSearch.toLowerCase().replace(/[-_\s]/g, "");
        return allIcons.filter(({name}) => name.toLowerCase().includes(searchTerm));
    }, [debouncedSearch, allIcons]);

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

    const handleIconClick = (iconName: string) => {
        if (onClick) {
            onClick(iconName);
        }
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchIcons = async () => {
            const icons = await getIcons();
            const flattenIcons: IconType[] = [
                ...icons.generic.map(icon => ({
                    ...icon, type: "classic", subtypes: iconSubtypes
                })),
                ...icons.brands.map(icon => ({
                    ...icon, type: "brands", subtypes: ["brands"]
                }))
            ];
            setAllIcons(flattenIcons);
        };

        if (popoverOpened) fetchIcons();
    }, [popoverOpened]);

    useEffect(() => {
        if (filteredIcons.length < 1) return;

        const firstSubtype = filteredIcons[0].subtypes[0];
        if (firstSubtype && firstSubtype !== selectedSubtype) setSelectedSubtype(firstSubtype);
    }, [debouncedSearch, allIcons]);

    return (
        <Popover shadow="md" width={500} onOpen={() => {
            if (search !== "") setSearch("");
            if (selectedSubtype !== iconSubtypes[0]) setSelectedSubtype(iconSubtypes[0]);
            setTimeout(() => {
                setPopoverOpened(true)
            }, 300);
        }} onClose={() => setPopoverOpened(false)}>
            <Popover.Target>
                <Button>Select Icon</Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Input
                    placeholder="Search icons"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value);
                        setCurrentPage(1);
                    }}
                />
                <Box style={{position: "relative", width: "100%", minHeight: "20vh"}}>
                    {!popoverOpened && (
                        <Box
                            style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <Loader/>
                        </Box>
                    )}

                    {Object.keys(groupedIcons).map((subtype, index) => (
                        <div key={index}>
                            {subtype === selectedSubtype && groupedIcons[subtype].slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage).length > 0 && (
                                <>
                                    <h3>{subtype.charAt(0).toUpperCase() + subtype.slice(1)}</h3>
                                    <Grid>
                                        {groupedIcons[subtype].slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage).map((icon, i) => (
                                            <Grid.Col span={1} key={i}>
                                                <div
                                                    key={i}
                                                    onClick={() => handleIconClick(icon.name)}
                                                    style={{cursor: "pointer", textAlign: "center"}}
                                                >
                                                    <Icon
                                                        name={icon.name}
                                                        type={icon.type}
                                                        subtypes={icon.subtypes}
                                                        currentSubtype={subtype}
                                                        clipboard={{copier}}
                                                    />
                                                </div>
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </div>
                    ))}

                    {(filteredIcons.length === 0 || allIcons.length === 0) && (
                        <Box
                            style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            <h3>No icons found</h3>
                        </Box>
                    )}


                    {Object.keys(groupedIcons).length > 0 && (
                        <Grid justify="center" style={{paddingTop: "5%"}}>
                            <Divider style={{width: "100%"}}/>
                            {Object.keys(groupedIcons).map((subtype, index) => (
                                <Grid.Col span={1} key={index}>
                                    <Box
                                        style={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            backgroundColor: subtype === selectedSubtype ? "lightgray" : "transparent"
                                        }}
                                        onClick={() => {
                                            setCurrentPage(1);
                                            setSelectedSubtype(subtype);
                                        }}
                                    >
                                        {subtype === "brands" ?
                                            allIcons.filter(icon => icon.name === "chrome" && icon.subtypes.includes(subtype))
                                                .map((icon, i) => (
                                                    <Icon
                                                        key={i}
                                                        name={icon.name}
                                                        type={icon.type}
                                                        subtypes={icon.subtypes}
                                                        currentSubtype={subtype}
                                                        clipboard={{copier}}
                                                    />
                                                ))
                                            :
                                            allIcons
                                                .filter(icon => icon.name === "apartment" && icon.subtypes.includes(subtype))
                                                .map((icon, i) => (
                                                    <Icon
                                                        key={i}
                                                        name={icon.name}
                                                        type={icon.type}
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

                    {filteredIcons.length > iconsPerPage && (
                        <div style={{display: "flex", justifyContent: "space-around", paddingTop: "5%"}}>
                            <Button
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
                                            subtypes={icon.subtypes}
                                            currentSubtype="solid"
                                            clipboard={{copier}}
                                        />
                                    ))}
                            </Button>
                            <span>
                                Page {currentPage} of {Math.ceil(filteredIcons.length / iconsPerPage)}
                            </span>
                            <Button
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

export default Index;
