import { useState } from "react";
import { useRating } from "../../hooks/useRating";
import { MovieEdit } from "../../types/interface";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { Edit, Close, Save } from '@mui/icons-material';

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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'primary.main',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Edit />
        Edit Movie
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Rating"
            type="number"
            inputProps={{ min: 1, max: 10, step: 0.1 }}
            defaultValue={editData.rating ?? ''}
            onChange={(e) => setRatingFromValue(e.target.value)}
            onBlur={handleValidationRating}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Trailer URL"
            type="text"
            defaultValue={editData.trailer ?? ''}
            onChange={(e) => setTrailer(e.target.value)}
            variant="outlined"
            placeholder="https://youtube.com/..."
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          onClick={handleModalEdit}
          startIcon={<Close />}
          variant="outlined"
          color="secondary"
        >
          Close
        </Button>
        <Button
          onClick={handleSave}
          startIcon={<Save />}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
