import React from "react";
import { showSuccessToast } from "./Toast";

const SearchBar = ({filterData,setFilterData,applyFiltersClicked,setApplyFiltersClicked}) =>{

  const getFilterData = (event) => {
    const { name, value } = event.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const applyFilter = () =>{
    setApplyFiltersClicked(!applyFiltersClicked);
    showSuccessToast('Filter is Applied 👍.');
  } 

  const clearFilters = () =>{
    setApplyFiltersClicked(!applyFiltersClicked);
    showSuccessToast('Filter is Removed 👍.');
    setFilterData({
        genderFilter:'',
        salaryFilter:'0',
        ageFilter:'18',
        employeeFilter:'',
      });
  }

    return(
        <div className="input-group p-4">
            <input type="search" className="form-control rounded" placeholder="Search By Name,Village,Pargana" aria-label="Search" aria-describedby="search-addon" />
            <button 
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
            >
                <i className="fas fa-filter"></i>
            </button>
            <button id="search-button" type="button" className="btn btn-primary">
                <i className="fas fa-search"></i>
            </button> 
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="card text-center">
            <div className="card-header">Filter</div>
            <div className="card-body">
                <div className="mb-3">
                <div className="form-check form-check-inline">
                    <input
                    className="form-check-input"
                    type="radio"
                    id="maleRadio"
                    name="genderFilter"
                    onChange={getFilterData}
                    value="Male"
                    />
                    <label className="form-check-label" htmlFor="maleRadio">
                    Male
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                    className="form-check-input"
                    type="radio"
                    id="femaleRadio"
                    name="genderFilter"
                    onChange={getFilterData}
                    value="Female"
                    />
                    <label className="form-check-label" htmlFor="femaleRadio">
                    Female
                    </label>
                </div>
                </div>

                {/* Salary Range */}
                <div className="mb-3">
                <label htmlFor="salaryRange" className="form-label">
                    Salary Above then: {filterData.salaryFilter} INR
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="salaryRange"
                    min="0"
                    max="2000000"
                    step="100000"
                    list="salaryRanges"
                    name="salaryFilter"
                    value={filterData.salaryFilter}
                    onChange={getFilterData}
                />
                </div>

                {/* Age Range */}
                <div className="mb-3">
                <label htmlFor="ageRange" className="form-label">
                    Age Range: {filterData.ageFilter} Years
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="ageRange"
                    min="18"
                    max="80"
                    step="1"
                    name="ageFilter"
                    list="ageRanges"
                    value={filterData.ageFilter}
                    onChange={getFilterData}
                />
                </div>

                <div className="mb-1"> 
                {filterData.employeeFilter}               
                    <label htmlFor="employedIn" className="form-label">Employed In:</label>
                        <select name="employeeFilter" onChange={getFilterData} className="form-control" id="employedIn">
                            <option>---Select---</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Student">Student</option>                                
                            <option value="Government">Government</option>
                            <option value="Private">Private</option>
                            <option value="Self Employed">Self Employed</option>
                            <option value="Freelancer">Freelancer</option>
                        </select>
                </div>
                
                <div className="mb-1">                
                    <button onClick={applyFilter} className="btn btn-primary m-2">
                    <i className="fas fa-filter"></i> Apply Filters
                    </button> 
                    <button onClick={clearFilters} className="btn btn-outline-primary m-2">
                    clear Now
                    </button>               
                </div>
            </div>
            </div>
            </ul>            
        </div>
    );
}

export default SearchBar;