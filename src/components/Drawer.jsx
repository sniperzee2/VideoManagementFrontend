import {useState,} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { useSelector, useDispatch } from 'react-redux';
import { allBuckets, addBucket } from '../features/bucketSlice';
import { selectToggler, toggleDrawer } from '../features/toggleSlice.js'
import Cards from './Cards'
import {IconButton, Toolbar} from "@mui/material";
import { Close, Add }  from '@mui/icons-material'
import ListItem from './ListItem.jsx'

const drawerWidth = 250;

const handleClose = (dispatch, open) => dispatch(toggleDrawer(!open))

const ResponsiveDrawer = () => {
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(-1);
  const [deleteCardClicked, rerenderOnce] = useState(false)

  const buckets = useSelector(allBuckets)
  const mobileOpen = useSelector(selectToggler)
  const dispatch = useDispatch()

    const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'space-evenly' }}>
        <IconButton onClick={()=>{
          dispatch(addBucket())
        }}>
          <Add />
        </IconButton>
        <IconButton
            onClick={() => handleClose(dispatch, mobileOpen)}
            sx={{ display: { sm: 'none' }}}
        >
          <Close />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {buckets.map((bucket, index) => {
          const bgColor = active === index ? '#2E3B55':"";
          if((deleteCardClicked) && (active === index)){
            setCards(bucket.cards)
            rerenderOnce(false);
          }
          return (
              <ListItem  initialEditValue={bucket.initialEdit} key={bucket.id} index={index} bucket={bucket} bgColor={bgColor} setActive={setActive} setCards={setCards} active={active} />
          )
        })}
      </List>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, position: 'relative' }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => handleClose(dispatch, mobileOpen) }
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {  width: drawerWidth, position: 'relative', height: '70vh', pb: '6rem', overflowY:'auto' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Cards rerenderOnce={rerenderOnce} bucketIndex={active} cards={cards} />
    </div>
  );
}

export default ResponsiveDrawer;
