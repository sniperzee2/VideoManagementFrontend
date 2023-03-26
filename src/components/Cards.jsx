import { useRef, useState } from 'react'
import Card from './Card'
import {Box, Fab, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";
import EditCard from './EditCard';
import Modal from "./Modal.jsx";
import { useDispatch } from 'react-redux';
import { addCard,deleteCard } from '../features/bucketSlice';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Cards = ({cards, bucketIndex, rerenderOnce}) => {
  const dispatch = useDispatch()
  const [modalComponent, setComponent] = useState("")
  const [isDeleteClicked, setDeleted] = useState(false)
  const editCardRef = useRef()
  console.log("Values",cards);

  const handleAddcard = () => {
    setComponent(<Modal onClose={() => { setComponent("")}} open={true} content={<EditCard ref={editCardRef} bucketIndex={bucketIndex} />} action={() => {
      const inputs = editCardRef.current.querySelectorAll('input')
      let title = inputs[0].value
      let link = inputs[1].value
      if(title.length == 0 || link.length == 0){
        alert("Title or link cannot be NULL")
      }else{
        dispatch(addCard({title, link, bucketIndex}))
        rerenderOnce(true)
      }
    }} actionText="Submit" />)
  }

  const handleChangeDelete = () => {
    setDeleted(!isDeleteClicked)
    cards.map((c) => {
      c.isSelected = false;
    })
  }

  const handleMultiDelete = (bucketIndex) => {
    cards.map((c,index) => {
      if(c.isSelected){
        dispatch(deleteCard({ bucketIndex, index}))
        rerenderOnce(true)
      }
    })
    setDeleted(false)
  }


  return (
    <Box sx={{ position: 'relative', flexGrow: 1, p: '0.5rem', display: 'flex', flexDirection: 'column' }}>
      <Grid sx={{ height: '100%' ,mt: '0.5rem', p: '1rem', alignContent: 'start' }} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
           cards.map((card, index)=>{
                return (
                    <Card cardId={card.id} rerenderOnce={rerenderOnce} key={card.id} title={card.title} link={card.link} cardIndex={index} bucketIndex={bucketIndex} setModal={setComponent} isDeleteClicked={isDeleteClicked} isSelected={card.isSelected}/>
                )
           })
        }
      </Grid>
      {modalComponent}
        {
            bucketIndex !== -1 &&
            <>  
          <Fab onClick={()=>handleAddcard(bucketIndex)} aria-label="add" sx={{ position: 'fixed', right: '2.5rem', bottom: '2.5rem'}}>
            <Add />
          </Fab>
          <Fab onClick={()=>handleChangeDelete(bucketIndex)}  aria-label="add" sx={{ position: 'fixed', right: '7.5rem', bottom: '2.5rem',backgroundColor:'red' }}>
            {isDeleteClicked ? <ClearIcon/>:<DeleteSweepIcon />}
          </Fab>
          {isDeleteClicked && <Fab onClick={()=>handleMultiDelete(bucketIndex)}  aria-label="add" sx={{ position: 'fixed', right: '7.5rem', bottom: '7.5rem',backgroundColor:'green' }}>
            <CheckIcon/>
          </Fab>}
            </>
        }
    </Box>
  )
}

export default Cards
