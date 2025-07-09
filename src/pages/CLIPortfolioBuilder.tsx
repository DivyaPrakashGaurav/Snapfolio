import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Terminal } from 'lucide-react';
import CLIInterface from '@/components/CLIInterface';
import { generateDynamicPortfolioHTML, ExtendedStudentData } from '@/components/ThemeGenerator';
import { toast } from 'sonner';

const CLIPortfolioBuilder = () => {
  const [showCLI, setShowCLI] = useState(true);
  const [portfolioData, setPortfolioData] = useState<ExtendedStudentData | null>(null);

  const handleCLIComplete = (data: any) => {
    const convertedData: ExtendedStudentData = {
      name: data.name || '',
      title: data.title || '',
      bio: data.bio || '',
      skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()) : [],
      projects: data.projects ? [{
        name: data.projects.split(':')[0] || '',
        description: data.projects.split(':')[1]?.split('|')[0] || '',
        technologies: data.projects.split(':')[1]?.split('|')[1] || ''
      }] : [],
      contact: {
        email: data.email || '',
        phone: data.phone !== 'skip' ? data.phone || '' : '',
        linkedin: data.linkedin !== 'skip' ? data.linkedin || '' : '',
        github: data.github !== 'skip' ? data.github || '' : ''
      },
      education: data.education ? [{
        degree: data.education.split(',')[0] || '',
        institution: data.education.split(',')[1] || '',
        year: data.education.split(',')[2] || ''
      }] : [],
      experience: [],
      theme: data.theme || '1',
      resumeStyle: data.resumeStyle || '1',
      profilePhoto: data.profilePhoto !== 'skip' ? data.profilePhoto : undefined
    };
    
    setPortfolioData(convertedData);
    setShowCLI(false);
    toast.success(`Portfolio generated with Theme ${data.theme} and Resume Style ${data.resumeStyle}!`);
  };

  const generateHTML = () => {
    if (!portfolioData) return;
    const htmlContent = generateDynamicPortfolioHTML(portfolioData);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('index.html downloaded successfully!');
  };

  const generatePDF = () => {
    if (!portfolioData) return;
    const htmlContent = generateDynamicPortfolioHTML(portfolioData);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      setTimeout(() => {
        newWindow.print();
      }, 1000);
    }
    toast.success('Opening print dialog for PDF generation...');
  };

  const resetCLI = () => {
    setShowCLI(true);
    setPortfolioData(null);
  };

  const themes = [
    'Modern Professional',
    'Creative Designer', 
    'Tech Minimalist',
    'Corporate Business',
    'Gradient Artist',
    'Dark Mode'
  ];

  const resumeStyles = [
    'Executive Summary',
    'Skills-First',
    'Experience Timeline',
    'Project Portfolio',
    'Academic Research',
    'Creative Visual'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="h-10 w-10 text-green-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-white font-mono">
                C++ Dynamic Portfolio Generator
              </h1>
              <p className="text-green-400 mt-2">Single HTML Export • Dynamic Theme & Resume Styles</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Generate a single index.html file with selectable themes (1-6) and resume styles (1-6). 
            One file, multiple style options, professional results.
          </p>
        </div>

        {showCLI ? (
          <CLIInterface onComplete={handleCLIComplete} />
        ) : (
          <div className="space-y-6">
            <Card className="bg-green-900/20 border-green-500">
              <CardContent className="p-6 text-center">
                <div className="text-green-400 text-lg font-mono mb-4">
                  ✅ Dynamic Portfolio Generated Successfully!
                </div>
                <div className="text-white space-y-2">
                  <p><strong>Name:</strong> {portfolioData?.name}</p>
                  <p><strong>Title:</strong> {portfolioData?.title}</p>
                  <p><strong>Selected Theme:</strong> {themes[parseInt(portfolioData?.theme || '1') - 1]} (Theme {portfolioData?.theme})</p>
                  <p><strong>Resume Style:</strong> {resumeStyles[parseInt(portfolioData?.resumeStyle || '1') - 1]} (Style {portfolioData?.resumeStyle})</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    onClick={generateHTML}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 h-16"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download HTML
                    <div className="text-xs opacity-75 ml-2">(index.html)</div>
                  </Button>
                  <Button 
                    onClick={generatePDF}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 h-16"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Generate PDF
                    <div className="text-xs opacity-75 ml-2">(Print Dialog)</div>
                  </Button>
                </div>
                <Button 
                  onClick={resetCLI}
                  variant="outline"
                  className="w-full border-green-500 text-green-400 hover:bg-green-900/20"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  Create New Portfolio
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Selected Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-white">
                  <div>
                    <h3 className="font-bold text-green-400 mb-2">HTML Themes (1-6)</h3>
                    <ul className="text-sm space-y-1">
                      {themes.map((theme, index) => (
                        <li key={index} className={portfolioData?.theme === String(index + 1) ? 'text-yellow-400 font-bold' : ''}>
                          {index + 1}. {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-400 mb-2">Resume Styles (1-6)</h3>
                    <ul className="text-sm space-y-1">
                      {resumeStyles.map((style, index) => (
                        <li key={index} className={portfolioData?.resumeStyle === String(index + 1) ? 'text-yellow-400 font-bold' : ''}>
                          {index + 1}. {style}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center mt-12 text-gray-400">
          <p className="font-mono">C++ Dynamic Portfolio Generator v2.0 • Single HTML Export</p>
          <p className="text-sm mt-2">Features: 6 HTML Themes • 6 Resume Styles • Profile Photo • PDF Generation</p>
        </div>
      </div>
    </div>
  );
};

export default CLIPortfolioBuilder;
