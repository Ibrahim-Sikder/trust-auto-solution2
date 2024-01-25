/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./MoneyReceived.css";
import logo from "../../../../public/assets/logo.png";
import { Email, Home, WhatsApp, LocalPhone } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
const UpdateMoneyReceipt = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [specificMoneyReceipt, setSpecificMoneyReceipt] = useState({});
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/v1/money_receipt/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecificMoneyReceipt(data);
        });
    }
  }, [id]);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const values = {
      thanks_from: data.thanks_from || specificMoneyReceipt.thanks_from ,
      against_bill_no: data.against_bill_no || specificMoneyReceipt.against_bill_no ,
      vehicle_no: data.vehicle_no || specificMoneyReceipt.vehicle_no ,
      cheque_no: data.cheque_no || specificMoneyReceipt.cheque_no,
      date_one: data.date_one ||  specificMoneyReceipt.date_one,
      bank: data.bank || specificMoneyReceipt.bank ,
      date_two:data.date_two || specificMoneyReceipt.date_two ,
      total_amount: data.total_amount || specificMoneyReceipt.total_amount,
      advance: data.advance || specificMoneyReceipt.advance ,
      remaining: data.remaining || specificMoneyReceipt.remaining ,
      taka_in_word: data.taka_in_word || specificMoneyReceipt.taka_in_word ,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/money_receipt/${id}`,
        values
      );

      console.log(response);
      if (
        response.data.message ===
        "Successfully update card."
      ) {
        
        navigate("/dashboard/money-receipt-list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="moneyReceptWrap ">
      <div className="moneyRecieved ">
        <div className="logoWrap ">
          <img className="" src={logo} alt="logo" />
        </div>
        <div className="moneyHead ">
          <h2 className="receivedTitle ">Trust Auto Solution </h2>
          <small>
            It's trusted computerized Organization for all kinds of vehicle
            check up & maintenance such as computerized Engine Analysis, Engine
            tune up, Denting, Painting, Engine, AC, Electrical Works & Car Wash.{" "}
          </small>
        </div>
        <div>
          <div className="flex items-center mt-1">
            <LocalPhone className="hotlineIcon" />
            <b className="ml-1">+880 1821-216465</b>
          </div>
          <div className="flex items-center mt-1">
            <Email className="hotlineIcon" />
            <small className="ml-1">trustautosolution@gmail.com</small>
          </div>
          <div className="flex items-center mt-1">
            <Home className="hotlineIcon"> </Home>
            <small className="ml-1">
              Ka-93/4/C Kuril Bishawroad, <br /> Dhaka-1212
            </small>
          </div>
          <div className="flex items-center mt-1">
            <WhatsApp className="hotlineIcon" />
            <small className="ml-1">+88 1972-216465</small>
          </div>
        </div>
      </div>
      <div className="receivedBtn">
        <button>Receipt</button>
      </div>
      <div className="flex justify-between ">
        <b>Serial No: 01</b>
        <b>Date: 12-12-21</b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex receivedField mt-3">
          <label className="receivedMoneyText">
            Received with thanks from{" "}
          </label>
          <input
            className="moneyViewInputField"
            type="text"
            autoComplete="off"
            defaultValue={specificMoneyReceipt.thanks_from}
            {...register("thanks_from")}
          />
        </div>
        <div className=" payAdvance mt-5">
          <div className="flex  receivedField">
            <label className="advance">
              Advance/Final Payment against bill no:{" "}
            </label>
            <input
              defaultValue={specificMoneyReceipt.against_bill_no}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("against_bill_no" )}
            />
          </div>
          <div className="flex receivedField">
            <label className="vehicleText2">Vehicle No: </label>
            <input
              defaultValue={specificMoneyReceipt.vehicle_no}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("vehicle_no" )}
            />
          </div>
        </div>
        <div className="payAdvance mt-5">
          <div className="flex  receivedField">
            <label className="checqueText2">Cash/Cheque No: </label>
            <input
              defaultValue={specificMoneyReceipt.cheque_no}
              className="cashInput moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("cheque_no" )}
            />
          </div>
          <div className="flex receivedField">
            <b className="date">Date: </b>
            <input
              defaultValue={specificMoneyReceipt?.date_one }
              className="dateInput moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("date_one" )}
            />
          </div>
        </div>
        <div className=" payAdvance mt-5">
          <div className="flex  receivedField">
            <label className="backText">Bank : </label>
            <input
              defaultValue={specificMoneyReceipt.bank}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("bank" )}
            />
          </div>
          <div className="flex receivedField">
            <label className="date">Date : </label>
            <input
              defaultValue={specificMoneyReceipt?.date_two}
              className=" moneyViewInputField"
              type="text"
              autoComplete="off"
              {...register("date_two" )}
            />
          </div>
        </div>
        <div className="amount2 mt-5">
          <div className="flex ">
            <label className="totalAmountText2">Total Amount Tk:</label>
            <input
              defaultValue={specificMoneyReceipt.total_amount}
              className="moneyViewInputField"
              type="text"
              {...register("total_amount" )}
            />
          </div>
          <div className="flex ">
            <label>Advance:</label>
            <input
              defaultValue={specificMoneyReceipt.advance}
              className="moneyViewInputField"
              type="text"
              {...register("advance" )}
            />
          </div>
          <div className="flex ">
            <label>Remaining:</label>
            <input
              defaultValue={specificMoneyReceipt.remaining}
              className="moneyViewInputField"
              type="text"
              {...register("remaining" )}
            />
          </div>
        </div>
        <div className="wordTaka mt-5">
          <label>in word (taka) </label>
          <input
            defaultValue={specificMoneyReceipt.taka_in_word}
            className="moneyViewInputField"
            type="text"
            {...register("taka_in_word")}
          />
        </div>
        {/* <div>
            <button className="btn btn-warning w-full my-10"> Update</button>
        </div> */}
         <div className="receivedBtn my-5">
        <button type='submit'>Update</button>
      </div>
      </form>
      <div className="">
        <small className="signature">Authorized Signature</small>
      </div>
      <hr className="my-3" />
      <div className="text-center mt-5">
        <p>
          <b>Office: </b>Ka-93/4/C, Kuril Bishawroad, Dhaka-1229,
          www.trustautosolution.com
        </p>
        <p>
          <b>Mobile:</b> 01821-216465, 01972-216465 , <b>Email:</b>{" "}
          trustautosolution@gmail.com
        </p>
      </div>
    </div>
  );
};

export default UpdateMoneyReceipt;
