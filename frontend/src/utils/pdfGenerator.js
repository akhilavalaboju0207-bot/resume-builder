import jsPDF from 'jspdf';

export const generatePDF = (resumeData, template) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth, fontSize = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.5);
  };

  // Helper to check if we need a new page
  const checkNewPage = (requiredSpace) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  if (template === 'modern') {
    // Modern Template
    // Header with colored background
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personalInfo.fullName || 'Your Name', margin, 25);

    // Contact Info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let contactInfo = [];
    if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email);
    if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone);
    if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location);
    doc.text(contactInfo.join(' | '), margin, 33);

    yPosition = 50;
    doc.setTextColor(0, 0, 0);

    // Professional Summary
    if (resumeData.summary) {
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const summaryHeight = addText(resumeData.summary, margin, yPosition, pageWidth - 2 * margin);
      yPosition += summaryHeight + 10;
    }

    // Skills
    if (resumeData.skills.length > 0 && resumeData.skills[0]) {
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('SKILLS', margin, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const skillsText = resumeData.skills.filter(s => s).join(' • ');
      const skillsHeight = addText(skillsText, margin, yPosition, pageWidth - 2 * margin);
      yPosition += skillsHeight + 10;
    }

    // Work Experience
    if (resumeData.experience.length > 0 && resumeData.experience[0].company) {
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('WORK EXPERIENCE', margin, yPosition);
      yPosition += 7;

      resumeData.experience.forEach((exp, index) => {
        if (exp.company) {
          checkNewPage(40);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(exp.position, margin, yPosition);

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(37, 99, 235);
          yPosition += 5;
          doc.text(exp.company, margin, yPosition);

          doc.setTextColor(100, 100, 100);
          const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 5;
          doc.setTextColor(0, 0, 0);
          if (exp.description) {
            const descHeight = addText(exp.description, margin, yPosition, pageWidth - 2 * margin);
            yPosition += descHeight + 8;
          }
        }
      });
      yPosition += 5;
    }

    // Education
    if (resumeData.education.length > 0 && resumeData.education[0].institution) {
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('EDUCATION', margin, yPosition);
      yPosition += 7;

      resumeData.education.forEach((edu, index) => {
        if (edu.institution) {
          checkNewPage(30);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(edu.degree, margin, yPosition);

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(37, 99, 235);
          yPosition += 5;
          doc.text(edu.institution, margin, yPosition);

          if (edu.field) {
            yPosition += 4;
            doc.setTextColor(0, 0, 0);
            doc.text(edu.field, margin, yPosition);
          }

          doc.setTextColor(100, 100, 100);
          const dateText = `${edu.startDate} - ${edu.endDate}`;
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 8;
        }
      });
    }
  } else {
    // Classic Template
    // Name
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personalInfo.fullName || 'Your Name', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    // Contact Info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let contactInfo = [];
    if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email);
    if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone);
    if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location);
    doc.text(contactInfo.join(' | '), pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Professional Summary
    if (resumeData.summary) {
      checkNewPage(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const summaryHeight = addText(resumeData.summary, margin, yPosition, pageWidth - 2 * margin);
      yPosition += summaryHeight + 8;
    }

    // Skills
    if (resumeData.skills.length > 0 && resumeData.skills[0]) {
      checkNewPage(25);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const skillsText = resumeData.skills.filter(s => s).join(' • ');
      const skillsHeight = addText(skillsText, margin, yPosition, pageWidth - 2 * margin);
      yPosition += skillsHeight + 8;
    }

    // Work Experience
    if (resumeData.experience.length > 0 && resumeData.experience[0].company) {
      checkNewPage(25);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('WORK EXPERIENCE', margin, yPosition);
      yPosition += 6;

      resumeData.experience.forEach((exp, index) => {
        if (exp.company) {
          checkNewPage(35);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(exp.position, margin, yPosition);

          const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 5;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          doc.text(exp.company, margin, yPosition);

          yPosition += 5;
          doc.setFont('helvetica', 'normal');
          if (exp.description) {
            const descHeight = addText(exp.description, margin, yPosition, pageWidth - 2 * margin);
            yPosition += descHeight + 6;
          }
        }
      });
      yPosition += 3;
    }

    // Education
    if (resumeData.education.length > 0 && resumeData.education[0].institution) {
      checkNewPage(25);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', margin, yPosition);
      yPosition += 6;

      resumeData.education.forEach((edu, index) => {
        if (edu.institution) {
          checkNewPage(25);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(edu.degree, margin, yPosition);

          const dateText = `${edu.startDate} - ${edu.endDate}`;
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 5;
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          doc.text(edu.institution, margin, yPosition);

          if (edu.field) {
            yPosition += 4;
            doc.setFont('helvetica', 'normal');
            doc.text(edu.field, margin, yPosition);
          }

          yPosition += 6;
        }
      });
    }
  }

  // Save the PDF
  doc.save('resume.pdf');
};