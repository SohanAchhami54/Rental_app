
// export default bikes
import { useEffect, useState } from "react"
import Title from "../components/Title"
import { Input } from "../shadcnui/input"
import BikeCard from "../components/BikeCard"
import { useAppcontext } from "../context/AppContext"

const Bikes = () => {
 
 const { bike, user } = useAppcontext();
  const [Bike, setBike] = useState([]);
  const [match, setMatch] = useState('');


  const applyFilter =  () => {
     setBike(bike)
  }

  const  finalfilteredBike=Bike.filter((curElem)=>{
    return (
      curElem.brand.toLowerCase().includes(match.toLowerCase()) ||
     curElem.model.toLowerCase().includes(match.toLowerCase())
    )
  });

  useEffect(() => {
    bike.length >0 &&applyFilter()
  }, [bike]);

  return (
    <>
      <div>
        {/* available bike */}
        <div>
          <Title
            title='Available Bike'
            subTitle='Browse our selection of premium vehicle available for your next adventure'
          />
          <div className="flex items-center gap-2 bg-white px-4 max-w-140 w-full mx-auto mt-5 h-12">
            {/* <img src={assets.search_icon} alt="" /> */}
            <Input
              value={match}
              onChange={(e)=>setMatch(e.target.value)}
              type='text'
              placeholder='Search by bike name'
            />
          </div>
        </div>

        {/* this is  available bike details */}
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 list-none">
          <p className="text-gray-500 xl:pl-20 max-w-7xl mx-auto">
            Showing {finalfilteredBike.length} data
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {finalfilteredBike.map((bike, index) => (
              <li key={index}>
                {/* ✅ Prevent host from opening bikeDetails */}
                <BikeCard bike={bike} isHost={user?.usertype === 'host'} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bikes;
