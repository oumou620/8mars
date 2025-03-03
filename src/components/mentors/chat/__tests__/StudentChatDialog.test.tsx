
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentChatDialog from '../../StudentChatDialog';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock the hooks
jest.mock('@/hooks/useMentorshipMessages', () => ({
  useMentorshipMessages: () => ({
    messages: [],
    loading: false,
    sending: false,
    mentorshipActive: true,
    mentorshipId: 'test-mentorship-id',
    sendMessage: jest.fn(),
    fetchMessages: jest.fn()
  })
}));

describe('StudentChatDialog', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (props: Partial<Parameters<typeof StudentChatDialog>[0]> = {}) => {
    return render(
      <AuthProvider>
        <LanguageProvider>
          <StudentChatDialog
            isOpen={true}
            onClose={mockOnClose}
            mentorId="test-mentor-id"
            mentorName="Test Mentor"
            {...props}
          />
        </LanguageProvider>
      </AuthProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog with correct title', () => {
    renderComponent();
    expect(screen.getByText(/chat with test mentor/i)).toBeInTheDocument();
  });

  it('renders tabs for different chat modes', () => {
    renderComponent();
    expect(screen.getByRole('tab', { name: /text/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /audio/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /video/i })).toBeInTheDocument();
  });

  it('shows text chat tab by default', () => {
    renderComponent();
    // The input field is only in the text chat tab
    expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
  });

  it('switches to audio tab when clicked', () => {
    renderComponent();
    const audioTab = screen.getByRole('tab', { name: /audio/i });
    fireEvent.click(audioTab);
    
    // Audio tab should show the start call button
    expect(screen.getByText(/start call/i)).toBeInTheDocument();
    // Text chat input should not be visible
    expect(screen.queryByPlaceholderText(/type a message/i)).not.toBeInTheDocument();
  });

  it('switches to video tab when clicked', () => {
    renderComponent();
    const videoTab = screen.getByRole('tab', { name: /video/i });
    fireEvent.click(videoTab);
    
    // Video tab should show the start video call button
    expect(screen.getByText(/start video call button/i)).toBeInTheDocument();
    // Text chat input should not be visible
    expect(screen.queryByPlaceholderText(/type a message/i)).not.toBeInTheDocument();
  });

  it('shows message when no mentorship is active', () => {
    // Mock useMentorshipMessages to return mentorshipActive: false
    jest.mock('@/hooks/useMentorshipMessages', () => ({
      useMentorshipMessages: () => ({
        messages: [],
        loading: false,
        sending: false,
        mentorshipActive: false,
        mentorshipId: null,
        sendMessage: jest.fn(),
        fetchMessages: jest.fn()
      })
    }));
    
    renderComponent();
    expect(screen.getByText(/no mentorship/i)).toBeInTheDocument();
  });

  it('calls onClose when dialog is closed', () => {
    renderComponent();
    // Get the close button (usually an X in the top right)
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
