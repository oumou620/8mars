import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import MyMentors from "./pages/MyMentors";
import Courses from "./pages/Courses";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user) return <Navigate to="/auth" replace />;
  
  return <Outlet />;
};

const MentorRoute = () => {
  const { user, loading, userType } = useAuth();
  
  if (loading) return null;
  
  if (!user) return <Navigate to="/auth" replace />;
  
  if (userType !== 'mentor') return <Navigate to="/" replace />;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Outlet />
    </div>
  );
};

const LearnerRoute = () => {
  const { user, loading, userType } = useAuth();
  
  if (loading) return null;
  
  if (!user) return <Navigate to="/auth" replace />;
  
  if (userType !== 'learner') return <Navigate to="/" replace />;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Outlet />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route element={<MentorRoute />}>
              <Route path="/mentoring" element={<Courses />} />
              <Route path="/mentor-resources" element={<Courses />} />
              <Route path="/workshops" element={<Courses />} />
            </Route>
            
            <Route element={<LearnerRoute />}>
              <Route path="/learning-path" element={<Courses />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/my-mentors" element={<MyMentors />} />
              <Route path="/internships" element={<Courses />} />
              <Route path="/job-opportunities" element={<Courses />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
