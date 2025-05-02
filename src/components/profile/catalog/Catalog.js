import { fetchCatalog,addCatalog,updateCatalog,deleteCatalog,viewCatalog } from "./Service";
import { useState, useEffect} from "react";

const Catalog = ()=>{
    
            const [data,setData]=useState()
            const fetchCatalogData = async ()=>{
                try{
                    const response=await fetchCatalog();
                    setData(response.data);
                }
                catch(error){
                    console.log(error)
                }
              
            };
            const addCatalogData = async ()=>{
                try{
                    const response=await addCatalog();
                    setData(response.data);
                }
                catch(error){
                    console.log(error)
                }
              
            };
            const updateCatalogData = async ()=>{
                try{
                    const response=await updateCatalog();
                    setData(response.data);
                }
                catch(error){
                    console.log(error)
                }
              
            };
            const deleteCatalogData = async ()=>{
                try{
                    const response=await deleteCatalog();
                    setData(response.data);
                }
                catch(error){
                    console.log(error)
                }
              
            };
            const viewCatalogData = async ()=>{
                try{
                    const response=await viewCatalog();
                    setData(response.data);
                }
                catch(error){
                    console.log(error)
                }
              
            };
            useEffect(()=>{
                fetchCatalogData();
            },[]);
    return(
        <>
        </>
    )
}
export default Catalog;