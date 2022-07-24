import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import {countries} from "../consts/countries";
import {convertUnixTime} from "../helpers/convertUnixTime";
import DeleteButton from "../components/DeleteButton";
import {Map} from "../components/Map";
import {formatJson} from "../helpers/formatJson";
import {IP, PORT} from "../consts/siteAddress";

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [conference, setConference] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [country, setCountry] = useState(undefined);
    const [address, setAddress] = useState(undefined)
    const [marker, setMarker] = useState({});
    const [center, setCenter] = useState({lat: 48.379433, lng: 31.16558})
    const options = {
        draggable: true
    }

    useEffect(() => {
        axios.get(`http://${IP}:${PORT}/api/single_read.php/?id=${id}`)
            .then(response => {

                console.log(response.data);
                setConference(response.data);
                setTitle(response.data.title);
                setStartDate(+response.data.date);
                setCountry(response.data.country);

                if (formatJson(response.data.address) !== '') {
                    const position = formatJson(response.data.address);
                    setAddress(position);
                    setMarker(position);
                    setCenter(position);
                } else {
                    setAddress(response.data.address);
                    setCenter({lat: 48.379433, lng: 31.16558});
                }

                setLoading(false);
            });
    }, [id])

    const goBack = () => navigate(-1);

    function handleSubmit(event) {
        event.preventDefault();
        const addressString = JSON.stringify(address);
        const conference = JSON.stringify({id, title, date:startDate, country, address:addressString});
        axios.post('http://localhost:8080/api/update.php', conference)
            .then(response => {
                alert(response.data)
                navigate('/')
            });
    }

    function handleMarker(markerPosition) {
        setAddress(markerPosition);
        setMarker(markerPosition);
    }

    const setCenterFunc = () => {
        if (!loading && country !== conference.country) {
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

    if (loading) {
        return <></>
    }

    return (<div className="container">
        <div className="row justify-content-center m-5">
            <div className="col-sm-10 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <h5>Previous title: {conference.title}</h5>
                        <input type="text" className="form-control"
                               onChange={(event) => setTitle(event.target.value)}
                               placeholder="Enter new conference title" maxLength="255" minLength="2"/>
                    </div>
                    <div className="form-group mb-4">
                        <h5>Previous date: {convertUnixTime(conference.date)}</h5>
                        <p className="mb-0">Choose new date:</p>
                        <DatePicker dateFormat="yyyy/MM/dd" selected={startDate}
                                    onChange={(date) => setStartDate(date)}/>

                    </div>
                    <div className="form-group mb-4">
                        <h5>Previous country: {conference.country}</h5>
                        <p className="mb-0">Choose new country:</p>
                        <select className="form-control" onChange={(event) => setCountry(event.target.value)}>
                            <option value={''}>Select country</option>
                            {countries.map((el, i) => <option key={i}>{el.country}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-4">
                        <h5>Address</h5>
                        <Map marker={marker} center={center}
                             options={options} handleMarker={handleMarker}/>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                        <button type="submit" className="btn btn-success" style={{width: "45%"}}>Save</button>
                        <div style={{width: "45%"}}>
                            <DeleteButton id={id}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center p-3">
                        <button type="button" className="btn btn-secondary" style={{minWidth: "200px"}}
                                onClick={goBack}>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
};

export default Edit;