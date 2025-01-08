import React, { useContext } from 'react'
import ResubmitData from '../../Components/Worker/ResubmitData'
import { GoogleMapsContext } from '../../context';

function ResubmitPage() {
  const { isLoaded } = useContext(GoogleMapsContext)
  return (
    <>
        {isLoaded&&
          <ResubmitData />
        }
    </>
  )
}

export default ResubmitPage
