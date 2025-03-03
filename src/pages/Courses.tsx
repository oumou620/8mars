import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, Clock, Check, CheckCircle2, PlayCircle, Search, SlidersHorizontal, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

// Course data structure
interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  progress: number;
  modules: Module[];
  image: string;
  category: string;
  enrolled: boolean;
  price?: string;
  instructor?: string;
  rating?: number;
  lastAccessed?: string;
  introVideo?: string;
}

interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

// Sample course data with real YouTube video links (using educational content with Creative Commons licenses)
const courseData: Course[] = [
  {
    id: '1',
    title: 'Introduction au développement web',
    description: 'Apprenez les bases du HTML, CSS et JavaScript',
    level: 'beginner',
    duration: '10 heures',
    progress: 75,
    enrolled: true,
    instructor: 'Marie Dupont',
    rating: 4.8,
    lastAccessed: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
    category: 'web',
    introVideo: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    modules: [
      { 
        id: 'm1', 
        title: 'Introduction à HTML', 
        duration: '2 heures', 
        completed: true,
        content: 'Dans ce module, vous apprendrez les bases du HTML, comment structurer une page web, et les balises essentielles.',
        videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE'
      },
      { 
        id: 'm2', 
        title: 'CSS Fundamentaux', 
        duration: '3 heures', 
        completed: true,
        content: 'Découvrez comment styliser vos pages web avec CSS, comprendre le box model, et créer des layouts responsives.',
        videoUrl: 'https://www.youtube.com/embed/yfoY53QXEnI'
      },
      { 
        id: 'm3', 
        title: 'JavaScript Basics', 
        duration: '3 heures', 
        completed: true,
        content: 'Introduction aux concepts de base de JavaScript: variables, fonctions, conditions, et manipulation du DOM.',
        videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c'
      },
      { 
        id: 'm4', 
        title: 'Projet Final', 
        duration: '2 heures', 
        completed: false,
        content: 'Mettez en pratique tout ce que vous avez appris en créant un site web interactif de A à Z.',
        videoUrl: 'https://www.youtube.com/embed/ZeDP-rzOnAA'
      },
    ]
  },
  {
    id: '2',
    title: 'React pour débutants',
    description: 'Créez des applications web modernes avec React',
    level: 'intermediate',
    duration: '15 heures',
    progress: 30,
    enrolled: true,
    instructor: 'Thomas Martin',
    rating: 4.6,
    lastAccessed: '2023-06-10',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
    category: 'web',
    introVideo: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    modules: [
      { 
        id: 'm1', 
        title: 'Introduction à React', 
        duration: '2 heures', 
        completed: true,
        content: 'Découvrez les concepts de base de React et son écosystème.',
        videoUrl: 'https://www.youtube.com/embed/4UZrsTqkcW4'
      },
      { 
        id: 'm2', 
        title: 'Composants et Props', 
        duration: '3 heures', 
        completed: true,
        content: 'Comprendre comment créer et réutiliser des composants avec les props.',
        videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0'
      },
      { 
        id: 'm3', 
        title: 'State et Lifecycle', 
        duration: '3 heures', 
        completed: false,
        content: 'Apprendre à gérer l\'état local et comprendre le cycle de vie des composants.',
        videoUrl: 'https://www.youtube.com/embed/DLX62G4lc44'
      },
      { 
        id: 'm4', 
        title: 'Hooks', 
        duration: '4 heures', 
        completed: false,
        content: 'Maîtriser les hooks React pour des composants fonctionnels puissants.',
        videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q'
      },
      { 
        id: 'm5', 
        title: 'Projet Final', 
        duration: '3 heures', 
        completed: false,
        content: 'Créer une application React complète de A à Z.',
        videoUrl: 'https://www.youtube.com/embed/a_7Z7C_JCyo'
      },
    ]
  },
  {
    id: '3',
    title: 'Machine Learning avec Python',
    description: 'Apprenez les fondamentaux du machine learning',
    level: 'advanced',
    duration: '20 heures',
    progress: 10,
    enrolled: true,
    instructor: 'Sophie Bernard',
    rating: 4.9,
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHl0aG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
    category: 'data',
    introVideo: 'https://www.youtube.com/embed/i_LwzRVP7bg',
    modules: [
      { 
        id: 'm1', 
        title: 'Python pour Data Science', 
        duration: '4 heures', 
        completed: true,
        content: 'Maîtriser les bases de Python pour l\'analyse de données.',
        videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw'
      },
      { 
        id: 'm2', 
        title: 'NumPy et Pandas', 
        duration: '4 heures', 
        completed: false,
        content: 'Utiliser NumPy et Pandas pour la manipulation des données.',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg'
      },
      { 
        id: 'm3', 
        title: 'Modèles de Classification', 
        duration: '5 heures', 
        completed: false,
        content: 'Comprendre et implémenter différents algorithmes de classification.',
        videoUrl: 'https://www.youtube.com/embed/pqNCD_5r0IU'
      },
      { 
        id: 'm4', 
        title: 'Modèles de Régression', 
        duration: '4 heures', 
        completed: false,
        content: 'Créer et évaluer des modèles de régression avancés.',
        videoUrl: 'https://www.youtube.com/embed/JcI5Vnw0b2c'
      },
      { 
        id: 'm5', 
        title: 'Projet Final', 
        duration: '3 heures', 
        completed: false,
        content: 'Développer un projet de ML complet de bout en bout.',
        videoUrl: 'https://www.youtube.com/embed/7eh4d6sabA0'
      },
    ]
  },
  {
    id: '4',
    title: 'Design UI/UX pour développeurs',
    description: 'Maîtrisez les principes de design pour créer de meilleures interfaces',
    level: 'beginner',
    duration: '12 heures',
    progress: 0,
    enrolled: false,
    instructor: 'Claire Dubois',
    rating: 4.7,
    price: '29€',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVpJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
    category: 'design',
    introVideo: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    modules: [
      { id: 'm1', title: 'Principes de design UI', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/B-ytMSuwbf8' },
      { id: 'm2', title: 'Hiérarchie visuelle', duration: '2 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/Wm1xKj4CKH4' },
      { id: 'm3', title: 'Systèmes de couleurs', duration: '2 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/u5AnzLg1HxY' },
      { id: 'm4', title: 'Typographie', duration: '2 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/QrNi9FmdlxY' },
      { id: 'm5', title: 'Projet Final', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/cYjLo93z_G0' },
    ]
  },
  {
    id: '5',
    title: 'Développement iOS avec Swift',
    description: 'Créez des applications mobiles pour iOS',
    level: 'intermediate',
    duration: '18 heures',
    progress: 0,
    enrolled: false,
    instructor: 'Alexandre Martin',
    rating: 4.5,
    price: '49€',
    image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3dpZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
    category: 'mobile',
    introVideo: 'https://www.youtube.com/embed/comQ1-x2a1Q',
    modules: [
      { id: 'm1', title: 'Introduction à Swift', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/Ulp1Kimblg0' },
      { id: 'm2', title: 'UIKit Basics', duration: '4 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/bZNAFkkUeKs' },
      { id: 'm3', title: 'Navigation et Architecture', duration: '4 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/RJEXpw1nlT0' },
      { id: 'm4', title: 'Données et APIs', duration: '4 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/iHKBNYMWd5I' },
      { id: 'm5', title: 'Projet Final', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/SgJ_femmsfg' },
    ]
  },
  {
    id: '6',
    title: 'Cybersécurité pour débutants',
    description: 'Comprendre les bases de la sécurité informatique',
    level: 'beginner',
    duration: '14 heures',
    progress: 0,
    enrolled: false,
    instructor: 'Nicolas Petit',
    rating: 4.8,
    price: '39€',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN5YmVyc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
    category: 'security',
    introVideo: 'https://www.youtube.com/embed/bPVaOlJ6ln0',
    modules: [
      { id: 'm1', title: 'Introduction à la cybersécurité', duration: '2 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/dz7Ntp7KQGA' },
      { id: 'm2', title: 'Comprendre les menaces', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/rcDO8km6R6c' },
      { id: 'm3', title: 'Pratiques de sécurité', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA' },
      { id: 'm4', title: 'Cryptographie basique', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/q9vu6_2r0o4' },
      { id: 'm5', title: 'Projet Final', duration: '3 heures', completed: false, videoUrl: 'https://www.youtube.com/embed/fTGTnrgjuGA' },
    ]
  }
];

// Course card component
const CourseCard: React.FC<{ course: Course, onClick: () => void }> = ({ course, onClick }) => {
  const getLevelBadge = () => {
    switch (course.level) {
      case 'beginner':
        return <Badge className="bg-green-500">Débutant</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-500">Intermédiaire</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-500">Avancé</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <div className="h-48 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          {getLevelBadge()}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
          {course.instructor && (
            <span className="ml-3">Par {course.instructor}</span>
          )}
        </div>
        {course.enrolled ? (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        ) : (
          <div className="text-sm font-medium flex justify-between items-center">
            {course.price ? (
              <span className="text-orange-600">{course.price}</span>
            ) : (
              <span className="text-green-600">Gratuit</span>
            )}
            {course.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{course.rating}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {!course.enrolled 
            ? 'S\'inscrire' 
            : course.progress === 0 
              ? 'Commencer' 
              : course.progress === 100 
                ? 'Terminé' 
                : 'Continuer'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Module component for course detail view
const ModuleItem: React.FC<{ 
  module: Module, 
  index: number, 
  onStartModule: () => void,
  isEnrolled: boolean
}> = ({ module, index, onStartModule, isEnrolled }) => {
  const { toast } = useToast();

  const handleStartModule = () => {
    if (!isEnrolled) {
      toast({
        title: "Vous n'êtes pas inscrit",
        description: "Veuillez vous inscrire au cours pour accéder à ce module",
        variant: "destructive"
      });
      return;
    }
    onStartModule();
  };

  return (
    <Card key={module.id} className={`${module.completed ? 'bg-gray-50 border-green-100' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-gray-600">
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.duration}</p>
            </div>
          </div>
          <div>
            {module.completed ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="h-4 w-4 mr-1" />
                Complété
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={handleStartModule}>
                Commencer
              </Button>
            )}
          </div>
        </div>
        {module.content && (
          <p className="mt-3 text-sm text-gray-600 pl-11">{module.content}</p>
        )}
      </CardContent>
    </Card>
  );
};

// Video player dialog component
const VideoPlayerDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  videoUrl: string;
  title: string;
}> = ({ open, setOpen, videoUrl, title }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Regardez attentivement cette vidéo pour comprendre les concepts clés.
          </DialogDescription>
        </DialogHeader>
        <div className="relative pt-[56.25%] w-full overflow-hidden rounded-md bg-gray-100">
          <iframe
            className="absolute top-0 left-0 size-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="w-full mt-4">
            Fermer
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

// Module content dialog component
const ModuleContentDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  module: Module | null;
  onCompleteModule: () => void;
}> = ({ open, setOpen, module, onCompleteModule }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { toast } = useToast();
  
  const handleCompleteModule = () => {
    onCompleteModule();
    setOpen(false);
    toast({
      title: "Module complété",
      description: "Félicitations pour avoir terminé ce module!",
    });
  };
  
  if (!module) return null;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{module.title}</DialogTitle>
          <DialogDescription>
            {module.duration}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md border">
            <p className="text-gray-700">{module.content}</p>
          </div>
          
          {module.videoUrl && (
            <Button 
              className="w-full flex items-center justify-center gap-2" 
              onClick={() => setVideoPlaying(true)}
            >
              <PlayCircle size={16} />
              Regarder la vidéo du module
            </Button>
          )}
          
          <Button 
            variant="default" 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleCompleteModule}
          >
            Marquer comme terminé
          </Button>
        </div>
      </DialogContent>
      
      {module.videoUrl && (
        <VideoPlayerDialog
          open={videoPlaying}
          setOpen={setVideoPlaying}
          videoUrl={module.videoUrl}
          title={`Vidéo: ${module.title}`}
        />
      )}
    </Dialog>
  );
};

// Course detail component
const CourseDetail: React.FC<{ 
  course: Course, 
  onBack: () => void,
  onEnroll: (courseId: string) => void,
  onStartModule: (courseId: string, moduleId: string) => void,
  onUpdateCourse: (updatedCourse: Course) => void
}> = ({ course, onBack, onEnroll, onStartModule, onUpdateCourse }) => {
  const completedModules = course.modules.filter(m => m.completed).length;
  const { toast } = useToast();
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [showModuleContent, setShowModuleContent] = useState(false);
  
  const handleEnroll = () => {
    onEnroll(course.id);
    toast({
      title: "Inscription réussie",
      description: `Vous êtes maintenant inscrit au cours ${course.title}`,
    });
  };
  
  const handleStartModuleWithContent = (moduleId: string) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      setActiveModule(module);
      setShowModuleContent(true);
    }
    onStartModule(course.id, moduleId);
  };
  
  const handleCompleteModule = () => {
    if (!activeModule) return;
    
    const updatedModules = course.modules.map(m => 
      m.id === activeModule.id ? { ...m, completed: true } : m
    );
    
    const allCompleted = updatedModules.every(m => m.completed);
    const updatedProgress = Math.round((updatedModules.filter(m => m.completed).length / updatedModules.length) * 100);
    
    const updatedCourse = {
      ...course,
      modules: updatedModules,
      progress: updatedProgress
    };
    
    onUpdateCourse(updatedCourse);
    
    if (allCompleted) {
      toast({
        title: "Cours terminé",
        description: "Félicitations! Vous avez terminé tous les modules de ce cours.",
        variant: "default"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>Retour aux cours</Button>
        <div className="text-right">
          <Badge className={`
            ${course.level === 'beginner' ? 'bg-green-500' : ''}
            ${course.level === 'intermediate' ? 'bg-blue-500' : ''}
            ${course.level === 'advanced' ? 'bg-purple-500' : ''}
          `}>
            {course.level === 'beginner' ? 'Débutant' : 
             course.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </Badge>
        </div>
      </div>
      
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => setShowIntroVideo(true)}
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Regarder l'introduction
          </Button>
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        
        <div className="flex flex-wrap items-center mt-4 space-x-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-gray-500" />
            <span>{course.modules.length} modules</span>
          </div>
          {course.enrolled && (
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-gray-500" />
              <span>{completedModules} / {course.modules.length} complétés</span>
            </div>
          )}
          {course.instructor && (
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-gray-700">Par <strong>{course.instructor}</strong></span>
            </div>
          )}
          {course.rating && (
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{course.rating}</span>
            </div>
          )}
        </div>
      </div>
      
      {course.enrolled ? (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Progression du cours</h2>
          <Progress value={course.progress} className="h-2" />
          <p className="text-sm text-gray-600">{course.progress}% complété</p>
        </div>
      ) : (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex justify-between items-center">
          <div>
            <p className="font-medium text-orange-800">Ce cours vous intéresse ?</p>
            <p className="text-sm text-orange-700">Inscrivez-vous pour suivre votre progression et obtenir un certificat.</p>
          </div>
          <Button onClick={handleEnroll} className="bg-orange-600 hover:bg-orange-700">
            {course.price ? `S'inscrire - ${course.price}` : "S'inscrire gratuitement"}
          </Button>
        </div>
      )}
      
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Contenu du cours</h2>
        <div className="space-y-3">
          {course.modules.map((module, index) => (
            <ModuleItem 
              key={module.id} 
              module={module} 
              index={index} 
              isEnrolled={course.enrolled}
              onStartModule={() => handleStartModuleWithContent(module.id)} 
            />
          ))}
        </div>
      </div>
      
      {course.introVideo && (
        <VideoPlayerDialog
          open={showIntroVideo}
          setOpen={setShowIntroVideo}
          videoUrl={course.introVideo}
          title={`Introduction: ${course.title}`}
        />
      )}
      
      <ModuleContentDialog
        open={showModuleContent}
        setOpen={setShowModuleContent}
        module={activeModule}
        onCompleteModule={handleCompleteModule}
      />
    </div>
  );
};

const Courses: React.FC = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>(courseData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);
  
  // Filter courses by category, search term, and enrollment status
  const filteredCourses = courses
    .filter(course => 
      (activeTab === 'all' || course.category === activeTab) &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showEnrolledOnly || course.enrolled)
    );

  // Handle course enrollment
  const handleEnrollCourse = (courseId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
  };

  // Handle starting a module
  const handleStartModule = (courseId: string, moduleId: string) => {
    toast({
      title: "Module démarré",
      description: "Bon apprentissage !",
    });
    
    // In a real app, this would navigate to the module content or update the UI
    console.log(`Starting module ${moduleId} of course ${courseId}`);
  };

  // Handle updating a course (for progress tracking, etc.)
  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  // Toggle filter for enrolled courses only
  const toggleEnrolledFilter = () => {
    setShowEnrolledOnly(!showEnrolledOnly);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {selectedCourse ? (
        <CourseDetail 
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          onEnroll={handleEnrollCourse}
          onStartModule={handleStartModule}
          onUpdateCourse={handleUpdateCourse}
        />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Explorez nos cours</h1>
              <p className="text-gray-600">Développez vos compétences avec des cours de qualité</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un cours..."
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline" 
                size="icon"
                onClick={toggleEnrolledFilter}
                className={showEnrolledOnly ? "bg-blue-50" : ""}
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="web">Développement Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="data">Data Science</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>
            
            {showEnrolledOnly && (
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <CheckCircle2 size={16} />
                <span className="text-sm font-medium">Afficher uniquement les cours inscrits</span>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={toggleEnrolledFilter}>
                  <X size={14} />
                </Button>
              </div>
            )}
            
            <TabsContent value="all" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={() => setSelectedCourse(course)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Code className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Aucun cours trouvé</h3>
                  <p className="mt-2 text-gray-500">Essayez de modifier vos critères de recherche</p>
                </div>
              )}
            </TabsContent>
            
            {/* The other tabs content will be similar to the "all" tab but filtered by category */}
            {["web", "mobile", "data", "design", "security"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onClick={() => setSelectedCourse(course)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Code className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">Aucun cours trouvé</h3>
                    <p className="mt-2 text-gray-500">Essayez de modifier vos critères de recherche</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Courses;
