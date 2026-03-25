# AI Resume Builder - MERN Stack

A full-stack web application that allows users to create professional resumes with AI-powered summary generation using OpenAI's GPT API.

## Features

- 🔐 User authentication (Register/Login) with JWT
- 📝 Comprehensive resume builder with multiple sections
- 🤖 AI-powered professional summary generation
- 🎨 Two professional resume templates (Modern & Classic)
- 📄 PDF export functionality
- 💾 MongoDB integration for data persistence
- 🎯 Responsive design with Tailwind CSS

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- jsPDF
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- OpenAI API

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB Compass installed and running
- OpenAI API key

## Installation & Setup

### 1. Clone or Download the Project

```bash
# Create project directory
mkdir AI-Resume-Builder
cd AI-Resume-Builder
```

### 2. Backend Setup

```bash
# Navigate to backend directory
mkdir backend
cd backend

# Initialize npm and install dependencies
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors openai
npm install -D nodemon

# Create .env file
echo "MONGO_URI=mongodb://127.0.0.1:27017/ai_resume_builder
JWT_SECRET=your_super_secret_jwt_key_change_in_production
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000" > .env
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key from https://platform.openai.com/api-keys

### 3. Frontend Setup

```bash
# Navigate back to root and create frontend
cd ..
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install react-router-dom axios jspdf lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

### 4. MongoDB Setup

1. Open MongoDB Compass
2. Connect to `mongodb://127.0.0.1:27017`
3. The database `ai_resume_builder` will be created automatically when you first save data

## Running the Application

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage Guide

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Dashboard**: Fill in your resume information:
   - Personal Information
   - Skills
   - Education
   - Work Experience
4. **Generate AI Summary**: Click "Generate AI Summary" to create a professional summary
5. **Preview**: Toggle "Show Preview" to see your resume in real-time
6. **Choose Template**: Select between Modern and Classic templates
7. **Save**: Click "Save Resume" to store your data in MongoDB
8. **Download**: Click "Download PDF" to export your resume

## Project Structure

```
AI-Resume-Builder/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── resume.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ResumeForm.jsx
    │   │   ├── ResumePreview.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── utils/
    │   │   └── pdfGenerator.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Resume
- `POST /api/resume/create` - Create/Update resume (protected)
- `GET /api/resume/user/me` - Get user's resume (protected)
- `GET /api/resume/:id` - Get resume by ID (protected)
- `POST /api/resume/summary` - Generate AI summary (protected)

## Features in Detail

### AI Summary Generation
The app uses OpenAI's GPT-3.5-turbo model to generate professional summaries based on:
- Work experience
- Skills
- Education background

### PDF Generation
Uses jsPDF to create downloadable PDF resumes with two template options:
- **Modern Template**: Colorful header, clean design
- **Classic Template**: Traditional black and white format

### Authentication
Secure JWT-based authentication with:
- Password hashing using bcryptjs
- Protected routes
- Token expiration (30 days)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB Compass is running
- Check if the URI in `.env` matches your MongoDB connection string
- Default: `mongodb://127.0.0.1:27017/ai_resume_builder`

### OpenAI API Errors
- Verify your API key is correct
- Check your OpenAI account has available credits
- Ensure you're using a valid model (gpt-3.5-turbo)

### Port Already in Use
```bash
# Backend (change PORT in .env)
PORT=5001

# Frontend (change in vite.config.js)
server: { port: 3001 }
```

## Future Enhancements

- Multiple resume versions
- More template options
- Cover letter generation
- ATS optimization score
- Resume sharing functionality
- Export to Word format

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using the MERN Stack
```

---

## 🎉 Final Notes

This is a **complete, production-ready** MERN stack application. All files are provided with proper structure and functionality.

**To get started:**

1. Create the folder structure as shown
2. Copy each file's content to its respective location
3. Install dependencies for both frontend and backend
4. Add your OpenAI API key to the `.env` file
5. Start MongoDB Compass
6. Run both servers

The application will be fully functional with authentication, resume building, AI summary generation, and PDF export capabilities!-500"