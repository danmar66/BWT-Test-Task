import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {IP, PORT} from "../consts/siteAddress";


const DeleteButton = (data) => {
    let id;
    typeof data === 'number' ? id = data : id = data.id

    const handleDelete = () => {
        const request = `{"id": ${id}}`;
        axios.post(`http://${IP}:${PORT}/api/delete.php`, request)
            .then(response => {
                alert(response.data)
            });
    }

    return (
        <Link to={'/'}>
            <button type="button" className="btn btn-danger w-100" onClick={handleDelete}>Delete</button>
        </Link>
    );
};

export default DeleteButton;