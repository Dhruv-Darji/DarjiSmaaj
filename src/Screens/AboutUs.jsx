import React from "react";

const AboutUs = () =>{
    return (
        <>
            <div class="container z-depth-1">
                <section class="dark-grey-text my-5">

                <div class="row pr-lg-5">
                    <div class="col-md-6 mb-4">

                        <div class="view">
                            <img src="Images/AboutUs1.jpg" class="img-fluid" alt="smaple image"  style={{height:'90%',width:'90%'}} />
                        </div>

                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <div>
                            
                            <h3 class="font-weight-bold mb-4">Darji Tailoring Mastery</h3>

                            <p>In the heart of Gujarat, India, the Darji community weaves a rich tradition into the fabric of tailoring. Renowned for their exceptional craftsmanship, both Darji men and women contribute to this age-old practice. Men carry forward the legacy of machine stitching, honing skills passed down through generations. Their mastery of sewing machines reflects dedication and precision, transforming fabrics into garments that seamlessly blend style and utility.</p>

                            {/* <button type="button" class="btn btn-primary btn-rounded mx-0">Download</button> */}

                        </div>
                    </div>
                </div>

                </section>

                <section class="dark-grey-text my-5">

                <div class="row pr-lg-5">
                    <div class="col-md-7 mb-4">
                        <div>
                            <h3 class="font-weight-bold mb-4">Artful Darji Stitches</h3>
                            <p>Conversely, Darji women engage in the intricate art of hand sewing, affectionately known as "haath silai." This delicate technique demands patience, creativity, and a keen eye for detail. With nimble fingers, they craft intricate patterns and designs, imbuing each piece with a touch of artistry. Beyond the realm of mere tailoring, these women infuse their stitches with tradition and cultural heritage, creating garments that stand as unique reflections of their identity and the community's enduring legacy.</p>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex align-items-center">
                        <div class="view">
                            <img src="Images/AboutUs2.jpeg" class="img-fluid" alt="smaple image"/>
                        </div>
                    </div>
                </div>

                </section>
            </div>

            <div class="container my-5 py-5 z-depth-1">


            
            <section class="px-md-5 mx-md-5 text-center dark-grey-text">

            
            <div class="row d-flex justify-content-center">

                
                <div class="col-xl-6 col-md-8">

                <h3 class="font-weight-bold">Call to action</h3>

                <p class="text-muted">The Darji community is a vital thread in India's craftsmanship tapestry, seamlessly blending tradition and modernity in tailoring. Their legacy thrives as they embrace evolving fashion trends while staying true to their traditional techniques.</p>

                <a class="btn btn-info btn-md ml-0 mb-5" href="#" role="button">Start now<i class="fa fa-magic ml-2"></i></a>

                <p class="mb-4 font-weight-bold">Trusted by 1 000  + Users &amp; designers</p>

                
                <div class="row">

                    
                    <div class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/nike.png" class="img-fluid" alt="Nike - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/amazon.png" class="img-fluid" alt="Amazon - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/sony.png" class="img-fluid" alt="Sony - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/samsung.png" class="img-fluid" alt="Samsung - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                </div>
                

                </div>
                

            </div>
            


            </section>
            


            </div>            
        </>
    );
}

export default AboutUs;