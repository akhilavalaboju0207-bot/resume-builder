import OpenAI from 'openai';
import Resume from '../models/Resume.js';

// @desc    Create or update resume
// @route   POST /api/resume/create
// @access  Private
export const createResume = async (req, res) => {
  try {
    const { personalInfo, education, experience, skills, summary, template } = req.body;

    // Check if resume exists for user
    let resume = await Resume.findOne({ user: req.user._id });

    if (resume) {
      // Update existing resume
      resume.personalInfo = personalInfo || resume.personalInfo;
      resume.education = education || resume.education;
      resume.experience = experience || resume.experience;
      resume.skills = skills || resume.skills;
      resume.summary = summary || resume.summary;
      resume.template = template || resume.template;

      await resume.save();
    } else {
      // Create new resume
      resume = await Resume.create({
        user: req.user._id,
        personalInfo,
        education,
        experience,
        skills,
        summary,
        template,
      });
    }

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's resume
// @route   GET /api/resume/:id
// @access  Private
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if user owns the resume
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's resume by user ID
// @route   GET /api/resume/user/me
// @access  Private
export const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate AI summary
// @route   POST /api/resume/summary
// @access  Private
export const generateSummary = async (req, res) => {
  try {
    const { experience, skills, education } = req.body;

    if (!experience || !skills) {
      return res.status(400).json({ message: 'Please provide experience and skills' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Format experience and skills for the prompt
    const experienceText = experience.map(exp => 
      `${exp.position} at ${exp.company}`
    ).join(', ');
    
    const skillsText = skills.join(', ');
    const educationText = education && education.length > 0 
      ? education.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`).join(', ')
      : '';

    const prompt = `Write a concise, professional resume summary (2-3 sentences) for someone with the following background:
    
Experience: ${experienceText}
Skills: ${skillsText}
${educationText ? `Education: ${educationText}` : ''}

The summary should be compelling, highlight key strengths, and be suitable for a professional resume.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Create compelling, concise resume summaries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content.trim();

    res.json({ summary });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ 
      message: 'Failed to generate summary',
      error: error.message 
    });
  }
};