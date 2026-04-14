`voice2crm` is a full-stack [Next.js](https://nextjs.org) app in a single repo. The frontend lives in the App Router and the backend can be built with route handlers and server-side code in the same project.

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

## Next Steps

- Add your auth flow
- Connect a database
- Build CRM pages and APIs
- Add voice transcription or ingestion workflows
