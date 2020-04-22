


import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    getCartItems
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty } from 'antd';

function CartPage(props) {
    const dispatch = useDispatch();
    
    useEffect(() => {

        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    
            }
        }

    }, [props.user.userData])

  


  
  

    

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>

                <UserCardBlock
                    products={props.user.cartDetail}
                    
                />
            <div style={{ marginTop: '3rem' }}>
               <h2>Total Amount: Rs.</h2>
            </div>
            <Result status ="success"  title="Successfully purchased Items"/>
            <div style={{width:'100%', display:'flex',flexDirection:'column',justifyContent:'center'}}>
             <br/>
             <br/>
             <Empty description={false}/>
             <p>No Items In The Cart </p>
             

               
            </div>

         </div>

           


        </div>
    )
}

export default CartPage
