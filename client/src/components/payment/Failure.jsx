import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Failure = () => {
  const [search] = useSearchParams();
  const [failureInfo, setFailureInfo] = useState(null);
  const navigate = useNavigate();

  //  Same as Success — decode eSewa's base64 data from URL
  useEffect(() => {
    const info = search.get("data");
    if (info) {
      try {
        const decoded = atob(info);
        const result = JSON.parse(decoded);
        setFailureInfo(result);
      } catch (error) {
        toast.error("Invalid eSewa data");
      }
    }
  }, [search]);

  // Block back button — same concept as Payment & Success
  useEffect(() => {
    const handlePopState = () => {
      navigate('/mybooking', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className='flex flex-col items-center mt-10 px-4'>
      <p className='text-2xl font-semibold text-red-600'>Payment Failed</p>

      {failureInfo ? (
        <div className='flex flex-col space-y-3 mt-6 p-6 md:p-10 border-4 border-red-300 rounded-2xl bg-red-50 text-gray-800 w-full max-w-md'>
          <p><span className='font-semibold'>Product Code:</span> {failureInfo.product_code}</p>
          <p><span className='font-semibold'>Total Amount:</span> {failureInfo.total_amount}</p>
          <p><span className='font-semibold'>Status:</span> {failureInfo.status}</p>
          <p><span className='font-semibold'>Transaction Id:</span> {failureInfo.transaction_uuid}</p>
        </div>
      ) : (
        <p className='text-gray-500 mt-5'>Loading failure details...</p>
      )}

      <button
        onClick={() => navigate('/mybooking', { replace: true })}
        className='mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
      >
        Back to My Bookings
      </button>
    </div>
  );
};

export default Failure;