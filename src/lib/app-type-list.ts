
type InventoryItem = {
    name: string;
    quantity: number;
    manager:string;
    inventoryCode: string;
    inventoryType: string;
    pricePerUnit: number;
  };

  type SelectedForRent = {
    name: string;
    stockQuantity: number;
    id:number;
    quantity: number;
    manager:string;
    inventoryCode: string;
    inventoryType: string;
    pricePerUnit: number;
    totalPrice: number;
  };