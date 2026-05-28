import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  Briefcase,
  ArrowRight,
  BarChart3,
  Zap,
  Calendar,
  Sparkles,
  Flame,
  Target,
} from "lucide-react";

function Home() {

 const user = JSON.parse(localStorage.getItem("user") || "null");

if (!user) {
  return <div>Please login again</div>;
}

  /* STATES */

  const [applications, setApplications] = useState([]);
  const [problems, setProblems] = useState([]);

  /* FETCH DATA */

 useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${import.meta.env.VITE_API_URL}/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setApplications(Array.isArray(data) ? data : []))
    .catch((err) => console.log(err));

  fetch(`${import.meta.env.VITE_API_URL}/problems`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setProblems(Array.isArray(data) ? data : []))
    .catch((err) => console.log(err));
}, []);

  /* CALCULATIONS */

  const totalProblems = problems.length;

  const totalApplications = applications.length;

  const hardProblems = problems.filter(
    (p) =>
      p.difficulty?.toLowerCase() === "hard"
  ).length;

  const weakTopicMap = {};

  problems.forEach((p) => {

    const topic = p.topic || "Unknown";

    weakTopicMap[topic] =
      (weakTopicMap[topic] || 0) + 1;

  });

  let weakTopic = "No Data";

  if (Object.keys(weakTopicMap).length > 0) {

    weakTopic = Object.entries(weakTopicMap)
      .sort((a, b) => a[1] - b[1])[0][0];

  }

 const uniqueDates = [
  ...new Set(
    problems.map((problem) =>
      new Date(problem.dateSolved).toDateString()
    )
  ),
];

uniqueDates.sort(
  (a, b) => new Date(b) - new Date(a)
);

let streakCount = 0;

const today = new Date();

for (let i = 0; i < uniqueDates.length; i++) {

  const checkDate = new Date(today);

  checkDate.setDate(today.getDate() - i);

  if (
    new Date(uniqueDates[i]).toDateString() ===
    checkDate.toDateString()
  ) {
    streakCount++;
  } else {
    break;
  }
}

