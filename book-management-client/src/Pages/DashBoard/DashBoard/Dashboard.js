import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Button } from '@mui/material';
import MyOrders from '../MyOrders/MyOrders';
import AddProduct from '../AddProduct/AddProduct';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import ManageProducts from '../ManageProducts/ManageProducts';

const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let { path, url } = useRouteMatch();

    const { user, admin, logOut } = useAuth();

    const userIcon = <FontAwesomeIcon icon={faUserAlt} />

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar style={{ backgroundColor: '#BD9200', color: 'white', fontWeight: 'bold' }}>{userIcon}_{user.displayName}</Toolbar>
            <Divider sx={{ mb: 3 }} />
            <Link style={{ textDecoration: 'none' }} to={`${url}`}>
                <Button style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">My Books</Button>
            </Link> <br />
            <Link style={{ textDecoration: 'none' }} to="/books">
                <Button style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">Books</Button>
            </Link> <br />
            {admin && <Box>
                <Divider />
                <Link style={{ textDecoration: 'none' }} to={`${url}/addProduct`}>
                    <Button style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">Add Book</Button>
                </Link> <br />
                <Link style={{ textDecoration: 'none' }} to={`${url}/makeAdmin`}>
                    <Button style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">Add Admin</Button>
                </Link> <br />
                <Link style={{ textDecoration: 'none' }} to={`${url}/manageProducts`}>
                    <Button style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">Manage All Books</Button>
                </Link>
            </Box>}
            <Divider />
            <Button onClick={logOut} style={{ color: '#BD9200', fontSize: 15, fontWeight: 'bold' }} color="inherit">Logout</Button>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                style={{ backgroundColor: '#BD9200', color: 'black' }}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ fontWeight: 'bold', color: 'white' }} variant="h5" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={path}>
                        <MyOrders></MyOrders>
                    </Route>
                    <Route path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </Route>
                    <Route path={`${path}/addProduct`}>
                        <AddProduct></AddProduct>
                    </Route>
                    <Route path={`${path}/manageProducts`}>
                        <ManageProducts></ManageProducts>
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
