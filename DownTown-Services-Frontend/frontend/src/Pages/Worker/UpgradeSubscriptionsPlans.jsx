import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import ShowPlans from '../../Components/Worker/ShowPlans'

function UpgradeSubscriptionsPlans() {
  return (
    <>
        <Navbar />
        <ShowPlans role={'upgrade'}/>
    </>
  )
}

export default UpgradeSubscriptionsPlans
