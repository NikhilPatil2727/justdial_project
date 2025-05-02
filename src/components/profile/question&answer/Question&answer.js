import { useState, useEffect } from "react";
import { fetchQuestion_answer,addQuestion_answer,updateQuestion_answer,deleteQuestion_answer,viewQuestion_answer} from "./Service";

const Question_answer = () => {

 const [data,setData]=useState()
        const fetchQuestion_answerData = async ()=>{
            try{
                const response=await fetchQuestion_answer();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addQuestion_answerData = async ()=>{
            try{
                const response=await addQuestion_answer();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updateQuestion_answerData = async ()=>{
            try{
                const response=await updateQuestion_answer();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deleteQuestion_answerData = async ()=>{
            try{
                const response=await deleteQuestion_answer();
                setData(response.data);
            }
            catch(error){
                console.log()
            }
          
        };
        const viewQuestion_answerData = async ()=>{
            try{
                const response=await viewQuestion_answer();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchQuestion_answerData();
        },[]);
        return(
            <>
            </>
        )
    }
    export default Question_answer;