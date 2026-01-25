import { useState } from 'react';
import { getYearsList } from "../../utilities/getYearList";
import { Button, Menu, MenuItem, Divider, ListSubheader } from '@mui/material';
import { FilterList } from '@mui/icons-material';

function DropdownFilter({ handleQuery }: { handleQuery: (query: string) => void }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const rating: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const listYears: Array<number> = getYearsList(2023);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (query: string) => {
        handleQuery(query);
        handleClose();
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
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        maxHeight: 450,
                        minWidth: 200,
                        backgroundColor: 'rgba(25, 31, 43, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        mt: 1,
                        '& .MuiList-root': {
                            py: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem 
                    onClick={() => handleMenuItemClick('all')}
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                            color: 'primary.main',
                        },
                    }}
                >
                    All Movies
                </MenuItem>
                <MenuItem 
                    onClick={() => handleMenuItemClick('seen')}
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                            color: 'primary.main',
                        },
                    }}
                >
                    Watched
                </MenuItem>
                <MenuItem 
                    onClick={() => handleMenuItemClick('not seen')}
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                            color: 'primary.main',
                        },
                    }}
                >
                    Not Watched
                </MenuItem>
                
                <Divider sx={{ my: 1, borderColor: 'rgba(253, 224, 211, 0.2)' }} />
                <ListSubheader 
                    sx={{ 
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        py: 1,
                        lineHeight: 'normal',
                    }}
                >
                    BY YEAR
                </ListSubheader>
                {listYears.map((year) => (
                    <MenuItem 
                        key={year} 
                        onClick={() => handleMenuItemClick(year.toString())}
                        sx={{
                            color: 'text.secondary',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                color: 'primary.main',
                            },
                        }}
                    >
                        {year}
                    </MenuItem>
                ))}
                
                <Divider sx={{ my: 1, borderColor: 'rgba(253, 224, 211, 0.2)' }} />
                <ListSubheader 
                    sx={{ 
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        py: 1,
                        lineHeight: 'normal',
                    }}
                >
                    BY RATING
                </ListSubheader>
                {rating.map((item, index) => (
                    <MenuItem 
                        key={index} 
                        onClick={() => handleMenuItemClick(item.toString())}
                        sx={{
                            color: 'text.secondary',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                color: 'primary.main',
                            },
                        }}
                    >
                        {item} ⭐
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default DropdownFilter
