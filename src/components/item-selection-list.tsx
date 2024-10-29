

import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaMinus, FaMinusCircle } from 'react-icons/fa'
import { z } from 'zod'


const ItemSelectionList = ({slelectedInventoryList, deleteItemFromSelectedList }:{slelectedInventoryList: SelectedForRent[], deleteItemFromSelectedList: (targetIndex:number)=>void } ) => {

 
  


  return (
    <>
     
    
            {slelectedInventoryList.map( (item, index) => 
          
          <div  key={"A" + slelectedInventoryList.indexOf(item)} className='relative z-40 px-1 py-2 w-full bg-gray-200 rounded-lg mb-2  shadow-sm hover:bg-white'>

             <div>Item name: {item.name}</div>
             <div>Price per unit: {item.pricePerUnit}</div>
             <div>Qty: {item.quantity}</div>
             <div>Type: {item.inventoryType}</div>

             <div>Total {item.totalPrice}</div>
             
             

             <div typeof="button" onClick={()=>{deleteItemFromSelectedList(index)}} className='absolute cursor-pointer right-2 bottom-2  rounded-full h-6 w-6 hover bg-orange-500 hover:shadow-lg hover:h-12 hover:w-12 transition-all duration-100 flex items-center justify-center'>
             
             {/* Floating Action Button */}
              <span className='block text-white '>
              <FaMinus/>
              </span>
              
              </div>


            </div>
          )}




           
           
           
        
        

    </>
  )
}

export default ItemSelectionList