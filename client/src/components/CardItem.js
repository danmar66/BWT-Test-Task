import React from "react";
import {Link} from "react-router-dom";
import {convertUnixTime} from "../helpers/convertUnixTime";
import DeleteButton from "./DeleteButton";

function CardItem({item}) {
    return (
        <div className="col-4 mt-3">
            <div className="card">
                <Link key={item.id} to={`/details/${item.id}`}>
                    <div className="card-header text-center">
                        {item.title}
                    </div>
                </Link>
                <div className="card-body">{convertUnixTime(item.date)}</div>
                <div className="card-footer text-center">
                    <DeleteButton id={item.id}/>
                </div>
            </div>
        </div>
    )
};

export default CardItem;