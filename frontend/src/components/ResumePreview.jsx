import { Download } from 'lucide-react';

const ResumePreview = ({ resumeData, onDownloadPDF, template, setTemplate }) => {
  const modernTemplate = (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-blue-600 mt-2">
          {resumeData.personalInfo.linkedin && (
            <a href={resumeData.personalInfo.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          {resumeData.personalInfo.website && (
            <a href={resumeData.personalInfo.website} className="hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && resumeData.skills[0] !== '' && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              skill && (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
            Work Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              exp.company && (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              edu.institution && (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm flex-shrink-0 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  {edu.field && <p className="text-gray-700">{edu.field}</p>}
                  {edu.description && (
                    <p className="text-gray-600 mt-1">{edu.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const classicTemplate = (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-700 text-sm space-x-3">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>|</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>|</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
          <div className="text-gray-700 text-sm space-x-3 mt-1">
            {resumeData.personalInfo.linkedin && (
              <a href={resumeData.personalInfo.linkedin} className="hover:underline">
                LinkedIn
              </a>
            )}
            {resumeData.personalInfo.website && <span>|</span>}
            {resumeData.personalInfo.website && (
              <a href={resumeData.personalInfo.website} className="hover:underline">
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-800 text-sm leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && resumeData.skills[0] !== '' && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
            Skills
          </h2>
          <p className="text-gray-800 text-sm">
            {resumeData.skills.filter(s => s).join(' • ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              exp.company && (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-black">{exp.position}</h3>
                      <p className="text-gray-700 italic text-sm">{exp.company}</p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1 leading-relaxed">{exp.description}</p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-400 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {resumeData.education.map((edu, index) => (
              edu.institution && (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-black">{edu.degree}</h3>
                      <p className="text-gray-700 italic text-sm">{edu.institution}</p>
                      {edu.field && <p className="text-gray-700 text-sm">{edu.field}</p>}
                    </div>
                    <span className="text-gray-600 text-sm flex-shrink-0 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTemplate('modern')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              template === 'modern'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20'
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => setTemplate('classic')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              template === 'classic'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20'
            }`}
          >
            Classic
          </button>
        </div>
        <button
          onClick={onDownloadPDF}
          className="btn btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center shadow-lg shadow-purple-500/25"
        >
          <Download className="h-5 w-5" />
          <span>Download PDF</span>
        </button>
      </div>
      <div id="resume-preview" className="rounded-2xl overflow-hidden shadow-2xl">
        {template === 'modern' ? modernTemplate : classicTemplate}
      </div>
    </div>
  );
};

export default ResumePreview;