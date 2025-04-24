// Test login script for browser console
// Copy this code to your browser console to log in as test users

// Worker test login
function loginAsWorker() {
  const workerData = {
    id: "worker1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    type: "worker",
    profession: "Electrician",
    level: 3,
    experience: "5-10 years",
    specializations: ["Residential wiring", "Commercial electrical", "Solar installation"],
    certifications: ["Master Electrician License", "Electrical Safety Certification", "Solar PV Installer"],
    rating: 4.8,
    totalSessions: 24,
    completedSessions: 22,
    earningsTotal: 3540,
    earningsMonth: 860,
    profileImage: "/avatars/worker-avatar.jpg",
    about: "Master electrician with over 8 years of experience in residential and commercial electrical work. Certified in solar PV installation and passionate about renewable energy solutions.",
    availability: ["weekdays", "evenings"],
    assessmentDate: "2025-05-15T10:00:00",
  };
  
  // Find the main React component
  const rootElement = document.getElementById('__next');
  const reactInstance = Object.keys(rootElement).find(key => key.startsWith('__reactFiber'));
  
  if (reactInstance) {
    let fiber = rootElement[reactInstance];
    
    // Try to find the SkillForge component
    while (fiber) {
      if (fiber.memoizedProps && typeof fiber.memoizedProps.onLogin === 'function') {
        // Call the onLogin function with the test worker data
        fiber.memoizedProps.onLogin(workerData);
        console.log('✅ Logged in as worker test user: Ahmed Hassan');
        break;
      }
      fiber = fiber.return;
    }
  } else {
    console.error('❌ Unable to find React instance. Are you using this in a React app?');
  }
}

// Client test login
function loginAsClient() {
  const clientData = {
    id: "client1",
    name: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    type: "client",
    company: "Green Home Solutions",
    position: "Project Manager",
    interests: ["Sustainable construction", "Home renovation", "Solar energy"],
    projectsCompleted: 8,
    projectsActive: 2,
    totalSpent: 12500,
    profileImage: "/avatars/client-avatar.jpg",
    about: "Project manager at a sustainable construction company looking for skilled workers and mentorship for junior team members.",
  };
  
  // Find the main React component
  const rootElement = document.getElementById('__next');
  const reactInstance = Object.keys(rootElement).find(key => key.startsWith('__reactFiber'));
  
  if (reactInstance) {
    let fiber = rootElement[reactInstance];
    
    // Try to find the SkillForge component
    while (fiber) {
      if (fiber.memoizedProps && typeof fiber.memoizedProps.onLogin === 'function') {
        // Call the onLogin function with the test client data
        fiber.memoizedProps.onLogin(clientData);
        console.log('✅ Logged in as client test user: Fatima Zahra');
        break;
      }
      fiber = fiber.return;
    }
  } else {
    console.error('❌ Unable to find React instance. Are you using this in a React app?');
  }
}

// Usage instructions
console.log(`
=== SkillForge Test Login Utilities ===
To login as a worker, run: loginAsWorker()
To login as a client, run: loginAsClient()

Alternatively, use the login page with:
- Worker: ahmed.hassan@example.com / password123
- Client: fatima.zahra@example.com / password123
`); 