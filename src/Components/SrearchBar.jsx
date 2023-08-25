import React from "react";

const SearchBar = () =>{
    return(
        <div className="input-group p-4">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button id="search-button" type="button" className="btn btn-secondary">
                <i className="fas fa-filter"></i>
            </button>
            <button id="search-button" type="button" className="btn btn-primary">
                <i className="fas fa-search"></i>
            </button>             
        </div>
    );
}

export default SearchBar;