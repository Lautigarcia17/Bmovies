import { useState } from 'react';
import { getYearsList } from "../../utilities/getYearList";
import { Button, Popover, Box, Typography, Chip, Tabs, Tab, Grid } from '@mui/material';
import { FilterList, CheckCircle, Cancel, Star, CalendarMonth } from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function DropdownFilter({ handleQuery }: { handleQuery: (query: string) => void }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [tabValue, setTabValue] = useState(0);
    const open = Boolean(anchorEl);

    const rating: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const listYears: Array<number> = getYearsList(2023);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTabValue(0);
    };

    const handleFilterClick = (query: string) => {
        handleQuery(query);
        handleClose();
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<FilterList />}
                onClick={handleClick}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'background.default',
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    px: { xs: 2, md: 3 },
                    py: { xs: 1, md: 1.25 },
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 16px rgba(253, 224, 211, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(253, 224, 211, 0.45)',
                    },
                }}
            >
                Filter
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(15, 25, 40, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                        mt: 1,
                        minWidth: { xs: 320, sm: 450, md: 550 },
                        maxWidth: 600,
                    },
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            borderBottom: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                            '& .MuiTab-root': {
                                color: 'text.secondary',
                                fontWeight: 600,
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                minHeight: { xs: 48, md: 56 },
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'primary.main',
                                height: 3,
                            },
                        }}
                    >
                        <Tab label="Status" icon={<CheckCircle sx={{ fontSize: 18 }} />} iconPosition="start" />
                        <Tab label="Year" icon={<CalendarMonth sx={{ fontSize: 18 }} />} iconPosition="start" />
                        <Tab label="Rating" icon={<Star sx={{ fontSize: 18 }} />} iconPosition="start" />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography sx={{ 
                                color: 'primary.main', 
                                fontWeight: 700, 
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 1,
                            }}>
                                Filter by Status
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Chip
                                    label="All Movies"
                                    onClick={() => handleFilterClick('all')}
                                    sx={{
                                        backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                        color: 'text.primary',
                                        border: '2px solid rgba(253, 224, 211, 0.3)',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        py: 2.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(253, 224, 211, 0.2)',
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            transform: 'translateX(8px)',
                                        },
                                    }}
                                />
                                <Chip
                                    label="Watched"
                                    icon={<CheckCircle sx={{ color: '#26ff3e !important' }} />}
                                    onClick={() => handleFilterClick('seen')}
                                    sx={{
                                        backgroundColor: 'rgba(38, 255, 62, 0.1)',
                                        color: 'text.primary',
                                        border: '2px solid rgba(38, 255, 62, 0.3)',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        py: 2.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(38, 255, 62, 0.2)',
                                            borderColor: '#26ff3e',
                                            color: '#26ff3e',
                                            transform: 'translateX(8px)',
                                        },
                                    }}
                                />
                                <Chip
                                    label="Not Watched"
                                    icon={<Cancel sx={{ color: '#ff3e26 !important' }} />}
                                    onClick={() => handleFilterClick('not seen')}
                                    sx={{
                                        backgroundColor: 'rgba(255, 62, 38, 0.1)',
                                        color: 'text.primary',
                                        border: '2px solid rgba(255, 62, 38, 0.3)',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        py: 2.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 62, 38, 0.2)',
                                            borderColor: '#ff3e26',
                                            color: '#ff3e26',
                                            transform: 'translateX(8px)',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box>
                            <Typography sx={{ 
                                color: 'primary.main', 
                                fontWeight: 700, 
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 2,
                            }}>
                                Filter by Year
                            </Typography>
                            <Grid container spacing={1.5}>
                                {listYears.map((year) => (
                                    <Grid item xs={4} sm={3} key={year}>
                                        <Chip
                                            label={year}
                                            onClick={() => handleFilterClick(year.toString())}
                                            sx={{
                                                width: '100%',
                                                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                                color: 'text.primary',
                                                border: '2px solid rgba(253, 224, 211, 0.2)',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.875rem', md: '0.95rem' },
                                                py: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                    borderColor: 'primary.main',
                                                    color: 'background.default',
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Box>
                            <Typography sx={{ 
                                color: 'primary.main', 
                                fontWeight: 700, 
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 2,
                            }}>
                                Filter by Rating
                            </Typography>
                            <Grid container spacing={1.5}>
                                {rating.map((item) => (
                                    <Grid item xs={4} sm={2.4} key={item}>
                                        <Chip
                                            label={`${item} ⭐`}
                                            onClick={() => handleFilterClick(item.toString())}
                                            sx={{
                                                width: '100%',
                                                backgroundColor: item >= 7 
                                                    ? 'rgba(38, 255, 62, 0.1)' 
                                                    : item >= 5 
                                                    ? 'rgba(255, 194, 38, 0.1)' 
                                                    : 'rgba(255, 62, 38, 0.1)',
                                                color: 'text.primary',
                                                border: '2px solid',
                                                borderColor: item >= 7 
                                                    ? 'rgba(38, 255, 62, 0.3)' 
                                                    : item >= 5 
                                                    ? 'rgba(255, 194, 38, 0.3)' 
                                                    : 'rgba(255, 62, 38, 0.3)',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.875rem', md: '0.95rem' },
                                                py: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: item >= 7 
                                                        ? '#26ff3e' 
                                                        : item >= 5 
                                                        ? '#ffc226' 
                                                        : '#ff3e26',
                                                    borderColor: item >= 7 
                                                        ? '#26ff3e' 
                                                        : item >= 5 
                                                        ? '#ffc226' 
                                                        : '#ff3e26',
                                                    color: '#000',
                                                    transform: 'scale(1.08)',
                                                    fontWeight: 800,
                                                },
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                </Box>
            </Popover>
        </>
    );
}

export default DropdownFilter
