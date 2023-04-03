import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Invoice from './features/invoiceList/Invoice';
import { selectInvoicesCount, } from './features/invoiceList/invoiceSlice';
// import ViewModel



const Home =()=>{

    const count = useSelector(selectInvoicesCount);
    


    return (<>

        <div className={styles.navbarContainer}> 
            
            <div className={styles.navbar_title} >Invoices</div>
            <div className={styles.newInvoiceButton}>
                 <NavLink to="/create-invoice"> 
                    <Button >Create New Invoice</Button>
                    </NavLink>
                </div>


        </div>

        <div className={styles.totalInvoices} >Total Invoices: {count}</div>

        <div className={styles.invoicesList}>
            <Invoice />
        </div>
    </>)
}

export default Home;