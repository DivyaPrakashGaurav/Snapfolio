
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, User } from 'lucide-react';
import { StudentData } from '@/pages/Index';

interface PortfolioPreviewProps {
  data: StudentData;
}

const PortfolioPreview = ({ data }: PortfolioPreviewProps) => {
  const themeClasses = {
    modern: 'from-blue-500 to-purple-600',
    classic: 'from-gray-700 to-gray-900',
    creative: 'from-pink-500 to-purple-500',
    minimal: 'from-gray-900 to-black',
    professional: 'from-blue-800 to-blue-600',
    gradient: 'from-purple-500 to-pink-500'
  };

  const themeAccents = {
    modern: 'text-blue-600 border-blue-200 bg-blue-50',
    classic: 'text-gray-700 border-gray-200 bg-gray-50',
    creative: 'text-pink-600 border-pink-200 bg-pink-50',
    minimal: 'text-gray-900 border-gray-200 bg-gray-50',
    professional: 'text-blue-800 border-blue-200 bg-blue-50',
    gradient: 'text-purple-600 border-purple-200 bg-purple-50'
  };

  if (!data.name) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="text-gray-400 text-lg">
            Fill out the form to see your portfolio preview
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <div className={`h-32 bg-gradient-to-r ${themeClasses[data.theme]}`} />
        <CardContent className="p-8 -mt-16 relative">
          <div className="text-center">
            {data.profilePhoto && (
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 p-1 shadow-lg">
                <img 
                  src={data.profilePhoto} 
                  alt={data.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            )}
            {!data.profilePhoto && (
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{data.title}</p>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">{data.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      {data.education.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Education
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {data.education.map((edu, index) => (
                <Card key={index} className="border-2 border-gray-100 hover:border-gray-200 transition-colors hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{edu.degree}</h3>
                    <p className="text-gray-600 font-medium mb-2">{edu.institution}</p>
                    <p className="text-gray-500 mb-2">{edu.year}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">GPA:</span> {edu.gpa}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Briefcase className="h-6 w-6" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <Card key={index} className="border-2 border-gray-100 hover:border-gray-200 transition-colors hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className={themeAccents[data.theme]}>
                        {exp.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technical Skills</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {data.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`px-4 py-2 text-sm font-medium ${themeAccents[data.theme]} hover:scale-105 transition-transform`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {data.projects.map((project, index) => (
                <Card key={index} className="border-2 border-gray-100 hover:border-gray-200 transition-colors hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${themeAccents[data.theme].split(' ')[0]} hover:opacity-80 transition-opacity`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Section */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get In Touch</h2>
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
            {data.contact.email && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className={`h-5 w-5 ${themeAccents[data.theme].split(' ')[0]}`} />
                <div>
                  <div className="font-medium text-gray-800">Email</div>
                  <a href={`mailto:${data.contact.email}`} className={`${themeAccents[data.theme].split(' ')[0]} hover:underline`}>
                    {data.contact.email}
                  </a>
                </div>
              </div>
            )}
            
            {data.contact.phone && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className={`h-5 w-5 ${themeAccents[data.theme].split(' ')[0]}`} />
                <div>
                  <div className="font-medium text-gray-800">Phone</div>
                  <span className="text-gray-600">{data.contact.phone}</span>
                </div>
              </div>
            )}
            
            {data.contact.linkedin && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Linkedin className={`h-5 w-5 ${themeAccents[data.theme].split(' ')[0]}`} />
                <div>
                  <div className="font-medium text-gray-800">LinkedIn</div>
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`${themeAccents[data.theme].split(' ')[0]} hover:underline`}>
                    View Profile
                  </a>
                </div>
              </div>
            )}
            
            {data.contact.github && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Github className={`h-5 w-5 ${themeAccents[data.theme].split(' ')[0]}`} />
                <div>
                  <div className="font-medium text-gray-800">GitHub</div>
                  <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className={`${themeAccents[data.theme].split(' ')[0]} hover:underline`}>
                    View Profile
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioPreview;
