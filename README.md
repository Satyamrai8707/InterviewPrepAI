<h1>💼 InterviewPrepAI</h1>
<hr>
<p>
  <img src="https://img.shields.io/badge/build-passing-brightgreen" />
  <img src="https://img.shields.io/github/license/Satyamrai8707/InterviewPrepAI" />
  <img src="https://img.shields.io/badge/MERN-Full%20Stack-blueviolet" />
  <img src="https://img.shields.io/badge/OpenAI-API-blue" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-blue" />
</p>

<p>
  A <strong>MERN Stack</strong> application that allows users to generate AI-powered interview questions,
  create and manage interview sessions, and view question breakdowns. Built with 
  <strong>React</strong>, <strong>Node.js</strong>, <strong>Express</strong>, <strong>MongoDB</strong>, 
  and <strong>JWT Auth</strong>.
</p>

<h2>✨ Features</h2>
<hr>
<ul>
  <li>🔐 User Authentication (JWT)</li>
  <li>🧠 AI-generated interview questions (OpenAI API)</li>
  <li>📄 Session creation and tracking</li>
  <li>📊 Question explanation view</li>
  <li>📁 Profile image upload (optional)</li>
  <li>🖼️ Cloudinary integration for images</li>
  <li>⚡ Clean and responsive UI (Tailwind CSS + Framer Motion)</li>
</ul>

<h2>🖥️ Tech Stack</h2>
<hr>
<h3>🔧 Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB + Mongoose</li>
  <li>bcryptjs</li>
  <li>jsonwebtoken</li>
  <li>dotenv</li>
  <li>multer</li>
</ul>

<h3>🌐 Frontend</h3>
<ul>
  <li>React.js</li>
  <li>Tailwind CSS</li>
  <li>React Router</li>
  <li>Axios</li>
  <li>React Hot Toast</li>
  <li>Framer Motion</li>
</ul>

<h2>📁 Project Structure</h2>
<hr>
<pre>
InterviewPrepAI/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── uploads/
└── .env
</pre>

<h2>⚙️ Environment Variables</h2>
<hr>
<p>Create a <code>.env</code> file in <code>backend/</code> with:</p>
<pre>
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=your_openai_api_key
</pre>

<h2>📦 Installation & Setup</h2>
<hr>
<h3>1. Clone the Repository</h3>
<pre>git clone https://github.com/Satyamrai8707/InterviewPrepAI.git</pre>

<h3>2. Backend Setup</h3>
<pre>
cd InterviewPrepAI/backend
npm install
npm run dev
</pre>

<h3>3. Frontend Setup</h3>
<pre>
cd ../frontend
npm install
npm start
</pre>

<h2>🔍 API Endpoints Overview</h2>
<hr>
<table>
  <thead>
    <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  </thead>
<tbody>
  <!-- 🔐 Auth Routes -->
  <tr><td>POST</td><td>/api/auth/register</td><td>Register new user</td></tr>
  <tr><td>POST</td><td>/api/auth/login</td><td>Login existing user</td></tr>
  <tr><td>GET</td><td>/api/auth/profile</td><td>Get user profile</td></tr>
  <tr><td>POST</td><td>/api/auth/logout</td><td>Logout user</td></tr>
  <tr><td>POST</td><td>/api/auth/upload-image</td><td>Upload profile image</td></tr>

  <!-- 📝 Sessions -->
  <tr><td>POST</td><td>/api/sessions/create</td><td>Create a new interview session</td></tr>
  <tr><td>GET</td><td>/api/sessions/my-sessions</td><td>Get all sessions for logged-in user</td></tr>
  <tr><td>GET</td><td>/api/sessions/:id</td><td>Get session by ID</td></tr>
  <tr><td>PUT</td><td>/api/sessions/update/:id</td><td>Update session by ID</td></tr>
  <tr><td>DELETE</td><td>/api/sessions/:id</td><td>Delete session by ID</td></tr>

  <!-- 📄 Questions -->
  <tr><td>POST</td><td>/api/questions/add</td><td>Add question to session</td></tr>
  <tr><td>GET</td><td>/api/questions/:id</td><td>Get question by ID</td></tr>
  <tr><td>PATCH</td><td>/api/questions/:id/pin</td><td>Toggle pin for a question</td></tr>
  <tr><td>PATCH</td><td>/api/questions/:id/note</td><td>Update note for a question</td></tr>

  <!-- 🤖 AI -->
  <tr><td>POST</td><td>/api/ai/generate-questions</td><td>Generate interview questions using OpenAI</td></tr>
  <tr><td>POST</td><td>/api/ai/generate-explainations</td><td>Generate explanations for questions</td></tr>
</tbody>

</table>

<h2>🌐 Live Demo</h2>
<hr>
<ul>
  <li><a href="https://interview-prep-ai-frontend-exp2.onrender.com/" target="_blank">🚀 Check out the Website</a></li>
</ul>


<h2>🙌 Contributing</h2>
<hr>
<ul>
  <li>Pull requests and suggestions are welcome!</li>
  <li>Please open an issue for major feature requests</li>
</ul>

<h2>📄 License</h2>
<hr>
<p>This project is licensed under the <strong>MIT License</strong>.</p>

<h2>🔗 Contact</h2>
<hr>
<p>
  <a href="https://www.linkedin.com/in/satyamrai8707/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" style="width: 40px; margin-right: 15px;" />
  </a>
  <a href="https://github.com/Satyamrai8707/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 40px;" />
  </a>
</p>
