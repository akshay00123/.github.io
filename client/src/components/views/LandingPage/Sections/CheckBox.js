import React , {useState}from 'react'
import {Checkbox, Collapse} from 'antd';


const {Panel}= Collapse;



function CheckBox(props) {
  
    const [Checked, setChecked] = useState([])

    const handleToggle=(value)=>{

        
        const currentIndex=Checked.indexOf(value);
        const newChecked=[...Checked];
        if(currentIndex=== -1){
            newChecked.push(value)
        }
        else{
            newChecked.splice(currentIndex,1)
        }
      
        setChecked(newChecked)
        props.handleFilters(newChecked)

        //update this checked infornmation into parent component
         

    }
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Categories" key="1">
                    {props.list && props.list.map((value,index)=>(
                       <React.Fragment key={index}>
                               <Checkbox onChange={()=>handleToggle(value._id)} type="checkbox" checked={Checked.indexOf(value._id)=== -1?false:true}/>
                               <span>{value.name}</span>
                        </React.Fragment>
                       ))}
                   
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
