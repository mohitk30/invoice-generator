import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import { redirect } from "react-router-dom";
import { addInvoice,selectAllInvoices,updateInvoices } from '../appComponents/features/invoiceList/invoiceSlice';
import {setInvoiceId} from '../appComponents/features/invoicesBuilder/invoiceBuilderSlice'

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  });
}



const  InvoiceModal =(props)=> {

  const invoices = useSelector(selectAllInvoices);

  const dispatch = useDispatch();
 
  function saveInvoice(){
    
      var editedInvoice=invoices.filter((invoice)=>invoice.invoiceId!==props.info.invoiceId);
      // dispatch(setInvoiceId((+ new Date() + Math.floor(Math.random() * 999999)).toString(36)))
      editedInvoice.push(props.info)
      dispatch(updateInvoices(editedInvoice))
    
    props.closeModal();
  }

    
    return(
      <div>
        <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">{props.info.invoiceFrom||'John Uberbacher'}</h4>
                <h6 className="fw-bold text-secondary mb-1">
                  Invoice #: {props.info.invoiceNo||''}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary"> {props.info.invoiceCurrency} {props.info.invoiceTotal}</h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Billed to:</div>
                  <div>{props.info.invoiceTo||''}</div>
                  <div>{props.info.invoiceToEmail||''}</div>
                  <div>{props.info.invoiceToAddress||''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">Billed From:</div>
                  <div>{props.info.invoiceFrom||''}</div>
                  <div>{props.info.invoiceFromEmail||''}</div>
                  <div>{props.info.invoiceFromAddress||''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold mt-2">Date Of Due:</div>
                  <div>{props.info.invoiceDueDate||''}</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>QTY</th>
                    <th>DESCRIPTION</th>
                    <th className="text-end">PRICE</th>
                    <th className="text-end">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td style={{width: '70px'}}>
                          {item.quantity}
                        </td>
                        <td>
                          {item.name} - {item.description}
                        </td>
                        <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {item.price}</td>
                        <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {item.price * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>SUBTOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {props.info.invoiceSubTotal}</td>
                  </tr>
                  {props.info.invoiceTax != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>TAX</td>
                      <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {props.info.invoiceTax}</td>
                    </tr>
                  }
                  {props.info.invoiceDiscount != 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
                      <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {props.info.invoiceDiscount}</td>
                    </tr>
                  }
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{props.info.invoiceCurrency} {props.info.invoiceTotal}</td>
                  </tr>
                </tbody>
              </Table>
              {props.info.invoiceNote &&
                <div className="bg-light py-3 px-4 rounded">
                  {props.info.invoiceNote}
                </div>}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={saveInvoice}>
                  <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Save and Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3"/>
      </div>
    )
  
}

export default InvoiceModal;
