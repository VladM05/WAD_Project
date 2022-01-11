import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    resetCart: (state,action) =>{
      state.products=[];
      state.quantity=0;
      state.total=0;
    },
    removeProduct:(state,action) =>{
      const found=state.products.findIndex(product => product._id===action.payload._id && product.size===action.payload.size);
      state.products.splice(found,1);
      state.total-=action.payload.price;
      state.quantity-=1;
    }
  },
});

export const { addProduct,resetCart,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;