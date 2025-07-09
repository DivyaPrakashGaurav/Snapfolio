import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Eye, User } from 'lucide-react';
import PortfolioForm from '@/components/PortfolioForm';
import ThemeSelector from '@/components/ThemeSelector';
import DynamicPreview from '@/components/DynamicPreview';
import { generateDynamicPortfolioHTML, ExtendedStudentData } from '@/components/ThemeGenerator';
import { toast } from 'sonner';

export interface StudentData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    description: string;
  }>;
  theme: 'modern' | 'classic' | 'creative' | 'minimal' | 'professional' | 'gradient';
  profilePhoto?: string;
}

const Index = () => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
    title: '',
    bio: '',
    skills: [],
    projects: [],
    contact: {
      email: '',
      phone: '',
      linkedin: '',
      github: ''
    },
    education: [],
    experience: [],
    theme: 'modern'
  });

  const [selectedTheme, setSelectedTheme] = useState('1');
  const [selectedResumeStyle, setSelectedResumeStyle] = useState('1');
  const [activeTab, setActiveTab] = useState('form');

  const handleDataUpdate = (data: StudentData) => {
    setStudentData(data);
  };

  const getExtendedData = (): ExtendedStudentData => ({
    ...studentData,
    theme: selectedTheme,
    resumeStyle: selectedResumeStyle
  });

  const generateHTML = () => {
    const htmlContent = generateDynamicPortfolioHTML(getExtendedData());
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Portfolio HTML file downloaded successfully!');
  };

  const generatePDF = () => {
    const htmlContent = generateDynamicPortfolioHTML(getExtendedData());
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header without Logo */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Snapfolio
            </h1>
            <p className="text-xl text-gray-500 mt-3">🎨 6 Beautiful Themes • 6 Resume Styles • Live Preview • Quick Export</p>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stand out with dynamic, professional portfolios. 
            Choose from multiple themes and styles, preview as you go, and export to HTML or PDF anytime.
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Themes & Export
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Enter Your Information</CardTitle>
                <p className="text-center text-muted-foreground">Fill in your personal and academic details to create your portfolio</p>
              </CardHeader>
              <CardContent>
                <PortfolioForm data={studentData} onDataUpdate={handleDataUpdate} />
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setActiveTab('themes')} 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Palette className="h-4 w-4 mr-2" />
                Choose Theme & Style
              </Button>
              <Button 
                onClick={() => setActiveTab('preview')} 
                variant="outline"
                size="lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Portfolio
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="themes" className="space-y-6">
            <ThemeSelector
              selectedTheme={selectedTheme}
              selectedResumeStyle={selectedResumeStyle}
              onThemeChange={setSelectedTheme}
              onResumeStyleChange={setSelectedResumeStyle}
              onExportHTML={generateHTML}
              onExportPDF={generatePDF}
            />

            <div className="flex justify-center">
              <Button 
                onClick={() => setActiveTab('preview')}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                See Live Preview
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                onClick={() => setActiveTab('form')} 
                variant="outline"
                size="lg"
              >
                <User className="h-4 w-4 mr-2" />
                Edit Information
              </Button>
              <Button 
                onClick={() => setActiveTab('themes')}
                variant="outline"
                size="lg"
              >
                <Palette className="h-4 w-4 mr-2" />
                Change Theme
              </Button>
            </div>

            <DynamicPreview data={getExtendedData()} />

            <div className="flex justify-center gap-4 mt-8">
              <Button 
                onClick={generateHTML}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={!studentData.name}
              >
                Download HTML
              </Button>
              <Button 
                onClick={generatePDF}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                disabled={!studentData.name}
              >
                Export as PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', fontSize: '14px', padding: '20px 0', color: '#555' }}>
        © 2025 All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
