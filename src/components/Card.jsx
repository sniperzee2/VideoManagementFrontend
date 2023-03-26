import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCard, addCard } from '../features/bucketSlice'
import VideoPlayer from './VideoPlayer';
import Modal from './Modal';
import { addToHitory } from '../features/historySlice'
import EditCard from "./EditCard.jsx";
import { useRef } from "react";
import MenuList from './MenuList'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const CardComp = ({ title, link, cardIndex, bucketIndex, setModal, rerenderOnce, cardId ,isDeleteClicked,isSelected}) => {
  const disPatch = useDispatch()
  const id = cardIndex;
  const editCardRef = useRef()
  
  /*Move card logic */
  const moveCardFrom = () => {
    disPatch(deleteCard({cardIndex, bucketIndex}));
    rerenderOnce(true)
  }

  const moveCardTo = (bucketIndex) => {
    disPatch(addCard({ bucketIndex, title, link}))

  }

  /* modal logic */
  const handleClick = () => {
    setModal(<Modal onClose={() => { setModal("") }} open={true} content={<VideoPlayer link={link} />} action={() => { }} />)
    const historyObject = {
      cardId,
      title,
      link,
    }
    disPatch(addToHitory(historyObject))
  }

  const handleEdit = () => {
    setModal(<Modal onClose={() => { setModal("") }} open={true} content={<EditCard ref={editCardRef} bucketIndex={bucketIndex} title={title} link={link} />} action={() => {
      const inputs = editCardRef.current.querySelectorAll('input')
      let title = inputs[0].value
      let link = inputs[1].value
      if(title.length == 0 || link.length == 0){
        alert("Title or link cannot be NULL")
      }else{
        disPatch(updateCard({ title, link, bucketIndex, cardIndex,isSelected }))
        rerenderOnce(true)
      }
    }} actionText="Submit" />)
  }


  return (
    <Card style={{ marginLeft: "10px", marginTop: '1rem', position: "relative", textOverflow: 'ellipsis', overflow: 'hidden' }} sx={{ maxWidth: 250, height: 'min-content'}}>
      <CardContent style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <MenuList moveCardTo={moveCardTo} moveCardFrom={moveCardFrom} />
        <CopyToClipboard text={link}>
          <Button variant="text" size="small" sx={{ p: '0', textTransform: 'none', color: 'text.secondary' }}>
            Copy Link
          </Button>
        </CopyToClipboard>
      </CardContent>

      <CardActions style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }} >
        <Button size="small" onClick={handleClick}><PlayCircleIcon/></Button>
        <Button size="small" onClick={handleEdit} > <EditIcon /></Button>
        <Button onClick={() => {
          disPatch(deleteCard({ bucketIndex, cardIndex }))
          rerenderOnce(true)
        }} size="small"> <DeleteIcon /> </Button>
        <input
          type="checkbox"
          style={{display : isDeleteClicked ? "":"none"}}
          value={cardId}
          name={cardId}
          onChange={(e) => {
            isSelected = e.target.checked;
            disPatch(updateCard({ title, link, bucketIndex, cardIndex,isSelected }))
            rerenderOnce(true)
          }}
        />
      </CardActions>
    </Card>
  );
}

export default CardComp;