# 🎥 Zoom-Style Video Conferencing App (Vidly)

A full-stack, production-ready **video conferencing platform** inspired by Zoom—built with the latest **Next.js** and **TypeScript**.  
Vidly delivers secure, real-time video calls, meeting management, and modern collaboration tools in a beautifully responsive UI.

---

## 🤖 Introduction

Vidly re-creates the core functionality of a professional video-conferencing service:

- **Instant Meetings**: Start or join video calls with a single link.
- **Scheduled Sessions**: Create and manage upcoming meetings with calendar-ready details.
- **Recording & Playback**: Capture and replay meetings directly in the app.
- **Advanced Participant Controls**: From screen sharing to granular host permissions.

The goal of this project is to demonstrate a **scalable, real-time architecture** while showcasing clean code organization, type safety, and an elegant user experience.

---

## ⚙️ Tech Stack

| Layer                | Technology                                                                                 |
|----------------------|---------------------------------------------------------------------------------------------|
| **Framework**        | [Next.js](https://nextjs.org/) – App Router, server & client components, and edge-ready SSR |
| **Language**         | [TypeScript](https://www.typescriptlang.org/) – Strict typing across the entire codebase    |
| **Authentication**   | [Clerk](https://clerk.com/) – Secure email/password and social logins with session handling |
| **Video/Chat API**   | [Stream](https://getstream.io/) – Reliable, low-latency video and chat infrastructure        |
| **UI Components**    | [Shadcn/UI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)               |
| **State & Data**     | React hooks, Context API, and Next.js server actions                                        |
| **Deployment**       | Vercel (or any Node-compatible host)                                                        |

---

## 🔋 Core Features

### Meeting Creation & Participation
- **New Meeting**: Launch a meeting instantly with camera/microphone pre-checks.
- **Join via Link**: Enter any valid meeting URL to join a session immediately.
- **Personal Room**: Each user has a permanent meeting link for ad-hoc calls.

### In-Meeting Controls
- **Audio/Video Management**: Mute/unmute audio, enable/disable camera.
- **Screen Sharing**: Present your screen or application window.
- **Recording**: Record sessions and store them securely for later playback.
- **Grid & Speaker Views**: Dynamic layouts for large or small meetings.
- **Emoji Reactions**: Lightweight real-time reactions without interrupting speakers.

### Host & Participant Management
- **Participant List**: View, pin, or spotlight participants.
- **Permissions**: Host can mute/unmute others, block users, or control screen sharing.

### Meeting Lifecycle
- **Scheduling**: Set a future date/time with automated reminders and shareable links.
- **Upcoming Meetings Page**: Centralized list for all scheduled events.
- **Past Meetings & Recordings**: Browse previous sessions with metadata and downloadable recordings.
- **End or Leave**: Hosts can end meetings for all; participants can exit anytime.

### Real-Time & Security
- **Low-Latency Streams**: Powered by Stream’s WebRTC infrastructure.
- **End-to-End Security**: Clerk sessions, HTTPS, and secure tokens protect user data.
- **Scalable Architecture**: Serverless APIs handle spikes in traffic seamlessly.

### Responsive Design
- Fully responsive layout that adapts to phones, tablets, and large displays.

---

