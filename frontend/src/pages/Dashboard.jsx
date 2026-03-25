import { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';
import { Save, Eye, EyeOff } from 'lucide-react';

const Dashboard = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    skills: [''],
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      },
    ],
    template: 'modern',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [template, setTemplate] = useState('modern');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/resume/user/me');
      if (res.data) {
        setResumeData(res.data);
        setTemplate(res.data.template || 'modern');
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error fetching resume:', error);
      }
    }
  };

  const handleGenerateSummary = async () => {
    if (resumeData.experience.length === 0 || !resumeData.experience[0].position) {
      setMessage({ type: 'error', text: 'Please add at least one work experience' });
      return;
    }

    if (resumeData.skills.length === 0 || !resumeData.skills[0]) {
      setMessage({ type: 'error', text: 'Please add at least one skill' });
      return;
    }

    setGeneratingSummary(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.post('http://localhost:5001/api/resume/summary', {
        experience: resumeData.experience,
        skills: resumeData.skills,
        education: resumeData.education,
      });

      setResumeData({ ...resumeData, summary: res.data.summary });
      setMessage({ type: 'success', text: 'AI summary generated successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to generate summary',
      });
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleSaveResume = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('http://localhost:5001/api/resume/create', {
        ...resumeData,
        template,
      });
      setMessage({ type: 'success', text: 'Resume saved successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save resume',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(resumeData, template);
    setMessage({ type: 'success', text: 'Resume downloaded as PDF!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">AI Resume Builder</h1>
          <p className="text-slate-300 text-lg">
            Create a professional resume with AI-powered summary generation
          </p>
        </div>

        {/* Message alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-start space-x-3 animate-slideInLeft ${
              message.type === 'success'
                ? 'bg-green-500/20 border-green-500/50 text-green-200'
                : 'bg-red-500/20 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex-1">{message.text}</div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary flex items-center space-x-2 shadow-lg shadow-purple-500/25"
          >
            {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="btn btn-primary flex items-center space-x-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Saving...' : 'Save Resume'}</span>
          </button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ResumeForm
              resumeData={resumeData}
              setResumeData={setResumeData}
              onGenerateSummary={handleGenerateSummary}
              generatingSummary={generatingSummary}
            />
          </div>
          {showPreview && (
            <div className="lg:sticky lg:top-8 h-fit">
              <ResumePreview
                resumeData={resumeData}
                onDownloadPDF={handleDownloadPDF}
                template={template}
                setTemplate={setTemplate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;