import { fetchViewprofile } from "./Service";
import { useState, useEffect } from "react";
import Profilenav from "../profilenav/Profilenav";
import { fetchViewProfile } from "./Service";
import { useNavigate, useParams } from "react-router-dom";
import { WEB_API } from "../../../common/constant";
// import  "./Viewprofile.css"

const ViewProfile = () => {
    const [data, setData] = useState(null);
    const [businessTimings, setBusinessTimings] = useState([]);
    const [services, setServices] = useState([]);
    const [facility, setFacility] = useState([]);
    const [packages, setPackage] = useState([]);
    const [labtest, setLabtest] = useState([]);
    const [products, setProducts] = useState([]);
    const [amenity, setAmenity] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [photosData, setPhotosData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [website, setWebsite] = useState(null);
    const { bs_id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        const fetchViewprofileData = async () => {
            try {
                const response = await fetchViewProfile(bs_id);
                console.log(response);
                if (response?.data?.businessData?.length > 0) {
                    setData(response.data.businessData[0]);
                }
                if (response?.data?.business_timingsData?.length > 0) {
                    setBusinessTimings(response.data.business_timingsData);
                }
                if (response?.data?.servicesData?.length > 0) {
                    setServices(response.data.servicesData);
                }
                if (response?.data?.facilitiesData?.length > 0) {
                    setFacility(response.data.facilitiesData);
                }
                if (response?.data?.health_packageData?.length > 0) {
                    setPackage(response.data.health_packageData);
                }
                if (response?.data?.labtestData?.length > 0) {
                    setLabtest(response.data.labtestData);
                }
                if (response?.data?.productData?.length > 0) {
                    setProducts(response.data.productData);
                }
                if (response?.data?.amenitiesData?.length > 0) {
                    setAmenity(response.data.amenitiesData);
                }
                if (response?.data?.social_linkData?.length > 0) {
                    setSocialLinks(response.data.social_linkData);
                }
                if (response?.data?.websiteData?.length > 0) {
                    setWebsite(response.data.websiteData[0]);
                }
                if (response?.data?.photosData?.length > 0) {
                    setPhotosData(response.data.photosData);
                }
                if (response?.data?.videoData?.length > 0) {
                    setVideoData(response.data.videoData);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchViewprofileData();
    }, [bs_id]);

    return (
        <>
            <Profilenav />
            <div className="container" >
                <div className="business-card">
                    {/* Card Header */}
                    <div className="business-header" style={{backgroundColor:"#a071fd"}}>
                        <h6>Amazing Builders</h6>
                        <p>Your Trusted Construction Partner Since 2005</p>
                    </div>

                    {/* Card Body */}
                    <div className="business-body">
                        <div className="business-body">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", padding: "10px" }}>
                                <h5 style={{ margin: "0" }}>Business Details</h5>
                                <form >
                                    <button type="submit" style={{ padding: "5px 10px", backgroundColor: "#a071fd", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                        onClick={() => navigate(`/businesscontacts`)}>
                                        View All
                                    </button>
                                </form>
                            </div>
                         
                            <div style={{ padding: "10px" }}>
                                <p><strong>Business Name:</strong> {data?.bs_business_name}</p>
                                <p><strong>Owner Name:</strong> {data?.bs_owner_name}</p>
                                <p><strong>Business Phone:</strong> {data?.bs_business_phone}</p>
                                <p><strong>Email:</strong> {data?.bs_email}</p>
                                <p><strong>Password:</strong> {data?.bs_password}</p>
                                <p><strong>Pincode:</strong> {data?.bs_pincode}</p>
                                <p><strong>Building Name:</strong> {data?.bs_building_name}</p>
                                <p><strong>Colony Name:</strong> {data?.bs_colony_name}</p>
                                <p><strong>Area:</strong> {data?.bs_area}</p>
                                <p><strong>Landmark:</strong> {data?.bs_landmark}</p>
                                <p><strong>City:</strong> {data?.bs_city}</p>
                                {data?.bs_image && (
                                    <div style={{ margin: "10px 0" }}>
                                        <p><strong>Business Image:</strong></p>
                                        <img
                                            src={`${WEB_API}${data.bs_image}`}
                                            alt="Business"
                                            style={{ width: "120px", height: "120px", borderRadius: "5px", objectFit: "cover" }}
                                        
                                        />
                                    </div>
                                )}


                                <p><strong>Business Description:</strong> {data?.bs_desc}</p>
                                <p><strong>State:</strong> {data?.bs_state}</p>
                                <p><strong>Contact Person:</strong> {data?.bs_contact_person}</p>
                                <p><strong>WhatsApp Number:</strong> {data?.bs_whatsapp_number}</p>
                                <p><strong>Business Type:</strong> {data?.bs_business_type}</p>
                                <p><strong>Business Category:</strong> {data?.bs_business_category}</p>
                                <p><strong>Business Sub Category:</strong> {data?.bs_business_sub_category}</p>
                            </div>
                            {/* <div style={{ padding: "10px", overflowX: "auto" }}>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Business Name</th>
        <th>Owner Name</th>
        <th>Business Phone</th>
        <th>Email</th>
        <th>Password</th>
        <th>Pincode</th>
        <th>Building Name</th>
        <th>Colony Name</th>
        <th>Area</th>
        <th>Landmark</th>
        <th>City</th>
        <th>Business Image</th>
        <th>Business Description</th>
        <th>State</th>
        <th>Contact Person</th>
        <th>WhatsApp Number</th>
        <th>Business Type</th>
        <th>Business Category</th>
        <th>Business Sub Category</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{data?.bs_business_name}</td>
        <td>{data?.bs_owner_name}</td>
        <td>{data?.bs_business_phone}</td>
        <td>{data?.bs_email}</td>
        <td>{data?.bs_password}</td>
        <td>{data?.bs_pincode}</td>
        <td>{data?.bs_building_name}</td>
        <td>{data?.bs_colony_name}</td>
        <td>{data?.bs_area}</td>
        <td>{data?.bs_landmark}</td>
        <td>{data?.bs_city}</td>
        <td>
          {data?.bs_image && (
            <img
              src={`${WEB_API}${data.bs_image}`}
              alt="Business"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
          )}
        </td>
        <td>{data?.bs_desc}</td>
        <td>{data?.bs_state}</td>
        <td>{data?.bs_contact_person}</td>
        <td>{data?.bs_whatsapp_number}</td>
        <td>{data?.bs_business_type}</td>
        <td>{data?.bs_business_category}</td>
        <td>{data?.bs_business_sub_category}</td>
      </tr>
    </tbody>
  </table>
</div> */}

                        </div>
                         


                        {/* Business Timings */}
                        <div style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ margin: "0", display: "flex", alignItems: "center", fontSize: "16px", fontWeight: "bold" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M2 7h20v14H2zM4 9h16v10H4zm5-7h6v2H9zm-4.5 1H8v2H4.5zM16 4h3.5v2H16z" />
                                    </svg>
                                    <h5>Business Timings</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => console.log("View All Clicked")}
                                >
                                    View All
                                </button>
                            </div>

                            <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: "5px 0" }}>Day{data?.bt_day}</th>
                                        <th style={{ textAlign: "left", padding: "5px 0" }}>Opening Time{data?.bt_from_time}</th>
                                        <th style={{ textAlign: "left", padding: "5px 0" }}>Closing Time{data?.bt_to_time}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businessTimings.length > 0 ? (
                                        businessTimings.map((timing) => (
                                            <tr key={timing._id}>
                                                <td>{timing.bt_day}</td>
                                                <td>{timing.bt_from_time}</td>
                                                <td>{timing.bt_to_time}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No business timings available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>


                        </div>


                        {/* Services */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ margin: "0", display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M12 2a10 10 0 00-7.11 16.95l-1.38 3.49a1 1 0 001.25 1.26l3.49-1.38A10 10 0 1012 2zm5.75 10.36l-3.86 3.86a1 1 0 01-1.41 0l-2.08-2.09a1 1 0 010-1.41l.71-.71a1 1 0 011.41 0l1.37 1.37 3.15-3.15a1 1 0 011.41 0l.71.71a1 1 0 010 1.41z" />
                                    </svg>
                                    <h5>Services:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Services`)}
                                >
                                    View All
                                </button>
                            </div>

                            {/* Render Services Dynamically */}
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <div key={service._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${service.sv_img}`}
                                            alt={service.sv_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {service.sv_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {service.sv_desc}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Price:</strong> ${service.sv_price}</p>
                                        </div>


                                    </div>
                                ))
                            ) : (
                                <p>No services available.</p>
                            )}
                        </div>


                        {/* Amenity Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13h-2v2h-6v-2H7v-2h2v-2h6v2h2v2z" />
                                    </svg>
                                    <h5>Amenity</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Amenity`)}

                                >
                                    View All
                                </button>
                            </div>

                            {amenity.length > 0 ? (
                                amenity.map((amenity) => (
                                    <div key={amenity._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${amenity.amenity_img}`}
                                            alt={amenity.amenity_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {amenity.amenity_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {amenity.amenity_desc}</p>
                                            {/* <p style={{ margin: "5px 0" }}><strong>Price:</strong> ${amenity.amenity_price}</p> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Amenity available.</p>
                            )}
                        </div>




                        {/* Product Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M21 7V5H3v2H0v2h3v6H0v2h3v2h18v-2h3v-2h-3V9h3V7h-3zM5 7h14v10H5V7zm9 2v6h-2V9h2zm-4 0v6H8V9h2z" />
                                    </svg>
                                    <h5>Product:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Product`)}

                                >
                                    View All
                                </button>

                            </div>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${product.pd_img}`}
                                            alt={product.pd_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {product.pd_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {product.pd_desc}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Price:</strong> ${product.pd_price}</p>

                                        </div>


                                    </div>
                                ))
                            ) : (
                                <p>No Products available.</p>
                            )}
                        </div>

                        {/* Photos Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M21 7V5H3v2H0v2h3v6H0v2h3v2h18v-2h3v-2h-3V9h3V7h-3zM5 7h14v10H5V7zm9 2v6h-2V9h2zm-4 0v6H8V9h2z" />
                                    </svg>
                                    <h5>Photos:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/photos`)}

                                >
                                    View All
                                </button>
                            </div>

                            {photosData.length > 0 ? (
                                photosData.map((photo) => (
                                    <div key={photo._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${photo.ph_path}`}
                                            alt="Photo"
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />


                                    </div>
                                ))
                            ) : (
                                <p>No Photos available.</p>
                            )}
                        </div>


                        {/* Videos Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M21 7V5H3v2H0v2h3v6H0v2h3v2h18v-2h3v-2h-3V9h3V7h-3zM5 7h14v10H5V7zm9 2v6h-2V9h2zm-4 0v6H8V9h2z" />
                                    </svg>
                                    <h5>Videos:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/videos`)}
                                >
                                    View All
                                </button>
                            </div>

                            {videoData.length > 0 ? (
                                videoData.map((video) => (
                                    <div key={video._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <video
                                            controls
                                            width="160"
                                            height="90"
                                            style={{ borderRadius: "5px", marginRight: "15px" }}
                                            onError={(e) => e.target.src = "/placeholder.mp4"}
                                        >
                                            <source src={`${WEB_API}${video.vd_path}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                ))
                            ) : (
                                <p>No Videos available.</p>
                            )}
                        </div>



                        {/* Health Package Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ margin: "0", display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2v-6h-2v-2h6v2h-2v6z" />
                                    </svg>
                                    <h5>Health Packages:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Healthpackage`)}
                                >
                                    View All
                                </button>

                            </div>

                            {packages.length > 0 ? (
                                packages.map((packages) => (
                                    <div key={packages._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${packages.hpck_img}`}
                                            alt={packages.hpck_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {packages.hpck_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {packages.hpck_desc}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Price:</strong> ${packages.hpck_price}</p>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No health packages available.</p>
                            )}
                        </div>


                        {/* Lab Test Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M19.1 4.55L18 2h-4v2h2.4l.6 1H7.4l.6-1H10V2H6L4.9 4.55A4.992 4.992 0 0 0 3 9v8c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5V9c0-1.83-.98-3.41-2.45-4.45zM12 19c-2.21 0-4-1.79-4-4V9h8v6c0 2.21-1.79 4-4 4z" />
                                    </svg>
                                    <h5>Lab Test:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Labtest`)}
                                >
                                    View All
                                </button>

                            </div>
                            {labtest.length > 0 ? (
                                labtest.map((test) => (
                                    <div key={test._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${test.lt_img}`}
                                            alt={test.lt_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {test.lt_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {test.lt_desc}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Price:</strong> ${test.lt_price}</p>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No lab test  available.</p>
                            )}
                        </div>

                        {/* Facilities Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ margin: "0", display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5 17h14v2H5v-2zm0-4h14v2H5v-2zm0-4h14v2H5V9z" />
                                    </svg>
                                    <h5>Facilities:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Facilitys`)}
                                >
                                    View All
                                </button>

                            </div>

                            {facility.length > 0 ? (
                                facility.map((facility) => (
                                    <div key={facility._id} style={{ display: "flex", alignItems: "center", marginTop: "10px", paddingBottom: "10px" }}>
                                        <img
                                            src={`${WEB_API}${facility.facility_img}`}
                                            alt={facility.facility_name}
                                            style={{ width: "80px", height: "80px", borderRadius: "5px", marginRight: "15px", objectFit: "cover" }}
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div style={{ flex: "1" }}>
                                            <p style={{ margin: "5px 0" }}><strong>Name:</strong> {facility.facility_name}</p>
                                            <p style={{ margin: "5px 0" }}><strong>Description:</strong> {facility.facility_desp}</p>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No facilities available.</p>
                            )}
                        </div>

                        {/* Website */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ margin: "0", display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                    </svg>
                                    <h5>Website: </h5>
                                    <a href={website?.website_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "5px", color: "#007bff", textDecoration: "none" }}>
                                        {website?.website_url}
                                    </a>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Website`)}
                                >
                                    View All
                                </button>

                            </div>


                        </div>

                        {/* Social Media Section */}
                        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px", marginRight: "10px" }}>
                                        <path d="M22 5H2v14h20zm-9.25 7.25v3.25H10.5v-3.25H9V10.5h1.5v-1.25c0-1.2.68-1.88 2-1.88.58 0 .97 0 1.5.22V9h-1.75c-.59 0-.5.28-.5.73V10h2.75v1.25z" />
                                    </svg>
                                    <h5>Social Media:</h5>
                                </p>
                                <button
                                    style={{ background: "#a071fd", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    onClick={() => navigate(`/Sociallink`)}
                                >
                                    View All
                                </button>
                            </div>

                            {socialLinks.map((link) => (
                                <div key={link._id} style={{ display: "flex", alignItems: "center", padding: "5px 0" }}>
                                    <p style={{ margin: 0 }}>
                                        <strong>{link.platform_name}:</strong>
                                        <a href={link.platform_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "5px", color: "#007bff", textDecoration: "none" }}>
                                            {link.platform_url}
                                        </a>
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProfile;
