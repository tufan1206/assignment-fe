import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/products/login', form);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.name);
    // console.log(res.data.token);
    //alert("Logged in!");
    //window.location.href = "/home";
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-md shadow-md w-full max-w-sm">
      <h2 className="text-2xl mb-4 text-center font-medium">Login</h2>
      <input className="border p-2 w-full mb-3 rounded" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full mb-3 rounded" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
      <p className="mt-4 text-center text-sm">
          Don't registered?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
    </form>
    </div>
  );
}
