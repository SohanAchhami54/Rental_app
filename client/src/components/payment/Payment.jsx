import { v4 as uuidv4 } from "uuid";
import {useLocation, useNavigate} from  "react-router-dom"
import CryptoJS from "crypto-js";
import { useEffect } from "react";

const Payment = () => {
  const location=useLocation();//currently kata ho along with some of the data
  const navigate=useNavigate();

  //ensure that the page was reached via navigate /navigate and also the state.
  const amountFromState=location.state?.total_amount??null;

  useEffect(()=>{
    if(amountFromState==null){
      navigate('/mybooking',{replace:true});
    }
  },[amountFromState,navigate])

  // Individual amounts
  const amount =amountFromState;
  const tax_amount = 10;
  const product_service_charge = 0;
  const product_delivery_charge = 0;

  // Total amount = sum of all charges
  const total_amount = amount + tax_amount + product_service_charge + product_delivery_charge;

  // Unique transaction ID
  const uid = uuidv4();

  // Esewa secret key from .env (must start with VITE_)
  const secret_key = import.meta.env.VITE_SECRET_KEY;

  // Message string for signature (match signed_field_names)
  const Message = `total_amount=${total_amount},transaction_uuid=${uid},product_code=EPAYTEST`;

  // Generate HMAC-SHA256 signature and encode in Base64
  const hash = CryptoJS.HmacSHA256(Message, secret_key);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  console.log("Signature:", hashInBase64);

  const paymentData={
      bookingId:location.state?.bookingId
  }
 sessionStorage.setItem('paymentData',JSON.stringify(paymentData));

  return (
    <div className="flex justify-center items-center mt-10">
      <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" 
        //sand box integration
        // action="https://www.esewa.com.np/epay/main"
     
        method="POST"
        className="flex flex-col gap-2 w-96"
      >   
      <div>
         <label htmlFor="amount" className="mr-2">Amount:</label>
         <input type="text" name="amount" value={amount} readOnly />
      </div>
     
     <div>
      <label htmlFor="tax_amount" className="mr-2">Tax Amount:</label>
       <input type="text" name="tax_amount" value={tax_amount} readOnly />
     </div>
       
     <div>
      <label htmlFor="total_amount" className="mr-2">Total Amount:</label>
        <input type="text" name="total_amount" value={total_amount} readOnly />
     </div>
      
      <div>
        <label htmlFor="transaction_uuid" className="mr-2">Transaction Id:</label>
         <input type="text" name="transaction_uuid" value={uid} readOnly />
      </div>
       
      <div>
        <label htmlFor="product_code" className="mr-2">Product Code:</label>
         <input type="text" name="product_code" value="EPAYTEST" readOnly />
      </div>
        
       <div>
        <label htmlFor="product_service_charge" className="mr-2">Service Charge:</label>
         <input type="text" name="product_service_charge" value={product_service_charge} readOnly />
       </div>

       <div>
        <label htmlFor="product_delivery_charge" className="mr-2">Delivery Charge:</label>
          <input type="text" name="product_delivery_charge" value={product_delivery_charge} readOnly />
       </div>
       
       <div>
        <label htmlFor="success_url" className="mr-2">Success Url:</label>
          <input
          type="hidden"
          name="success_url"
          value={`${import.meta.env.VITE_FRONTEND_URL}/success`}
          readOnly
        />
       </div>
      
        <div>
          <label htmlFor="failure_url" className="mr-2">Failure Url:</label>
          <input
          type="text"
          name="failure_url"
          value={`${import.meta.env.VITE_FRONTEND_URL}/failure`}
          readOnly
        />
        </div>
        
        <div>
          <label htmlFor="signed_field_names" className="mr-2">Signed Field Name:</label>
            <input
          type="text"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          readOnly
        />
        </div>
       
       <div>
        <label htmlFor="signature" className="mr-2">Signature:</label>
          <input type="text" name="signature" value={hashInBase64} readOnly />
       </div>
      
        <input
          value="Pay Now"
          type="submit"
          className="bg-green-500 text-white py-2 rounded cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Payment;
