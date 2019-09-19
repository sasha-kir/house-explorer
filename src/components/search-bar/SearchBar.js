import React from 'react';

import './SearchBar.sass';

const SearchBar = ({ handleSearchInput }) => {
    return(
        <div className="searchbar-main-div">
            <div className="searchbar-wrapper">
                <input type="text" placeholder="search"
                       onChange={handleSearchInput} />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;