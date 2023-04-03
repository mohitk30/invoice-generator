import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from '../../../components/InvoiceItem';
import InvoiceModal from '../../../components/InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import InvoiceHeader from '../invoiceList/InvoiceHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './invoiceEditor.css'
import {
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
  
  


  selectInvoices
} from './invoiceBuilderSlice'
import { useParams } from 'react-router-dom';
import {selectAllInvoices} from '../invoiceList/invoiceSlice'

const InvoiceCopyEditor =()=> {
 
  const {id}=useParams();

  const [isOpen,setIsOpen]=useState(false)
  const closeModal = (event) => setIsOpen(false);
  
  const invoice = useSelector(selectInvoices);
  const allInvoices=useSelector(selectAllInvoices)
  const dispatch = useDispatch();

  const openModal = (event) => {
    event.preventDefault()
    handleCalculateTotal()

    setIsOpen(true);

  };


  // console.log(invoice) 

  const onItemizedItemEdit=(evt)=>{

      var item = {
          id: evt.target.id,
          name: evt.target.name,
          value: evt.target.value
        };
        var items = invoice?.items.slice();
        var newItems = items.map(function(itemsBlock) {
          let finalItems={...itemsBlock};

          for (var key in finalItems) {
            if (key == item.name && finalItems.id == item.id) {
              finalItems[key] = item.value;
            }
          }
          return finalItems;
        });
        
         
        dispatch(updateItemsData(newItems))
        handleCalculateTotal();

  }
  const handleAddEvent=()=>{

    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    }
    dispatch(addItemsInInvoice(items))

  }
  const handleRowDel=(items)=>{

    var index = invoice?.items.indexOf(items);
    dispatch(deleteItemInInvoice(index))
   }

   const handleCalculateTotal=()=>{

     var items = invoice?.items;
       
      const subTotal = items.reduce((accumulator, item) => {
        return accumulator + (parseFloat(item.price).toFixed(2) * parseInt(item.quantity));
      }, 0);

      // console.log( sum)


      dispatch(setSubTotal(parseFloat(subTotal).toFixed(2)))
      dispatch(setInvoiceTax(parseFloat(parseFloat(subTotal) * (invoice?.invoiceTaxRate / 100)).toFixed(2)));

      dispatch(setInvoiceDiscount(parseFloat(parseFloat(subTotal) * (invoice?.invoiceDiscountRate / 100)).toFixed(2)));
      dispatch(setTotal(((subTotal - invoice?.invoiceDiscount) + parseFloat(invoice?.invoiceTax))))

      

   }
   const loadPreviousValues=()=>{
      var ino= allInvoices.filter((item)=> item.invoiceId==id);
      dispatch(setInvoiceDueDate(ino[0]?.invoiceDueDate))
      dispatch(setInvoiceNumber(ino[0]?.invoiceNo))
      dispatch(setInvoiceTo(ino[0]?.invoiceTo))
      dispatch(setInvoiceToEmail(ino[0]?.invoiceToEmail))
      dispatch(setInvoiceToAddress(ino[0]?.invoiceToAddress))
      dispatch(setInvoiceFrom(ino[0]?.invoiceFrom))
      dispatch(setInvoiceFromEmail(ino[0]?.invoiceFromEmail))
      dispatch(setInvoiceFromAddress(ino[0]?.invoiceFromAddress))
      dispatch(setInvoiceNote(ino[0]?.invoiceNote))
      dispatch(setInvoiceId((+ new Date() + Math.floor(Math.random() * 999999)).toString(36)))
      dispatch(setInvoiceCurrency(ino[0]?.invoiceCurrency))
      dispatch(setInvoiceTaxRate(ino[0]?.invoiceTaxRate))
      dispatch(setInvoiceDiscountRate(ino[0]?.invoiceDiscountRate))
      dispatch(updateItemsData(ino[0]?.items))
      dispatch(setSubTotal(ino[0]?.invoiceSubTotal))
      dispatch(setInvoiceTax(ino[0]?.invoiceTax))
      dispatch(setInvoiceDiscount(ino[0]?.invoiceDiscount))
      dispatch(setTotal(ino[0]?.setTotal))
       // console.log(ino);
      // console.log(invoice)

   }

   useEffect(()=>{
    loadPreviousValues();
    // dispatch(setInvoiceId(id))
  },[id])

  useEffect(()=>{
    // console.log(invoice)
    handleCalculateTotal();
  },[invoice])

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
    <Container>
      <Form onSubmit={openModal}>
      <InvoiceHeader />
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control type="date" value={invoice?.invoiceDueDate} name={"dateOfIssue"} onChange={(e) => dispatch(setInvoiceDueDate(e.target.value))} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control type="number" value={invoice?.invoiceNo} name={"invoiceNumber"} onChange={(e) => dispatch(setInvoiceNumber(e.target.value))} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={invoice?.invoiceTo} type="text" name="billTo" className="my-2" onChange={(e) => dispatch(setInvoiceTo(e.target.value))} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={invoice?.invoiceToEmail} type="email" name="billToEmail" className="my-2" onChange={(e) => dispatch(setInvoiceToEmail(e.target.value))} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={invoice?.invoiceToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(e) => dispatch(setInvoiceToAddress(e.target.value))} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={invoice?.invoiceFrom} type="text" name="billFrom" className="my-2" onChange={(e) => dispatch(setInvoiceFrom(e.target.value))} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={invoice?.invoiceFromEmail} type="email" name="billFromEmail" className="my-2" onChange={(e) => dispatch(setInvoiceFromEmail(e.target.value))} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={invoice?.invoiceFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(e) => dispatch(setInvoiceFromAddress(e.target.value))} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleRowDel} currency={invoice?.invoiceCurrency} items={invoice?.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>{invoice?.invoiceCurrency}
                    {invoice?.invoiceSubTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({invoice?.invoiceDiscountRate || 0}%)</span>
                    {invoice?.invoiceCurrency}
                    {invoice?.invoiceDiscount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                  <span>
                    <span className="small ">({invoice?.invoiceTaxRate || 0}%)</span>
                    {invoice?.invoiceCurrency}
                    {invoice?.invoiceTax || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">{invoice?.invoiceCurrency}
                    {invoice?.invoiceTotal || 0}</span>
                </div>
              </Col>
            </Row>

            {/* invoice note */}
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={invoice?.invoiceNote} onChange={(e) => dispatch(setInvoiceNote(e.target.value))} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
            <InvoiceModal showModal={isOpen} closeModal={closeModal} info={invoice} items={invoice?.items} currency={invoice?.invoiceCurrency} subTotal={invoice?.invoiceSubTotal} taxAmmount={invoice?.invoiceTax} discountAmmount={invoice?.invoiceDiscount} total={invoice?.invoiceTotal}/>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={(e) => dispatch(setInvoiceCurrency(e.target.value))} className="btn btn-light my-1" aria-label="Change Currency">
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxRate" type="number" value={invoice?.invoiceTaxRate} onChange={(e) => dispatch(setInvoiceTaxRate(e.target.value))} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountRate" type="number" value={invoice?.invoiceDiscountRate} onChange={(e) => dispatch(setInvoiceDiscountRate(e.target.value))} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
     </Form>
    </Container>
    </div>
    )
  }
// }

export default InvoiceCopyEditor;
