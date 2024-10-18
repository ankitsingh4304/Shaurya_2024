import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreLoader from './components/preLoader/preloader';
import LoadingSpinner from './components/LoadingSpinner/loadingspinner';

import { About } from './pages/About';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import  Event  from './pages/Event';
import Navbar from './pages/Navbar';

function App() {

  const [loading,setLoading]=useState(false);

  // const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    // Check if the page is loaded for the first time or refreshed
    const navigationType = window.performance.getEntriesByType('navigation')[0].type;
    
    if (navigationType === 'reload') {
      // Only show preloader on initial load or page refresh, not during route changes
      setLoading(true);
      setTimeout(() => {
        setLoading(false); // Hide the preloader after a delay
      }, 3000); // Adjust the timeout delay as needed
    }
  }, []); 

  useEffect(() => {

    if (!sessionStorage.getItem('preloaderShown') ) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('preloaderShown', 'true');
        }, 3000);
    }
  }, []);



  return (
    <Router>
      {
        loading  ? <PreLoader loading={loading}/>
        :
        <>
        <Navbar />
        <main className="pt-0">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Event />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        {/* <Footer /> */}

        </>
      }
    </Router>
  )
}

export default App;
