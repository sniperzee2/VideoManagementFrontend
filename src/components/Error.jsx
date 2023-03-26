import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Error = () => {
  return (
    <Card sx={{ maxWidth: 700,display:"flex", alignSelf: "center", justifySelf:"center", justifyContent: "center",marginTop: 5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          src="./src/assets/Caution.jpg"
          alt="Error 404 not found"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Caution! This Page is Cordoned Off.
            <Link to='/' style={{textDecoration: "none"}}> <HomeIcon/></Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Error