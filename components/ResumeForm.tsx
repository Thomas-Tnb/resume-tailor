"use client";

import React, { useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

export function ResumeForm() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!resume.trim() || !jobDescription.trim()) {
      setError("Please paste both your resume and the job description.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume, jobDescription })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate resume.");
      }

      const data = (await response.json()) as { markdown: string };
      setGeneratedResume(data.markdown);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownloadPdfPlaceholder() {
    alert("PDF download will be available in a future version.");
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Tailor your resume for any job in seconds
        </h1>
        <p className="text-sm text-slate-300 sm:text-base">
          Paste your existing resume and the job description. ResumeTailor will
          rewrite your resume to highlight the most relevant skills and
          experience for that role.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/40 backdrop-blur sm:grid-cols-2 sm:p-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="resume"
            className="text-sm font-medium text-slate-100"
          >
            Your current resume
          </label>
          <textarea
            id="resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here..."
            className="min-h-[220px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/60 transition focus:border-sky-500 focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="jobDescription"
            className="text-sm font-medium text-slate-100"
          >
            Job description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job posting or description here..."
            className="min-h-[220px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 ring-sky-500/60 transition focus:border-sky-500 focus:ring-2"
          />
        </div>

        {error && (
          <div className="sm:col-span-2 rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
          >
            {isLoading ? "Generating..." : "Generate Resume"}
          </button>

          <button
            type="button"
            onClick={handleDownloadPdfPlaceholder}
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
          >
            Download PDF (coming soon)
          </button>
        </div>
      </form>

      {generatedResume && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/40 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-50">
              Tailored resume
            </h2>
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              AI-generated
            </span>
          </div>
          <MarkdownRenderer content={generatedResume} />
        </div>
      )}
    </div>
  );
}

