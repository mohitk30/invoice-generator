import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Invoice.module.css'
import { Button, message, Popconfirm } from 'antd';
import {selectAllInvoices,updateInvoices} from './invoiceSlice' 
import ViewModal from '../invoicesBuilder/ViewModal';
import { NavLink } from 'react-router-dom';


const Invoice=()=>{
     const allInvoices= useSelector(selectAllInvoices)
    // console.log(allInvoices)  
    const [modelInvoice,setModelInvoice]= useState(null);
    const dispatch = useDispatch();

    const deleteUserInvoice=(id)=>{
        var editedInvoice=allInvoices.filter((invoice)=>invoice.invoiceId!==id);
        dispatch(updateInvoices(editedInvoice))
    }

    const text = 'Are you sure to delete this Invoice?';
    const description = 'Delete the Invoice';
    const confirm = (id) => {
    message.success('Invoice Deleted.');
    deleteUserInvoice(id);
    };
    
    // console.log(allInvoices)

    const [isOpen,setIsOpen]=useState(false)
    const closeModal = (event) => setIsOpen(false);
    const openModal = (ino) => { 
        setModelInvoice((pre)=>{
            return ino;
        })    
        setIsOpen(true);
      };


return (
    <>
   
    
   {
       ( modelInvoice!==null &&    <ViewModal showModal={isOpen} closeModal={closeModal} info={modelInvoice} items={modelInvoice?.items} currency={modelInvoice?.invoiceCurrency} subTotal={modelInvoice?.invoiceSubTotal} taxAmmount={modelInvoice?.invoiceTax} discountAmmount={modelInvoice?.invoiceDiscount} total={modelInvoice?.invoiceTotal}/> )
    }

    <div className={styles.container}>
   

        {
           allInvoices.map((invoice,index)=>{ 
            return (


                  
                 <div className={styles.invoiceContainer} key={index+100}>    

                   <div>InvoiceNo : {invoice.invoiceNo}</div>
                    <div>
                        <div>From: <span className={styles.boldText}>{invoice.invoiceFrom}</span></div>
                        <div>To: <span className={styles.boldText}>{invoice.invoiceTo}</span></div>
                        <div>Due Date: <span className={styles.boldText}>{invoice.invoiceDueDate}</span></div>
                        <div>Total: <span className={styles.boldText}>{invoice.invoiceCurrency}{invoice.invoiceTotal}</span></div>
                        
                        <div className={styles.buttonsContainer}>

                        <Popconfirm
                            placement="topLeft"
                            title={text}
                            description={description}
                            onConfirm={()=> confirm(invoice.invoiceId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" className={styles.buttonsMargin} danger >Delete </Button>
                        </Popconfirm>

                        <NavLink to={`/edit/${invoice.invoiceId}`}>
                        <Button type="primary"  className={styles.buttonsMargin} >Edit </Button>
                        </NavLink>
                        <Button type="primary"  className={styles.buttonsMargin} onClick={()=> openModal(invoice)} >View </Button>
                        
                        <NavLink to={`/create-with-copy/${invoice.invoiceId}`}>
                        <Button type="primary"  className={styles.buttonsMargin} >Create Copy </Button>
                        </NavLink>

                        </div>
                    </div>
                   </div>
              )
           })
        }
    </div>
    </>
    )
}

export default Invoice;