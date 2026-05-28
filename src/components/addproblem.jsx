import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import {
  Flame,
  CalendarCheck,
  Trophy,
  Plus,
  Sparkles,
  ArrowRight,
  Target,
  Calendar,
  AlertTriangle,
  TrendingDown,
  Zap,
  Brain,
   ArrowLeft,
} from "lucide-react";

/* =========================
   KPI CARD
========================= */

function KpiCard({
  label,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md border hover:shadow-xl transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h1>
        </div>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon className="text-white" size={22} />
        </div>

      </div>

    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

function AddProblem() {

  /* =========================
     STATES
  ========================= */

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [problems, setProblems] = useState([]);

  const dailyGoal = 5;

  /* =========================
     FETCH PROBLEMS
  ========================= */

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/problems`, {

      headers: {
        Authorization: `Bearer ${token}`,
      },

    })

      .then((res) => res.json())

      .then((data) => {

        setProblems(
          Array.isArray(data) ? data : []
        );

      })

      .catch((err) => console.log(err));

  }, []);

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/problems`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          topic,
          difficulty,
          createdAt: new Date(),
        }),

      });

      const newProblem = await res.json();

      if (!res.ok) {
        console.log(newProblem);
        return;
      }

      setProblems((prev) => [
        ...prev,
        newProblem,
      ]);

      setTitle("");
      setTopic("");
      setDifficulty("");

    }

    catch (err) {

      console.log(err);

    }

  };

 /* =========================
   DAILY GOAL LOGIC
========================= */


const today = new Date().toDateString();

const solvedToday = problems.filter((problem) => {

  return (
    new Date(
      problem.createdAt || problem.dateSolved
    ).toDateString() === today
  );

}).length;

const goalPercentage = Math.min(

  (solvedToday / dailyGoal) * 100,

  100

);

/* =========================
   KPI LOGIC
========================= */

const totalSolved = problems.length;

const easySolved = problems.filter(
  (problem) => problem.difficulty === "Easy"
).length;

const mediumSolved = problems.filter(
  (problem) => problem.difficulty === "Medium"
).length;

const hardSolved = problems.filter(
  (problem) => problem.difficulty === "Hard"
).length;

/* =========================
   STREAK LOGIC
========================= */

const solvedDates = [
  ...new Set(
    problems.map((problem) =>
      new Date(
        problem.dateSolved || problem.createdAt
      ).toDateString()
    )
  ),
];

let currentStreak = 0;

for (let i = 0; i < 365; i++) {

  const date = new Date();

  date.setDate(date.getDate() - i);

  const formatted = date.toDateString();

  if (solvedDates.includes(formatted)) {
    currentStreak++;
  } else {
    break;
  }
}

/* =========================
   INTERVIEW READINESS
========================= */

const interviewReadiness = Math.min(

  Math.round(

    (
      (
        easySolved * 1 +
        mediumSolved * 2 +
        hardSolved * 3
      ) / 400
    ) * 100

  ),

  100

);

/* =========================
   DIFFICULTY DONUT DATA
========================= */

const diffBuckets = [
  {
    label: "Easy",
    solved: easySolved,
    total: Math.max(easySolved, 1),
    color: "#22c55e",
  },
  {
    label: "Medium",
    solved: mediumSolved,
    total: Math.max(mediumSolved, 1),
    color: "#f59e0b",
  },
  {
    label: "Hard",
    solved: hardSolved,
    total: Math.max(hardSolved, 1),
    color: "#ef4444",
  },
];

  /* =========================
     WEAK AREAS
  ========================= */

  const topicCount = {};

  problems.forEach((problem) => {

    if (topicCount[problem.topic]) {

      topicCount[problem.topic]++;

    }

    else {

      topicCount[problem.topic] = 1;

    }

  });

  const weakAreas = Object.entries(topicCount)

    .sort((a, b) => a[1] - b[1])

    .slice(0, 4);

  /* =========================
     UI
  ========================= */

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">

{/* =========================
    HEADER
========================= */}

