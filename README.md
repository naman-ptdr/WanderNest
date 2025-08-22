# 🌍 WanderNest – AI Trip Planner

WanderNest is an **AI-powered trip planning web application** that helps users discover destinations, generate personalized itineraries, and visualize trips on interactive maps. Built with the **MERN stack** and integrated with **Gemini AI & Google APIs**, it provides a seamless travel planning experience.

---

## 🚀 Features
- 🔐 **User Authentication** – Secure login & signup with JWT authentication  
- 📍 **Location Search** – Integrated with Google Places & OpenCage Geocoder  
- 🤖 **AI-Powered Itinerary** – Personalized travel plans using Gemini AI  
- 🗺️ **Interactive Maps** – Visualize locations & routes with Leaflet.js  
- 💾 **Save Trips** – Store and manage trips in MongoDB  
- ✉️ **Email Notifications** – Utility for sending confirmations/updates  
- 🎨 **Responsive UI** – Built with React.js + Tailwind CSS for modern UX  

---

## 🛠️ Tech Stack
**Frontend:** React.js, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js, JWT, Nodemailer  
**Database:** MongoDB, Mongoose  
**APIs & Services:** Google Places API, OpenCage Geocoder, Gemini AI, Leaflet.js  
**Others:** REST API Architecture, MVC Pattern  

---

## 📂 Project Structure

WanderNest/
├── client/ # Frontend (React + Tailwind)
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── routes/
│ ├── services/
│ └── App.jsx
│
├── server/ # Backend (Node.js + Express)
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ └── index.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/naman-ptdr/WanderNest.git
cd WanderNest

2️⃣ Install Dependencies
Frontend
cd client
npm install
Backend
cd ../server
npm install

3️⃣ Setup Environment Variables
Create a .env file inside /server with:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
GOOGLE_API_KEY=your_google_places_api_key
GEMINI_API_KEY=your_gemini_ai_api_key

4️⃣ Run the App
Backend
cd server
npm run dev
Frontend
cd client
npm run dev

App will be running at:

Frontend: http://localhost:5173

Backend: http://localhost:5000

📌 Future Enhancements

✈️ Flight & hotel booking integration (Skyscanner API)

🌦️ Weather insights for destinations

📊 Trip analytics dashboard

👥 Social trip sharing & collaboration

👨‍💻 Author

Naman Patidar
Final-year MCA, NIT Raipur | MERN Stack Developer | AI Enthusiast
