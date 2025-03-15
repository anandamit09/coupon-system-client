import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const token = localStorage.getItem("token");

  const fetchCoupons = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/coupons", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const addCoupon = async () => {
    if (!newCouponCode) return;

    try {
      await axios.post("http://localhost:5000/api/admin/coupon", { code: newCouponCode }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCouponCode(""); // Clear input
      fetchCoupons();
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const resetAllCoupons = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/reset-coupons", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCoupons();
    } catch (error) {
      console.error("Error resetting coupons:", error);
    }
  };

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/coupon/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCoupons(); // Refresh the list
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <div>
        <input 
          type="text" 
          value={newCouponCode} 
          onChange={(e) => setNewCouponCode(e.target.value)}
          placeholder="Enter new coupon code"
        />
        <button onClick={addCoupon}>Add Coupon</button>
      </div>

      <button onClick={resetAllCoupons} style={{ marginTop: "10px" }}>
        Reset All Coupons
      </button>

      <ul>
        {coupons.map((coupon) => (
          <li key={coupon._id}>
            {coupon.code} - {coupon.isClaimed ? "Claimed" : "Available"}
            {coupon.claimedBy && <span> (Claimed by: {coupon.claimedBy})</span>}
            <button onClick={() => deleteCoupon(coupon._id)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;