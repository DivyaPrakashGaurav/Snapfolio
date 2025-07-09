
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ExtendedStudentData } from './ThemeGenerator';

interface DynamicPreviewProps {
  data: ExtendedStudentData;
}

const DynamicPreview = ({ data }: DynamicPreviewProps) => {
  const themeNumber = parseInt(data.theme) || 1;
  const resumeStyleNumber = parseInt(data.resumeStyle) || 1;

  // Theme configurations
  const themes = {
    1: { name: 'Clean Light', colors: 'from-blue-50 to-white', primary: 'text-blue-600', bg: 'bg-white' },
    2: { name: 'Elegant Dark', colors: 'from-gray-900 to-gray-800', primary: 'text-yellow-400', bg: 'bg-gray-900 text-white' },
    3: { name: 'Sidebar Layout', colors: 'from-green-50 to-emerald-50', primary: 'text-green-600', bg: 'bg-white' },
    4: { name: 'Boxed Layout', colors: 'from-purple-50 to-violet-50', primary: 'text-purple-600', bg: 'bg-white' },
    5: { name: 'Banner Top', colors: 'from-orange-50 to-amber-50', primary: 'text-orange-600', bg: 'bg-white' },
    6: { name: 'Grid Portfolio', colors: 'from-pink-50 to-rose-50', primary: 'text-pink-600', bg: 'bg-white' }
  };

  const theme = themes[themeNumber as keyof typeof themes];

  if (!data.name) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="text-muted-foreground text-lg">
            Fill out your information to see the preview
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview Container with Theme Styling */}
      <div className={`rounded-lg overflow-hidden bg-gradient-to-br ${theme.colors} p-1`}>
        <div className={`rounded-lg ${theme.bg} min-h-[600px]`}>
          {/* Header Section */}
          <div className={`p-8 text-center ${themeNumber === 5 ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' : ''}`}>
            {/* Profile Photo - Always show if available */}
            {data.profilePhoto && data.profilePhoto !== 'skip' ? (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={data.profilePhoto} 
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <h1 className={`text-3xl font-bold mb-2 ${theme.primary}`}>{data.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{data.title}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.bio}</p>
          </div>

          <div className={`p-8 space-y-8 ${themeNumber === 3 ? 'grid grid-cols-1 lg:grid-cols-4 gap-8' : ''}`}>
            {/* Sidebar for Theme 3 */}
            {themeNumber === 3 && (
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Contact</h3>
                  <div className="space-y-2 text-sm">
                    {data.contact?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{data.contact.email}</span>
                      </div>
                    )}
                    {data.contact?.phone && data.contact.phone !== 'skip' && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{data.contact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Skills</h3>
                    <div className="space-y-1">
                      {data.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Main Content */}
            <div className={themeNumber === 3 ? 'lg:col-span-3 space-y-8' : 'space-y-8'}>
              {/* Resume Section with Style */}
              <div className={`
                ${resumeStyleNumber === 2 ? 'border-2 border-gray-200 rounded-lg p-6' : ''}
                ${resumeStyleNumber === 3 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}
                ${resumeStyleNumber === 4 ? 'space-y-4' : 'space-y-6'}
                ${resumeStyleNumber === 6 ? 'relative pl-8' : ''}
              `}>
                <h2 className={`text-2xl font-bold mb-4 ${theme.primary}`}>
                  Resume
                </h2>

                {/* Timeline line for style 6 */}
                {resumeStyleNumber === 6 && (
                  <div className="absolute left-2 top-12 bottom-0 w-0.5 bg-gray-300" />
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                  <div className={resumeStyleNumber === 6 ? 'relative' : ''}>
                    {resumeStyleNumber === 6 && (
                      <div className="absolute -left-6 top-2 w-3 h-3 bg-blue-500 rounded-full" />
                    )}
                    <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Education</h3>
                    {data.education.map((edu, index) => (
                      <div key={index} className={`
                        ${resumeStyleNumber === 4 ? 'mb-2' : 'mb-4'}
                        ${resumeStyleNumber === 2 ? 'border-l-4 border-blue-200 pl-4' : ''}
                      `}>
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills for non-sidebar themes */}
                {themeNumber !== 3 && data.skills && data.skills.length > 0 && (
                  <div className={resumeStyleNumber === 6 ? 'relative' : ''}>
                    {resumeStyleNumber === 6 && (
                      <div className="absolute -left-6 top-2 w-3 h-3 bg-green-500 rounded-full" />
                    )}
                    <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                  <div className={resumeStyleNumber === 6 ? 'relative' : ''}>
                    {resumeStyleNumber === 6 && (
                      <div className="absolute -left-6 top-2 w-3 h-3 bg-purple-500 rounded-full" />
                    )}
                    <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Projects</h3>
                    <div className={`
                      ${themeNumber === 6 ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}
                    `}>
                      {data.projects.map((project, index) => (
                        <div key={index} className={`
                          ${themeNumber === 6 ? 'bg-gray-50 p-4 rounded-lg' : ''}
                          ${themeNumber === 4 ? 'bg-white shadow-sm border rounded-lg p-4' : ''}
                          ${resumeStyleNumber === 2 ? 'border-l-4 border-purple-200 pl-4' : ''}
                        `}>
                          <h4 className="font-semibold flex items-center gap-2">
                            {project.name}
                            {project.link && (
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            )}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Tech:</span> {project.technologies}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact for non-sidebar themes */}
              {themeNumber !== 3 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme.primary}`}>Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.contact?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{data.contact.email}</span>
                      </div>
                    )}
                    {data.contact?.phone && data.contact.phone !== 'skip' && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{data.contact.phone}</span>
                      </div>
                    )}
                    {data.contact?.github && data.contact.github !== 'skip' && (
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">GitHub</span>
                      </div>
                    )}
                    {data.contact?.linkedin && data.contact.linkedin !== 'skip' && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">LinkedIn</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPreview;