const streak = `${streakCount} day streak`;

  const upcomingDeadline = applications.find(
    (app) =>
      new Date(app.deadline) > new Date()
  );

  /*   UI */

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8 overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 blur-3xl rounded-full"></div>

      {/* MAIN */}

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">

    

        <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-xl p-10 shadow-2xl">

          {/* GLOW */}

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}

            <div>

  <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">

    Welcome back,{" "}

    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">

      {user?.name?.split(" ")[0]}

    </span>

    👋


              </h1>

              <p className="mt-4 text-lg text-gray-500 max-w-2xl">

                Track your preparation progress, internship applications,
                interview readiness, and consistency — all in one place.

              </p>

            </div>

            {/* RIGHT STATUS */}

            <div className="bg-white/80 border border-white rounded-2xl px-6 py-4 shadow-lg backdrop-blur-md flex items-center gap-4">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <div>

                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">

                  Current Focus

                </p>

                <p className="font-bold text-gray-700">

                  Stay Consistent 🚀

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            NAVIGATION CARDS
        ========================= */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* PREPARATION */}

          <Link
            to="/preparation"
            className="group bg-white rounded-[28px] border border-gray-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >

            {/* ICON */}

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500">

              <BookOpen className="w-7 h-7 text-indigo-600 group-hover:text-white transition-all duration-500" />

            </div>

            {/* TEXT */}

            <h2 className="text-2xl font-bold text-gray-800 mt-6">

              Preparation Tracker

            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">

              Track solved problems, consistency, weak areas,
              interview readiness, and coding analytics.

            </p>

            {/* CTA */}

            <div className="flex items-center gap-2 mt-8 text-indigo-600 font-bold group-hover:gap-4 transition-all">

              <span>Open Dashboard</span>

              <ArrowRight className="w-5 h-5" />

            </div>

          </Link>

          {/* APPLICATIONS */}

          <Link
            to="/applications"
            className="group bg-white rounded-[28px] border border-gray-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >

            {/* ICON */}

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">

              <Briefcase className="w-7 h-7 text-blue-600 group-hover:text-white transition-all duration-500" />

            </div>

            {/* TEXT */}

            <h2 className="text-2xl font-bold text-gray-800 mt-6">

              Internship Tracker

            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">

              Manage internship applications, deadlines,
              interviews, and statuses in one workspace.

            </p>

            {/* CTA */}

            <div className="flex items-center gap-2 mt-8 text-blue-600 font-bold group-hover:gap-4 transition-all">

              <span>Manage Applications</span>

              <ArrowRight className="w-5 h-5" />

            </div>

          </Link>

        </section>

        {/* =========================
            QUICK INSIGHTS
        ========================= */}

        <section className="space-y-6">

          {/* TITLE */}

          <div className="flex items-center gap-4">

            <h3 className="text-xs uppercase tracking-[0.25em] font-black text-gray-400">

              Quick Insights

            </h3>

            <div className="h-px flex-1 bg-gray-200"></div>

          </div>

          {/* INSIGHT CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* WEAK TOPIC */}

            <div className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-5 flex items-center shadow-md hover:border-orange-200 transition-all">

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4">

                <BarChart3 className="w-5 h-5 text-orange-500" />

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">

                  Weak Topic

                </p>

                <p className="font-bold text-gray-800">

                  {weakTopic}

                </p>

              </div>

            </div>

            {/* STREAK */}

            <div className="bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl p-5 flex items-center shadow-md hover:border-green-200 transition-all">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4">

                <Flame className="w-5 h-5 text-green-500" />

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">

                  Consistency

                </p>

                <p className="font-bold text-gray-800">

                  {streak}

                </p>

              </div>

            </div>

            {/* DEADLINE */}

            <div className="bg-white/80 backdrop-blur-md border border-purple-100 rounded-2xl p-5 flex items-center shadow-md hover:border-purple-200 transition-all">

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4">

                <Calendar className="w-5 h-5 text-purple-500" />

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">

                  Upcoming Deadline

                </p>

                <p className="font-bold text-gray-800 truncate max-w-[180px]">

                  {upcomingDeadline
                    ? `${upcomingDeadline.company}`
                    : "No upcoming deadline"}

                </p>

              </div>

            </div>

            {/* INTERVIEW READINESS */}

            <div className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-5 flex items-center shadow-md hover:border-blue-200 transition-all">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">

                <Target className="w-5 h-5 text-blue-500" />

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">

                  Interview Readiness

                </p>

                <p className="font-bold text-gray-800">

                  {hardProblems} Hard Solved

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            AI INSIGHT SECTION
        ========================= */}

        <section className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white shadow-2xl">

          {/* GLOW */}

          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>

          <div className="relative flex items-start gap-5">

            {/* ICON */}

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">

              <Sparkles className="w-6 h-6" />

            </div>

            {/* CONTENT */}

            <div className="flex-1">

              <div className="flex items-center gap-2">

                <span className="uppercase tracking-wider text-xs font-semibold text-white/80">

                  AI Insight

                </span>

                <span className="bg-white/20 px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md">

                  Live

                </span>

              </div>

              <h2 className="text-2xl font-bold mt-4">

                You're making strong progress 🚀

              </h2>

              <p className="mt-3 text-white/80 max-w-2xl leading-relaxed">

                Your consistency is improving and your internship preparation
                momentum looks strong. Focus a little more on{" "}

                <span className="font-bold text-white">
                  {weakTopic}
                </span>{" "}

                to balance your preparation and increase interview readiness.

              </p>

              <button className="mt-6 inline-flex items-center gap-2 bg-white text-purple-600 px-5 py-3 rounded-xl font-semibold hover:gap-3 transition-all">

                Continue Preparation

                <ArrowRight className="w-5 h-5" />

              </button>

            </div>

          </div>

        </section>

      </div>

    </div>

  );

}

export default Home;