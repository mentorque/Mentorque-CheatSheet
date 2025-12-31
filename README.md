# Mentorque Interview Cheat Sheet

An interactive interview preparation application built with React and Vite, featuring flip cards for behavioral questions, technical skills, and project highlights.

## Features

- **Interactive Flip Cards**: Study interview questions with beautiful flip card animations
- **Three Sections**: 
  - Behavioral Questions
  - Technical Questions  
  - Project Highlights
- **Quiz System**: Answer 3 binary questions before moving to the next section
- **Modern Design**: Matches the ResumeReview component design with glassmorphism effects
- **Responsive**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/
  │   ├── Navbar.jsx       # Navigation component with Mentorque branding
  │   └── CheatSheet.jsx   # Main cheat sheet component with flip cards
  ├── lib/
  │   └── utils.js         # Utility functions
  ├── App.jsx              # Main app component with routing
  ├── main.jsx             # Entry point
  └── index.css           # Global styles
```

## Technologies Used

- React 18
- Vite
- React Router
- Tailwind CSS
- Lucide React (icons)

## Usage

1. Navigate through sections using the "Next Section" button
2. Click on any card to flip it and see the answer
3. Before moving to the next section, answer 3 binary questions
4. Review your answers and continue when ready

