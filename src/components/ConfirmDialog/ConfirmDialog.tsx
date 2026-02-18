import { Dialog, DialogContent, Box, Typography, Button, Divider } from '@mui/material';
import { Warning, Close, Delete } from '@mui/icons-material';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: 'rgba(6, 13, 23, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 62, 38, 0.3)',
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 62, 38, 0.2)',
                },
            }}
        >
            <Box
                sx={{
                    p: { xs: 3, sm: 3.5, md: 4 },
                    pb: { xs: 2.5, sm: 3 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.5, sm: 2 },
                }}
            >
                <Box
                    sx={{
                        width: { xs: 42, sm: 46, md: 50 },
                        height: { xs: 42, sm: 46, md: 50 },
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 62, 38, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 62, 38, 0.3)',
                    }}
                >
                    <Warning sx={{ color: 'error.main', fontSize: { xs: 20, sm: 22, md: 24 } }} />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        color: 'error.main',
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        letterSpacing: 0.5,
                        flex: 1,
                    }}
                >
                    {title}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 62, 38, 0.2)' }} />

            <DialogContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                <Typography
                    sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
                        lineHeight: 1.7,
                        textAlign: 'center',
                    }}
                >
                    {message}
                </Typography>
                <Typography
                    sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8125rem',
                        lineHeight: 1.6,
                        textAlign: 'center',
                        mt: 2,
                        fontStyle: 'italic',
                    }}
                >
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <Divider sx={{ borderColor: 'rgba(255, 62, 38, 0.2)' }} />

            <Box
                sx={{
                    p: { xs: 2.5, sm: 3 },
                    display: 'flex',
                    gap: { xs: 1.5, sm: 2 },
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    startIcon={<Close />}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderWidth: 2,
                        borderRadius: 2,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: { xs: 0.5, sm: 1 },
                        minWidth: { xs: 'auto', sm: 140 },
                        '&:hover': {
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    startIcon={<Delete sx={{ fontSize: { xs: 18, sm: 20, md: 20 } }} />}
                    variant="contained"
                    sx={{
                        backgroundColor: 'error.main',
                        color: '#ffffff',
                        borderRadius: 2,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: { xs: 0.5, sm: 1 },
                        minWidth: { xs: 'auto', sm: 140 },
                        boxShadow: '0 8px 24px rgba(255, 62, 38, 0.4)',
                        '&:hover': {
                            backgroundColor: 'error.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 32px rgba(255, 62, 38, 0.5)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Dialog>
    );
}

export default ConfirmDialog;
