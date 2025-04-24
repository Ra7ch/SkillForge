# SkillForge

SkillForge is a skills-based platform that connects mentors with mentees, focusing on specialized professions including trades, agriculture, and technical skills.

## Features

- User management (Workers/Mentors and Clients/Mentees)
- Skill assessment and certification
- Mentorship system
- Job marketplace
- Notifications and communications

## Test Users

The application includes test users for both a Worker/Mentor and a Client/Mentee profile:

### Worker/Mentor: Ahmed Hassan
- **Email**: ahmed.hassan@example.com
- **Password**: password123
- **Profile**: Level 3 Electrician with expertise in residential, commercial, and solar installations

### Client/Mentee: Fatima Zahra
- **Email**: fatima.zahra@example.com
- **Password**: password123
- **Profile**: Project Manager at Green Home Solutions looking for skilled professionals

## How to Use Test Users

### Method 1: Login Page
1. Navigate to the login page
2. Enter the email and password of the test user you wish to use
3. Click "Sign In"

### Method 2: Browser Console (Advanced)
1. Open your browser's developer console (F12 or right-click > Inspect > Console)
2. Copy and paste the entire content from `lib/data/test-login.js`
3. Run `loginAsWorker()` to log in as Ahmed Hassan (Worker)
4. Or run `loginAsClient()` to log in as Fatima Zahra (Client)

## Development

This is a [Next.js](https://nextjs.org/) project, using:
- React for the UI
- Tailwind CSS for styling
- ShadcnUI components
- n8n for automation workflows

### Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note

This is a demo application with mock data. In a production environment, proper authentication, data persistence, and security measures would be implemented. 