import React from 'react';
import Autosuggest from 'react-autosuggest';

import './SearchBar.sass';

const SearchBar = ({ handleInput, handleSubmit, 
                     searchTerm, clearSearchTerm,
                     searchSuggestions, 
                     renderSuggestions, clearSuggestions }) => {

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const onInputChange = (event, { method }) => {
        if (method === "type") {
            handleInput(event);
        }
    };

    const getSuggestionValue = suggestion => suggestion;
    const displaySuggestion = suggestion => suggestion;
    const shouldRenderSuggestions = value => value.trim().length > 2;

    const inputProps = {
        value: searchTerm,
        type: "text",
        placeholder: "search",
        onKeyDown: handleEnter,
        onChange: onInputChange
    }

    return(
        <div className="searchbar-main-div">
            <div className={`searchbar-wrapper ${searchSuggestions.length ? "unrounded-wrapper" : ""}`}>
                <Autosuggest
                    suggestions={searchSuggestions}
                    onSuggestionsFetchRequested={renderSuggestions}
                    onSuggestionsClearRequested={clearSuggestions}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={displaySuggestion}
                    inputProps={inputProps}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                />
                {/* <input ref={searchInput} type="text" placeholder="search"
                       onKeyDown={handleEnter}
                       onChange={handleInput} /> */}
                <button className={`delete-button ${searchTerm ? "" : "hidden"}`}
                        onClick={clearSearchTerm}>
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