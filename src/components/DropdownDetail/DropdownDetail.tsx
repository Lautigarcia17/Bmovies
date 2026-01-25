import { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert, Delete, Edit } from '@mui/icons-material';

function DropdownDetail({ handleRemove, handleModalEdit }: { handleRemove: () => void, handleModalEdit: () => void }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveClick = () => {
        handleRemove();
        handleClose();
    };

    const handleEditClick = () => {
        handleModalEdit();
        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    color: 'text.primary',
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
            >
                <MoreVert />
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
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                <MenuItem onClick={handleEditClick}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Movie</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleRemoveClick}>
                    <ListItemIcon>
                        <Delete fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'error.main' }}>Remove Movie</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default DropdownDetail
