import React from "react";
import "../Styles/ContactUs.css"

const ContactUs = () => {
  return(
  <>
      <div className="container mt-5">

 
<section className="dark-grey-text mb-5">

  <h3 className="font-weight-bold text-center mb-4">Contact Us</h3>
  
  <p className="text-center w-responsive mx-auto pb-5">The Darji's legacy weaves a tapestry of unparalleled tailoring expertise, enriching both fashion and culture with their intricate craftsmanship. Their stitches tell a story of tradition and innovation, spanning generations.</p>

  <div className="row">

    <div className="col-lg-5 mb-lg-0 pb-lg-3 mb-4">

      <div className="card">
        <div className="card-body">
          <div className="form-header blue accent-1">
            <h3 className="mt-2"><i className="fas fa-envelope"></i> Write to us:</h3>
          </div>
          <p className="dark-grey-text">We'll write rarely, but only the best content.</p>
          
          <div className="md-form">
            <i className="fas fa-user prefix grey-text"></i>
            <input type="text" id="form-name" className="form-control"/>
            <label htmlFor="form-name">Your name</label>
          </div>
          <div className="md-form">
            <i className="fas fa-envelope prefix grey-text"></i>
            <input type="text" id="form-email" className="form-control"/>
            <label htmlFor="form-email">Your email</label>
          </div>
          <div className="md-form">
            <i className="fas fa-tag prefix grey-text"></i>
            <input type="text" id="form-Subject" className="form-control"/>
            <label htmlFor="form-Subject">Subject</label>
          </div>
          <div className="md-form">
            <i className="fas fa-pencil-alt prefix grey-text"></i>
            <textarea id="form-text" className="form-control md-textarea" rows="3"></textarea>
            <label htmlFor="form-text">Send message</label>
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>

    </div>


    <div className="col-lg-7">

      <div id="map-container-section" className="z-depth-1-half map-container-section mb-4" style={{height: 400}}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9832.926704650707!2d73.45557404168352!3d22.60953344306749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e29fbc2e09f5b%3A0x3a90046ba62926cb!2sKalol%20INA%2C%20Gujarat%20389330!5e0!3m2!1sen!2sin!4v1691744573030!5m2!1sen!2sin" frameBorder="0"
          style={{border:0}} allowFullScreen></iframe>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <a className="btn-floating blue accent-1">
            <i className="fas fa-map-marker-alt"></i>
          </a>
          <p>New York, 94126</p>
          <p className="mb-md-0">United States</p>
        </div>
        <div className="col-md-4">
          <a className="btn-floating blue accent-1">
            <i className="fas fa-phone"></i>
          </a>
          <p>+ 01 234 567 89</p>
          <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
        </div>
        <div className="col-md-4">
          <a className="btn-floating blue accent-1">
            <i className="fas fa-envelope"></i>
          </a>
          <p>info@gmail.com</p>
          <p className="mb-0">sale@gmail.com</p>
        </div>
      </div>

    </div>

  </div>

</section>


</div>
  </>
  );
}
export default ContactUs;