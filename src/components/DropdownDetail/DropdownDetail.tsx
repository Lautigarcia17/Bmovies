import { Box, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function DropdownDetail({ handleRemove, handleModalEdit }: { handleRemove: () => void, handleModalEdit: () => void }) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleModalEdit}
                sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    borderWidth: 2,
                    borderRadius: 2,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1.25, sm: 1.5 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: { xs: 0.5, sm: 1 },
                    '&:hover': {
                        backgroundColor: 'rgba(253, 224, 211, 0.1)',
                        borderWidth: 2,
                        borderColor: 'primary.light',
                    },
                    transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
            >
                Edit
            </Button>
            <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleRemove}
                sx={{
                    color: 'error.main',
                    borderColor: 'error.main',
                    borderWidth: 2,
                    borderRadius: 2,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1.25, sm: 1.5 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: { xs: 0.5, sm: 1 },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 62, 38, 0.1)',
                        borderWidth: 2,
                        borderColor: 'error.light',
                    },
                    transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
            >
                Remove
            </Button>
        </Box>
    )
}

export default DropdownDetail
