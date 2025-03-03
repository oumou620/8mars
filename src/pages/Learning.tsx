
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlassCard from '../components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { BookOpen, Shield, Palette, Code, Monitor, Database, Award } from 'lucide-react';

const courses = [
  {
    title: 'Intro to Web Development',
    category: 'Development',
    level: 'Beginner',
    duration: '8 weeks',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build interactive websites.',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80',
    icon: Code,
  },
  {
    title: 'Cybersecurity Essentials',
    category: 'Security',
    level: 'Intermediate',
    duration: '6 weeks',
    description: 'Understand key security concepts, threat detection, and digital privacy fundamentals.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80',
    icon: Shield,
  },
  {
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    level: 'Beginner',
    duration: '10 weeks',
    description: 'Master user interface and experience design principles with practical projects.',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: Palette,
  },
  {
    title: 'Data Science with Python',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '12 weeks',
    description: 'Learn data analysis, visualization, and machine learning concepts with Python.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: Database,
  },
  {
    title: 'Mobile App Development',
    category: 'Development',
    level: 'Intermediate',
    duration: '10 weeks',
    description: 'Build cross-platform mobile applications using React Native framework.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    icon: Monitor,
  },
  {
    title: 'Tech Leadership Bootcamp',
    category: 'Career',
    level: 'Advanced',
    duration: '6 weeks',
    description: 'Develop leadership and management skills specifically for tech environments.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    icon: Award,
  },
];

const resources = [
  {
    title: 'Free Programming Books',
    description: 'Collection of free tech books covering various programming languages and concepts.',
    link: '#',
  },
  {
    title: 'Women in Tech Podcast',
    description: 'Interviews with successful women in technology sharing their journeys and advice.',
    link: '#',
  },
  {
    title: 'Coding Challenge Platform',
    description: 'Practice your coding skills with interactive challenges and puzzles.',
    link: '#',
  },
  {
    title: 'Design Resource Library',
    description: 'Free UI kits, icons, and design resources for your projects.',
    link: '#',
  },
];

const Learning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Learning Space</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Build your skills through interactive courses, practical challenges,
                and a rich library of tech resources.
              </p>
            </div>
            
            {/* Course Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="rounded-full" variant="default">
                All Courses
              </Button>
              <Button className="rounded-full" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Development
              </Button>
              <Button className="rounded-full" variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button className="rounded-full" variant="outline">
                <Palette className="h-4 w-4 mr-2" />
                Design
              </Button>
              <Button className="rounded-full" variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Data Science
              </Button>
            </div>
            
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <GlassCard key={course.title} className="h-full flex flex-col hover:shadow-md transition-all duration-300 animate-fade-up">
                  <div className="relative mb-6">
                    <div className="h-48 rounded-xl overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary shadow-sm">
                      {course.category}
                    </div>
                    <div className="absolute -bottom-5 right-5 bg-white rounded-full p-3 shadow-md">
                      <course.icon className="h-6 w-6 text-techher-purple" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-500">{course.level}</span>
                      <span className="text-xs font-medium text-gray-500">{course.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{course.description}</p>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Enroll Now
                  </Button>
                </GlassCard>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="rounded-full">
                View All Courses
              </Button>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Resources</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Access a variety of free resources to supplement your learning journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource) => (
                <GlassCard key={resource.title} className="hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    Access Resource
                    <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Challenges & Projects */}
        <section className="section-padding bg-gradient-to-r from-techher-light-purple to-techher-soft-pink">
          <div className="mx-auto max-w-7xl px-6">
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Challenges & Projects</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Put your skills to the test with practical challenges and build your portfolio with guided projects.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Weekly Code Challenges</h3>
                  <p className="text-gray-600 text-sm">Solve interesting coding problems and get feedback from mentors.</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Security Hackathons</h3>
                  <p className="text-gray-600 text-sm">Participate in security-focused hackathons and improve your skills.</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Design Competitions</h3>
                  <p className="text-gray-600 text-sm">Show your creativity in UI/UX design competitions with real-world briefs.</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white">
                  Explore Challenges
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learning;
