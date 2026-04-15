`voice2crm` is the idea of a whole CRM handled through one simple phone call.

Instead of forcing users to open dashboards, fill forms, and manually update records, the goal is to let them call in, speak naturally, and have the system do the CRM work for them. A single conversation should be enough to create leads, update contacts, log notes, assign tasks, set follow-ups, and keep the team aligned.

This repo is the starting point for that product: a full-stack [Next.js](https://nextjs.org) app where the landing page, backend APIs, voice workflows, and future CRM experience can live in one codebase.

## Product Vision

We are planning to build a CRM where:

- One call can capture a lead
- One call can update a deal or customer record
- One call can create tasks, reminders, and next steps
- One call can sync context across the whole team
- One call can replace most manual CRM data entry

The bigger idea is simple: `talk once, update everything`.

## What We Want This Product To Feel Like

- Fast: users should not need to type, click through forms, or learn complicated CRM workflows
- Natural: users should speak the way they already talk in real work situations
- Useful: spoken input should become structured CRM data automatically
- Collaborative: updates should be visible to the team in real time
- Flexible: the same voice workflow should adapt to different industries and business models

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Getting Started

Install dependencies and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: landing page
- `src/app/api/health/route.ts`: sample backend endpoint
- `src/app/layout.tsx`: root layout and metadata
- `src/app/globals.css`: global styles and theme tokens

## Backend in the Same Repo

Next.js route handlers let you keep backend endpoints alongside the frontend:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "voice2crm",
  "timestamp": "2026-04-14T00:00:00.000Z"
}
```

## Planned Product Capabilities

- Voice call intake for new leads and customer updates
- Speech-to-structured-data pipelines
- CRM record creation and updates from natural language
- Task creation, reminders, and follow-up tracking
- Shared activity feed for team collaboration
- Industry-specific CRM schemas powered by the same voice-first workflow

## Next Steps

- Add authentication and team accounts
- Connect a database for CRM records
- Build core CRM entities such as contacts, leads, deals, tasks, and activity logs
- Add call ingestion, transcription, and parsing workflows
- Map natural speech into structured CRM actions
- Build the internal CRM dashboard and record views
