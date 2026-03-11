import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { ResumeForm } from "../components/ResumeForm";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40">
              RT
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                ResumeTailor
              </span>
              <span className="text-xs text-slate-400">
                Tailor your resume for every role.
              </span>
            </div>
          </div>
          <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
            MVP • Private beta
          </span>
        </header>

        <ResumeForm />

        <footer className="pt-4 text-center text-xs text-slate-500">
          Powered by OpenAI • Please review and edit before sending.
        </footer>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

