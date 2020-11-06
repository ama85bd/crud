import React, {useState, useEffect} from "react";
import axios from "axios"
import {useHistory, useParams} from "react-router-dom"

const EditVideo = () => {
    let history = useHistory();
    const {id} = useParams();
    const [video, setVideo] = useState({
        name: "",
        views: "",
        likes: ""
    });

    const { name, views, likes} = video;
    const onInputChange = e => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.patch(`http://127.0.0.1:5000/video/${id}`, video);
        history.push("/")
    }

    useEffect(() => {
        loadVideo()
    }, [])

    const loadVideo = async () => {
        const result = await axios.get(`http://127.0.0.1:5000/video/${id}`);
        setVideo(result.data)
    }
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit A Video</h2>
                <form onSubmit={e => onSubmit(e)}> 
                    <div className="form-group">
                        <input 
                            type="text" className="form-control form-control-lg"
                            placeholder="Enter Video Name"
                            name="name" 
                            value={name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" className="form-control form-control-lg"
                            placeholder="Enter Video Views"
                            name="views" 
                            value={views}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" className="form-control form-control-lg"
                            placeholder="Enter Video Likes"
                            name="likes" 
                            value={likes}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">Update Video</button>
                </form>
            </div>
        </div>
    );
};

export default EditVideo;