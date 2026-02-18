import { useState } from "react";
import { useRating } from "../../hooks/useRating";
import { MovieEdit } from "../../types/interface";
import { Dialog, DialogContent, TextField, Button, Box, Typography, IconButton, Divider } from '@mui/material';
import { Close, Save, Star, VideoLibrary } from '@mui/icons-material';

function ModalEdit({ show, handleModalEdit, handleEdit, editData }: { show: boolean, handleModalEdit: () => void, handleEdit: (rating: number | null, trailer: string, isNewMovie: boolean) => void, editData: MovieEdit }) {
  const { rating, setRatingFromValue, handleValidationRating } = useRating(editData.rating);
  const [trailer, setTrailer] = useState<string>(editData.trailer ?? '');

  const handleSave = () => {
    if (rating !== editData.rating || trailer !== editData.trailer) {
      const isNewMovie = editData.rating === null;
      handleEdit(rating, trailer, isNewMovie)
    }
    handleModalEdit();
  }

  return (
    <Dialog
      open={show}
      onClose={handleModalEdit}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(6, 13, 23, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(253, 224, 211, 0.2)',
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <Box
        sx={{
          p: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: 0.5,
          }}
        >
          Edit Movie Details
        </Typography>
        <IconButton
          onClick={handleModalEdit}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'primary.main',
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(253, 224, 211, 0.1)' }} />
      
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(253, 224, 211, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star sx={{ color: 'primary.main', fontSize: 18 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                }}
              >
                Movie Rating
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="number"
              inputProps={{ min: 1, max: 10, step: 0.1 }}
              defaultValue={editData.rating ?? ''}
              onChange={(e) => setRatingFromValue(e.target.value)}
              onBlur={handleValidationRating}
              variant="outlined"
              placeholder="Enter rating (1-10)"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(253, 224, 211, 0.05)',
                  borderRadius: 2,
                  fontSize: '0.9375rem',
                  '& fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.2)',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem',
                mt: 1,
                ml: 1,
              }}
            >
              Set your personal rating from 1.0 to 10.0
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(253, 224, 211, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VideoLibrary sx={{ color: 'primary.main', fontSize: 18 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                }}
              >
                Trailer Link
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="text"
              defaultValue={editData.trailer ?? ''}
              onChange={(e) => setTrailer(e.target.value)}
              variant="outlined"
              placeholder="https://youtube.com/watch?v=..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(253, 224, 211, 0.05)',
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  '& fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.2)',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(253, 224, 211, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem',
                mt: 1,
                ml: 1,
              }}
            >
              Add a YouTube or external video link for the movie trailer
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <Divider sx={{ borderColor: 'rgba(253, 224, 211, 0.1)' }} />

      <Box
        sx={{
          p: 3,
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={handleModalEdit}
          variant="outlined"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 2,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 1,
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
          onClick={handleSave}
          startIcon={<Save sx={{ fontSize: 20 }} />}
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: '#060d17',
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            boxShadow: '0 8px 24px rgba(253, 224, 211, 0.3)',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(253, 224, 211, 0.4)',
            },
            transition: 'color 0.15s ease, background-color 0.15s ease',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Dialog>
  );
};

export default ModalEdit;
