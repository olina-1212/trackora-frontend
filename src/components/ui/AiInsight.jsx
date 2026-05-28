import { Sparkles, ArrowRight, Briefcase, Calendar } from "lucide-react";

function AiInsight({
  totalApplications,
  interviewCount,
  rejectedCount,
  upcomingDeadlines,
}) {

  const responseRate =
    totalApplications > 0
      ? Math.round(
          (
            (interviewCount + rejectedCount) /
            totalApplications
          ) * 100
        )
      : 0;

  const interviewRate =
    totalApplications > 0
      ? Math.round(
          (
            interviewCount /
            totalApplications
          ) * 100
        )
      : 0;

  return (

    <div className="relative overflow-hidden rounded-3xl p-6 border border-purple-200 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl">

      {/* GLOW EFFECT */}

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col h-full">

        {/* TOP */}

        <div className="flex items-start gap-4">

          {/* ICON */}

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">

            <Sparkles size={24} />

          </div>

          {/* TEXT */}

          <div className="flex-1">

            <div className="flex items-center gap-2">

              <span className="uppercase tracking-wider text-xs font-semibold text-white/80">

                AI Insight

              </span>

              <span className="bg-white/20 px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md">

                Live

              </span>

            </div>

            <h2 className="text-2xl font-bold mt-4 leading-snug">

              Your application momentum is growing 🚀

            </h2>

            <p className="mt-4 text-white/80 leading-relaxed text-sm">

              You currently have{" "}

              <span className="font-bold text-white">
                {interviewCount}
              </span>

              {" "}interviews and{" "}

              <span className="font-bold text-white">
                {upcomingDeadlines}
              </span>

              {" "}upcoming deadlines.

              Focus on completing high-priority applications this week for better response rates.

            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          {/* RESPONSE RATE */}

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

            <div className="flex items-center gap-2 text-white/70 text-xs">

              <Briefcase size={14} />

              Response Rate

            </div>

            <h1 className="text-3xl font-bold mt-3">

              {responseRate}%

            </h1>

          </div>

          {/* INTERVIEW RATE */}

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

            <div className="flex items-center gap-2 text-white/70 text-xs">

              <Calendar size={14} />

              Interview Rate

            </div>

            <h1 className="text-3xl font-bold mt-3">

              {interviewRate}%

            </h1>

          </div>

        </div>

        {/* BUTTON */}

        <button className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-5 py-3 rounded-xl font-semibold hover:gap-3 hover:shadow-xl transition-all duration-300">

          Optimize Applications

          <ArrowRight size={18} />

        </button>

      </div>

    </div>

  );

}

export default AiInsight;