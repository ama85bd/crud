import React, {useState, useEffect} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom"

const Video = () => {
    const [video, setVideo] = useState({
        name: "",
        views: "",
        likes: ""
    });
    const {id} = useParams();

    useEffect(() => {
        loadVideo();
    }, [])

    const loadVideo = async () => {
        const result = await axios.get(`http://127.0.0.1:5000/video/${id}`);
        setVideo(result.data);
    }
    return (
        <div className="container">
            <Link className="btn btn-primary mt-2" to="/">
                Back to Home
            </Link>
            <h1 className="display-4">User Id: {id}</h1>
            <hr/>
            <ul className="list-group w-50">
            <li className="list-group-item">Video Name: {video.name}</li>
            <li className="list-group-item">Video Views: {video.views}</li>
            <li className="list-group-item">Video Likes: {video.likes}</li>
            </ul>
        </div>
    )
}

export default Video;