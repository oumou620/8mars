
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioChatTab from '../AudioChatTab';
import '@testing-library/jest-dom';

describe('AudioChatTab', () => {
  // Mock pour MediaRecorder et getUserMedia
  global.MediaRecorder = jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    state: '',
  })) as unknown as typeof MediaRecorder;

  const mockGetUserMedia = jest.fn();
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: mockGetUserMedia,
    },
    writable: true,
  });

  beforeEach(() => {
    mockGetUserMedia.mockResolvedValue({});
    jest.clearAllMocks();
  });

  it('renders the initial state correctly', () => {
    render(
      <AudioChatTab
        mentorName="John Doe"
        isAudioCall={false}
        isRecording={false}
        setIsAudioCall={jest.fn()}
        setIsRecording={jest.fn()}
      />
    );

    expect(screen.getByText(/start an audio call/i)).toBeInTheDocument();
    expect(screen.getByText(/with john doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/call in progress/i)).not.toBeInTheDocument();
  });

  it('shows call buttons when not in a call', () => {
    render(
      <AudioChatTab
        mentorName="John Doe"
        isAudioCall={false}
        isRecording={false}
        setIsAudioCall={jest.fn()}
        setIsRecording={jest.fn()}
      />
    );

    const startCallButton = screen.getByRole('button', { name: /start call/i });
    expect(startCallButton).toBeInTheDocument();
    expect(startCallButton).not.toBeDisabled();
  });

  it('shows the active call UI when in a call', () => {
    render(
      <AudioChatTab
        mentorName="John Doe"
        isAudioCall={true}
        isRecording={false}
        setIsAudioCall={jest.fn()}
        setIsRecording={jest.fn()}
      />
    );

    expect(screen.getByText(/call in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
  });

  it('shows recording UI when recording', () => {
    render(
      <AudioChatTab
        mentorName="John Doe"
        isAudioCall={false}
        isRecording={true}
        setIsAudioCall={jest.fn()}
        setIsRecording={jest.fn()}
      />
    );

    expect(screen.getByText(/recording in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/duration/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles record button click', () => {
    const setIsRecording = jest.fn();
    render(
      <AudioChatTab
        mentorName="John Doe"
        isAudioCall={false}
        isRecording={false}
        setIsAudioCall={jest.fn()}
        setIsRecording={setIsRecording}
      />
    );

    const recordButton = screen.getByRole('button', { name: /record message/i });
    fireEvent.click(recordButton);
    expect(screen.getByText(/permission/i)).toBeInTheDocument();
  });
});
