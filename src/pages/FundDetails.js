import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FundDetails() {
  const { schemeCode } = useParams();
  const navigate = useNavigate();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
        setFund(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching fund details:", err);
        setLoading(false);
      }
    };
    fetchFund();
  }, [schemeCode]);

  const handleSave = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/products/save`,
      {
        schemeCode: fund.meta.scheme_code,
        schemeName: fund.meta.scheme_name,
        fundHouse: fund.meta.fund_house,
        category: fund.meta.scheme_category,
        nav: fund.data[0]?.nav || "N/A",
        navDate: fund.data[0]?.date || "N/A"
      },
      {
        headers: {
          Authorization: token
        }
      }
    );

    // ✅ Log response to console
    console.log("Save Fund Response:", response.data);

    navigate("/savedFund"); // Redirect after save
  } catch (err) {
    console.error("Save failed", err);
    alert("Failed to save");
  }
};


  if (loading) return <p className="text-center mt-10">Loading fund details...</p>;
  if (!fund) return <p className="text-center mt-10 text-red-500">Fund not found.</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <button className="mb-4 bg-gray-300 px-3 py-1 rounded" onClick={() => navigate(-1)}>← Back</button>

      <div className="bg-white shadow-md rounded p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">{fund.meta.scheme_name}</h2>
        <p><strong>Fund House:</strong> {fund.meta.fund_house}</p>
        <p><strong>Scheme Type:</strong> {fund.meta.scheme_type}</p>
        <p><strong>Scheme Category:</strong> {fund.meta.scheme_category}</p>
        <p><strong>ISIN:</strong> {fund.meta.isin}</p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Latest NAV</h3>
        {fund.data && fund.data[0] ? (
          <p>
            <strong>Date:</strong> {fund.data[0].date} <br />
            <strong>NAV:</strong> ₹{fund.data[0].nav}
          </p>
        ) : (
          <p>No NAV data available.</p>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save this Fund
        </button>
      </div>
    </div>
  );
}
