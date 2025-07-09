
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal, FileText } from 'lucide-react';

interface CLIStep {
  question: string;
  field: string;
  type: 'text' | 'select' | 'file';
  options?: string[];
}

interface CLIInterfaceProps {
  onComplete: (data: any) => void;
}

const CLIInterface = ({ onComplete }: CLIInterfaceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');

  const steps: CLIStep[] = [
    { question: "Enter your full name:", field: "name", type: "text" },
    { question: "Enter your job title/tagline:", field: "title", type: "text" },
    { question: "Enter your profile photo filename (or 'skip'):", field: "profilePhoto", type: "text" },
    { question: "Write your about me section:", field: "bio", type: "text" },
    { question: "Enter your education (degree, institution, year):", field: "education", type: "text" },
    { question: "Enter your skills (comma-separated):", field: "skills", type: "text" },
    { question: "Enter your projects (name: description | technologies):", field: "projects", type: "text" },
    { question: "Enter your email address:", field: "email", type: "text" },
    { question: "Enter your phone number (or 'skip'):", field: "phone", type: "text" },
    { question: "Enter your LinkedIn URL (or 'skip'):", field: "linkedin", type: "text" },
    { question: "Enter your GitHub URL (or 'skip'):", field: "github", type: "text" },
    { question: "Select HTML Theme (1-6):", field: "theme", type: "select", options: ["1", "2", "3", "4", "5", "6"] },
    { question: "Select Resume Style (1-6):", field: "resumeStyle", type: "select", options: ["1", "2", "3", "4", "5", "6"] }
  ];

  const handleSubmit = () => {
    if (currentStep < steps.length - 1) {
      setResponses({ ...responses, [steps[currentStep].field]: currentInput });
      setCurrentInput('');
      setCurrentStep(currentStep + 1);
    } else {
      const finalData = { ...responses, [steps[currentStep].field]: currentInput };
      onComplete(finalData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="bg-black text-green-400 font-mono shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Terminal className="h-5 w-5" />
          C++ Portfolio Generator CLI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[300px] bg-black p-4 rounded border border-green-400">
          <div className="text-green-400 mb-2">
            C++ Portfolio Generator v1.0 - Step {currentStep + 1}/{steps.length}
          </div>
          
          {/* Show previous responses */}
          {Object.entries(responses).map(([field, value], index) => (
            <div key={field} className="mb-2">
              <span className="text-green-300">$ {steps[index].question}</span>
              <div className="text-white ml-2">{value}</div>
            </div>
          ))}
          
          {/* Current question */}
          <div className="mb-4">
            <span className="text-green-300">$ {steps[currentStep].question}</span>
            <div className="flex items-center mt-1">
              <span className="text-green-400 mr-2">{'>'}</span>
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none text-white p-0 focus:ring-0 font-mono"
                placeholder="Type your answer..."
                autoFocus
              />
            </div>
          </div>
          
          {steps[currentStep].type === 'select' && (
            <div className="text-green-200 text-sm ml-2">
              Options: {steps[currentStep].options?.join(', ')}
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-black font-mono"
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Generate Portfolio'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CLIInterface;
