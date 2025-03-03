
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextChatTab from '../TextChatTab';
import { Message } from '@/hooks/useMentorshipMessages';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock the hooks and contexts
jest.mock('@/contexts/AuthContext', () => {
  const originalModule = jest.requireActual('@/contexts/AuthContext');
  return {
    ...originalModule,
    useAuth: () => ({
      user: { id: 'test-user-id' }
    })
  };
});

describe('TextChatTab', () => {
  const mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hello there!',
      sender_id: 'test-user-id',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      content: 'Hi! How can I help you?',
      sender_id: 'other-user-id',
      created_at: new Date().toISOString()
    }
  ];

  const mockSendMessage = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <AuthProvider>
        <LanguageProvider>
          <TextChatTab
            messages={mockMessages}
            loading={false}
            sending={false}
            mentorshipActive={true}
            onSendMessage={mockSendMessage}
            {...props}
          />
        </LanguageProvider>
      </AuthProvider>
    );
  };

  it('renders messages correctly', () => {
    renderComponent();
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText('Hi! How can I help you?')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderComponent({ loading: true });
    expect(screen.queryByText('Hello there!')).not.toBeInTheDocument();
    // Look for the loading spinner
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows empty state when no messages', () => {
    renderComponent({ messages: [] });
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it('allows sending a message', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New test message' } });
    fireEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('New test message');
  });

  it('disables input when sending', () => {
    renderComponent({ sending: true });
    const input = screen.getByPlaceholderText(/Type a message/i);
    expect(input).toBeDisabled();
  });

  it('disables input when mentorship is not active', () => {
    renderComponent({ mentorshipActive: false });
    const input = screen.getByPlaceholderText(/Type a message/i);
    expect(input).toBeDisabled();
  });
});
