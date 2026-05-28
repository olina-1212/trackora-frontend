import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur">
      
      {/* TITLE */}
      <h1 className="text-lg font-semibold tracking-tight">
        Internship Tracker
      </h1>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-3">

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground w-72">
          <Search className="h-4 w-4" />
          <input
            placeholder="Search problems, companies..."
            className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground/70 text-foreground"
          />
          <kbd className="text-[10px] rounded bg-background px-1.5 py-0.5 border border-border/60">
            ⌘K
          </kbd>
        </div>

        {/* NOTIFICATION BUTTON */}
        <button className="relative rounded-lg p-2 hover:bg-muted text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        {/* SIMPLE USER CIRCLE (NO AVATAR COMPONENT) */}
        <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
          AK
        </div>

      </div>
    </header>
  );
}