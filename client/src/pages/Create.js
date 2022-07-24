import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {countries} from "../consts/countries";
import {Map} from "../components/Map";
import {useNavigate} from "react-router-dom";
import {IP, PORT} from "../consts/siteAddress";

const Create = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('')
    const [country, setCountry] = useState(undefined)
    const [center, setCenter] = useState({lat: 48.379433, lng: 31.16558})
    const [address, setAddress] = useState('')
    const [marker, setMarker] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        const date = startDate.getTime().toString();
        if (title.length < 5) {
            alert('Minimum title length is 5 characters');
            return;
        }
        const conference = JSON.stringify({title, date, country, address});
        axios.post(`http://${IP}:${PORT}/api/create.php`, conference)
            .then(response => {
                alert(response.data)
            });

        setStartDate(new Date())
    }

    function handleMarker(markerPosition) {
        setAddress(JSON.stringify(markerPosition));
        setMarker(markerPosition);
    }

    const options = {
        draggable: true
    }

    const setCenterFunc = () => {
        if (country !== undefined) {
            const data = countries.find(el => el.country === country)
            const centerPos = {
                lat: data.lat,
                lng: data.lng
            }
            setCenter(centerPos)
        }
    }

    useEffect(() => {
        setCenterFunc();
    }, [country])

    return (
        <div className="container">
            <div className="row justify-content-center m-5">
                <div className="col-sm-10 col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <h5>Conference title:</h5>
                            <input type="text" className="form-control"
                                   value={title} onChange={(event) => setTitle(event.target.value)}
                                   placeholder="Please, enter conference title"/>
                        </div>
                        <div className="form-group mb-4">
                            <h5>Conference date:</h5>
                            <DatePicker dateFormat="yyyy/MM/dd" selected={startDate}
                                        onChange={(date) => setStartDate(date)}/>
                        </div>
                        <div className="form-group mb-4">
                            <h5>Conference country:</h5>
                            <select className="form-control" onChange={(event) => setCountry(event.target.value)}>
                                <option value={''}>Select country</option>
                                {countries.map((el, i) => <option key={i}>{el.country}</option>)}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <h5>Conference address:</h5>
                            <Map center={center} handleMarker={handleMarker} marker={marker} options={options}/>
                        </div>
                        <div className="d-flex justify-content-between p-3">
                            <button type="submit" className="btn btn-success" style={{width: "45%"}}>Save</button>
                            <button type="button" className="btn btn-secondary"
                                    style={{width: "45%"}} onClick={() => navigate('/')}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;