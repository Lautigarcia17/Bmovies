import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Home, Person, ExitToApp } from '@mui/icons-material';

function DropdownNavbar({ handleScrollToTop, handleLogout }: { handleScrollToTop: () => void, handleLogout: () => void }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        handleClose();
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHomeClick = () => {
        handleScrollToTop();
        handleClose();
    };

    const handleLogoutClick = () => {
        handleLogout();
        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    color: 'text.primary',
                }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                <MenuItem onClick={handleHomeClick}>
                    <ListItemIcon>
                        <Home fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/profile')}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DropdownNavbar
