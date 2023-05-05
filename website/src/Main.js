import { useState, useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Main(){
    
    return(
        <>
            <img src="logo.png" align="center" style={{ "position": "fixed", "left": "42.5vw" , top: "5vh", width:"15vw"}} />

            <div id="Cards" style={{position: "absolute", top: "20vh", left: "15vw", display: "flex", flexFlow: "row no-wrap", alignItems: "top", justifyItems: "center", gap: "100px"}}>
                <Card sx={{ maxWidth: 345 , color:"rgb(250,235,225)", backgroundColor:"red"}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="top10Grid.png"
                    alt="Top10Grid"
                    style={{width:"95%", height:"95%", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </div>
        </>
    )

}

export default Main;