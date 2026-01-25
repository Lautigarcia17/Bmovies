import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom'
import logo from '../../assets/Bmovie.png'
import { authContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { useGenericContext } from "../../hooks/useGenericContext";
import { useEffect, useState } from 'react'
import { scrollContext } from '../../context/ScrollContext'
import DropdownNavbar from '../DropdownNavbar/DropdownNavbar'
import { AppBar, Toolbar, Box, IconButton, Button, useMediaQuery, useTheme, Typography } from '@mui/material'
import { Home, Person, ExitToApp } from '@mui/icons-material'


function NavBar() {
    const { idSession, signOut } = useGenericContext(authContext)
    const { scrollRef } = useGenericContext(scrollContext)
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const match = !!useMatch("/details/*");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleLogout = async () => {
        signOut();
        toast.success(`You have logged out, see you later !!`, { position: 'top-right', duration: 2000 })
    }

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
    }, []);

    const handleScrollToTop = () => {
        if (scrollRef.current) {
            if (location.pathname !== '/') {
                navigate('/');
            }
            else {
                scrollRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    return (
        <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
                backgroundColor: isScrolled || match ? 'rgba(6, 13, 23, 0.98)' : 'rgba(6, 13, 23, 0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: isScrolled || match ? '2px solid' : '1px solid',
                borderColor: isScrolled || match ? 'primary.main' : 'rgba(253, 224, 211, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isScrolled || match ? '0 8px 32px rgba(253, 224, 211, 0.15)' : 'none',
            }}
        >
            {idSession && (
                <Toolbar sx={{ 
                    justifyContent: 'space-between', 
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 2, sm: 4, md: 6 },
                    maxWidth: '1600px',
                    width: '100%',
                    margin: '0 auto',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={handleScrollToTop}
                            sx={{ 
                                p: 0,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1) rotate(-5deg)',
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={logo}
                                alt="logo"
                                sx={{
                                    width: { xs: 50, sm: 65, md: 80 },
                                    height: { xs: 50, sm: 65, md: 80 },
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 10px rgba(253, 224, 211, 0.3))',
                                }}
                            />
                        </IconButton>
                        <Box sx={{ 
                            display: { xs: 'none', sm: 'block' },
                            borderLeft: '2px solid',
                            borderColor: 'primary.main',
                            pl: 2,
                        }}>
                            <Typography sx={{ 
                                fontSize: { sm: '1.25rem', md: '1.5rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(45deg, #FDE0D3 30%, #ffffff 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '0.5px',
                            }}>
                                BMOVIES
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 2 } }}>
                        {isMobile && location.pathname === '/' ? (
                            <DropdownNavbar handleScrollToTop={handleScrollToTop} handleLogout={handleLogout} />
                        ) : (
                            <>
                                <Button
                                    onClick={handleScrollToTop}
                                    startIcon={<Home sx={{ fontSize: { xs: 18, md: 22 } }} />}
                                    sx={{
                                        color: location.pathname === '/' ? 'primary.main' : 'text.secondary',
                                        backgroundColor: location.pathname === '/' ? 'rgba(253, 224, 211, 0.1)' : 'transparent',
                                        border: location.pathname === '/' ? '2px solid' : '2px solid transparent',
                                        borderColor: location.pathname === '/' ? 'primary.main' : 'transparent',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                            borderColor: 'primary.main',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(253, 224, 211, 0.25)',
                                        },
                                        textTransform: 'none',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                        fontWeight: 600,
                                        px: { xs: 1, sm: 1.5, md: 2.5 },
                                        py: { xs: 0.75, md: 1 },
                                        borderRadius: 2,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>Home</Box>
                                </Button>
                                
                                <Button
                                    component={NavLink}
                                    to='/profile'
                                    startIcon={<Person sx={{ fontSize: { xs: 18, md: 22 } }} />}
                                    sx={{
                                        color: location.pathname === '/profile' ? 'primary.main' : 'text.secondary',
                                        backgroundColor: location.pathname === '/profile' ? 'rgba(253, 224, 211, 0.1)' : 'transparent',
                                        border: location.pathname === '/profile' ? '2px solid' : '2px solid transparent',
                                        borderColor: location.pathname === '/profile' ? 'primary.main' : 'transparent',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                            borderColor: 'primary.main',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(253, 224, 211, 0.25)',
                                        },
                                        textTransform: 'none',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                        fontWeight: 600,
                                        px: { xs: 1, sm: 1.5, md: 2.5 },
                                        py: { xs: 0.5, sm: 0.75, md: 1 },
                                        borderRadius: 2,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>Profile</Box>
                                </Button>

                                <Button
                                    onClick={handleLogout}
                                    startIcon={<ExitToApp sx={{ fontSize: { xs: 18, md: 22 } }} />}
                                    sx={{
                                        color: 'text.secondary',
                                        border: '2px solid transparent',
                                        '&:hover': {
                                            color: '#ff3e26',
                                            backgroundColor: 'rgba(255, 62, 38, 0.1)',
                                            borderColor: '#ff3e26',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(255, 62, 38, 0.25)',
                                        },
                                        textTransform: 'none',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                        fontWeight: 600,
                                        px: { xs: 1, sm: 1.5, md: 2.5 },
                                        py: { xs: 0.5, sm: 0.75, md: 1 },
                                        borderRadius: 2,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>Logout</Box>
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            )}
        </AppBar>
    )
}

export default NavBar