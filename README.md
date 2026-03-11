## ResumeTailor MVP

**Stack**: Next.js (App Router) + React + TailwindCSS + OpenAI

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root with your OpenAI key:

```bash
OPENAI_API_KEY=sk-...
```

3. Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Notes

- The main landing page lives in `app/page.tsx`.
- The API route that calls OpenAI lives in `app/api/generate/route.ts`.
- Shared UI components live in `components/`.
- The "Download PDF" button is a placeholder for now.

#### -----------------------------------------------------------------------------

## Product: ResumeTailor

# Problem

Job seekers must tailor resumes for each job application to pass ATS filters.

# Solution

Generate a customized resume from a linkedin profile link + job description using AI.

# Target Users

Developers and tech job seekers applying to multiple jobs.

## MVP Features

- Resume input
- Job description input
- Generate tailored resume
- Resume preview
- PDF download

## Success Metric

50 paying users at R$15 each.
