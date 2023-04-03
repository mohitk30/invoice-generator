import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoiceNo:1,
    invoiceId: 'baseid',
    invoiceDueDate:'',

    invoiceTo:'',
    invoiceToEmail:'',
    invoiceToAddress:'',

    invoiceFrom:'',
    invoiceFromEmail:'',
    invoiceFromAddress:'',

    items:[
      {
        id: 'id1di1',
        name: '',
        price: '1.00',
        description: '',
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

};


export const invoiceBuilderSlice = createSlice({
    name: 'invoiceBuilder',
    initialState,
     reducers: {

      // invoice basic info 
      setInvoiceNumber: (state,action) => {
         state.invoiceNo = action.payload;
      },
      setInvoiceDueDate: (state,action) => {
        state.invoiceDueDate = action.payload;
     },
     setInvoiceTo: (state,action) => {
      state.invoiceTo = action.payload;
     },
     setInvoiceToEmail: (state,action) => {
      state.invoiceToEmail = action.payload;
     },
     setInvoiceToAddress: (state,action) => {
      state.invoiceToAddress = action.payload;
     },
     setInvoiceFrom: (state,action) => {
      state.invoiceFrom = action.payload;
     },
     setInvoiceFromEmail: (state,action) => {
      state.invoiceFromEmail = action.payload;
     },
     setInvoiceFromAddress: (state,action) => {
      state.invoiceFromAddress = action.payload;
     },
     setInvoiceNote: (state,action) => {
      state.invoiceNote = action.payload;
     },
     setInvoiceId: (state,action) => {
      state.invoiceId = action.payload;
     },

     // currency and rates
     setInvoiceCurrency: (state,action) => {
      state.invoiceCurrency = action.payload;
     },
     setInvoiceTaxRate: (state,action) => {
      state.invoiceTaxRate = action.payload;
     },
     setInvoiceDiscountRate: (state,action) => {
      state.invoiceDiscountRate = action.payload;
     },

    //  item functions
     addItemsInInvoice:(state,action)=>{
      state.items.push(action.payload)
     },
     deleteItemInInvoice:(state,action)=>{
      state.items.splice(action.payload, 1);
     },
     updateItemsData:(state,action)=>{
      state.items=action.payload;
     },

     // aggregate functions
     setSubTotal:(state,action)=>{
      state.invoiceSubTotal=action.payload;
     },
     setInvoiceTax:(state,action)=>{
      state.invoiceTax =action.payload;
     },
     setInvoiceDiscount:(state,action)=>{
      state.invoiceDiscount =action.payload;
     },
     setTotal:(state,action)=>{
      state.invoiceTotal =action.payload;
     },

    




       
    },
     
  });
  

  // different action function exports
export const { 
  setInvoiceNote,
  setInvoiceCurrency,
  setInvoiceTaxRate,
  setInvoiceDiscountRate,
  setInvoiceFromAddress,
  setInvoiceFromEmail,
  setInvoiceFrom,
  setInvoiceToAddress,
  setInvoiceToEmail,
  setInvoiceTo,
  setInvoiceDueDate,
  setInvoiceNumber,
  addItemsInInvoice,
  deleteItemInInvoice,
  updateItemsData,
  setSubTotal,
  setInvoiceTax,
  setInvoiceDiscount,
  setTotal,
  setInvoiceId,






 } = invoiceBuilderSlice.actions;

export const selectInvoices = (state) => state.invoiceBuilder;
 

export default invoiceBuilderSlice.reducer;