<div className="flex items-start justify-between mb-10">

  {/* LEFT */}

  <div>

    <h1 className="text-4xl font-bold text-gray-800">
      Preparation Tracker
    </h1>

    <p className="text-gray-500 mt-2">
      Track coding practice and interview preparation
    </p>

  </div>

  {/* RIGHT */}

  <Link
    to="/"
    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all font-medium"
  >
    <ArrowLeft size={18} />
    Back to Home
  </Link>

</div>

        
      {/* =========================
          KPI CARDS
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <KpiCard
          label="Current Streak"
          value={`${currentStreak} Days`}
          icon={Flame}
          color="bg-orange-500"
        />

        <KpiCard
          label="Problems Solved"
          value={totalSolved}
          icon={CalendarCheck}
          color="bg-blue-500"
        />

        <KpiCard
          label="Hard Problems"
          value={hardSolved}
          icon={Trophy}
          color="bg-purple-500"
        />

        <KpiCard
          label="Interview Readiness"
          value={`${interviewReadiness}%`}
          icon={Brain}
          color="bg-green-500"
        />

      </div>
            

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">

        {/* =========================
            ADD PROBLEM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-lg border relative overflow-hidden"
        >

          <div className="absolute -top-16 -right-16 w-52 h-52 bg-purple-300/30 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">

                <Plus className="text-white" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Add Solved Problem
                </h2>

                <p className="text-gray-500 text-sm">
                  Keep your preparation streak alive
                </p>

              </div>

            </div>

            {/* TITLE */}

            <div className="mb-5">

              <label className="text-sm font-semibold text-gray-600">
                Problem Title
              </label>

              <input
                type="text"
                placeholder="e.g Two Sum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-2 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>

            {/* TOPIC */}

            <div className="mb-5">

              <label className="text-sm font-semibold text-gray-600">
                Topic
              </label>

              <input
                type="text"
                placeholder="e.g Graphs"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full mt-2 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-400"
              />

            </div>

            {/* DIFFICULTY */}

            <div className="mb-6">

              <label className="text-sm font-semibold text-gray-600">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full mt-2 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
              >

                <option value="">
                  Select Difficulty
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

            </div>

                       {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >

              Add Problem

            </button>

          </div>

        </form>

        {/* =========================
            DAILY GOAL + DONUT CHART
        ========================= */}

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border">

          <div className="flex items-center gap-2">

            <Target className="text-purple-500" />

            <h2 className="text-xl font-bold text-gray-800">
              Daily Goal
            </h2>

          </div>

          {/* CIRCLE */}

          <div className="flex items-center justify-center mt-8">

            <div className="relative w-40 h-40">

              <svg className="w-40 h-40 rotate-[-90deg]">

                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="url(#grad)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={377}
                  strokeDashoffset={
                    377 - (377 * goalPercentage) / 100
                  }
                />

                <defs>

                  <linearGradient id="grad">

                    <stop offset="0%" stopColor="#3b82f6" />

                    <stop offset="100%" stopColor="#a855f7" />

                  </linearGradient>

                </defs>

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <h1 className="text-3xl font-bold text-gray-800">
                  {solvedToday}/{dailyGoal}
                </h1>

                <p className="text-sm text-gray-500">
                  Today
                </p>

              </div>

            </div>

          </div>

          {/* DONUT CHART */}

          <div className="mt-10 flex items-center gap-5">

            <div className="relative h-32 w-32 shrink-0">

              <svg
                viewBox="0 0 100 100"
                className="h-full w-full -rotate-90"
              >

                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="fill-none stroke-gray-200"
                  strokeWidth="12"
                />

                {(() => {

                  const diffBuckets = [
                    {
                      label: "Easy",
                      solved: easySolved,
                      color: "#22c55e",
                    },
                    {
                      label: "Medium",
                      solved: mediumSolved,
                      color: "#eab308",
                    },
                    {
                      label: "Hard",
                      solved: hardSolved,
                      color: "#ef4444",
                    },
                  ];

                  const C = 2 * Math.PI * 40;

                  let offset = 0;

                  return diffBuckets.map((d) => {

                    const frac =
                      totalSolved === 0
                        ? 0
                        : d.solved / totalSolved;

                    const seg = (
                      <circle
                        key={d.label}
                        cx="50"
                        cy="50"
                        r="40"
                        className="fill-none"
                        stroke={d.color}
                        strokeWidth="12"
                        strokeDasharray={`${C * frac} ${C}`}
                        strokeDashoffset={-offset}
                      />
                    );

                    offset += C * frac;

                    return seg;

                  });

                })()}

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-xl font-semibold tabular-nums">
                  {totalSolved}
                </span>

                <span className="text-[10px] uppercase tracking-wider text-gray-500">
                  Solved
                </span>

              </div>

            </div>

            {/* SEGMENTED BARS */}

            <div className="flex-1 space-y-3.5">

              {[
                {
                  label: "Easy",
                  solved: easySolved,
                  color: "#22c55e",
                },
                {
                  label: "Medium",
                  solved: mediumSolved,
                  color: "#eab308",
                },
                {
                  label: "Hard",
                  solved: hardSolved,
                  color: "#ef4444",
                },
              ].map((d) => {

                const pct =
                  totalSolved === 0
                    ? 0
                    : (d.solved / totalSolved) * 100;

                return (

                  <div key={d.label}>

                    <div className="flex items-center justify-between text-xs mb-1.5">

                      <span className="font-medium">
                        {d.label}
                      </span>

                      <span className="text-gray-500 tabular-nums">
                        {d.solved}
                      </span>

                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: d.color,
                        }}
                      />

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

                    {/* INFO */}

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-2 text-gray-600">

              <Flame className="text-orange-500" size={18} />

              <span>
                {currentStreak} Day Streak
              </span>

            </div>

            <div className="flex items-center gap-2 text-gray-600">

              <Calendar size={18} />

              <span>

                {Math.max(dailyGoal - solvedToday, 0)} more to hit goal

              </span>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              ></div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          WEAK AREAS + INSIGHT
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* =========================
            WEAK AREAS
        ========================= */}

        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-lg border">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-orange-500" />

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Weak Areas
              </h2>

              <p className="text-gray-500 text-sm">
                Topics practiced the least
              </p>

            </div>

          </div>

          <div className="space-y-4">

            {weakAreas.length === 0 ? (

              <p className="text-gray-500">
                No problems added yet
              </p>

            ) : (

              weakAreas.map(([topic, count], index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-5 hover:bg-gray-50 transition-all"
                >

                  <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-2">

                      <TrendingDown
                        className="text-red-400"
                        size={18}
                      />

                      <h3 className="font-semibold text-gray-800">
                        {topic}
                      </h3>

                    </div>

                    <span className="text-sm text-gray-500">
                      {count} solved
                    </span>

                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                      style={{
                        width: `${Math.min(count * 10, 100)}%`,
                      }}
                    ></div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>
               {/* =========================
            INSIGHT
        ========================= */}

        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl">

          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">

                <Sparkles />

              </div>

              <div>

                <p className="uppercase text-xs tracking-wider font-semibold text-white/80">
                  Insight
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Preparation Analysis
                </h2>

              </div>

            </div>

            <p className="mt-6 text-white/90 leading-relaxed">

              {totalSolved < 15 && (
                <>
                  You're building consistency 🚀
                  Solve more problems daily to improve overall interview readiness faster.
                </>
              )}

              {totalSolved >= 15 && totalSolved < 50 && (
                <>
                  Your preparation is gaining momentum ⚡
                  Try balancing Easy, Medium, and Hard problems for stronger problem-solving skills.
                </>
              )}

              {totalSolved >= 50 && (
                <>
                  Strong consistency so far 🔥
                  Focus more on weak topics and medium-hard questions to become interview ready faster.
                </>
              )}

            </p>

            <button className="mt-8 bg-white text-purple-600 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300">

              Keep Practicing

              <ArrowRight size={18} />

            </button>

            <div className="mt-8 flex items-center gap-2 text-white/80 text-sm">

              <Zap size={16} />

              Updates automatically as you solve problems

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AddProblem;