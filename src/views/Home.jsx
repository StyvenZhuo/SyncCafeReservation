import React from 'react'

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("YourUsername"); // Placeholder for actual username from login
    setShowLoginPopup(false); // Close the popup on successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div class='font-xl'>

    <div class='flex flex-row-0 flex-wrap'>
      <div>kiri</div>
      <div>kanan</div>
    </div>
    
    
    
    </div>
  )
}

export default Home;
