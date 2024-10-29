import Navbar from '@components/Navbar'
import EditInventoryForm from '@components/edit-invetory-form'
import ItemSelectionList from '@components/item-selection-list'
import LeftPanel from '@components/left-panel'
import NewInventoryForm from '@components/new-inventory-form'
import SelectQuantityForm from '@components/select-quantity-form'
import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { array, boolean, z } from 'zod'


const Inventory = () => {

  const [slelectedInventoryList, updateSelectedInventory] = useState<SelectedForRent[]>([]);
    
  
  function addToSelectedInventory(item:SelectedForRent, itemQuantity:number, inventoryIndex:number){
    var add = true;
    if(slelectedInventoryList.length > 0){
      slelectedInventoryList.forEach(element => {
        console.log('xxxxxxxxxxxxxxxxxxxxxx');
        
        console.log(element.name + " & " + item.name);
        console.log('xxxxxxxxxxxxxxxxxxxxxx');

        if(element.name == item.name){
          add = false;
          console.log("did not find a match threfore cannot add");
        }
      });
  
  if(add){

    updateSelectedInventory([
      ...slelectedInventoryList,
      item
    ])

    var itemToupdate = inventoryList[inventoryIndex];
   
    console.log('item to update quantity:  ' + itemToupdate.quantity +  ", inventory index : " + inventoryIndex);
    console.log('Item from inventory list count :  ' + itemToupdate.quantity );
    console.log('selected item count:  ' + item.quantity );
    var remainingCount = itemToupdate.quantity - item.quantity;
    itemToupdate.quantity = remainingCount;
   
    saveEdit(itemToupdate, inventoryIndex);

    
    //refreshQuanity(itemQuantity, inventoryIndex);
  }else{
    alert('Item already in list');
  }

    }else{
     
      updateSelectedInventory([
        ...slelectedInventoryList,
        item
      ]);

      var itemToupdate = inventoryList[inventoryIndex];
   
    console.log('item to update quantity:  ' + itemToupdate.quantity +  ", inventory index : " + inventoryIndex);
    console.log('Item from inventory list count :  ' + itemToupdate.quantity );
    console.log('selected item count:  ' + item.quantity );
    var remainingCount = itemToupdate.quantity - item.quantity;
    itemToupdate.quantity = remainingCount;
   
    saveEdit(itemToupdate, inventoryIndex);
    }
    }

    

  const [inventoryList, updateInventory] = useState<InventoryItem[]>([]);

  function addInventory(item:InventoryItem){
    updateInventory([
      ...inventoryList,
      item
    ]);
  }34

  function deleteItemFromSelectedList(targetIndex:number){

      const newArray = slelectedInventoryList.filter((item, index) => index !== targetIndex);

      updateSelectedInventory([...newArray]);
  }
  

  function saveEdit(item:InventoryItem, index:number){
    console.log(`ran save edit from the parent component 88888 ${index}`);
    console.log(item);
    const newList = inventoryList.map((inventory, localIndex)=>{
          if(localIndex !== index){
            return inventory;
            
          }else{
             console.log('Found a match');
            return item;
            
          }
    });
    console.log('below is the new list');
    console.log(newList);

    if(newList){

      updateInventory(newList);
    }
    
    console.log(inventoryList[index].name);
  }


  function refreshQuanity(itemQuantity:number, index:number){
    console.log(`ran save edit from the parent component 88888 ${index}`);
 
    const newList = inventoryList.map((inventory, localIndex)=>{
          if(localIndex !== index){
            return inventory;
            
          }else{
             console.log('Found a match');
            inventory.quantity = itemQuantity
            return inventory;
            
          }
    });
    console.log('below is the new list');
    console.log(newList);

    if(newList){

      updateInventory(newList);
    }
    
    console.log(inventoryList[index].name);
  }

  const[openEdit, setOpen] = useState(false);
  const[canAdd, setCanAdd] = useState(false);
  const[openSetQtyForm, setOpenQtyForm] = useState(false);
  const[activeIndex, setActiveIndex] = useState<number>(0);
  const[selectedInventory, setActiveInventory] = useState<InventoryItem>();

/*   function openSetQuantityForm(){
    setOpenQtyForm(true);
  } */

  function closeSetQuantityForm(){
    setOpenQtyForm(false);
  }

  function openSelectForInventoryForm(item:InventoryItem, index:number){
      setActiveInventory(item);
      setActiveIndex(index);
      setOpenQtyForm(true);

  }


  function openInventory(item:InventoryItem, index:number){

        setActiveIndex(inventoryList.indexOf(item));
       // console.log('ran set active inventory list ' + item);
        setActiveInventory(item);
        setOpen(true);
  }


  function resetQuantityAfterSelectRent(item:SelectedForRent, selectedQuantity:number, inventoryIndex:number){
    console.log('here is the selected quantity ' + selectedQuantity);
      const remainingQuantity = item.stockQuantity - selectedQuantity;
      console.log('ranResetQuantityAfterSelectRent' + remainingQuantity);
      // item.quantity = remainingQuantity;
      
       addToSelectedInventory(item, remainingQuantity, inventoryIndex);
  }

  function closeEditForm(){
    setOpen(false);
  }

  return (
    <>
     <Navbar/>
            <div className='flex flex-cols-3 relative bg-red-300'>

            <NewInventoryForm addInventory={addInventory} />
          {/*   {openEdit <EditInventoryForm saveEdit={} />} */}

           {openEdit && selectedInventory && <EditInventoryForm closeForm={closeEditForm} inventoryIndex={activeIndex} saveEdit={saveEdit} inventoryItemToEdit={selectedInventory}/>}
              
            {openSetQtyForm && selectedInventory && <SelectQuantityForm closeForm={closeSetQuantityForm} inventoryItemToEdit={selectedInventory} selectItemForRent={resetQuantityAfterSelectRent} inventoryIndex={activeIndex}/>}


             <LeftPanel/>



              <div className='flex bg-green-100 w-full'>

{/*   availabel inventory list */}
             
              <div className='grow'>
             <div className='p-2 flex flex-col flex-auto text-xs'>
             <div>Inventory List</div>

            {inventoryList.map( (item, index) => 
          
          <div onClick={() => {openInventory(item, index)}} key={inventoryList.indexOf(item)} className='relative px-1 py-2 w-full flex bg-gray-200 rounded-lg mb-2  shadow-sm hover:bg-white'>
               
               <div>
                    <div>Item name: {item.name}</div>
                    <div>Available in stock: {item.quantity}</div>
                    <div>Type: {item.inventoryType}</div>
                    <div>Manager: {item.manager}</div>
                    <div>Price per unit: {item.pricePerUnit}</div>
                </div>

                <div className='absolute right-2 top-1'>
                 <button typeof='button' onClick={(e) =>{e.stopPropagation(); openSelectForInventoryForm(item, index)}} className='p-2 bg-orange-300 rounded-lg'>Assign rental</button>
                </div>

            </div> 
          )}
          </div> 
          </div>
{/*  end availabel inventory list */}



{/* selected inventory list */}
          <div className='grow'>
          <div className='p-2 flex flex-col flex-auto text-xs'>
                <div>Selected Inventory</div>
              <ItemSelectionList  slelectedInventoryList={slelectedInventoryList} deleteItemFromSelectedList={deleteItemFromSelectedList}/>
          </div>
          </div>
          {/*  end of selected inventory list */}

          </div>

            </div>
          

    </>
  )
}

export default Inventory