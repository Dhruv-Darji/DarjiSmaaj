import React from "react";

const AboutUs = () =>{
    return (
        <>
            <div className="container z-depth-1 text-center">
                <section className="dark-grey-text my-5">

                <div className="row pr-lg-5">
                    <div className="col-md-6 mb-4">

                        <div className="view">
                            <img src="https://img.freepik.com/premium-vector/man-tailor-sitting-table-sewing-machine-atelier-studio-workshop-fashion-designer-profession-job-occupation_575670-321.jpg?w=900" 
                            className="img-fluid" 
                            alt="Error"  
                            style={{height:'90%',width:'90%'}} />
                        </div>

                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="mx-3">
                            
                            <h3 className="font-weight-bold mb-4">Darji Tailoring Mastery</h3>

                            <p>In the heart of Gujarat, India, the Darji community weaves a rich tradition into the fabric of tailoring. Renowned for their exceptional craftsmanship, both Darji men and women contribute to this age-old practice. Men carry forward the legacy of machine stitching, honing skills passed down through generations. Their mastery of sewing machines reflects dedication and precision, transforming fabrics into garments that seamlessly blend style and utility.</p>

                            {/* <button type="button" className="btn btn-primary btn-rounded mx-0">Download</button> */}

                        </div>
                    </div>
                </div>

                </section>

                <section className="dark-grey-text my-5">

                <div className="row pr-lg-5">
                    <div className="col-md-7 mb-4">
                        <div className="mx-3">
                            <h3 className="font-weight-bold mb-4">Artful Darji Stitches</h3>
                            <p>Conversely, Darji women engage in the intricate art of hand sewing, affectionately known as "haath silai." This delicate technique demands patience, creativity, and a keen eye for detail. With nimble fingers, they craft intricate patterns and designs, imbuing each piece with a touch of artistry. Beyond the realm of mere tailoring, these women infuse their stitches with tradition and cultural heritage, creating garments that stand as unique reflections of their identity and the community's enduring legacy.</p>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                        <div className="view">
                            <img 
                            src="https://img.freepik.com/free-vector/set-four-cartoon-compositions-with-atelier-tools-tailor-seamstress-taking-measurements-isolated-illustration_1284-65565.jpg?size=626&ext=jpg&ga=GA1.2.377597230.1666598248&semt=ais" 
                            className="img-fluid" 
                            alt="Error"/>
                        </div>
                    </div>
                </div>

                </section>
            </div>

            <div className="container my-5 py-5 z-depth-1">


            
            <section className="px-md-5 mx-md-5 text-center dark-grey-text">

            
            <div className="row d-flex justify-content-center">

                
                <div className="col-xl-6 col-md-8">

                <h3 className="font-weight-bold">Call to action</h3>

                <p className="text-muted">The Darji community is a vital thread in India's craftsmanship tapestry, seamlessly blending tradition and modernity in tailoring. Their legacy thrives as they embrace evolving fashion trends while staying true to their traditional techniques.</p>

                <a className="btn btn-info btn-md ml-0 mb-5" href="#!" role="button">Start now<i className="fa fa-magic ml-2"></i></a>

                <p className="mb-4 font-weight-bold">Trusted by 1 000  + Users &amp; designers</p>

                
                <div className="row">

                    
                    <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/nike.png" className="img-fluid" alt="Nike - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/amazon.png" className="img-fluid" alt="Amazon - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/sony.png" className="img-fluid" alt="Sony - logo"
                        style={{height: "40px"}}/>
                    </div>
                    

                    
                    <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://mdbootstrap.com/img/logo/brands/samsung.png" className="img-fluid" alt="Samsung - logo"
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