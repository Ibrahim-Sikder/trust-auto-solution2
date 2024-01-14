/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import logo from "../../../../public/assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Details = () => {
  const componentRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 

  const [quotationPreview, setQuotationPreview] = useState({});
  const [loading, setLoading] = useState(false);
 
const [invoice, setInvoice] = useState()

 

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/quotation/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setQuotationPreview(data);
          setLoading(false);
        });
    }
  }, [id]);

 
  // const handleAddToQuotation = async (e) => {
  //   e.preventDefault();

  //   const values = {
  //     username: quotationPreview.username,
  //     job_no: quotationPreview.job_no,
  //     date: quotationPreview.date,
  //     car_registration_no: quotationPreview.car_registration_no,
  //     customer_name: quotationPreview?.customer_name,
  //     contact_number: quotationPreview?.contact_number,
  //     descriptions: quotationPreview.descriptions,
  //     quantity: quotationPreview.quantity,
  //     rate: quotationPreview.rate,
  //     amount: quotationPreview.total,
  //     total_amount: quotationPreview.total_amount,
  //     discount: quotationPreview.discount,
  //     vat: quotationPreview.vat,
  //     net_total: quotationPreview.net_total,
  //   };

  //   const response = await axios.post(
  //     "http://localhost:5000/api/v1/quotation",
  //     values
  //   );

  //   if (response.data.message === "Successfully quotation post") {
  //     navigate("/dashboard/qutation-view");
  //   }
  // };
  const invoiceData = [
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
    {
      id: 1,
      desc: "",
      quantity: 5,
      rate: 555,
      amount: 20000,
    },
  ];
  return (
    <main className="invoicePrintWrap">
      <div ref={componentRef}>
        <div ref={targetRef} className="py-5 px-5 invoicePrint">
          <div className=" mb-2 mx-auto text-center border-b-2 border-[#351E98] pb-2">
            <div className="flex  justify-between items-center mb-2">
              <img className="w-[150px] " src={logo} alt="logo" />
              <h2 className="trustAutoTitle ">Trust Auto Solution </h2>
            </div>
            <p className="text-[#426EA0] italic text-sm">
              It's trusted computerized Organization for all kinds of vehicle
              check up & maintenance such as computerized Engine Analysis,
              Engine tune up, Denting, Painting, Engine, AC, Electrical Works &
              Car Wash.{" "}
            </p>
          </div>
          <div></div>
          <div>
 
            <div className="flex items-center justify-between">
              <button className="invoiceOrderBtn">
                {" "}
                {quotationPreview?.job_no}
              </button>
              <b>Date: {quotationPreview?.date} </b>
            </div>
            <table className="invoicTable mt-5">
              <tr>
                <th> Order Number</th>
                <th> Customer Name </th>
                <th> Car Number </th>
                <th> Mobile Number</th>
              </tr>
              <tbody>
                <tr>
                  <td>{quotationPreview.job_no}</td>
                  <td> {quotationPreview.customer_name}</td>
                  <td>{quotationPreview.car_registration_no}</td>
                  <td>{quotationPreview.contact_number}</td>
                </tr>
              </tbody>
            </table>
 
           <div className="flex items-center justify-between">
           <button className="invoiceOrderBtn">SL:40</button>
           <b>Date: 12/12/23 </b>
           </div>
           <div className="flex items-center justiyf-between">
         <table className="invoicTable inVoiceTables mt-5">
            <tr>
              <th>  Name </th>
              <th> Address </th>
            </tr>
            <tbody>
              <tr className="borderNone">
                <td >Al Amin </td>
              </tr>
              <tr>
                <td>Kuril Bishawroad, Dhaka-1229 </td>
              </tr>
            </tbody>
           </table>
           <table className="invoicTable mt-5">
            <tr>
              <th>  Vehicle No </th>
              <th>  Mileage  </th>
            </tr>
            <tbody>
              <tr>
                <td>055</td>
              </tr>
              <tr>
                <td>5677 </td>
              </tr>
            </tbody>
           </table>
         </div>
        
           
 
          </div>

          <table className=" invoiceTable2 qutationTables mt-5">
            <thead className="tableWrap">
              <tr>
                <th>SL No</th>
                <th>Description</th>
                <th>Quantity </th>
                <th>Rate</th>
                <th>Amount </th>
              </tr>
            </thead>
            <tbody>
              {quotationPreview?.input_data?.map((data, index) => (
                <tr key={data._id}>
                  <td>{ index + 1}</td>
                  <td>{data.description}</td>
                  <td>{data.quantity}</td>
                  <td>{data.rate}</td>
                  <td>{data.total}</td>
                </tr>
              ))}
              <tr>
            <td></td>
            <td colSpan={3}> <b>Total Amount</b> </td>
            <td> {quotationPreview.total_amount}/=</td>
          </tr>
            </tbody>
          </table>
          <p className="mt-1">
            <b>In words:</b> Forty Four Thousand Tow Hundred Taka Only
          </p>
          <div className="customerSignatureWrap">
            <b className="customerSignatur">Customer Signature : </b>
            <b className="customerSignatur">Trust Auto Solution</b>
          </div>
          <hr className="my-3" />
          <div className="text-center mt-3 text-sm">
            <p>
              <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
              www.trustautosolution.com
            </p>
            <p>
              {" "}
              <b>Mobile:</b> 01821-216465, 01972-216465 , <b>Email:</b>{" "}
              trustautosolution@gmail.com{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="printInvoiceBtnGroup">
        <button onClick={handlePrint}>Print </button>
        <button onClick={() => toPDF()}>Pdf </button>

        <Link to="/dashboard/invoice">
          <button> Edit </button>
        </Link>

        <Link to="/dashboard/qutation">
          {" "}
          <button> Qutation </button>
        </Link>
      </div>
    </main>
  );
};

export default Details;
