import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPage = () => {
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClaimedCoupon(); // Fetch coupon when the page loads
  }, []);

  const fetchClaimedCoupon = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/coupons");
      const claimedCoupon = response.data.find(c => c.isClaimed && c.claimedBy !== null);

      if (claimedCoupon) {
        setCoupon(claimedCoupon);
      } else {
        setCoupon(null);
      }
    } catch (error) {
      console.error("Error fetching claimed coupon:", error);
    }
  };

  const claimCoupon = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/coupons/claim");
      setCoupon(response.data.coupon);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error claiming coupon");
    }
  };

  return (
    <div>
      <h1>Claim Your Coupon</h1>
      <button onClick={claimCoupon}>Claim Coupon</button>

      {coupon ? (
        <div>
          <h2>Coupon Claimed:</h2>
          <p><strong>Code:</strong> {coupon.code}</p>
        </div>
      ) : (
        <p>No claimed coupon found.</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserPage;