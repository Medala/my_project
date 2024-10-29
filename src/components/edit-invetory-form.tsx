
import { FaPlus } from "react-icons/fa";
import React, { useState, useRef, useEffect } from 'react'
import { useForm, useFormState } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";


  interface Props {
    saveEdit:(item:InventoryItem, index:number) => void;
    inventoryItemToEdit:InventoryItem;
    inventoryIndex:number;
    closeForm: ()=>void;
  }

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    quantity: z.coerce.number(),
    manager: z.string(),
    inventoryCode: z.string(),
    inventoryType: z.string(),
    pricePerUnit: z.coerce.number(),

  })
  
  type FormType = z.infer<typeof schema>
  
  
const EditInventoryForm = ({saveEdit, closeForm, inventoryItemToEdit, inventoryIndex}:Props) => {
    

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
    console.log('looking at the data submitted from the child component');
      console.log(data)
      const newItem:InventoryItem = {
        name: data.name,
        quantity: data.quantity,
        manager:data.manager,
        inventoryCode:data.inventoryCode,
        inventoryType:data.inventoryType,
        pricePerUnit: data.pricePerUnit
       }
        saveEdit(newItem, inventoryIndex);
        closeForm();
        reset();
        
  }

  useEffect(()=>{
    if(inventoryItemToEdit){
        console.log('trying to run reset from use effect');
        reset(inventoryItemToEdit)
    }
  },[reset, inventoryItemToEdit]);


  return (
    <>
    {<div onKeyDown={(e) => {e.code === "Escape" ? closeForm() : null}}  className='z-10 h-full absolute w-full backdrop-blur-sm flex items-center justify-center'>
                    <div className='h-2/4 rounded-lg w-2/4 bg-gray-400 overflow-clip shadow-lg'>

                     {/*  Form component title div */}
                      <div className="flex justify-center bg-gray-800 shadow-lg">
                        <div className="p-2 font-bold text-lg text-gray-400 text-grey-600">Edit Inventory</div>
                      </div>
                       {/*  End Form component title div */}


                        {/* Form body */}
                        <div className="flex w-full justify-center">
                        <form onSubmit={handleSubmit(handleFormSubmit)}className="w-full max-w-lg mt-4" >
                         {/*  <input {...register("name")}/>
                          <input {...register("age")} /> */}
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Item Name
      </label>
      <input  {...register("name")} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""/>
      {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Item Quantity
      </label>
      <input {...register("quantity")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder=""/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Manager
      </label>
      <input   {...register("manager")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder=""/>
      <p className="text-gray-600 text-xs italic">Assign a manager if required</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Inventory code
      </label>
      <input  {...register("inventoryCode")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder=""/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Inventory Type
      </label>
      <div className="relative">
        <select {...register("inventoryType")} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Construction</option>
          <option>Event</option>
          <option>Adventure</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Price per Unit
      </label>
      <input {...register("pricePerUnit")}   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="" />
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

export default EditInventoryForm

