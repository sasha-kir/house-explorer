import React from 'react';

import './SearchBar.sass';

const SearchBar = ({ handleInput, handleSubmit }) => {
    
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return(
        <div className="searchbar-main-div">
            <div className="searchbar-wrapper">
                <input type="text" placeholder="search"
                       onKeyDown={handleEnter}
                       onChange={handleInput} />
                <button onClick={handleSubmit}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;