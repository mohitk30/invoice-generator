import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [
      {
        invoiceNo:1,
        invoiceId: 'baseid',
        invoiceDueDate:'2023-04-07',
    
        invoiceTo:'Mohit Kumar',
        invoiceToEmail:'test@gmail.com',
        invoiceToAddress:'Sorwa, Behror',
    
        invoiceFrom:'Sachin yadav',
        invoiceFromEmail:'sachin@gmail.com',
        invoiceFromAddress:'jaipur',
    
        items:[
          {
            id: 'id1di1',
            name: 'floppy disk',
            price: '1.00',
            description: 'A 256 gb floppy disk for pc',
            quantity: 1
          }
    
        ],
    
        invoiceSubTotal:1,
        invoiceDiscount:0,
        invoiceTax:0,
    
        invoiceTotal:1,
        invoiceNote:'',
    
        invoiceCurrency:'$',
        invoiceDiscountRate:0,
        invoiceTaxRate:0,
    
       },
    ],
    invoiceCount:1,
};


export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
     reducers: {
       addInvoice: (state,action) => {
        // add an invoice object to the list of invoice and then increase the count
        state.invoices.push(action.payload)
        state.invoiceCount=state.invoices.length;
      },
      updateInvoices:(state,action)=>{
        state.invoices=action.payload;
        state.invoiceCount=state.invoices.length;
      }
       
    }, 
     
  });
  

  // different action function exports
export const { addInvoice,updateInvoices } = invoiceSlice.actions;

export const selectAllInvoices = (state) => state.invoice.invoices;
export const selectInvoicesCount = (state) => state.invoice.invoiceCount;


export default invoiceSlice.reducer;
