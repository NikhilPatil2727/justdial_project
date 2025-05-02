import UploadcategoryImage from '../../../assets/profile/images/cat.jpg';
import Profilenav from '../profilenav/Profilenav';
import { fetchUploadcategory,addUploadcategory,updateUploadcategory,deleteUploadcategory,viewUploadcategory} from "./Service";
import { useState, useEffect } from "react";
const Uploadcategory = () => {

    const [data,setData]=useState()
           const fetchUploadcategoryData = async ()=>{
               try{
                   const response=await fetchUploadcategory();
                   setData(response.data);
               }
               catch(error){
                   console.log(error)
               }
             
           };
   
           const addUploadcategoryData = async ()=>{
               try{
                   const response=await addUploadcategory();
                   setData(response.data);
               }
               catch(error){
                   console.log(error)
               }
             
           };
   
           const updateUploadcategoryData = async ()=>{
               try{
                   const response=await updateUploadcategory();
                   setData(response.data);
               }
               catch(error){
                   console.log(error)
               }
             
           };
   
           
           const deleteUploadcategoryData = async ()=>{
               try{
                   const response=await deleteUploadcategory();
                   setData(response.data);
               }
               catch(error){
                   console.log(error)
               }
             
           };
           const viewUploadcategoryData = async ()=>{
               try{
                   const response=await viewUploadcategory();
                   setData(response.data);
               }
               catch(error){
                   console.log(error)
               }
             
           };
           useEffect(()=>{
               fetchUploadcategoryData();
           },[]);
       return(
        <>
        <Profilenav />
         
    <div className="container website-container mt-5">
        <div className="row">
            {/* <!-- Left column for the image --> */}
            <div className="col-md-6 img-fluid-rounded">
                <img src={UploadcategoryImage} height="350px;" width="400px;" alt="Upload Category"/>
            </div>
    
            {/* <!-- Right column for the form --> */}
            <div className="col-md-6 form-container-biz">
                {/* <p className="page-heading">Upload Category</p> */}
                <div className="card-header text-center text-white mb-3">
              <h4>Upload Category</h4>
            </div>
    
                <form id="categoryForm">
                    <div className="form-card-website">
                        {/* <!-- Category Select Dropdown --> */}
                        <div className="form-group">
                            <label className="website-label" for="categorySelect">Select Category:</label>
                            <select className="website-input" id="categorySelect" name="category" required>
                                <option value="">--Select Category--</option>
                                <option value="Business">Business</option>
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>
                        </div>
    
                        {/* <!-- Submit Button --> */}
                        <div className="text-center">
                            <button type="submit" className="btn-save">Upload Category</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
        </>
    )
}
export default Uploadcategory;