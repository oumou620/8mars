
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMentors, supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from 'lucide-react';
import MentorSkeleton from '@/components/mentors/MentorSkeleton';
import { Mentor } from '@/components/mentors/MentorCard';

const MentorCard = ({ mentor, onConnect }: { mentor: Mentor, onConnect: () => void }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex gap-4 items-start">
          <Avatar>
            <AvatarImage src={mentor.image} alt={mentor.name} />
            <AvatarFallback>{mentor.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{mentor.name}</CardTitle>
            <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{mentor.rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{mentor.bio}</p>
        <Label className="mt-4">Specialty</Label>
        <p className="text-sm">{mentor.specialty}</p>
        <Label className="mt-2">Availability</Label>
        <p className="text-sm">{mentor.availability}</p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full" onClick={onConnect}>Connect</Button>
      </CardFooter>
    </Card>
  );
};

const Mentors = () => {
  const { data: mentors, isLoading, error } = useQuery({
    queryKey: ['mentors'],
    queryFn: fetchMentors
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Mentor[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (mentors) {
      const results = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, mentors]);

  const handleConnectClick = (mentor: Mentor) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to connect with a mentor.",
      });
      navigate('/auth');
      return;
    }
    
    toast({
      title: "Connect Clicked",
      description: `You clicked connect for mentor: ${mentor.name}`,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fixed the mentor cards rendering section
  const renderMentors = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <MentorSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!searchResults || searchResults.length === 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onConnect={() => handleConnectClick(mentor)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Find a Mentor</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for mentors..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {error && <p className="text-red-500">Error: {(error as Error).message}</p>}
      {renderMentors()}
    </div>
  );
};

export default Mentors;
