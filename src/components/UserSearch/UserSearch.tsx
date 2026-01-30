import { TextField, InputAdornment, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, CircularProgress, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useUserSearch } from '../../hooks/useUserSearch';
import { useNavigate } from 'react-router-dom';
import styles from './UserSearch.module.css';

interface UserSearchProps {
  onUserSelect?: () => void;
}

const UserSearch = ({ onUserSelect }: UserSearchProps) => {
  const { query, setQuery, results, loading, error } = useUserSearch();
  const navigate = useNavigate();

  const handleUserClick = (username: string) => {
    // Navigate and clear first
    setQuery('');
    navigate(`/${username}`);
    // Then close dialog
    onUserSelect?.();
  };

  const showResults = query.trim().length >= 2;

  return (
    <Box className={styles.searchContainer}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Search users..."
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(25, 31, 43, 0.8)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '50px',
            border: '2px solid',
            borderColor: query.length > 0 ? 'primary.main' : 'rgba(253, 224, 211, 0.2)',
            boxShadow: query.length > 0 
              ? '0 8px 32px rgba(253, 224, 211, 0.25)'
              : '0 4px 16px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 8px 32px rgba(253, 224, 211, 0.3)',
            },
            '&.Mui-focused': {
              borderColor: 'primary.main',
              boxShadow: '0 12px 40px rgba(253, 224, 211, 0.35)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
            fontSize: '1rem',
            padding: '14px 20px',
            fontWeight: 500,
            '&::placeholder': {
              color: 'rgba(226, 234, 236, 0.5)',
              opacity: 1,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                mr: 1,
              }}>
                <Search sx={{ color: 'primary.main', fontSize: 20 }} />
              </Box>
            </InputAdornment>
          ),
        }}
      />

      {showResults && (
        <Paper
          className={styles.resultsContainer}
          sx={{
            mt: 2,
            backgroundColor: 'rgba(25, 31, 43, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(253, 224, 211, 0.1)',
          }}
        >
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress size={32} sx={{ color: 'primary.main' }} />
            </Box>
          )}

          {!loading && error && (
            <Typography sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
              {error}
            </Typography>
          )}

          {!loading && !error && results.length === 0 && (
            <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              No users found
            </Typography>
          )}

          {!loading && !error && results.length > 0 && (
            <List sx={{ p: 0 }}>
              {results.map((user) => (
                <ListItem
                  key={user.id}
                  onClick={() => handleUserClick(user.username)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid rgba(253, 224, 211, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 224, 211, 0.1)',
                      transform: 'translateX(4px)',
                    },
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={user.avatar_url}
                      sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#060d17',
                      }}
                    >
                      {!user.avatar_url && user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                        @{user.username}
                      </Typography>
                    }
                    secondary={
                      user.display_name && (
                        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                          {user.display_name}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default UserSearch;
