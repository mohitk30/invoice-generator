import React from 'react'
import styles from './Invoice.module.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';




const InvoiceHeader =()=>{
    return (<>
        <div className={styles.navbarContainer}> 
            
            
            <div className={styles.invoiceBackButton}>
                 <NavLink to="/"> 
                    <Button >Bact to Invoices</Button>
                    </NavLink>
                </div>


        </div>
    </>)
}

export default InvoiceHeader;