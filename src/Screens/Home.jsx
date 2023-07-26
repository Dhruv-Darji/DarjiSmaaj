import React, { useState } from "react";

const Home = () => {

    const [singleUser, setSingleUser] = useState({
        Email: '',
        Name: '',
    });

    const getSingleValue = (event) => {
        const { name, value } = event.target;
        setSingleUser({ ...singleUser, [name]: value });
    }

    return (
        <>
            <div className="form-outline">
                <input
                    type="email"
                    id="typeEmail"
                    className="form-control"
                    name='Email'
                    value={singleUser.Email}
                    onChange={getSingleValue}
                />
                <label className="form-label" htmlFor="typeEmail">Email input</label>
            </div>
            <div className="form-outline">
                <input
                    type="text"
                    id="typeName"
                    className="form-control"
                    name='Name'
                    value={singleUser.Name}
                    onChange={getSingleValue}
                />
                <label className="form-label" htmlFor="typeName">Name</label>
            </div>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                console.log(singleUser);
            }} className="btn btn-primary mx-4">Button</button>
        </>
    );
}

export default Home;
