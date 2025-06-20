import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");
    console.log(userName);

    if (!token) {
      navigate("/"); // If not logged in, go to login
    }

    if (userName) {
      setName(userName);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // back to login
  };

  // Handle search input
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (keyword.length < 3) {
      setResults([]); // Clear if input too short
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("https://api.mfapi.in/mf");
      const filtered = res.data.filter((fund) =>
        fund.schemeName.toLowerCase().includes(keyword.toLowerCase())
      );
      setResults(filtered.slice(0, 10)); // show only top 10
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4 relative">
      {/* Top right corner */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <span className="text-gray-700 font-medium">Welcome, {name}</span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Centered Search Bar */}
      <div className="min-h-screen flex flex-col justify-center items-center mt-20">
        <input
          type="text"
          placeholder="Search Mutual Fund..."
          className="w-full max-w-md p-3 border rounded shadow"
          value={search}
          onChange={handleSearch}
        />
        {loading && <p className="mt-4 text-gray-700">Loading...</p>}
        {!loading && results.length > 0 && (
          <div className="mt-6 w-full max-w-2xl bg-white shadow-md rounded p-4 space-y-2">
            {results.map((fund) => (
              <div key={fund.schemeCode} className="border-b pb-2">
                <h3 className="font-medium">{fund.schemeName}</h3>
                <button
                  onClick={() => navigate(`/fund/${fund.schemeCode}`)}
                  className="text-blue-500 underline text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center">
      <button
        onClick={() => navigate("/savedFund")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex justify-between"
      >
        Show Fund
      </button>
      </div>
      </div>
      
    </div>
  );
}
