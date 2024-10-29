
import { FaPlus } from "react-icons/fa";
import React, { useState, useRef, useEffect } from 'react'
import { useForm, useFormState } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";


  interface Props {
   // saveEdit:(item:InventoryItem, index:number) => void;
    selectItemForRent:(item:SelectedForRent, selectedQuantity:number, inventoryIndex:number) => void;
    inventoryItemToEdit:InventoryItem;
    inventoryIndex:number;
    closeForm: ()=>void;
  }

  
  
  
const SelectQuantityForm = ({selectItemForRent, closeForm, inventoryItemToEdit, inventoryIndex}:Props) => {
        console.log('here is the z object yyy ' + inventoryItemToEdit.quantity);

    const schema = z.object({
        selectedQuantity: z.coerce.number()
    
      })
      
      type FormType = z.infer<typeof schema>
    

  const { register, handleSubmit, formState: {errors}, reset } = useForm<FormType>({
    
    resolver: zodResolver(schema)
  })
    const[openFrom, setOpen] = useState(false);

    //const [inventoryList, updateInventory] = useState<InventoryItem[]>([]);

    function openForm(){
      
      setOpen((openFrom) => !openFrom);
    }

   


    console.log(errors);
    

  /* function addInventory(item:InventoryItem){
    updateInventory([
      ...inventoryList,
      item
    ]);
  } */

/*   const dropdownRef = useRef()
  useEffect(() => {
    const handler = (event) => {
     
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setOpen((false));
      }

    };
      document.addEventListener("click", handler)

      return () => {
        document.removeEventListener("click", handler)
      };
  }, [dropdownRef]); */

  const handleFormSubmit = async (data: FormType) => {
   
    const totalPrice = inventoryItemToEdit.pricePerUnit * data.selectedQuantity;
    //console.log('looking at the data submitted from the child component');
      //console.log(data)
      const newItem:SelectedForRent = {
        name: inventoryItemToEdit.name,
        id: 22,
        stockQuantity: inventoryItemToEdit.quantity,
        quantity: data.selectedQuantity,
        manager: inventoryItemToEdit.manager,
        inventoryCode:inventoryItemToEdit.inventoryCode,
        inventoryType: inventoryItemToEdit.inventoryType,
        pricePerUnit: inventoryItemToEdit.pricePerUnit,
        totalPrice: totalPrice,
       }
       selectItemForRent(newItem, data.selectedQuantity, inventoryIndex);
        closeForm();
        reset();
        
  }

  


  return (
    <>
    {<div onKeyDown={(e) => {e.code === "Escape" ? closeForm() : null}}  className='z-10 h-full absolute w-full backdrop-blur-sm flex items-center justify-center'>
                    <div className='h-2/4 rounded-lg w-2/4 bg-gray-400 overflow-clip shadow-lg'>

                     {/*  Form component title div */}
                      <div className="flex justify-center bg-gray-800 shadow-lg">
                        <div className="p-2 font-bold text-lg text-gray-400 text-grey-600">Sent rent quantity</div>
                      </div>
                       {/*  End Form component title div */}


                        {/* Form body */}
                        <div className="flex w-full justify-center">
                        <form onSubmit={handleSubmit(handleFormSubmit)}className="w-full max-w-lg mt-4" >
                         {/*  <input {...register("name")}/>
                          <input {...register("age")} /> */}
  <div className="flex flex-wrap -mx-3 mb-6">
    
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Item quantity for renal
      </label>
      <input {...register("selectedQuantity")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder=""/>
    </div>
  </div>
  
  <div className="w-full flex justify-between mt-4">
      <button onClick={() =>closeForm()} className="shadow bg-gray-800 hover:bg-gray-700 hover:text-white focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Cancel
      </button>

      <button type="submit" className="shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
        Save
      </button>
    </div>


</form>
</div>
                          {/* end of form body */}

                    </div>
              </div>}

              
    </>
  )
}

export default SelectQuantityForm

