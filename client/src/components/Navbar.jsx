import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { User } from '../request/users';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import Cookies from 'js-cookie';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;
const userController = new User();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ListItemButtonStyled = styled(ListItemButton)({
    '&:hover': {
      backgroundColor: 'rgb(54,54,54)', 
      color: 'white',
      '& svg': {
        color: 'white',
      },
    },
  });
  

export const Navbar = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState("");
    const miCookie = Cookies.get('jwt');

    React.useEffect(() => {
        userController.verifyToken(miCookie)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if(response.user){
                setUser(response.user.user);
            }
        })
        .catch(error => {
            console.error(error); 
        });
    }, [miCookie]);

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        userController.createCookie("jwt", "cerrarseision");
        window.location.reload();
    };

    const handleUpdate = () => {
      navigate('/update-personal-data');
    };

    const handlePrincipal = () => {
      navigate('/home');
      handleDrawerClose();
    };

    const handleTrucks = () => {
      navigate('/trucks-admin');
      handleDrawerClose();
    };

    const handleDrivers = () => {
      navigate('/drivers-admin');
      handleDrawerClose();
    };

    const handleRoutes = () => {
      navigate('/routes-admin');
      handleDrawerClose();
    };

    const handleRefueling = () => {
      navigate('/refueling-admin');
      handleDrawerClose();
    };

    const handleTires = () => {
      navigate('/tires-admin');
      handleDrawerClose();
    };

    const handleViewProfile = () => {
        navigate('/view-profile');
    };

    const handleUpdatePassword = () => {
        navigate('/update-data-log');
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [anchorElNotif, setAnchorElNotif] = React.useState(null);

    const handleOpenNotifMenu = (event) => {
        setAnchorElNotif(event.currentTarget);
    };

    const handleCloseNotifMenu = () => {
        setAnchorElNotif(null);
    };

    const openNotif = Boolean(anchorElNotif);
    const idNotif = openNotif ? 'simple-popover' : undefined;
    
    const MenuItemWithAction = ({ action, children }) => {
      const handleClick = () => {
        action();
        setAnchorElUser(null);
      };
    
      return <MenuItem onClick={handleClick}>{children}</MenuItem>;
    };

    return (
        <>
          <Box sx={{ display: 'flex', marginTop: '70px' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{bgcolor:'black'}}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} /> 
                <IconButton color="inherit" onClick={handleOpenNotifMenu} sx={{ mr: 4 }}> 
                  <NotificationsIcon />
                </IconButton>
                <Popover
                  id={idNotif}
                  open={openNotif}
                  anchorEl={anchorElNotif}
                  onClose={handleCloseNotifMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    Aquí van las notificaciones
                  </Typography>
                  <Typography sx={{ p: 2 }}>
                    Aquí van las notificaciones
                  </Typography>
                </Popover>
                <Typography variant="body1" noWrap component="div" sx={{ pr: 2 }}> 
                    ¡Hola {user.name}!
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 5 }}>
                        <Avatar alt="Remy Sharp" src={user.avatar} sx={{ border: '2px solid #4DA05F', width:'50px', height:'50px', mb:'10px', mt:'10px' }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                     <MenuItemWithAction action={handleViewProfile}>
                      <Typography textAlign="center">Ver perfil</Typography>
                    </MenuItemWithAction>
                    <MenuItemWithAction action={handleUpdate}>
                      <Typography textAlign="center">Editar perfil</Typography>
                    </MenuItemWithAction>
                    <MenuItemWithAction action={handleUpdatePassword}>
                      <Typography textAlign="center">Cambiar contraseña</Typography>
                    </MenuItemWithAction>
                    <MenuItemWithAction action={handleLogout}>
                      <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItemWithAction>
                  </Menu>
                </Box>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <div style={{ flex: 1 }}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <List>
                <ListItem key={'Principal'} disablePadding>
                  <ListItemButtonStyled onClick={handlePrincipal}>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Principal'} />
                  </ListItemButtonStyled>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem key={'Camiones'} disablePadding>
                  <ListItemButtonStyled onClick={handleTrucks}>
                    <ListItemIcon>
                      <LocalShippingIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Camiones'} />
                  </ListItemButtonStyled>
                </ListItem>
                <ListItem key={'Rutas'} disablePadding>
                  <ListItemButtonStyled onClick={handleRoutes}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={'Rutas'} />
                  </ListItemButtonStyled>
                </ListItem>
                <ListItem key={'Combustible'} disablePadding>
                  <ListItemButtonStyled onClick={handleRefueling}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={'Combustible'} />
                  </ListItemButtonStyled>
                </ListItem>
                <ListItem key={'Neumaticos'} disablePadding>
                  <ListItemButtonStyled onClick={handleTires}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={'Neumaticos'} />
                  </ListItemButtonStyled>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem key={'Conductores'} disablePadding>
                  <ListItemButtonStyled onClick={handleDrivers}>
                    <ListItemIcon>
                      <AccountBoxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Conductores'} />
                  </ListItemButtonStyled>
                </ListItem>
              </List>
              </div>
              <Divider />
              <List>
                <ListItem key={'Cerrar sesión'} disablePadding>
                  <ListItemButtonStyled onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Cerrar sesión'} />
                  </ListItemButtonStyled>
                </ListItem>
              </List>
            </div>
            </Drawer>
          </Box>
        </>
      )
}      