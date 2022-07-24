import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Details from "../pages/Details";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Main/>}/>
            <Route path='create' element={<Create/>}/>
            <Route path='edit/:id' element={<Edit/>}/>
            <Route path='details/:id' element={<Details/>}/>
        </Routes>
    );
};

export default Router;