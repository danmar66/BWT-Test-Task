import React, {useRef} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import style from "./Map.module.css";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const Map = ({center, handleMarker, options, marker}) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const mapRef = useRef(undefined);
    const defaultOptions = {
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        streetViewControl: false,
        clickableIcons: false,
        mapTypeControl: false,
        rotateControl: false,
    }

    const mapOptions = {...defaultOptions, ...options};

    const handleClick = (event) => {
        handleMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

    return isLoaded ? (
        <div className={style.container}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
                onClick={handleClick}
            >
                <Marker position={marker}/>
            </GoogleMap>
        </div>
    ) : <></>
}

export {Map}