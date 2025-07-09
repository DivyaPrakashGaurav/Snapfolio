
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload, User, GraduationCap, Briefcase, Code, Mail, Image } from 'lucide-react';
import { StudentData } from '@/pages/Index';

interface PortfolioFormProps {
  data: StudentData;
  onDataUpdate: (data: StudentData) => void;
}

const PortfolioForm = ({ data, onDataUpdate }: PortfolioFormProps) => {
  const [newSkill, setNewSkill] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    onDataUpdate({ ...data, [field]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    onDataUpdate({
      ...data,
      contact: { ...data.contact, [field]: value }
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      onDataUpdate({
        ...data,
        skills: [...data.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onDataUpdate({
      ...data,
      skills: data.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addProject = () => {
    onDataUpdate({
      ...data,
      projects: [...data.projects, { name: '', description: '', technologies: '', link: '' }]
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = data.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onDataUpdate({ ...data, projects: updatedProjects });
  };

  const removeProject = (index: number) => {
    onDataUpdate({
      ...data,
      projects: data.projects.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    onDataUpdate({
      ...data,
      education: [...data.education, { degree: '', institution: '', year: '', gpa: '' }]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onDataUpdate({ ...data, education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    onDataUpdate({
      ...data,
      education: data.education.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    onDataUpdate({
      ...data,
      experience: [...data.experience, { position: '', company: '', duration: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = data.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onDataUpdate({ ...data, experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    onDataUpdate({
      ...data,
      experience: data.experience.filter((_, i) => i !== index)
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        onDataUpdate({ ...data, profilePhoto: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-8 max-w-4xl mx-auto">
      {/* Profile Photo Upload */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {(photoPreview || data.profilePhoto) && (
              <div className="mb-4">
                <img 
                  src={photoPreview || data.profilePhoto} 
                  alt="Profile preview" 
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
                />
              </div>
            )}
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload photo (JPG or PNG)</p>
              </div>
            </Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="title">Professional Title *</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Software Engineer, Data Scientist, etc."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              value={data.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Write a brief description about yourself, your goals, and what makes you unique..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  placeholder="Degree (e.g., B.S. Computer Science)"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                />
                <Input
                  placeholder="Year (e.g., 2020-2024)"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                />
                <Input
                  placeholder="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  className="md:col-span-2"
                />
              </div>
              <Textarea
                placeholder="Job description and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={3}
              />
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., Python, React, Machine Learning)"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 cursor-pointer hover:bg-red-100"
                onClick={() => removeSkill(skill)}
              >
                {skill}
                <X className="h-3 w-3 ml-2" />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Project {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
              />
              <Textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
              />
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                />
                <Input
                  placeholder="Project Link (optional)"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button onClick={addProject} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={data.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="john.doe@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={data.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={data.contact.linkedin}
                onChange={(e) => handleContactChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                value={data.contact.github}
                onChange={(e) => handleContactChange('github', e.target.value)}
                placeholder="https://github.com/johndoe"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioForm;
