
import { renderHook, act } from '@testing-library/react-hooks';
import { useMentorshipMessages } from '../useMentorshipMessages';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Mock the supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis()
  }
}));

// Mock the auth context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' }
  })
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
    success: jest.fn()
  }
}));

describe('useMentorshipMessages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches messages when the dialog is opened', async () => {
    // Mock the supabase responses
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'mentoring_requests') {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                eq: () => ({
                  single: () => Promise.resolve({
                    data: { id: 'mentorship-1', mentor_id: 'mentor-1', learner_id: 'test-user-id', status: 'accepted' },
                    error: null
                  })
                })
              })
            })
          })
        };
      } else if (table === 'mentorship_messages') {
        return {
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({
                data: [
                  { id: 'msg-1', content: 'Hello', sender_id: 'test-user-id', created_at: '2023-01-01T00:00:00Z' },
                  { id: 'msg-2', content: 'Hi there', sender_id: 'mentor-1', created_at: '2023-01-01T00:01:00Z' }
                ],
                error: null
              })
            })
          }),
          insert: () => ({
            select: () => Promise.resolve({
              data: [{ id: 'new-msg', content: 'New message', sender_id: 'test-user-id', created_at: '2023-01-01T00:02:00Z' }],
              error: null
            })
          })
        };
      }
      return { select: jest.fn() };
    });

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useMentorshipMessages('mentor-1', true));
    
    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.messages).toEqual([]);
    
    // Wait for the fetch to complete
    await waitForNextUpdate();
    
    // Check the hook state after fetching
    expect(result.current.loading).toBe(false);
    expect(result.current.mentorshipActive).toBe(true);
    expect(result.current.mentorshipId).toBe('mentorship-1');
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].content).toBe('Hello');
  });

  it('sends a message successfully', async () => {
    // Mock the supabase responses
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'mentoring_requests') {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                eq: () => ({
                  single: () => Promise.resolve({
                    data: { id: 'mentorship-1', mentor_id: 'mentor-1', learner_id: 'test-user-id', status: 'accepted' },
                    error: null
                  })
                })
              })
            })
          })
        };
      } else if (table === 'mentorship_messages') {
        return {
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({
                data: [],
                error: null
              })
            })
          }),
          insert: () => ({
            select: () => Promise.resolve({
              data: [{ id: 'new-msg', content: 'Test message', sender_id: 'test-user-id', created_at: '2023-01-01T00:00:00Z' }],
              error: null
            })
          })
        };
      }
      return { select: jest.fn() };
    });

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useMentorshipMessages('mentor-1', true));
    
    // Wait for the initial fetch to complete
    await waitForNextUpdate();
    
    // Send a message
    await act(async () => {
      await result.current.sendMessage('Test message');
    });
    
    // Check if the message was added
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Test message');
  });

  it('handles errors when fetching messages', async () => {
    // Mock the supabase responses with an error
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'mentoring_requests') {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                eq: () => ({
                  single: () => Promise.resolve({
                    data: { id: 'mentorship-1', mentor_id: 'mentor-1', learner_id: 'test-user-id', status: 'accepted' },
                    error: null
                  })
                })
              })
            })
          })
        };
      } else if (table === 'mentorship_messages') {
        return {
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({
                data: null,
                error: { message: 'Database error' }
              })
            })
          })
        };
      }
      return { select: jest.fn() };
    });

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useMentorshipMessages('mentor-1', true));
    
    // Wait for the fetch to complete
    await waitForNextUpdate();
    
    // Check if toast.error was called
    expect(toast.error).toHaveBeenCalled();
    expect(result.current.messages).toEqual([]);
  });
});
