import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AiInsight from "./ui/AiInsight";

import {
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  TrendingUp,
  Search,
 ArrowLeft,
} from "lucide-react";

/* =========================
   KPI CARD COMPONENT
========================= */

function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = "blue",
}) {

  const accentStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
  };

  return (

    <div className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* TOP */}

      <div className="flex items-center justify-between">

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${accentStyles[accent]}`}
        >
          <Icon size={22} />
        </div>

        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <TrendingUp size={14} />
            {trend}
          </div>
        )}

      </div>

      {/* VALUE */}

      <h1 className="text-3xl font-bold mt-4 text-gray-800">
        {value}
      </h1>

      {/* LABEL */}

      <p className="text-gray-500 mt-1 text-sm">
        {label}
      </p>

    </div>

  );
}

/* =========================
   APPLICATIONS COMPONENT
========================= */

function Applications() {

  const [applications, setApplications] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

 /* =========================
     FETCH APPLICATIONS
========================= */

useEffect(() => {

  const token = localStorage.getItem("token");

  fetch(`${import.meta.env.VITE_API_URL}/applications`, {

    headers: {
      Authorization: `Bearer ${token}`,
    },

  })

    .then(async (res) => {

      const data = await res.json();

      if (!Array.isArray(data)) {
        setApplications([]);
        return;
      }

      setApplications(data);

    })

    .catch((err) => console.error(err));

}, []);

/* =========================
   ADD / UPDATE APPLICATION
========================= */

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/applications/${editingId}`
      : `${import.meta.env.VITE_API_URL}/applications`;

    const method = editingId
      ? "PUT"
      : "POST";

    const res = await fetch(url, {

      method,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        company,
        role,
        status,
        deadline,
      }),

    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    /* =========================
       UPDATE UI
    ========================= */

    if (editingId) {

      setApplications(

        applications.map((app) =>

          app.id === editingId
            ? data
            : app

        )

      );

    } else {

      setApplications([
        ...applications,
        data,
      ]);

    }

    /* =========================
       CLEAR FORM
    ========================= */

    setCompany("");
    setRole("");
    setStatus("");
    setDeadline("");

    setEditingId(null);

  } catch (err) {

    console.error(err);

  }

};

/* =========================
   EDIT APPLICATION
========================= */

const handleEdit = (app) => {

  setEditingId(app.id);

  setCompany(app.company);

  setRole(app.role);

  setStatus(app.status);

  setDeadline(
    app.deadline.split("T")[0]
  );

};

/* =========================
   DELETE APPLICATION
========================= */

const handleDelete = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const res = await fetch(

      `${import.meta.env.VITE_API_URL}/applications/${id}`,

      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    /* UPDATE UI */

    setApplications(

      applications.filter(

        (app) => app.id !== id

      )

    );

  } catch (err) {

    console.error(err);

  }

};

  /* =========================
     FILTERED APPLICATIONS
  ========================= */

  const filteredApplications = (applications || []).filter((app) => {

    return (

      app.company.toLowerCase().includes(search.toLowerCase()) ||

      app.role.toLowerCase().includes(search.toLowerCase())

    );

  });

  /* =========================
     KPI CALCULATIONS
  ========================= */

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const upcomingDeadlines = applications.filter((app) => {

    return new Date(app.deadline) > new Date();

  }).length;

  /* =========================
     UI
  ========================= */

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Manage applications, interviews, and deadlines
          </p>

        </div>

          {/* BACK BUTTON */}

  <Link
    to="/"
    className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-all font-medium"
  >
    <ArrowLeft size={18} />
    Back to Home
  </Link>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

        <KpiCard
          label="Total Applications"
          value={totalApplications}
          icon={Briefcase}
          trend="+12%"
          accent="blue"
        />

        <KpiCard
          label="Applied"
          value={appliedCount}
          icon={CheckCircle}
          accent="green"
        />

        <KpiCard
          label="Interviews"
          value={interviewCount}
          icon={Clock}
          accent="orange"
        />

        <KpiCard
          label="Rejected"
          value={rejectedCount}
          icon={XCircle}
          accent="red"
        />

        <KpiCard
          label="Upcoming Deadlines"
          value={upcomingDeadlines}
          icon={Calendar}
          accent="purple"
        />

      </div>

      {/* FORM + AI INSIGHT */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

  {/* =========================
      FORM
  ========================= */}

  <form
    onSubmit={handleSubmit}
    className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg border space-y-5"
  >

    <h2 className="text-2xl font-bold text-gray-800">
      Add New Application
    </h2>

    {/* COMPANY */}

    <input
      type="text"
      placeholder="Company Name"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* ROLE */}

    <input
      type="text"
      placeholder="Role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
    />

    {/* STATUS */}

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
    >

      <option value="">
        Select Status
      </option>

      <option value="Saved">
        Saved
      </option>

      <option value="Applied">
        Applied
      </option>

      <option value="OA">
        OA
      </option>

      <option value="Interview">
        Interview
      </option>

      <option value="Rejected">
        Rejected
      </option>

      <option value="Accepted">
        Accepted
      </option>

    </select>

    {/* DEADLINE */}

    <input
      type="date"
      value={deadline}
      onChange={(e) => setDeadline(e.target.value)}
      className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
    />

    {/* BUTTON */}

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
    >
      {editingId ? "Update Application" : "Add Application"}
    </button>

  </form>

  {/* AI INSIGHT */}

  <AiInsight
    totalApplications={totalApplications}
    interviewCount={interviewCount}
    rejectedCount={rejectedCount}
    upcomingDeadlines={upcomingDeadlines}
  />

</div>

      {/* APPLICATIONS TABLE */}

      <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

        {/* TABLE HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Applications List
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Track all your internship applications
            </p>

          </div>

          {/* SEARCH BAR */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-80"
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr className="text-left text-gray-600 text-sm">

                <th className="p-5 font-semibold">
                  Company
                </th>

                <th className="p-5 font-semibold">
                  Role
                </th>

                <th className="p-5 font-semibold">
                  Status
                </th>

                <th className="p-5 font-semibold">
                  Deadline
                </th>

                <th className="p-5 font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredApplications.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No applications found
                  </td>

                </tr>

              ) : (

                filteredApplications.map((app) => (

                  <tr
                    key={app.id}
                    className="border-b hover:bg-blue-50 transition-all duration-200"
                  >

                    <td className="p-5 font-semibold text-gray-800">
                      {app.company}
                    </td>

                    <td className="p-5 text-gray-600">
                      {app.role}
                    </td>

                    <td className="p-5">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium

                          ${
                            app.status === "Saved"
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          }

                          ${
                            app.status === "Applied"
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          }

                          ${
                            app.status === "OA"
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          }

                          ${
                            app.status === "Interview"
                              ? "bg-orange-100 text-orange-600"
                              : ""
                          }

                          ${
                            app.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : ""
                          }

                          ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-600"
                              : ""
                          }
                        `}
                      >
                        {app.status}
                      </span>

                    </td>

                    <td className="p-5 text-gray-500">

                      {new Date(app.deadline).toLocaleDateString()}

                    </td>

                    <td className="p-5">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => handleEdit(app)}
                          className="px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(app.id)}
                          className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Applications;