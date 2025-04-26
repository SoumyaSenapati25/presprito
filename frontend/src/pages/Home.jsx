// import React from 'react'
// import Header from '../components/Header'
// import SpecialityMenu from '../components/SpecialityMenu'
// import TopDoctors from '../components/TopDoctors'
// import Banner from '../components/Banner'

// const Home = () => {
//   return (
//     <div>
//         <Header/>
//         <SpecialityMenu/>
//         <TopDoctors/>
//         <Banner/>
//     </div>
//   )
// }

// export default Home






import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';

const Home = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const loadData = setTimeout(() => {
      setIsDataLoaded(true); // Set to true after data is "loaded"
    }, 1000); // Simulating a 1-second delay for loading

    return () => clearTimeout(loadData);
  }, []);

  return (
    <div>
      <Header />
      {isDataLoaded ? (
        <>
          <SpecialityMenu />
          <TopDoctors />
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Banner />
    </div>
  );
};

export default Home;
