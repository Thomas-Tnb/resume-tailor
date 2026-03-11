import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const systemPrompt = `You are an expert resume writer and career coach.

Your task is to rewrite and optimize a candidate’s resume so it aligns strongly with a specific job description.

Follow these rules carefully:

1. Match the candidate’s experience to the job requirements.
2. Emphasize achievements and measurable impact.
3. Integrate relevant keywords from the job description naturally.
4. Rewrite bullet points using strong action verbs.
5. Focus on results and outcomes, not just responsibilities.
6. Keep everything truthful to the original resume.
7. Remove irrelevant experience if it doesn't support the job.
8. Maintain a professional and concise tone.

Improve bullet points using this structure when possible:

Action Verb + Task + Technology/Skill + Result/Impact

Example:
"Developed REST APIs using Node.js that supported internal tools used by 50+ employees, improving operational efficiency by 30%."

Output the resume in this structure:

# Professional Summary

A short 2–3 sentence summary tailored to the job.

# Core Skills

Bullet list of key skills relevant to the role.

# Professional Experience

For each role:
Company — Position — Dates

• Achievement-oriented bullet points
• Focus on impact and measurable results

# Education

# Additional Skills (optional)

Keep formatting clean and ATS-friendly.
Do not use tables or graphics.
Use clear bullet points.
`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body as {
      resume?: string;
      jobDescription?: string;
    };

    if (!resume || !jobDescription) {
      return res
        .status(400)
        .json({ error: "Missing resume or job description." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY is not configured on the server." });
    }

    const userPrompt = `Candidate resume:\n\n${resume}\n\nJob description:\n\n${jobDescription}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.6,
    });

    const markdown =
      completion.choices[0]?.message?.content?.trim() ??
      "# Summary\n\n(Unable to generate resume. Please try again.)";

    return res.json({ markdown });
  } catch (error) {
    console.error("Error generating tailored resume:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate resume. Please try again." });
  }
});

export default router;
