"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SavedFunds() {
  const [funds, setFunds] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/myfunds", {
          headers: {
            Authorization: token
          }
        });
        setFunds(res.data);
      } catch (err) {
        console.error("Error loading saved funds", err);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Saved Mutual Funds</h2>
      {funds.length === 0 ? (
        <p>No saved funds yet.</p>
      ) : (
        <div className="space-y-4">
          {funds.map((fund) => (
            <div key={fund._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{fund.schemeName}</h3>
              <p><strong>Fund House:</strong> {fund.fundHouse}</p>
              <p><strong>Category:</strong> {fund.category}</p>
              <p><strong>NAV:</strong> ₹{fund.nav} ({fund.navDate})</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 bg-gray-300 px-3 py-1 rounded mt-4"
        >
          ← Back
        </button>
      </div>
    </div>
    
  );
}
