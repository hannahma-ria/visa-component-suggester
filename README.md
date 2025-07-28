# DevSuggest – Natural Language → Component Suggestion Tool

## Overview

This is a lightweight React app that lets developers describe a UI in plain English and instantly get:

- Suggested components from the Visa Product Design System
- An auto-generated code snippet using those components

The goal was to create a fast, intuitive experience that makes it easier to go from idea to usable UI code.

---

## Demo

Live Demo Here -> https://visa-component-suggester-lac.vercel.app

---

## Features

-  Accepts natural language input from the developer
-  Matches relevant Nova components
-  Generates example code snippets using those components
-  Saves recent queries to `localStorage` (can reselect from dropdown)
-  One-click "Copy to Clipboard"
-  Intro tour for new users
-  Accessible with keyboard navigation + screen reader support

---

## How It Works

The logic is rule-based and kept simple:

1. User enters a prompt (ex: “login form with email and password”)
2. The app checks for keywords using a basic mapping
3. Matched components are shown + a code snippet is generated from templates
4. The user can copy the snippet or try another prompt

Recent queries are saved in `localStorage` so users can quickly reuse them.

---

## Technical Stack

- React + TypeScript
- CSS for layout + styling
- LocalStorage to simulate persistence
- Vite for bundling (locally)
- Deployed on Vercel

---

## Assumptions / Shortcuts

- Component matching is based on a static `componentMap.ts`
- I used placeholders for Nova components like `<Input />`, `<Label />`, etc.
- No real API used, saved queries are handled in the frontend only
- Didn’t implement live preview of the UI, but it’s something I’d love to explore

---

## With More Time, I’d...

- Add live rendering of the suggested UI
- Hook into a mock API for component metadata
- Let users save snippets to the cloud
- Turn the assistant into a floating chat bubble with richer guidance
- Improve the layout and test designs with wireframes

---

## How I Used AI

I used ChatGPT for brainstorming ideas and structure at the beginning.

All decisions, logic, and implementation were still mine, AI was just a tool to speed things up.

