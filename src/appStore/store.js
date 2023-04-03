import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../appComponents/features/invoiceList/invoiceSlice';
import invoiceBuilderReducer from '../appComponents/features/invoicesBuilder/invoiceBuilderSlice';

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    invoiceBuilder:invoiceBuilderReducer
   },
});
