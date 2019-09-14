import React from 'react';
import '../placeholder-page/PlaceholderPage.css';

import notFound from '../../images/not-found.png';

const NotFoundPage = () => {
    return (
        <div className="not-found-main-div">
            <p>page not found (._.)</p>
            <div className="image-wrapper">
                <img alt="404 message illustration" src={notFound} />
                <span className="image-credit">&copy; &nbsp;
                    <a href="https://icons8.com/ouch/illustration/marginalia-page-not-found" 
                        rel="noopener noreferrer" target="_blank">Icons 8</a>
            </span>
            </div>
        </div>
    );
}

export default NotFoundPage;