# 🧠 NeuroShield

NeuroShield is a web application designed to help **neurodivergent individuals, especially people with ADHD**, manage tasks, reduce overwhelm, and stay focused in a digital workspace.

The project aims to create a **minimal, structured productivity system** that supports users who struggle with traditional productivity tools.

---

# 💡 Features

- User **Signup / Login authentication**
- **Personalized onboarding** for neurodivergent users
- **Step-based task management**
- **Minimal distraction UI**
- **Overwhelm detection**
- **Smart reminders for tasks and breaks**
- **Cross-device task syncing**
- **Study Buddy**

---

# 🏗 Tech Stack

### Frontend
- React
- Vite
- TailwindCSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

# 🤖 AI Configuration

This project uses **Gemini Nano** for on-device AI processing.

Gemini Nano runs locally in supported browsers and does not require an external API key.  
This allows the application to generate AI-based recommendations while preserving user privacy and reducing latency.

---

# 🚀 Clone and Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/mharshil1234/neuroshield.git
cd neuroshield
```

---

### 2. Backend Setup

Navigate to the server folder and install dependencies.

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

Start the backend server:

```bash
node server.js
```

---

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder.

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Open the Application

Once both servers are running, open your browser and go to:

```
http://localhost:5173
```

---

# 🎯 Vision

Most software is designed for **neurotypical users**, which can make productivity tools overwhelming for individuals with ADHD or executive dysfunction.

NeuroShield aims to build a **cognitive-friendly productivity environment** that reduces friction and helps users start and complete tasks more effectively.
