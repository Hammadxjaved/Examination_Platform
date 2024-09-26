import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoSubmitForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [timeLeft, setTimeLeft] = useState(60); // 5 minutes in seconds (300)
  const navigate = useNavigate(); // Hook for redirection

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Simulate form submission or add your logic here
    // Redirect to home route after submission
    navigate("/");
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update the timer and submit the form when the time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      document.getElementById("submitbtn").click();
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdown); // Cleanup the interval on unmount
  }, [timeLeft]);

  // Convert seconds to minutes and seconds for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <form id="auto-submit-form" onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
        />
      </div>

      <div>
        <p>Time remaining: {formatTime(timeLeft)}</p>
      </div>

      <button type="submit" id="submitbtn">Submit</button>
    </form>
  );
};

export default AutoSubmitForm;
