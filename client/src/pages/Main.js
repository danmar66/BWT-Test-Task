import React, {useEffect, useState} from 'react';
import CardItem from "../components/CardItem";
import axios from "axios";
import {Link} from "react-router-dom";
import {IP, PORT} from "../consts/siteAddress";

const Main = () => {
    const [conferences, setConferences] = useState([])

    useEffect(() => {
        axios.get(`http://${IP}:${PORT}/api/read.php`)
            .then(response => {
                const data = JSON.parse(response.data.slice(response.data.indexOf('{')))
                setConferences(data.body);
            })
    }, [])

    return (
        <div className="container">
            <div className="row">
                {conferences.map((el, i) => <CardItem item={el} key={i}/>)}
            </div>
            <div className="row justify-content-center m-3">
                <Link to={'/create'}>
                    <button type="button" className="btn btn-success" style={{width: "30%", minWidth: "200px"}}>
                        Create conf
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Main;