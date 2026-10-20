# NeuroEase — Caregiver Memory Support UI Prototype

NeuroEase is a front-end prototype for a caregiver-facing memory support experience. It explores a flow for setting up a patient profile, organizing memory prompts, previewing session templates, scheduling sample sessions, and displaying playback/emergency-mode screens.

**Important scope:** This repository is a design and interaction prototype, not a functioning healthcare service. It uses sample data and in-memory UI state. It does not connect to a clinical record system, generate validated AI therapy content, save patient data, play real session audio, communicate with Bluetooth speakers, dispatch emergency help, or provide medical advice. Do not enter real patient or health data.

The original Figma Make source/design is linked here: https://www.figma.com/design/nMYA6T5U9ydbgPEwqTJQRN/NeuroEase-Healthcare-App-Prototype

## Prototype screens

- Onboarding and sample patient setup
- Dashboard with sample patient/session data
- Memory Builder with in-session create, edit, delete, and category filtering
- Session template preview and temporary session list
- Sample schedule creation, active-state toggle, delete, and weekly overview
- Playback, emergency mode, feedback, and settings screens

The Memory Builder, Session Generator, and Scheduling interactions remain in the browser's page memory and reset on refresh. Photo uploads, voice recording, actual audio playback, persistence, and notifications are not connected. Some remaining controls are intentionally disabled when no backing feature exists.

## Tech stack

- React 18 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Radix UI and MUI components
- Lucide icons

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/nikhil-247/NeuroEase.git
cd NeuroEase
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build:

```bash
npm run build
```

## Automated checks

GitHub Actions installs dependencies and runs `npm run build` on pushes and pull requests. A successful build verifies TypeScript/Vite compilation only; it does not establish clinical safety, API integrations, data persistence, or end-to-end functionality.

## Accessibility and data safety

- Use only fictional/sample data in this prototype.
- Don't treat the emergency screen as a real emergency contact or dispatch mechanism.
- Generated session templates are not AI-generated clinical content and aren't reviewed or validated for care decisions.
- Before connecting real patient data, add authentication, authorization, encrypted storage, consent, retention rules, audit logging, and a privacy/security review.

## Attribution

UI assets are attributed in [ATTRIBUTIONS.md](ATTRIBUTIONS.md). The prototype was originally assembled with Figma Make; review source and asset licenses before reusing components or images.

## Related work

A separate proof-of-concept API/story-service experiment is maintained at [AI-Lawyer-](https://github.com/nikhil-247/AI-Lawyer-). It is **not integrated with this UI** and has its own security limitations documented in that repository.
