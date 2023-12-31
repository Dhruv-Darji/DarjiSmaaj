import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSection = ({userAuth}) =>{
    const navigate = useNavigate();
    const scrollToSection = (sectionId) => {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return(
      <section id="home_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex align-items-center my-4">
              <div className="mx-auto">
                <h1>
                  Find Your Partner with<br/>
                  <strong className="fw-bold brand-name text-primary">
                    Darji
                  </strong>
                </h1>
                <p className="fw-lighter fs-5">
                  Register yourself with darji
                </p>
                {userAuth.RoleId === null && userAuth.UserId === null && userAuth.Email === null ?(
                <button type="button" onClick={()=>{navigate('/login')}} className="btn btn-secondary btn-rounded mt-3 mx-3">
                  Add Profile
                </button>
                ):(<button type="button" onClick={()=>{navigate("/addProfile")}} className="btn btn-secondary btn-rounded mt-3">
                  Add Profile
                </button>)}
                <button type="button" onClick={()=>scrollToSection('#profiles_section')} className="btn btn-secondary btn-rounded mt-3 mx-3">
                  See Profile
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center updownanimate my-4">
              <img
                src="https://img.freepik.com/free-vector/tiny-tailors-creating-outfit-apparel-sewing-machine-flat-vector-illustration-cartoon-women-men-working-with-mannequin_74855-8636.jpg?w=1060&t=st=1690476323~exp=1690476923~hmac=7dfc8e1f58cba01c0beb7683504f7fd65842ce1fe8b812323c75f12737abcc25"
                className="img-fluid px-4"
                alt="Home Img"
              />
            </div>
          </div>
        </div>
      </section>
    );
}

export default HomeSection;