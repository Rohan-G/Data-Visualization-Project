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
            <img src="logo.png" align="center" style={{ "position": "absolute", "left": "42.5vw" , top: "5vh", width:"15vw"}} />

            <div id="Cards" style={{position: "absolute", top: "25vh", left: "6vw", right:"6vw", display: "flex", flexFlow: "row wrap", alignItems: "top", justifyItems: "center", gap: "100px"}}>
                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="top10Grid.png"
                        alt="Top10Grid"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Top 10 Drivers Seasonwise
                        </Typography>
                        {/* <Typography fontSize='10px'>
                            We are visualizing the top 10 drivers for each season 2003 onwards through a grid-system.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="safety.png"
                        alt="Safety"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Safety Over The Years
                        </Typography>
                        {/* <Typography variant="body2">
                        We are visulizing how safety in the sport has evolved over the years, with the introduction of various regulations.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="sunburst.jpeg"
                        alt="EngineVConstructors"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Engine v/s Constructor Performance
                        </Typography>
                        {/* <Typography variant="body2">
                            We have made a sunburst chart representing engines and the particular constructors they supply.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="timeline.png"
                        alt="TimeLine"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Championships Over the Years
                        </Typography>
                        {/* <Typography variant="body2">
                            We are visualizing the effect a constructor has on the driver's championship, if any, as well as how dominant a particular constructor or driver has been for a contiguous set of seasons.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="WebsitePic.png"
                        alt="Head2Head"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Driver Head To Head
                        </Typography>
                        {/* <Typography variant="body2">
                            We are visualizing a head to head of drivers against their teammates (in that particular season) over all the seasons the driver had participated.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="tracksOnGlobe.png"
                        alt="Globe"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Diversity of F1
                        </Typography>
                        {/* <Typography variant="body2">
                            A globe that displays all current circuits for the 2023 season, as well as future and returning circuits for the 2024 season.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="radial.png"
                        alt="Globe"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            Top 10 Drivers stats
                        </Typography>
                        {/* <Typography variant="body2">
                            We are trying to show information about the 10 greatest drivers in different aspects: Our chosen aspects are - most overall points, most championships, most wins.
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ height: 180, width: 235 , color:"rgb(250,235,225)", backgroundColor:"red", transition: '0.5s', "&:hover": { transition: '0.5s' ,transform: "scale3d(1.05, 1.05, 1)" }}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image="growingbar.png"
                        alt="Globe"
                        style={{width:"100", height:"100", objectFit: "contain", display:"block", justifyContent:"center", margin: "auto", marginTop:"10px"}}
                        />
                        <CardContent sx={{mb: 50}}>
                        <Typography gutterBottom fontSize='15px' fontFamily='Monospace' align='center' component="div">
                            A growing bar chart
                        </Typography>
                        {/* <Typography variant="body2">
                            This chart is an animated growing/racing bar chart for a particular season which shows the progression of points of each driver after each round.   
                        </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

            </div>
        </>
    )

}

export default Main;