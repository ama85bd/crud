import React, {useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap"
import axios from "axios";
import {Link} from "react-router-dom"



const Home = ({getvideos, getloading}) => {

    const [videos, setVideo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage, setVideosPerPage] = useState(10); 
    const [show, setShow] = useState(false);
    const [Viid, setViid] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadVideos();
    }, []);

 

    const loadVideos = async () => {
        setLoading(true);
        const result = await axios.get("http://127.0.0.1:5000/videos")
        setVideo(result.data.reverse());
        setLoading(false);
    };

    const deleteVideo = async id => {
        await axios.delete(`http://127.0.0.1:5000/video/${id}`);
        loadVideos();
        setShow(false);
    }

    const deleteVideoAlert = (vsid) => {
        setShow(true);
        setViid(vsid)
        // alert(vsid)
        // console.log(vsid)
    }


    if (getloading) {
        return <h2>Loading...</h2>
    }

    const indexOfLastVideo = currentPage * videosPerPage
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage
    const  currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)
    const totalVideos = videos.length 

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++){
        pageNumber.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return(
        <div className="container">
            <div className="py-4">
                <h1>Home Page</h1>
                <table class="table border shadow">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Video Name</th>
                        <th scope="col">Views</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentVideos.map((video, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{video.name}</td>
                                    <td>{video.views}</td>
                                    <td>{video.likes}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/videos/${video.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/videos/edit/${video.id}`}>Edit</Link>
                                        <Link className="btn btn-danger"  onClick={() => deleteVideoAlert(video.id)} >Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a onClick={() => 
                                {if(currentPage>1)
                                 paginate(currentPage-1)}}  className="page-link">
                                Previous
                            </a>
                        </li>
                        {pageNumber.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? "active" : null}`}>
                                <a onClick={() => paginate(number)}  className="page-link">
                                    {number}
                                </a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a onClick={() => 
                                {if(currentPage<pageNumber.length)
                                 paginate(currentPage+1)}}  className="page-link">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav> 
                <Modal show={show} onHide={handleClose} Viid={Viid}>
                    <Modal.Header closeButton>
                    <Modal.Title>Are you sure to delete this item?</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="btn btn-danger"  onClick={() => deleteVideo(Viid)}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Home;