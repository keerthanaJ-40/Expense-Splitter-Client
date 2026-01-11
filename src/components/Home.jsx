import React, { useState, useEffect } from "react";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showSignin, setShowSignin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowSignin(false);
    setShowLogin(false);
  };
  

  // 🔥 SLIDER IMAGES
  const images = [
    "https://media.istockphoto.com/id/895454734/photo/beautiful-lotus-flower-on-the-water-in-a-park-close-up.jpg?s=2048x2048&w=is&k=20&c=BMCNvYbtGfySorWiIV-ZA9ufKJwhqk3LtdleXN2fBBY=",
    "https://media.istockphoto.com/id/1394440950/photo/natural-view-cosmos-filed-and-sunset-on-garden-background.jpg?s=612x612&w=0&k=20&c=eBnRobwsk2w_9MqM6bnXukIia5j-ayuMS0PeB6GHN0E=",
    "https://cdn.pixabay.com/photo/2022/02/04/21/33/lavender-6993669_1280.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

      // 🔥 BACKEND CONNECT LOGIC
  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL; 
      const response = await fetch(`${apiUrl}/api/auth`); 
      const data = await response.json();
      console.log("Backend message:", data.message);
    } catch (error) {
      console.error("Backend not connect!", error);
    }
  };

  fetchData();

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section>
      {/* ================= NAVBAR ================= */}
      <nav>
        <div className="navbar">
          <div className="logo">
            <img
              src="https://www.shutterstock.com/image-vector/bill-being-divided-two-vector-260nw-2616272817.jpg"
              alt="logo"
            />
          </div>

          <h2>Expense Splitter</h2>

          <div className="nav-buttons">
            {!isLoggedIn ? (
              <>
                <button
                  className="btn-signin"
                  onClick={() => setShowSignin(true)}
                >
                  Sign In
                </button>

                <button
                  className="btn-login"
                  onClick={() => setShowLogin(true)}
                >
                  Log In
                </button>
              </>
            ) : (
              <button
                className="btn-split-expense"
                onClick={() => navigate("/add-expense")}
              >
                Add Expense
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ================= HERO SLIDER ================= */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${images[index]})` }}
      >
        <div className="overlay"></div>
        <div className="hero-text">
          <h2>Expenses Split Easily</h2>
          <p>Manage group expenses without confusion.</p>

          {!isLoggedIn && (
            <button
              className="btn-signin"
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* ================= POPUPS ================= */}
      {showSignin && (
        <Signin
          onClose={() => setShowSignin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          onCreateAccount={() => {
            setShowLogin(false);
            setShowSignin(true);
          }}
        />
      )}


      {/* ================= CONTENT ================= */}
      <div className="features-section">
        <h2 className="features-title">Why Expense Splitter?</h2>

        <div className="features-container">
          <div className="feature-card">
            <h3>The Problem</h3>
            <p>
              Tracking shared expenses manually often leads to confusion,
              miscalculations, and unnecessary conflicts.
            </p>
          </div>

          <div className="feature-card">
            <h3>Our Solution</h3>
            <p>
              Expense Splitter automatically calculates who owes whom,
              making group expenses simple and stress-free.
            </p>
          </div>

          <div className="feature-card">
            <h3>The Impact</h3>
            <p>
              Save time, avoid conflicts, and maintain complete transparency
              in your group finances.
            </p>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="footer">
        <p>
          &copy; 2026 Expense Splitter <br />
          Split expenses fairly, without confusion.
        </p>
      </div>
    </section>
  );
};

export default Home;
