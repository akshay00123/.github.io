import React ,{ useState } from 'react';
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const{Title}=Typography;
const {TextArea}=Input;


const Categories=[
    {key:1, value:"Shirt"},
    {key:2, value:"Pants"},
    {key:3, value:"Jeans"},
    {key:4, value:"T-shirt"},
    {key:5, value:"Shoes"},
    {key:6, value:"Kurtas"}

]
function UploadProductPage(props) {
     
    const [TitleValue, setTitleValue] = useState(" ")
    const [DescriptionValue, setDescriptionValue] = useState(" ")
    const [PriceValue, setPriceValue] = useState(0)
    const [Images, setImages] = useState([])
    const [CategoriesValue, setCategoriesValue] = useState(1)


    const onCategoriesSelectChange = (event) =>{
        setCategoriesValue(event.currentTarget.value)
 
     }

    const onTitlechange = (event) =>{
       setTitleValue(event.currentTarget.value)

    }
    const onDescriptionChange = (event) =>{
        setDescriptionValue(event.currentTarget.value)
    }
    const onPriceChange = (event) =>{
        setPriceValue(event.currentTarget.value)
 
     }



     const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit=(event)=>{
        
        
        event.preventDefault();

        
      if(!TitleValue||!DescriptionValue||!PriceValue||!Images||!CategoriesValue){
          alert('Please fill all the required fields')
      }
 
        const variables={
            writer:props.user.userData._id,
            title:TitleValue,
            description:DescriptionValue,
            price: PriceValue,
            categories:CategoriesValue,
            images:Images
        }
        Axios.post('/api/product/uploadProduct', variables)
        .then(response=>{
            if (response.data.success){
              alert('Product Successfully Uploaded')

              props.history.push('/')
            }  
             else{
                alert('Failed to upload Product')
            }
         })
 
 
   }
 




    return (
        <div style={{maxWidth:'700px' ,margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>Upload the product</Title>
        </div>


        <Form onSubmit={onSubmit}>
              <FileUpload  refreshFunction={updateImages}/>
          

            <br/>
            <br/>
            
            
            <label>Title</label>
            <Input onChange={onTitlechange}  
            value={TitleValue}/>
            
            
            <br/>
            <br/>

            <label>Description</label>
            <TextArea onChange={onDescriptionChange} value={DescriptionValue}/>

            <br/>
            <br/>
            
            
            <label>Price</label>
            <Input onChange={onPriceChange}
            value={PriceValue} type="number"/>
            

            <br/>
            <br/>
            <select onChange={onCategoriesSelectChange}>
                {Categories.map(item=>(
                    <option key={item.key} value={item.key}>{item.value}</option>
    
    ))}
               

            </select>
            <br/>
            <br/>
           < Button onClick={onSubmit}>Submit</ Button>
            
        </Form>
        </div>
    )
}

export default UploadProductPage
