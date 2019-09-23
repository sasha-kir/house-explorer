import React from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";

import './SearchBar.sass';

const SearchBar = ({ 
                        handleInput, 
                        handleSubmit, 
                        searchTerm, 
                        clearSearchTerm,
                        searchSuggestions, 
                        renderSuggestions, 
                        clearSuggestions, 
                        saveInitialInput,
                        fillInitialInput
                    }) => {

    const handleEnter = (e) => {
        if (e.key === "Enter" && !searchSuggestions.length) {
            handleSubmit();
        }
    }

    const onInputChange = (event, { method }) => {
        switch (method) {
            case 'type':
                handleInput(event);
                break;
            case 'down':
                saveInitialInput(event);
                break;
            case 'up':
                if (event.target.value === searchSuggestions[0]) {
                   fillInitialInput();
                }
                break;
            default:
                break;
        }
    };

    const getSuggestionValue = suggestion => {
        const selectionEvent = {
            target: { value: suggestion }
        };
        handleInput(selectionEvent);
        return suggestion;
    };

    const displaySuggestion = (suggestion, { query }) => {
        const matches = AutosuggestHighlightMatch(suggestion, query);
        const parts = AutosuggestHighlightParse(suggestion, matches);
        return (
            <span>
              {parts.map((part, index) => {
                const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
        
                return (
                  <span className={className} key={index}>
                    {part.text}
                  </span>
                );
              })}
            </span>
        );
    }

    const shouldRenderSuggestions = value => value.trim().length > 3;

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