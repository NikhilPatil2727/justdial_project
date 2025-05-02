import { fetchPricelist,addPricelist,updatePricelist,deletePricelist,viewPricelist} from "./Service";
import { useState, useEffect } from "react";
const Pricelist = () => {

 const [data,setData]=useState()
        const fetchPricelistData = async ()=>{
            try{
                const response=await fetchPricelist();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addPricelistData = async ()=>{
            try{
                const response=await addPricelist();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updatePricelistData = async ()=>{
            try{
                const response=await updatePricelist();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deletePricelistData = async ()=>{
            try{
                const response=await deletePricelist();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        const viewPricelistData = async ()=>{
            try{
                const response=await viewPricelist();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchPricelistData();
        },[]);
        return(
            <>


            </>
        )
    }
    export default Pricelist;