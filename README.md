<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Sami Miri – Engineering Portfolio

A responsive, single‑page engineering portfolio built with React, TypeScript and Tailwind CSS. It showcases my projects, skills, experience and leadership, with an accessible design and a Gemini‑powered Q&A widget.

Features

Hero and About sections – Introduces who I am, where I'm based and my engineering philosophy.

Skills grid – Lists languages, frameworks, automation/data tools and other tooling.

Projects section with filters – Displays featured projects, professional experience and personal builds. Each card includes the project title, subtitle, timeframe, description, impact, technology stack and links.

Leadership & Community – Highlights volunteering and leadership roles.

Contact section – Shows phone, email and links to my LinkedIn and résumé; call‑to‑action buttons encourage reaching out.

Gemini‑powered portfolio Q&A widget – Users can ask questions like “Which project shows automation?”; responses are generated using a Google Gemini model and restricted to portfolio content.

Dark/light theme and responsive design – Built with Tailwind CSS and Vite, the site works on desktops and mobile devices.

Modular and easy to update – Profile details, project definitions and text content are stored as constants in index.tsx.

Getting Started
Prerequisites

Node.js
 (v18 or later)

A Gemini API
 key if you want the Q&A widget to work

Installation

Clone the repository

git clone https://github.com/SamiMiri/portfolio.git
cd portfolio

Install dependencies

npm install

Configure environment variables
Create a .env.local file in the project root and define your Gemini API key:

# Google Gemini API key for the Q&A widget
API_KEY=your_key_here

The code uses process.env.API_KEY when calling @google/genai.

Run the development server

npm run dev

Open your browser to http://localhost:5173 (or the port shown in the terminal) to view the portfolio.

Building for Production

To create an optimized production build:

npm run build

This will generate static files in the dist/ folder. You can preview the build locally with:

npm run preview

Deploy the contents of dist/ to any static hosting service (e.g. Vercel, Netlify, GitHub Pages).

Customization

This portfolio is easy to customize; open index.tsx and modify the constants at the top of the file:

PROFILE – your name, location, email, phone, image and external links.

HERO – the headline and subhead that appear in the hero section.

ABOUT – the narrative that appears in the About section.

SKILLS – arrays of skill groups and the items within them.

PROJECTS – an array of objects describing each project with title, subtitle, timeframe, kind (Featured, Experience, or Project), status, description, impact, tech and links.

LEADERSHIP – details about volunteer or leadership roles.

After editing these constants, save the file and restart the dev server to see your changes.

Tech Stack

React 19 and React DOM – component framework for building the user interface.

TypeScript – type‑safe JavaScript.

Tailwind CSS – utility‑first CSS framework for styling.

Vite – development server and build tool.

@google/genai – Gemini client library for the Q&A widget.

License

This project is currently private and no license file is provided. Feel free to fork and adapt the code for personal use, but please do not distribute without permission.

This portfolio was generated using Google AI Studio and hand‑tuned to present my engineering work in an accessible way. I hope you enjoy exploring it!
