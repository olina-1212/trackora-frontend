function TopicBreakdown({ data }) {

  // safety check
  if (!data || !data.topicSummary) return null;

  // convert backend topicSummary into array
  const topics = Object.entries(data.topicSummary).map(
    ([name, solved], index) => {

      // temporary target totals
      // you can later replace with real totals from backend
      const total = solved + 20;

      // colors for bars
      const colors = [
        "oklch(0.6 0.18 268)",
        "oklch(0.68 0.18 285)",
        "oklch(0.78 0.15 75)",
        "oklch(0.7 0.16 155)",
        "oklch(0.7 0.14 230)",
      ];

      return {
        name,
        solved,
        total,
        color: colors[index % colors.length],
      };
    }
  );

  return (
    <div
      className="rounded-2xl border border-border/60 bg-card p-6"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold tracking-tight">
            Topic Breakdown
          </h3>

          <p className="text-xs text-muted-foreground mt-0.5">
            Your progress by category
          </p>
        </div>

        <button className="text-xs text-muted-foreground hover:text-foreground">
          View all
        </button>

      </div>

      {/* TOPIC LIST */}
      <div className="mt-5 space-y-4">

        {topics.map((topic) => {

          const percentage =
            (topic.solved / topic.total) * 100;

          return (
            <div key={topic.name}>

              {/* TOP ROW */}
              <div className="flex items-center justify-between text-sm mb-1.5">

                <span className="font-medium">
                  {topic.name}
                </span>

                <span className="text-muted-foreground tabular-nums">
                  {topic.solved}
                  <span className="text-muted-foreground/60">
                    /{topic.total}
                  </span>
                </span>

              </div>

              {/* PROGRESS BAR */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: topic.color,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default TopicBreakdown;