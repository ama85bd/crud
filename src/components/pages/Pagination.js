import React from 'react';

const Pagination = ({videosPerPage, totalVideos}) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++){
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>    )
}

export default Pagination