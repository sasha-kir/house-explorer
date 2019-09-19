import React from 'react';

import './SearchBar.sass';

const SearchBar = () => {
    return(
        <div className="searchbar-main-div">
            <div className="searchbar-wrapper">
                <input type="text" placeholder="search" />
                <button><i class="fas fa-search"></i></button>
            </div>
        </div>
    );
};

export default SearchBar;