import { useState } from 'react';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Notification from '@mui/icons-material/Notifications';
import Help from '@mui/icons-material/Help';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import logo from '../assets/logo.png'
import { Badge, Table } from '@mui/material';
import TablePage from '../pages/TablePage';
import { AccountCircle } from '@mui/icons-material';
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function Header() {

    const [openList, setOpenList] = useState(false);
    const [open, setOpen] = useState(false);
    const [ATMList, setATMList] = useState(false);
    const [BussniessList, setBussniessList] = useState(false);

    const [ListStyle, setListStyle] = useState(false);

    const handleClick = () => {
        setOpenList(!openList);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    const theme = useTheme();

    return (

        <>
            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar className=' d-flex justify-content-between' style={{ backgroundColor: 'white' }} >
                        <div className='d-flex justify-content-center align-items-center'>
                            <IconButton
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                                <p className='mb-0 px-2' style={{ fontSize: '14px', color: 'black' }}>GoodMorning! <span className='text-muted'>Tue Jan 12,2011 9:39AM</span></p>


                            </IconButton>
                        </div>
                        <div>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton size="small" color="inherit">
                                    <Help />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <Badge badgeContent={4} color="error">
                                        <Notification />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>

                        </div>


                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            height: '100%',
                            boxSizing: 'border-box',
                        },

                    }}

                    variant="persistent"
                    anchor="left"
                    height="100%"
                    open={open}
                >
                    <DrawerHeader
                        className='custom_drawer_color'>
                        <img src={logo} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" />
                        <IconButton onClick={handleDrawerClose}>
                            {theme?.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />
                    <List sx={{ width: '100%', maxWidth: 360 }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className='custom_drawer_color'
                    >


                        <ListItemButton className={ATMList ? `cutom-dropdown` : ``} >
                            <ListItemText >ATM Settings</ListItemText>
                            {ATMList ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <ListItemButton className={BussniessList ? `cutom-dropdown` : ``} >
                            <ListItemText >Business Settings</ListItemText>
                            {BussniessList ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <ListItemButton className={openList ? `cutom-dropdown` : ``} onClick={handleClick}>
                            <ListItemText  >User Managment</ListItemText>
                            {openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse className="cutom-dropdown-bg" in={openList} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton >
                                    <ListItemText  >Users</ListItemText>
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemText  >Profiles</ListItemText>
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemText  >Groups</ListItemText>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText >License Managment </ListItemText>
                            </ListItemButton>
                        </ListItem>


                    </List>
                    <Divider />

                </Drawer>
                <Main open={open} >
                    <DrawerHeader />
                    <Typography paragraph>
                        <TablePage />
                    </Typography>

                </Main>
            </Box></>
    )
}

export default Header