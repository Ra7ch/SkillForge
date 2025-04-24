// Mock user data for testing

export const users = [
  {
    id: "worker1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    password: "password123", // In a real app, this would be hashed
    whatsapp: "+212627866539",
    age: "32",
    type: "worker", // or "mentor"
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
    createdAt: "2024-01-15T08:30:00",
    lastActive: "2024-04-28T14:45:00"
  },
  {
    id: "client1",
    name: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    password: "password123", // In a real app, this would be hashed
    whatsapp: "+212655443322",
    age: "29",
    type: "client", // or "mentee"
    company: "Green Home Solutions",
    position: "Project Manager",
    interests: ["Sustainable construction", "Home renovation", "Solar energy"],
    projectsCompleted: 8,
    projectsActive: 2,
    totalSpent: 12500,
    profileImage: "/avatars/client-avatar.jpg",
    about: "Project manager at a sustainable construction company looking for skilled workers and mentorship for junior team members.",
    createdAt: "2024-02-05T10:15:00",
    lastActive: "2024-04-27T16:30:00"
  }
];

// Get user by email and password (mock authentication)
export const getUserByCredentials = (email, password) => {
  return users.find(user => user.email === email && user.password === password) || null;
};

// Get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === id) || null;
}; 