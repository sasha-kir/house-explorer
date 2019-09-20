import React from 'react';

import './SearchBar.sass';

const SearchBar = ({ handleInput, handleSubmit, searchTerm, clearSearchTerm }) => {
    
    const searchInput = React.createRef();

    const clearSearchBar = () => {
        searchInput.current.value = "";
        clearSearchTerm();
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return(
        <div className="searchbar-main-div">
            <div className="searchbar-wrapper">
                <input ref={searchInput} type="text" placeholder="search"
                       onKeyDown={handleEnter}
                       onChange={handleInput} />
                <button className={`delete-button ${searchTerm ? "" : "hidden"}`}
                        onClick={clearSearchBar}>
                    <i className="fas fa-times"></i>
                </button>
                <button className="search-button" 
                        onClick={handleSubmit}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;