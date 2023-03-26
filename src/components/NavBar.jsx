import Logo from '../assets/logo.png'
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { selectToggler, toggleDrawer } from '../features/toggleSlice.js';
import { useSelector, useDispatch } from "react-redux";

import { Link } from 'react-router-dom';

const handleClick = (isShown, dispatch) => {
  dispatch(toggleDrawer(!isShown))
}

const NavBar = () => {
  const isShown = useSelector(selectToggler)
  const dispatch = useDispatch();
  return (
    <AppBar sx={{ position: 'relative' }} style={{ background: '#2E3B55' }}>
      <Toolbar>
        <IconButton
            color='#2E3B55'
            aria-label="open drawer"
            edge="start"
            onClick={() => handleClick(isShown, dispatch)}
            sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ p: '0.5rem'}}>
          <img src={Logo} style={{ height:"2.5rem", width: "2.5rem"}} alt="logo"/>
        </Box>
        <Toolbar sx={{ px: '1rem', width: '100%' }}>
          <Link to="/" style={{ color: 'inherit', padding: '0.5rem', textDecoration:"none" }}>Home</Link>
          <Link to="/history" style={{ color: 'inherit', padding: '0.5rem', textDecoration:"none"  }}>History</Link>
        </Toolbar>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar