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
          
          <div className="md-form mt-4">
            <i className="fas fa-user prefix grey-text"></i>
            <label htmlFor="form-name">Your name</label>
            <input type="text" id="form-name" className="form-control"/>
          </div>
          <div className="md-form mt-4">
            <i className="fas fa-envelope prefix grey-text"></i>
            <label htmlFor="form-email">Your email</label>
            <input type="text" id="form-email" className="form-control"/>
          </div>
          <div className="md-form mt-4">
            <i className="fas fa-tag prefix grey-text"></i>
            <label htmlFor="form-Subject">Subject</label>
            <input type="text" id="form-Subject" className="form-control"/>
          </div>
          <div className="md-form mt-4">
            <i className="fas fa-pencil-alt prefix grey-text"></i>
            <label htmlFor="form-text">Send message</label>
            <textarea id="form-text" className="form-control md-textarea" rows="3"></textarea>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>

    </div>


    <div className="col-lg-7">

      <div id="map-container-section" className="z-depth-1-half map-container-section mb-4" style={{height: 400}}>
        <iframe title="officeMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9832.926704650707!2d73.45557404168352!3d22.60953344306749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e29fbc2e09f5b%3A0x3a90046ba62926cb!2sKalol%20INA%2C%20Gujarat%20389330!5e0!3m2!1sen!2sin!4v1691744573030!5m2!1sen!2sin" frameBorder="0"
          style={{border:0}} allowFullScreen></iframe>
      </div>
      <div className="row text-center">
        <div className="col-md-4 mt-2">
            <i className="btn-floating text-primary fas fa-map-marker-alt"></i>
          <p>Kalol, 389330</p>
          <p className="mb-md-0">India,Gujarat</p>
        </div>
        <div className="col-md-4 mt-2">
            <i className="btn-floating text-primary fas fa-phone"></i>
          <p>+91 9408858246</p>
          <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
        </div>
        <div className="col-md-4 mt-2">
            <i className="btn-floating text-primary fas fa-envelope"></i>
          <p>info@gmail.com</p>
          <p className="mb-0">biodata@gmail.com</p>
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