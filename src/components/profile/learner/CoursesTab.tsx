
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BookMarked, FileText, BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Course type definition
interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number | null;
  modules: string[];
  nextClass?: string;
  color: string;
  status: 'in-progress' | 'upcoming' | 'explore';
}

const CoursesTab: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample courses data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Développement Web Frontend',
      description: 'HTML, CSS, JavaScript et React',
      icon: <Code className="h-5 w-5 text-orange-600" />,
      progress: 65,
      modules: [
        'Introduction au HTML et CSS',
        'JavaScript Fondamentaux',
        'Frameworks Frontend (React)',
        'Responsive Design'
      ],
      color: 'orange',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'UX/UI Design',
      description: 'Principes de design et outils',
      icon: <BookMarked className="h-5 w-5 text-orange-600" />,
      progress: 25,
      modules: [
        'Principes de base du design',
        'Wireframing et Prototypage',
        'Figma et autres outils',
        'Tests utilisateurs'
      ],
      color: 'orange',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Gestion de Projet Tech',
      description: 'Méthodes Agile et outils',
      icon: <FileText className="h-5 w-5 text-orange-600" />,
      progress: null,
      nextClass: '10 Juin',
      modules: [
        'Introduction à l\'Agile',
        'Scrum et Kanban',
        'Outils de gestion de projet',
        'Travail en équipe efficace'
      ],
      color: 'orange',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Programmation Backend',
      description: 'Node.js, Express et MongoDB',
      icon: <Code className="h-5 w-5 text-orange-600" />,
      progress: null,
      modules: [
        'Introduction à Node.js',
        'Express Framework',
        'MongoDB et Mongoose',
        'API REST et GraphQL'
      ],
      color: 'orange',
      status: 'explore'
    }
  ];

  // Filter courses by search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group courses by status
  const inProgressCourses = filteredCourses.filter(course => course.status === 'in-progress');
  const upcomingCourses = filteredCourses.filter(course => course.status === 'upcoming');
  const exploreCourses = filteredCourses.filter(course => course.status === 'explore');

  const handleContinueCourse = (courseId: string) => {
    // In a real app, this would navigate to the course content
    toast({
      title: "Cours repris",
      description: "Redirection vers le contenu du cours..."
    });
    navigate(`/courses?id=${courseId}`);
  };

  const handleEnrollCourse = (courseId: string) => {
    toast({
      title: "Inscription réussie",
      description: "Vous êtes maintenant inscrit à ce cours"
    });
  };

  const handleExploreAllCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Rechercher dans mes cours..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* "In Progress" section */}
      {inProgressCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">En cours</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inProgressCourses.map((course) => (
              <Card key={course.id} className={`border-${course.color}-100 shadow-md hover:shadow-lg transition-shadow`}>
                <CardHeader className={`bg-gradient-to-r from-${course.color}-50 to-${course.color}-100 border-b border-${course.color}-100`}>
                  <CardTitle className="flex items-center gap-2">
                    {course.icon}
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Modules</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {course.modules.map((module, index) => (
                          <li key={index}>{module}</li>
                        ))}
                      </ul>
                    </div>
                    {course.progress !== null && (
                      <div className={`bg-${course.color}-50 p-3 rounded-md border border-${course.color}-100`}>
                        <p className={`text-sm text-${course.color}-800`}>Progression: {course.progress}%</p>
                        <div className={`w-full bg-${course.color}-200 rounded-full h-2.5 mt-2`}>
                          <div 
                            className={`bg-${course.color}-600 h-2.5 rounded-full`} 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <Button 
                      className={`w-full bg-${course.color}-600 hover:bg-${course.color}-700`}
                      onClick={() => handleContinueCourse(course.id)}
                    >
                      Continuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* "Upcoming" section */}
      {upcomingCourses.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">À venir</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcomingCourses.map((course) => (
              <Card key={course.id} className={`border-${course.color}-100 shadow-md hover:shadow-lg transition-shadow`}>
                <CardHeader className={`bg-gradient-to-r from-${course.color}-50 to-${course.color}-100 border-b border-${course.color}-100`}>
                  <CardTitle className="flex items-center gap-2">
                    {course.icon}
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Modules</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {course.modules.map((module, index) => (
                          <li key={index}>{module}</li>
                        ))}
                      </ul>
                    </div>
                    {course.nextClass && (
                      <div className={`bg-${course.color}-50 p-3 rounded-md border border-${course.color}-100`}>
                        <p className={`text-sm text-${course.color}-800`}>Prochain cours: {course.nextClass}</p>
                      </div>
                    )}
                    <Button 
                      className={`w-full bg-${course.color}-600 hover:bg-${course.color}-700`}
                      onClick={() => handleEnrollCourse(course.id)}
                    >
                      S'inscrire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* "Explore" section */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Découvrir</Badge>
        </h2>
        <Card className="border-orange-100 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-orange-50/50 to-white border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BookOpen className="h-12 w-12 text-orange-400 mb-4" />
            <h3 className="font-medium text-lg text-center mb-2">Découvrir plus de cours</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Explorez notre catalogue de cours pour continuer votre apprentissage.
            </p>
            <Button 
              variant="outline" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={handleExploreAllCourses}
            >
              Explorer tous les cours
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursesTab;
