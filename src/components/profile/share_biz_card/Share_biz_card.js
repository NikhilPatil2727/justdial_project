import React from 'react';
import pe2Image from '../../../assets/profile/images/pe2.jpg'; // Import the image
import Profilenav from '../profilenav/Profilenav';
import { fetchShare_biz_card,addShare_biz_card,updateShare_biz_card,deleteShare_biz_card,viewShare_biz_card} from "./Service";
import { useState, useEffect } from "react";


const Share_biz_card = () => {

 const [data,setData]=useState()
        const fetchShare_biz_cardData = async ()=>{
            try{
                const response=await fetchShare_biz_card();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addShare_biz_cardData = async ()=>{
            try{
                const response=await addShare_biz_card();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updateShare_biz_cardData = async ()=>{
            try{
                const response=await updateShare_biz_card();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deleteShare_biz_cardData = async ()=>{
            try{
                const response=await deleteShare_biz_card();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        const viewShare_biz_cardData = async ()=>{
            try{
                const response=await viewShare_biz_card();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchShare_biz_cardData();
        },[]);


    const sendWhatsAppMessage = () => {
        // Add the logic for sending the WhatsApp message here
        alert('Message sent via WhatsApp!');
    };

    return (
        <>
            <Profilenav />

            <div class="container mt-5">
            <div class="row align-items-center">
                <div className="col-md-5 image-container-biz">
                    <img src={pe2Image} height="400px" alt="Image Description" />
                </div>
                <div className="col-md-7  restorent-img">
                    <div className="form-container-biz">

                        <div className="card-header text-center text-white mb-3">
                            <h4>Send WhatsApp Message</h4>
                        </div>

                        <form id="whatsappForm">
                            <div className="form-group">
                                <label htmlFor="mobileNumber">Mobile Number</label>
                                <input type="text" id="mobileNumber" className="form-control" placeholder="Enter mobile number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="form-control" rows="4" placeholder="Enter your message"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea id="address" className="form-control" rows="2" placeholder="Enter address (optional)"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" onClick={sendWhatsAppMessage} className="btn-save">Send WhatsApp Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Share_biz_card;
