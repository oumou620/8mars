
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender_name?: string;
}

export interface MentorshipMessagesResult {
  messages: Message[];
  loading: boolean;
  sending: boolean;
  mentorshipActive: boolean;
  mentorshipId: string | null;
  sendMessage: (messageContent: string) => Promise<void>;
  fetchMessages: () => Promise<void>;
}

export const useMentorshipMessages = (mentorId: string, isOpen: boolean): MentorshipMessagesResult => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mentorshipActive, setMentorshipActive] = useState(false);
  const [mentorshipId, setMentorshipId] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!isOpen || !user || !mentorId) return;
    
    setLoading(true);
    try {
      const { data: mentorshipData, error: mentorshipError } = await supabase
        .from('mentoring_requests')
        .select('*')
        .eq('mentor_id', mentorId)
        .eq('learner_id', user.id)
        .eq('status', 'accepted')
        .single();
      
      if (mentorshipError && mentorshipError.code !== 'PGRST116') {
        console.error('Error checking mentorship:', mentorshipError);
        toast.error(t('chat.error_checking_relationship'));
        setMentorshipActive(false);
      } else {
        setMentorshipActive(!!mentorshipData);
        if (mentorshipData) {
          setMentorshipId(mentorshipData.id);
        }
      }
      
      if (mentorshipData) {
        const { data, error } = await supabase
          .from('mentorship_messages')
          .select('*')
          .eq('mentorship_id', mentorshipData.id)
          .order('created_at', { ascending: true });
          
        if (error) {
          console.error('Error fetching messages:', error);
          toast.error(t('chat.error_loading'));
        } else {
          setMessages(data as Message[] || []);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('chat.error_loading'));
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || !user || !mentorId || sending || !mentorshipActive || !mentorshipId) return;
    
    setSending(true);
    try {
      const newMessage = {
        content: messageContent.trim(),
        sender_id: user.id,
        mentorship_id: mentorshipId
      };
      
      const { data, error } = await supabase
        .from('mentorship_messages')
        .insert(newMessage)
        .select();
        
      if (error) {
        console.error('Error sending message:', error);
        toast.error(t('chat.error_sending'));
      } else if (data && data.length > 0) {
        setMessages([...messages, data[0] as Message]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('chat.error_sending'));
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [isOpen, user, mentorId, t]);

  return {
    messages,
    loading,
    sending,
    mentorshipActive,
    mentorshipId,
    sendMessage,
    fetchMessages
  };
};
