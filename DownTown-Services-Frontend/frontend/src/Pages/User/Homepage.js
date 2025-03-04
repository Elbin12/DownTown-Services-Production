import React, { Fragment, useEffect, useState } from 'react'
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';
import WhyChooseUs from '../../Components/User/WhyChooseUs';


function Homepage() {
  return (
    <Fragment>
      <Banner />
      <TopServices />
      <WhyChooseUs />
    </Fragment>
  )
}

export default Homepage
