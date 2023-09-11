import React from "react";
import { NavLink } from "react-router-dom";


const Footer = () =>{
    const api_key = process.env.REACT_APP_API_KEY;
    return(
        <>            
    <footer className="text-center text-lg-start bg-light text-muted">
    <hr/>
    <section>
        <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
            </h6>
            <p>
                It is personal website made ad as a personal project to show work made by developer and to test their skills.
            </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">
                Technology
            </h6>
            <p>
                <NavLink href="#!" className="text-reset">React</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">Node Js</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">Express Js</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">MySql</NavLink>
            </p>
            </div>
            
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">
                Useful links
            </h6>
            <p>
                <NavLink href="#!" className="text-reset">Pricing</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">Settings</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">Orders</NavLink>
            </p>
            <p>
                <NavLink href="#!" className="text-reset">Help</NavLink>
            </p>
            </div>
            

            
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i className="fas fa-home me-3"></i> Kalol, India</p>
            <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
            </p>
            <p><i className="fas fa-phone me-3"></i> + 91 9408858246</p>
            <p><i className="fas fa-print me-3"></i> + 91 9408858246</p>
            </div>
            
        </div>
        
        </div>
    </section>
    

    
    <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        © 2021 Copyright:
        <NavLink to={`${api_key}`} className="text-reset fw-bold">Dhruv Darji</NavLink>
    </div>
    
    </footer>
        </>
    );
}

export default Footer;