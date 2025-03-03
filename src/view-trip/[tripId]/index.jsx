import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../../service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {

  const {tripId}=useParams();
  const [trip,setTrip]=useState([]);
  useEffect(()=>{
    tripId&&GetTripData();
  },[tripId])
  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
      console.log("Dodcument:",docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No Such Document");
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information section */}
      <InfoSection trip={trip}/>
      {/* Hotels */}
      <Hotels trip={trip}/>
      {/* Daily Plan */}
      <PlacesToVisit trip={trip}/>
      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip
