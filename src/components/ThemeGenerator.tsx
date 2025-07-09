
import { StudentData } from '@/pages/Index';

export interface ExtendedStudentData extends Omit<StudentData, 'theme'> {
  theme: string;
  resumeStyle: string;
}

export const generateDynamicPortfolioHTML = (data: ExtendedStudentData) => {
  const themeNumber = parseInt(data.theme) || 1;
  const resumeStyleNumber = parseInt(data.resumeStyle) || 1;
  
  // Enhanced theme configurations with distinct layouts and colors
  const themes = {
    1: { 
      name: 'Clean Light', 
      colors: { primary: '#3b82f6', secondary: '#1e40af', bg: '#ffffff', text: '#1f2937', accent: '#f8fafc' },
      layout: 'single-column',
      headerStyle: 'centered'
    },
    2: { 
      name: 'Elegant Dark', 
      colors: { primary: '#f59e0b', secondary: '#d97706', bg: '#111827', text: '#f9fafb', accent: '#1f2937' },
      layout: 'single-column',
      headerStyle: 'centered'
    },
    3: { 
      name: 'Sidebar Layout', 
      colors: { primary: '#10b981', secondary: '#059669', bg: '#ffffff', text: '#111827', accent: '#f0fdf4' },
      layout: 'sidebar',
      headerStyle: 'top-banner'
    },
    4: { 
      name: 'Boxed Layout', 
      colors: { primary: '#8b5cf6', secondary: '#7c3aed', bg: '#faf5ff', text: '#1f2937', accent: '#ffffff' },
      layout: 'boxed',
      headerStyle: 'card'
    },
    5: { 
      name: 'Banner Top', 
      colors: { primary: '#f97316', secondary: '#ea580c', bg: '#fff7ed', text: '#1f2937', accent: '#ffffff' },
      layout: 'banner',
      headerStyle: 'hero-banner'
    },
    6: { 
      name: 'Grid Portfolio', 
      colors: { primary: '#ec4899', secondary: '#be185d', bg: '#fdf2f8', text: '#374151', accent: '#ffffff' },
      layout: 'grid',
      headerStyle: 'centered'
    }
  };

  // Enhanced resume style configurations
  const resumeStyles = {
    1: { name: 'Clean', class: 'resume-clean' },
    2: { name: 'Border', class: 'resume-border' },
    3: { name: '2-Column', class: 'resume-two-column' },
    4: { name: 'Compact', class: 'resume-compact' },
    5: { name: 'Classic', class: 'resume-classic' },
    6: { name: 'Timeline', class: 'resume-timeline' }
  };

  const theme = themes[themeNumber as keyof typeof themes];
  const resumeStyle = resumeStyles[resumeStyleNumber as keyof typeof resumeStyles];

  // Parse data helper functions
  const parseEducation = (eduArray: any[]) => {
    if (!eduArray || eduArray.length === 0) return [];
    return eduArray.map(edu => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      year: edu.year || '',
      gpa: edu.gpa || ''
    }));
  };

  const parseProjects = (projectArray: any[]) => {
    if (!projectArray || projectArray.length === 0) return [];
    return projectArray.map(project => ({
      name: project.name || '',
      description: project.description || '',
      technologies: project.technologies || '',
      link: project.link || ''
    }));
  };

  const education = parseEducation(data.education);
  const projects = parseProjects(data.projects);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Dynamic Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: ${theme.colors.text};
            background: ${theme.colors.bg};
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            ${theme.layout === 'sidebar' ? 'display: grid; grid-template-columns: 300px 1fr; gap: 30px;' : ''}
            ${theme.layout === 'boxed' ? 'max-width: 1000px;' : ''}
            ${theme.layout === 'grid' ? 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;' : ''}
        }
        
        /* Header Styles */
        .header {
            ${theme.headerStyle === 'centered' ? 'text-align: center; padding: 60px 40px;' : ''}
            ${theme.headerStyle === 'hero-banner' ? 'background: linear-gradient(135deg, ' + theme.colors.primary + ', ' + theme.colors.secondary + '); color: white; padding: 80px 40px; text-align: center;' : ''}
            ${theme.headerStyle === 'card' ? 'background: ' + theme.colors.accent + '; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;' : ''}
            ${theme.headerStyle === 'top-banner' ? 'grid-column: 1 / -1; background: ' + theme.colors.accent + '; padding: 40px; border-radius: 15px; text-align: center;' : ''}
            margin-bottom: 40px;
            ${theme.layout !== 'sidebar' && theme.headerStyle !== 'hero-banner' ? 'background: ' + theme.colors.accent + '; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);' : ''}
        }
        
        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            object-fit: cover;
            border: 5px solid ${theme.colors.primary};
            display: block;
            background: #f3f4f6;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .profile-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f3f4f6;
            border: 5px solid ${theme.colors.primary};
            color: #9ca3af;
            font-size: 4rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .name {
            font-size: ${theme.headerStyle === 'hero-banner' ? '4rem' : '3rem'};
            font-weight: bold;
            margin-bottom: 10px;
            color: ${theme.headerStyle === 'hero-banner' ? 'white' : theme.colors.primary};
        }
        
        .title {
            font-size: 1.5rem;
            color: ${theme.headerStyle === 'hero-banner' ? 'rgba(255,255,255,0.9)' : theme.colors.secondary};
            margin-bottom: 20px;
        }
        
        .bio {
            font-size: 1.1rem;
            color: ${theme.headerStyle === 'hero-banner' ? 'rgba(255,255,255,0.8)' : '#666'};
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Sidebar Styles */
        .sidebar {
            ${theme.layout === 'sidebar' ? 'background: ' + theme.colors.accent + '; padding: 30px; border-radius: 15px; height: fit-content; box-shadow: 0 5px 15px rgba(0,0,0,0.1);' : 'display: none;'}
        }
        
        .main-content {
            ${theme.layout === 'sidebar' ? '' : 'width: 100%;'}
        }
        
        /* Section Styles */
        .section {
            background: ${theme.colors.accent};
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-bottom: 40px;
            ${theme.layout === 'boxed' ? 'border: 2px solid ' + theme.colors.primary + '; box-shadow: 0 20px 40px rgba(0,0,0,0.15);' : ''}
        }
        
        .section h2 {
            font-size: 2rem;
            margin-bottom: 30px;
            color: ${theme.colors.primary};
            ${theme.layout === 'boxed' ? 'text-align: center; border-bottom: 3px solid ' + theme.colors.primary + '; padding-bottom: 15px;' : ''}
        }
        
        /* Resume Style Classes */
        .resume-clean {
            background: ${theme.colors.accent};
            padding: 40px;
            border-radius: 15px;
        }
        
        .resume-border {
            background: ${theme.colors.accent};
            padding: 40px;
            border-radius: 15px;
            border-left: 8px solid ${theme.colors.primary};
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .resume-two-column {
            background: ${theme.colors.accent};
            padding: 40px;
            border-radius: 15px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        
        .resume-compact {
            background: ${theme.colors.accent};
            padding: 30px;
            border-radius: 15px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .resume-classic {
            background: ${theme.colors.accent};
            padding: 50px;
            border-radius: 0;
            border: 1px solid #ddd;
            font-family: 'Times New Roman', serif;
        }
        
        .resume-timeline {
            background: ${theme.colors.accent};
            padding: 40px 40px 40px 60px;
            border-radius: 15px;
            position: relative;
        }
        
        .resume-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 40px;
            bottom: 40px;
            width: 3px;
            background: ${theme.colors.primary};
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 30px;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -45px;
            top: 5px;
            width: 15px;
            height: 15px;
            background: ${theme.colors.primary};
            border-radius: 50%;
            border: 3px solid ${theme.colors.accent};
        }
        
        /* Skills Grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .skill-item {
            background: ${theme.colors.primary};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        /* Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .project-card {
            background: ${theme.layout === 'grid' ? theme.colors.bg : 'rgba(255,255,255,0.5)'};
            border: 2px solid ${theme.colors.primary}20;
            border-radius: 15px;
            padding: 25px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            ${theme.layout === 'grid' ? 'box-shadow: 0 10px 25px rgba(0,0,0,0.1);' : ''}
        }
        
        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .project-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: ${theme.colors.primary};
        }
        
        /* Education Cards */
        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .education-card {
            background: rgba(255,255,255,0.5);
            border: 1px solid ${theme.colors.primary}30;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid ${theme.colors.primary};
        }
        
        /* Contact Info */
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .contact-item {
            background: rgba(255,255,255,0.7);
            padding: 20px;
            border-radius: 10px;
            border: 2px solid ${theme.colors.primary}30;
            text-align: center;
        }
        
        .contact-item strong {
            display: block;
            margin-bottom: 8px;
            color: ${theme.colors.primary};
            font-size: 1.1rem;
        }
        
        /* Export Buttons */
        .export-buttons {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            color: white;
            font-size: 0.9rem;
        }
        
        .btn-html {
            background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
        }
        
        .btn-pdf {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        /* Theme Indicator */
        .theme-indicator {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: ${theme.colors.primary};
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        /* Footer */
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 40px 20px;
            background: ${theme.colors.accent};
            border-radius: 15px;
            color: ${theme.colors.text};
            opacity: 0.8;
            ${theme.layout === 'sidebar' ? 'grid-column: 1 / -1;' : ''}
        }
        
        /* Print Styles for PDF */
        @media print {
            .export-buttons,
            .theme-indicator {
                display: none !important;
            }
            
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            
            .profile-photo,
            .profile-placeholder {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .section {
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                padding: 10px;
            }
            .resume-two-column {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            .export-buttons {
                position: relative;
                top: auto;
                right: auto;
                justify-content: center;
                margin-bottom: 20px;
            }
            .theme-indicator {
                position: relative;
                bottom: auto;
                left: auto;
                text-align: center;
                margin: 20px 0;
            }
            .name {
                font-size: 2.5rem;
            }
            .section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Export Buttons (HTML shows both, PDF shows only PDF) -->
    <div class="export-buttons">
        <button class="btn btn-html" onclick="downloadHTML()" style="display: block;">📄 Download HTML</button>
        <button class="btn btn-pdf" onclick="generatePDF()" style="display: block;">📋 Save as PDF</button>
    </div>
    
    <!-- Theme Indicator -->
    <div class="theme-indicator">
        Theme: ${theme.name} | Resume: ${resumeStyle.name}
    </div>
    
    <div class="container">
        <!-- Header -->
        <div class="header">
            ${data.profilePhoto && data.profilePhoto !== 'skip' ? 
              `<img src="${data.profilePhoto}" alt="${data.name}" class="profile-photo">` : 
              '<div class="profile-placeholder">👤</div>'
            }
            <h1 class="name">${data.name || 'Your Name'}</h1>
            <p class="title">${data.title || 'Your Title'}</p>
            <p class="bio">${data.bio || 'Your professional biography goes here.'}</p>
        </div>
        
        <!-- Sidebar (for sidebar layout) -->
        ${theme.layout === 'sidebar' ? `
        <div class="sidebar">
            <div style="margin-bottom: 30px;">
                <h3 style="color: ${theme.colors.primary}; margin-bottom: 15px; font-size: 1.2rem;">Contact</h3>
                ${data.contact?.email ? `<p style="margin-bottom: 8px;"><strong>📧</strong> ${data.contact.email}</p>` : ''}
                ${data.contact?.phone && data.contact.phone !== 'skip' ? `<p style="margin-bottom: 8px;"><strong>📱</strong> ${data.contact.phone}</p>` : ''}
                ${data.contact?.linkedin && data.contact.linkedin !== 'skip' ? `<p style="margin-bottom: 8px;"><strong>💼</strong> <a href="${data.contact.linkedin}" style="color: ${theme.colors.primary};">LinkedIn</a></p>` : ''}
                ${data.contact?.github && data.contact.github !== 'skip' ? `<p style="margin-bottom: 8px;"><strong>💻</strong> <a href="${data.contact.github}" style="color: ${theme.colors.primary};">GitHub</a></p>` : ''}
            </div>
            
            ${data.skills && data.skills.length > 0 ? `
            <div>
                <h3 style="color: ${theme.colors.primary}; margin-bottom: 15px; font-size: 1.2rem;">Skills</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${data.skills.map(skill => `<span style="background: ${theme.colors.primary}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">${skill}</span>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
        ` : ''}
        
        <!-- Main Content -->
        <div class="main-content">
            <!-- Resume Section -->
            <div class="section ${resumeStyle.class}">
                <h2>Resume (${resumeStyle.name} Style)</h2>
                
                ${education.length > 0 ? `
                <div class="${resumeStyleNumber === 6 ? 'timeline-item' : ''}">
                    <h3 style="color: ${theme.colors.primary}; margin-bottom: 20px; font-size: 1.4rem;">Education</h3>
                    <div class="education-grid">
                        ${education.map(edu => `
                            <div class="education-card">
                                <h4 style="font-weight: bold; color: ${theme.colors.primary}; margin-bottom: 8px;">${edu.degree}</h4>
                                <p style="color: ${theme.colors.secondary}; font-weight: 600; margin-bottom: 5px;">${edu.institution}</p>
                                <p style="color: #666; font-size: 0.9rem;">${edu.year}</p>
                                ${edu.gpa ? `<p style="color: #666; font-size: 0.9rem;"><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${data.skills && data.skills.length > 0 && theme.layout !== 'sidebar' ? `
                <div class="${resumeStyleNumber === 6 ? 'timeline-item' : ''}" style="margin-top: 40px;">
                    <h3 style="color: ${theme.colors.primary}; margin-bottom: 20px; font-size: 1.4rem;">Technical Skills</h3>
                    <div class="skills-grid">
                        ${data.skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${projects.length > 0 ? `
                <div class="${resumeStyleNumber === 6 ? 'timeline-item' : ''}" style="margin-top: 40px;">
                    <h3 style="color: ${theme.colors.primary}; margin-bottom: 20px; font-size: 1.4rem;">Projects</h3>
                    <div class="projects-grid">
                        ${projects.map(project => `
                            <div class="project-card">
                                <h4 class="project-title">${project.name}</h4>
                                <p style="color: #666; margin-bottom: 15px; line-height: 1.5;">${project.description}</p>
                                <p style="color: #888; font-size: 0.9rem; margin-bottom: 10px;"><strong>Technologies:</strong> ${project.technologies}</p>
                                ${project.link ? `<p><a href="${project.link}" style="color: ${theme.colors.primary}; text-decoration: none; font-weight: 600;">View Project →</a></p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            ${theme.layout !== 'sidebar' ? `
            <!-- Contact Section -->
            <div class="section">
                <h2>Get In Touch</h2>
                <div class="contact-grid">
                    ${data.contact?.email ? `
                    <div class="contact-item">
                        <strong>📧 Email</strong>
                        <a href="mailto:${data.contact.email}" style="color: ${theme.colors.primary}; text-decoration: none;">${data.contact.email}</a>
                    </div>
                    ` : ''}
                    ${data.contact?.phone && data.contact.phone !== 'skip' ? `
                    <div class="contact-item">
                        <strong>📱 Phone</strong>
                        <span>${data.contact.phone}</span>
                    </div>
                    ` : ''}
                    ${data.contact?.linkedin && data.contact.linkedin !== 'skip' ? `
                    <div class="contact-item">
                        <strong>💼 LinkedIn</strong>
                        <a href="${data.contact.linkedin}" style="color: ${theme.colors.primary}; text-decoration: none;" target="_blank">View Profile</a>
                    </div>
                    ` : ''}
                    ${data.contact?.github && data.contact.github !== 'skip' ? `
                    <div class="contact-item">
                        <strong>💻 GitHub</strong>
                        <a href="${data.contact.github}" style="color: ${theme.colors.primary}; text-decoration: none;" target="_blank">View Profile</a>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>Generated by Modern Portfolio Generator</strong></p>
            <p>Theme: ${theme.name} • Resume Style: ${resumeStyle.name}</p>
            <p style="margin-top: 15px; font-size: 0.9rem;">
                💡 <span style="color: ${theme.colors.primary};">Pro Tip:</span> Use the buttons above to download HTML or save as PDF
            </p>
        </div>
    </div>
    
    <script>
        function downloadHTML() {
            // Hide PDF button for HTML download
            document.querySelector('.btn-pdf').style.display = 'none';
            
            setTimeout(() => {
                const html = document.documentElement.outerHTML;
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'index.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Show PDF button again
                document.querySelector('.btn-pdf').style.display = 'block';
            }, 100);
        }
        
        function generatePDF() {
            // Show only PDF button for PDF generation
            document.querySelector('.btn-html').style.display = 'none';
            
            setTimeout(() => {
                if (confirm('Generate PDF Resume?\\n\\nThis will open the print dialog where you can save as PDF.')) {
                    window.print();
                }
                // Show HTML button again
                document.querySelector('.btn-html').style.display = 'block';
            }, 100);
        }
        
        // Hide appropriate buttons based on context
        window.addEventListener('beforeprint', function() {
            document.querySelector('.btn-html').style.display = 'none';
        });
        
        window.addEventListener('afterprint', function() {
            document.querySelector('.btn-html').style.display = 'block';
        });
    </script>
</body>
</html>`;
};
