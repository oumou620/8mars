
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  mentorship_id: string;
  read_at: string | null;
}

export const useMentorChat = (studentId: string, mentorId: string, isOpen: boolean) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mentorshipId, setMentorshipId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Check if there's an active mentorship relationship
  const checkMentorshipRelationship = useCallback(async () => {
    if (!studentId || !mentorId) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('mentoring_requests')
        .select('id, status')
        .eq('learner_id', studentId)
        .eq('mentor_id', mentorId)
        .eq('status', 'active')
        .single();
      
      if (error) throw new Error(error.message);
      
      if (data) {
        setMentorshipId(data.id);
        await fetchMessages(data.id);
      } else {
        setMentorshipId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error checking mentorship relationship:', err);
      toast.error(t('chat.error_checking_relationship'));
      setMentorshipId(null);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [studentId, mentorId, t]);

  // Fetch messages for the given mentorship
  const fetchMessages = async (mentorshipId: string) => {
    if (!mentorshipId) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('mentorship_messages')
        .select('*')
        .eq('mentorship_id', mentorshipId)
        .order('created_at', { ascending: true });
      
      if (error) throw new Error(error.message);
      
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error(t('chat.error_loading'));
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (content: string) => {
    if (!mentorshipId || !content.trim()) return;
    
    try {
      setSending(true);
      
      // Get the user ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Insert the message into the database
      const { data, error } = await supabase
        .from('mentorship_messages')
        .insert({
          content: content.trim(),
          sender_id: user.id,
          mentorship_id: mentorshipId
        })
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      
      // Update the local messages state with the new message
      if (data) {
        setMessages(prev => [...prev, data]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error(t('chat.error_sending'));
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setSending(false);
    }
  };

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!mentorshipId || !isOpen) return;

    // Using the correct channel creation syntax
    const channel = supabase
      .channel(`mentorship_messages:${mentorshipId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'mentorship_messages',
        filter: `mentorship_id=eq.${mentorshipId}`
      }, payload => {
        // Only add the message if it's not from the current user to avoid duplicates
        const message = payload.new as Message;
        setMessages(prev => {
          // Check if the message is already in the array
          if (prev.some(msg => msg.id === message.id)) {
            return prev;
          }
          return [...prev, message];
        });
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [mentorshipId, isOpen]);

  // Effect to check mentorship relationship when the dialog opens
  useEffect(() => {
    if (isOpen) {
      checkMentorshipRelationship();
    }
  }, [isOpen, checkMentorshipRelationship]);

  return {
    messages,
    loading,
    sending,
    mentorshipId,
    error,
    sendMessage,
    fetchMessages: () => mentorshipId && fetchMessages(mentorshipId)
  };
};
