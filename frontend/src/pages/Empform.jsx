import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import './Nav.css'

function FormExample() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [workType, setWorkType] = useState("");
  const [emergencyNo, setEmergencyNo] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    birthday: "",
    maritalStatus: "",
    experience: "",
    role: "",
    workType: "",
    emergencyNo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      birthday: "",
      maritalStatus: "",
      experience: "",
      role: "",
      workType: "",
      emergencyNo: "",
    });

    if (!firstName) {
      setErrors((prev) => ({ ...prev, firstName: "First name is required." }));
      valid = false;
    }

    if (!lastName) {
      setErrors((prev) => ({ ...prev, lastName: "Last name is required." }));
      valid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
      valid = false;
    }

    if (!age || age <= 0) {
      setErrors((prev) => ({ ...prev, age: "Please enter a valid age." }));
      valid = false;
    }

    if (!birthday) {
      setErrors((prev) => ({ ...prev, birthday: "Birthday is required." }));
      valid = false;
    }

    if (!maritalStatus) {
      setErrors((prev) => ({
        ...prev,
        maritalStatus: "Marital status is required.",
      }));
      valid = false;
    }

    if (!experience) {
      setErrors((prev) => ({ ...prev, experience: "Experience is required." }));
      valid = false;
    }

    if (!role) {
      setErrors((prev) => ({ ...prev, role: "Job role is required." }));
      valid = false;
    }

    if (!workType) {
      setErrors((prev) => ({ ...prev, workType: "Work type is required." }));
      valid = false;
    }

    if (!emergencyNo || emergencyNo.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        emergencyNo: "Emergency number must be a valid 10-digit number.",
      }));
      valid = false;
    }

    if (valid) {
      const employeeData = {
        firstName,
        lastName,
        email,
        age,
        birthday,
        maritalStatus,
        experience,
        role,
        workType,
        emergencyNo,
      };

      try {
        await axios.post("http://localhost:2020/emp/add", employeeData);
        Swal.fire("Employee added successfully");
      } catch (err) {
        Swal.fire("Error adding employee");
        console.error(err);
      }
    }
  };

  return (
    <div className="nav p-10">
      <div className="flex">
        {/* Left Side Content */}
        <div className="w-1/4 bg-indigo-600 text-white rounded-l-lg p-8 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p className="text-sm text-indigo-100 text-center">
            Add employee details effortlessly. Fill in the required fields and hit submit!
          </p>
          <div className="flex items-center justify-center space-x-3">
            <button className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Form */}
        <form
          onSubmit={handleSubmit}
          className="w-3/4 bg-white rounded-r-lg shadow-lg p-10"
        >
          <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6 tracking-wide border-b-4 border-indigo-600 pb-4">
            Add Your Employee
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {/* Form Fields */}
            <div>
              <label className="block text-gray-700 font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.age && <p className="text-red-500">{errors.age}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.birthday && (
                  <p className="text-red-500">{errors.birthday}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Marital Status</label>
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
              </select>
              <div className="min-h-[20px]">
                {errors.maritalStatus && (
                  <p className="text-red-500">{errors.maritalStatus}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.experience && (
                  <p className="text-red-500">{errors.experience}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.role && <p className="text-red-500">{errors.role}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Work Type</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
              </select>
              <div className="min-h-[20px]">
                {errors.workType && (
                  <p className="text-red-500">{errors.workType}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Emergency Number
              </label>
              <input
                type="text"
                value={emergencyNo}
                onChange={(e) => setEmergencyNo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="min-h-[20px]">
                {errors.emergencyNo && (
                  <p className="text-red-500">{errors.emergencyNo}</p>
                )}
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormExample;
