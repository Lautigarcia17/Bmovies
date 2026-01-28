import { useEffect, useState, memo } from 'react';
import { useGenericContext } from '../../hooks/useGenericContext';
import { scrollContext } from '../../context/ScrollContext';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchMovie = memo(({ search, setSearch }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollRef } = useGenericContext(scrollContext)

    useEffect(() => {
        const scrollElement = scrollRef.current;

        if (!scrollElement) return;

        const handleScroll = () => {
            const widthLimit = window.innerWidth < 600 ? 200 : 400;
            if (scrollElement.scrollTop > widthLimit) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        scrollElement.addEventListener('scroll', handleScroll);

        return () => {
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, [scrollRef]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                mb: 3,
            }}
        >
            <Box
                sx={{
                    width: { xs: '95%', sm: '85%', md: '600px', lg: '700px' },
                    maxWidth: { xs: '100%', sm: '500px', md: '600px', lg: '700px' },
                    position: isScrolled ? 'fixed' : 'relative',
                    top: isScrolled ? { xs: '88px', sm: '116px', md: '116px' } : 'auto',
                    zIndex: 1000,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Search your favorite movie..."
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: isScrolled 
                                ? 'rgba(6, 13, 23, 0.95)' 
                                : 'rgba(25, 31, 43, 0.8)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            borderRadius: { xs: '40px', sm: '50px' },
                            border: '2px solid',
                            borderColor: search.length > 0 ? 'primary.main' : 'rgba(253, 224, 211, 0.2)',
                            boxShadow: search.length > 0 
                                ? '0 8px 32px rgba(253, 224, 211, 0.25)'
                                : '0 4px 16px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            py: { xs: 0.5, sm: 1 },
                            '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: '0 8px 32px rgba(253, 224, 211, 0.3)',
                                transform: 'translateY(-2px)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'primary.main',
                                boxShadow: '0 12px 40px rgba(253, 224, 211, 0.35)',
                                transform: 'translateY(-2px)',
                            },
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#fff',
                            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                            padding: { xs: '12px 16px', md: '16px 20px' },
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
                                    width: { xs: 32, md: 40 },
                                    height: { xs: 32, md: 40 },
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                    mr: 1,
                                }}>
                                    <Search sx={{ 
                                        color: 'primary.main', 
                                        fontSize: { xs: 18, md: 22 }
                                    }} />
                                </Box>
                            </InputAdornment>
                        ),
                        endAdornment: search.length > 0 && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setSearch('')}
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        backgroundColor: 'rgba(255, 62, 38, 0.1)',
                                        border: '1px solid rgba(255, 62, 38, 0.3)',
                                        '&:hover': {
                                            color: '#ff3e26',
                                            backgroundColor: 'rgba(255, 62, 38, 0.2)',
                                            borderColor: '#ff3e26',
                                            transform: 'rotate(90deg)',
                                        },
                                        transition: 'all 0.3s ease',
                                        width: { xs: 28, md: 32 },
                                        height: { xs: 28, md: 32 },
                                    }}
                                >
                                    <Clear sx={{ fontSize: { xs: 16, md: 18 } }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    )
});

export default SearchMovie
