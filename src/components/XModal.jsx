import React, { useState } from "react";
import "./styles.css";

const UserDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  }); //Initially empty initialization

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValid = formData.email.includes("@");
    const phoneValid = /^\d{10}$/.test(formData.phone); // Ensure phone has exactly 10 digits
    const selectedDate = new Date(formData.dob);
    const today = new Date();
    const dobValid = selectedDate <= today;

    if (!formData.username || !formData.email || !formData.phone || !formData.dob) {
      alert("Please fill in all fields.");
      return;
    }

    if (!emailValid) {
      alert(`Please include an '@' in the email address. '${formData.email}' is missing an '@'.`);
      return;
    }

    if (!phoneValid) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (!dobValid) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }


    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsOpen(false);
  };

  const handleClose = (e) => {
    if (e.target.className.includes("modal")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="container">
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && (
        <div className={`modal ${isOpen ? "open" : ""}`} onClick={handleClose}>
          <div className={`modal-content ${isOpen ? "open" : ""}`}>
            <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username" //UserName field
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"    //Email Field
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"  //Phone Number Field
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsModal;
