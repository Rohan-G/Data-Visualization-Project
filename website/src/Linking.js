import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Main';
import Casualties from './Casualties';
import App from './App';
import Dominance from './ChampionshipWinners';

function Linking(){
    
    return(
        <>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/casualties' element={<Casualties/>}/>
                <Route path='/h2h' element={<App/>}/>
                <Route path='/dominance' element={<Dominance/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )

}

export default Linking;