/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import logo from "../../../../public/assets/logo.png";
import { useReactToPrint } from "react-to-print";
import { usePDF } from "react-to-pdf";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Invoice.css";
import "./DetailPrint.css";

const Detail = () => {
  const componentRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoicePreview, setInvoicePreview] = useState({});
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/invoice/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInvoicePreview(data);
          setLoading(false);
          const p = Math.ceil(data?.input_data?.length / 20);
          const arr = Array.from({ length: p }, (_, index) => index + 1);

          setPages(arr);
        });
    }
  }, [id]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const itemsPerPages = 24;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const secondEndIndex = startIndex + itemsPerPages

  const firstPageData = invoicePreview?.input_data?.slice(
    startIndex,
    endIndex
  );

  // Calculate the start index for the second page
  const secondPageStartIndex = endIndex;
  const secondPageData = invoicePreview?.input_data?.slice(
    secondPageStartIndex,
    secondPageStartIndex + itemsPerPages
  );

  // Calculate the start index for the third page
  const thirdPageStartIndex = secondPageStartIndex + itemsPerPage;
  const thirdPageData = invoicePreview?.input_data?.slice(
    thirdPageStartIndex,
    thirdPageStartIndex + itemsPerPages
  );

  // Calculate the start index for the fourth page
  const fourthPageStartIndex = thirdPageStartIndex + itemsPerPage;
  const fourthPageData = invoicePreview?.input_data?.slice(
    fourthPageStartIndex,
    fourthPageStartIndex + itemsPerPages
  );

  // Calculate the start index for the fifth page
  const fifthPageStartIndex = fourthPageStartIndex + itemsPerPage;
  const fifthPageData = invoicePreview?.input_data?.slice(
    fifthPageStartIndex,
    fifthPageStartIndex + itemsPerPages
  );

  // Calculate the start index for the sixth page
  const sixthPageStartIndex = fifthPageStartIndex + itemsPerPage;
  const sixthPageData = invoicePreview?.input_data?.slice(
    sixthPageStartIndex,
    sixthPageStartIndex + itemsPerPage
  );

  const lastValue = pages[pages.length - 1];

  const amountInWords = (amount) => {
    const numberWords = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tensWords = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertLessThanOneThousand = (num) => {
      if (num === 0) {
        return "";
      }

      let result = "";

      if (num >= 100) {
        result += numberWords[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tensWords[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num > 0) {
        result += numberWords[num] + " ";
      }

      return result;
    };

    const convert = (num) => {
      if (num === 0) {
        return "Zero";
      }

      let result = "";

      let integerPart = Math.floor(num);
      const decimalPart = Math.round((num - integerPart) * 100);

      if (integerPart >= 10000000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 10000000)) +
          "Crore ";
        integerPart %= 10000000;
      }

      if (integerPart >= 100000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 100000)) +
          "Lakh ";
        integerPart %= 100000;
      }

      if (integerPart >= 1000) {
        result +=
          convertLessThanOneThousand(Math.floor(integerPart / 1000)) +
          "Thousand ";
        integerPart %= 1000;
      }

      result += convertLessThanOneThousand(integerPart);

      if (decimalPart > 0) {
        result +=
          "Taka " +
          " " +
          "and" +
          " " +
          convertLessThanOneThousand(decimalPart) +
          "Paisa ";
      } else {
        result += "Taka";
      }

      return result;
    };

    const takaInWords = convert(amount);
    return `${takaInWords} only`;
  };

  const totalAmountInWords = amountInWords(invoicePreview.total_amount);

  return (
    <div ref={componentRef} className="h-screen">
      <div>
        {pages.length > 0 &&
          pages.map((page) => (
            <main ref={targetRef} key={page} className="invoicePrintWrap">
              <div>
                <div className="py-5 px-5 invoicePrint">
                  <div>
                  <div className=" mb-2 mx-auto text-center border-b-2 border-[#351E98] pb-2">
                      <div className="flex  justify-between items-center mb-2">
                        <img className="w-[150px] " src={logo} alt="logo" />
                        <h2 className="trustAutoTitle ">
                          Trust Auto Solution{" "}
                        </h2>
                      </div>
                      <p className="text-[#426EA0] italic text-sm">
                        It's trusted computerized Organization for all kinds of
                        vehicle check up & maintenance such as computerized
                        Engine Analysis, Engine tune up, Denting, Painting,
                        Engine, AC, Electrical Works & Car Wash.{" "}
                      </p>
                    </div>

                    {page === 1 && (
                      <div>
                        <div className="flex items-center justify-between mt-5 ">
                          <button className="invoiceOrderBtn">
                            SL: {invoicePreview?.job_no}
                          </button>
                          <b>Date: {invoicePreview?.date} </b>
                        </div>
                        <div className="flex items-center justiyf-between">
                          <table className="invoicTable inVoiceTables mt-5">
                            <tr>
                              <th> Name </th>
                              <th> Address </th>
                            </tr>
                            <tbody>
                              <tr className="borderNone">
                                <td> {invoicePreview?.customer_name} </td>
                              </tr>
                              <tr>
                                <td>Kuril Bishawroad, Dhaka-1229 </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="invoicTable mt-5">
                            <tr>
                              <th> Vehicle No </th>
                              <th> Mileage </th>
                            </tr>
                            <tbody>
                              <tr>
                                <td>{invoicePreview?.car_registration_no}</td>
                              </tr>
                              <tr>
                                <td> {invoicePreview?.mileage} </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

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
                      {page === 1 && (
                        <>
                          {firstPageData
                            ?.slice(startIndex, endIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                      {page === 2 && (
                        <>
                          {secondPageData
                            ?.slice(startIndex, secondEndIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{index + 21}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                      {page === 3 && (
                        <>
                          {thirdPageData
                            ?.slice(startIndex, secondEndIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{index + 45}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                      {page === 4 && (
                        <>
                          {fourthPageData
                            ?.slice(startIndex, secondEndIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{index + 69}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                      {page === 5 && (
                        <>
                          {fifthPageData
                            ?.slice(startIndex, secondEndIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{index + 93}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                      {page === 6 && (
                        <>
                          {sixthPageData
                            ?.slice(startIndex, endIndex)
                            .map((data, index) => (
                              <tr key={data._id}>
                                <td>{index + 113}</td>
                                <td>{data.description}</td>
                                <td>{data.quantity}</td>
                                <td>{data.rate}</td>
                                <td>{data.total}</td>
                              </tr>
                            ))}
                        </>
                      )}
                        {page === lastValue && (
                          <>
                            <tr>
                              <td colSpan={4}>
                                {" "}
                                <b>Discount=</b>{" "}
                              </td>

                              <td> {invoicePreview?.discount}/=</td>
                            </tr>
                            <tr>
                              <td colSpan={4}>
                                {" "}
                                <b>Vat=</b>{" "}
                              </td>

                              <td> {invoicePreview?.vat}/=</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td className="py-2" colSpan={3}>
                                {" "}
                                <b>Total Amount</b>{" "}
                              </td>
                              <td className="py-2">
                                {" "}
                                {invoicePreview?.total_amount}/=
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                    {page === lastValue && (
                      <p className="mt-1 text-sm">
                        <b className="text-base">In words:</b>{" "}
                        {totalAmountInWords}
                      </p>
                    )}
                  </div>

                  <div className="flex items-baseline justify-center w-full">
                  <div>
                    {page === lastValue && (
                      <div className="customerSignatureWrap  ">
                        <b className="customerSignatur">
                          Customer Signature :{" "}
                        </b>
                        <b className="customerSignatur">Trust Auto Solution</b>
                      </div>
                    )}
                    <hr className="my-3" />
                    <div className="text-center mt-3 text-sm">
                      <p>
                        <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
                        www.trustautosolution.com
                      </p>
                      <p>
                        {" "}
                        <b>Mobile:</b> 01821-216465, 01972-216465 ,{" "}
                        <b>Email:</b> trustautosolution@gmail.com{" "}
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              
              {
                page === lastValue && <div className="printInvoiceBtnGroup">
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
              }
            </main>
          ))}
      </div>
    </div>
  );
};

export default Detail;
