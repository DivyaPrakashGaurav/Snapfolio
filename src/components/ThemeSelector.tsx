
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Eye } from 'lucide-react';

interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  layout: 'single' | 'sidebar' | 'boxed' | 'banner' | 'grid' | 'dark';
  preview: string;
}

interface ResumeStyle {
  id: string;
  name: string;
  description: string;
  layout: 'clean' | 'border' | 'two-column' | 'compact' | 'classic' | 'timeline';
}

interface ThemeSelectorProps {
  selectedTheme: string;
  selectedResumeStyle: string;
  onThemeChange: (themeId: string) => void;
  onResumeStyleChange: (styleId: string) => void;
  onExportHTML: () => void;
  onExportPDF: () => void;
}

const themes: ThemeConfig[] = [
  {
    id: '1',
    name: 'Clean Light',
    description: 'Minimalist white background with blue accents',
    colors: { primary: '#3b82f6', secondary: '#1e40af', background: '#ffffff', text: '#1f2937' },
    layout: 'single',
    preview: 'bg-gradient-to-br from-blue-50 to-white'
  },
  {
    id: '2',
    name: 'Elegant Dark',
    description: 'Dark theme with golden highlights',
    colors: { primary: '#f59e0b', secondary: '#d97706', background: '#111827', text: '#f9fafb' },
    layout: 'dark',
    preview: 'bg-gradient-to-br from-gray-900 to-gray-800'
  },
  {
    id: '3',
    name: 'Sidebar Layout',
    description: 'Left sidebar with main content area',
    colors: { primary: '#10b981', secondary: '#059669', background: '#f0fdf4', text: '#111827' },
    layout: 'sidebar',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  {
    id: '4',
    name: 'Boxed Layout',
    description: 'Contained sections with subtle shadows',
    colors: { primary: '#8b5cf6', secondary: '#7c3aed', background: '#faf5ff', text: '#1f2937' },
    layout: 'boxed',
    preview: 'bg-gradient-to-br from-purple-50 to-violet-50'
  },
  {
    id: '5',
    name: 'Banner Top',
    description: 'Hero banner with flowing content below',
    colors: { primary: '#f97316', secondary: '#ea580c', background: '#fff7ed', text: '#1f2937' },
    layout: 'banner',
    preview: 'bg-gradient-to-br from-orange-50 to-amber-50'
  },
  {
    id: '6',
    name: 'Grid Portfolio',
    description: 'Card-based grid layout for projects',
    colors: { primary: '#ec4899', secondary: '#be185d', background: '#fdf2f8', text: '#374151' },
    layout: 'grid',
    preview: 'bg-gradient-to-br from-pink-50 to-rose-50'
  }
];

const resumeStyles: ResumeStyle[] = [
  { id: '1', name: 'Clean', description: 'Simple and professional', layout: 'clean' },
  { id: '2', name: 'Border', description: 'Bordered sections with dividers', layout: 'border' },
  { id: '3', name: '2-Column', description: 'Two-column resume layout', layout: 'two-column' },
  { id: '4', name: 'Compact', description: 'Dense information layout', layout: 'compact' },
  { id: '5', name: 'Classic', description: 'Traditional resume format', layout: 'classic' },
  { id: '6', name: 'Timeline', description: 'Timeline-based experience', layout: 'timeline' }
];

const ThemeSelector = ({
  selectedTheme,
  selectedResumeStyle,
  onThemeChange,
  onResumeStyleChange,
  onExportHTML,
  onExportPDF
}: ThemeSelectorProps) => {
  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];
  const currentStyle = resumeStyles.find(s => s.id === selectedResumeStyle) || resumeStyles[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Theme Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Choose Your Theme
          </CardTitle>
          <p className="text-muted-foreground">Select a theme that affects the entire portfolio layout and design</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTheme === theme.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onThemeChange(theme.id)}
              >
                <CardContent className="p-4">
                  <div className={`h-20 rounded-lg mb-3 ${theme.preview}`} />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{theme.name}</h3>
                    {selectedTheme === theme.id && (
                      <Badge variant="default" className="text-xs">Selected</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                  <div className="flex gap-2 mt-3">
                    {Object.values(theme.colors).slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Style Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Choose Resume Style
          </CardTitle>
          <p className="text-muted-foreground">Select how your resume section should be formatted</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeStyles.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedResumeStyle === style.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onResumeStyleChange(style.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{style.name}</h3>
                    {selectedResumeStyle === style.id && (
                      <Badge variant="default" className="text-xs">Selected</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Selection Summary & Export */}
      <Card className="shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Current Configuration</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><span className="font-medium">Theme:</span> {currentTheme.name}</p>
                <p><span className="font-medium">Resume Style:</span> {currentStyle.name}</p>
                <p><span className="font-medium">Layout:</span> {currentTheme.layout}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onExportHTML}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
              <Button
                onClick={onExportPDF}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSelector;
