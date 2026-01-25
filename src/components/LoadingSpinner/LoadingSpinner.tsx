import { Box, CircularProgress } from "@mui/material";

function LoadingSpinner() {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
            }}
        >
            <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        </Box>
    )
}

export default LoadingSpinner;