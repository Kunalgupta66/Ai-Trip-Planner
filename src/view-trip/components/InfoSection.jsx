import React, { useEffect } from 'react'
import { TfiSharethis } from "react-icons/tfi";


function InfoSection({trip}) {

  
  return (
    <div>
      <img src='/img(2).png' className='h-[340px] w-full object-cover rounded-xl ' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸{trip.userSelection?.budget} Budget</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🏕️ No. Of Traveler : {trip.userSelection?.traveler} </h2>
          </div>
        </div>
        <button class="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600"><TfiSharethis /></button>
      </div>
    </div>
  )
}

export default InfoSection
