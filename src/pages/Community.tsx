
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlassCard from '../components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { MessageSquare, Award, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

const discussionTopics = [
  {
    title: 'Getting started with JavaScript frameworks',
    category: 'Development',
    username: 'TechGirl23',
    replies: 15,
    time: '2 hours ago',
  },
  {
    title: 'Resources to learn cybersecurity basics',
    category: 'Security',
    username: 'CyberQueen',
    replies: 28,
    time: '1 day ago',
  },
  {
    title: 'Design portfolio tips for beginners',
    category: 'Design',
    username: 'ArtfulCoder',
    replies: 9,
    time: '3 hours ago',
  },
  {
    title: 'Imposter syndrome in tech - how to overcome it',
    category: 'Career',
    username: 'DevJourney',
    replies: 42,
    time: '4 days ago',
  },
  {
    title: 'Data science project ideas for high school students',
    category: 'Data Science',
    username: 'DataDiva',
    replies: 21,
    time: '2 days ago',
  },
];

const upcomingEvents = [
  {
    title: 'Introduction to Machine Learning Workshop',
    date: 'June 15, 2023',
    time: '2:00 PM - 4:00 PM EDT',
    location: 'Virtual',
    type: 'Workshop',
  },
  {
    title: 'Women in Tech Annual Conference',
    date: 'July 8-10, 2023',
    time: 'All day',
    location: 'New York, NY',
    type: 'Conference',
  },
  {
    title: 'Web Development Hackathon',
    date: 'June 24-25, 2023',
    time: '9:00 AM - 6:00 PM EDT',
    location: 'Virtual',
    type: 'Hackathon',
  },
];

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Connect with like-minded girls, share experiences, ask questions, 
                and participate in events and discussions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <GlassCard className="text-center hover:shadow-md transition-all duration-300 animate-fade-up">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discussion Forum</h3>
                <p className="text-gray-600 mb-6">
                  Share your thoughts, ask questions, and get advice from peers and mentors.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Join Discussions
                </Button>
              </GlassCard>
              
              <GlassCard className="text-center hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Events & Webinars</h3>
                <p className="text-gray-600 mb-6">
                  Participate in hackathons, workshops, and webinars with industry experts.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Events
                </Button>
              </GlassCard>
              
              <GlassCard className="text-center hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Badges & Rewards</h3>
                <p className="text-gray-600 mb-6">
                  Earn recognition for your participation and achievements in the community.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Achievements
                </Button>
              </GlassCard>
            </div>
            
            {/* Discussion Forum Preview */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Recent Discussions</h2>
                <Button variant="outline">
                  View All
                </Button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y">
                  {discussionTopics.map((topic) => (
                    <div key={topic.title} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                              {topic.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              Posted by {topic.username} • {topic.time}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-1">
                            {topic.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{topic.replies} replies</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
                <Button variant="outline">
                  View Calendar
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <GlassCard 
                    key={event.title} 
                    className="hover:shadow-md transition-all duration-300 animate-fade-up"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                        {event.type}
                      </span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-6">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <Button className="w-full">
                      Register
                    </Button>
                  </GlassCard>
                ))}
              </div>
            </div>
            
            {/* Community Showcase */}
            <div className="bg-gradient-to-r from-techher-light-purple to-techher-soft-pink rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Community Showcase</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See what our members are building and the badges they've earned.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="glass text-center p-6 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-techher-purple" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Member Spotlight</h3>
                    <p className="text-sm text-gray-600">Coming soon</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" className="bg-white/80">
                  Submit Your Project
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

export default Community;
