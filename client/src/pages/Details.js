import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import {Map} from "../components/Map";
import {convertUnixTime} from "../helpers/convertUnixTime";
import {formatJson} from "../helpers/formatJson";
import {IP, PORT} from "../consts/siteAddress";

const Details = () => {
    const {id} = useParams();
    const [conference, setConference] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://${IP}:${PORT}/api/single_read.php/?id=${id}`)
            .then(response => {
                setConference(response.data);
                setLoading(false);
            });
    }, [id])

    const options = {
        draggable: false
    }

    if (loading) {
        return <></>
    }

    return (
        <div className="container">
            <div className="row justify-content-center m-5">
                <div className="col-sm-10 col-md-8 col-lg-6">
                    <form style={{borderLeft: '2px solid gray', padding: "10px"}}>
                        <div className="form-group mb-4">
                            <h5>Title: {conference.title}</h5>
                        </div>
                        <div className="form-group mb-4">
                            <h5>Date: {convertUnixTime(conference.date)}</h5>
                        </div>
                        <div className="form-group mb-4">
                            <h5>Country: {conference.country}</h5>
                        </div>
                        <div className="form-group mb-0">
                            <h5>Address: {formatJson(conference.address) === '' ? "Not specified" : ""}</h5>
                            <div>
                                {formatJson(conference.address) === ''
                                    ? <></>
                                    : <Map
                                        center={formatJson(conference.address)}
                                        marker={formatJson(conference.address)}
                                        options={options}
                                        handleMarker={() => {
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </form>
                    <div className="row m-3 flex-column align-items-center">
                        <Link key={conference.id} to={`/edit/${conference.id}`}>
                            <button type="submit" className="btn btn-secondary mb-2"
                                    style={{minWidth: "200px"}}>Edit
                            </button>
                        </Link>
                        <div style={{minWidth: "200px"}}>
                            <DeleteButton id={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;