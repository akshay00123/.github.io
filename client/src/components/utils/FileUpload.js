import React, {useState} from 'react'
import {Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

function FileUpload(props) {

      const [Images, setImages] = useState([])       

    const onDrop=(files)=>{
        let formData=new FormData();
        const config={
            header:{'content-type':'multipart/form-data'}
        }         
               formData.append("file",files[0])
                 //Save the image to save inside node server
       

                 Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }
       
    const onDelete=(image)=>{
        const currentIndex=Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex,1)

        setImages(newImages)
        props.refreshFunction(newImages)                  
    }
    
    
    
    
    
    
    
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <Dropzone 
            onDrop={onDrop}
            multiple={false}
            maxSize={10000000}
            >
                
              {({getRootProps, getInputProps})=>(
                  <div style={{width:'300px',height:'240px', border:'1px solid lightgray', dispaly:'flex', alignItems:'center', justifyContent:'center',paddingBlockStart:'6rem',paddingInlineStart:'7rem'}}
                    {...getRootProps()}                  
                  >
                   <input {...getInputProps()}/>
                   <Icon type="plus" style={{fontSize:'3rem'}}/>
                  </div>
              )}
           </Dropzone>

              
              
               <div style={{display:'flex',width:'350px',height:'240px',overflowX:'scroll'}}>
                   
                   
                   {Images.map((image,index)=>
                   <div onClick={ () => onDelete(image)}>
                   <img style={{minWidth:'300px', width:'300px', height:'240px'}} src={`http://localhost:5000/${image}`} alt={`productImg-${image}`}/>



               </div>
               )}
                   

               </div>
            
        </div>
    )
}

export default FileUpload
