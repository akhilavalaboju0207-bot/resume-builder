import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData, onGenerateSummary, generatingSummary }) => {
  const handlePersonalInfoChange = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, skills: [...resumeData.skills, ''] });
  };

  const removeSkill = (index) => {
    const newSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: '', position: '', startDate: '', endDate: '', description: '', current: false },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: newExperience });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={resumeData.personalInfo.location}
            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
          <input
            type="url"
            placeholder="LinkedIn"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
          <input
            type="url"
            placeholder="Website/Portfolio"
            value={resumeData.personalInfo.website}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
          <button
            onClick={onGenerateSummary}
            disabled={generatingSummary}
            className="btn btn-secondary text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            <Sparkles className="h-4 w-4" />
            <span>{generatingSummary ? 'Generating...' : 'Generate AI Summary'}</span>
          </button>
        </div>
        <textarea
          placeholder="Professional summary will appear here..."
          value={resumeData.summary}
          onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
          rows="4"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
        />
      </div>

      {/* Skills */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Skills</h3>
          <button
            onClick={addSkill}
            className="btn btn-primary text-sm flex items-center space-x-1 shadow-lg shadow-cyan-500/25"
          >
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </button>
        </div>
        <div className="space-y-3">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g., JavaScript, React, Node.js"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
              />
              <button
                onClick={() => removeSkill(index)}
                className="bg-red-600/20 border border-red-500/50 text-red-400 px-3 py-3 rounded-lg hover:bg-red-600/30 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Education</h3>
          <button
            onClick={addEducation}
            className="btn btn-primary text-sm flex items-center space-x-1 shadow-lg shadow-cyan-500/25"
          >
            <Plus className="h-4 w-4" />
            <span>Add Education</span>
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border border-white/10 bg-white/5 p-4 rounded-lg">
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                  />
                </div>
                <textarea
                  placeholder="Description (optional)"
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  rows="2"
                  className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Work Experience</h3>
          <button
            onClick={addExperience}
            className="btn btn-primary text-sm flex items-center space-x-1 shadow-lg shadow-cyan-500/25"
          >
            <Plus className="h-4 w-4" />
            <span>Add Experience</span>
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border border-white/10 bg-white/5 p-4 rounded-lg">
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                    disabled={exp.current}
                  />
                </div>
                <label className="flex items-center space-x-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                    className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-cyan-400/20 cursor-pointer"
                  />
                  <span>Currently working here</span>
                </label>
                <textarea
                  placeholder="Job description and achievements"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  rows="3"
                  className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm