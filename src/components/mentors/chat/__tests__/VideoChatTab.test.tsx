
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoChatTab from '../VideoChatTab';
import '@testing-library/jest-dom';

describe('VideoChatTab', () => {
  // Mock pour MediaDevices et getUserMedia
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
      <VideoChatTab
        isVideoCall={false}
        setIsVideoCall={jest.fn()}
      />
    );

    expect(screen.getByText(/communication vidéo/i)).toBeInTheDocument();
    expect(screen.queryByText(/appel vidéo en cours/i)).not.toBeInTheDocument();
  });

  it('shows call buttons when not in a call', () => {
    render(
      <VideoChatTab
        isVideoCall={false}
        setIsVideoCall={jest.fn()}
      />
    );

    const startCallButton = screen.getByRole('button', { name: /démarrer l'appel vidéo/i });
    expect(startCallButton).toBeInTheDocument();
  });

  it('shows the active call UI when in a call', () => {
    render(
      <VideoChatTab
        isVideoCall={true}
        setIsVideoCall={jest.fn()}
      />
    );

    expect(screen.getByText(/appel vidéo en cours/i)).toBeInTheDocument();
    expect(screen.getByText(/durée/i)).toBeInTheDocument();
  });

  it('handles start call button click', () => {
    const setIsVideoCall = jest.fn();
    render(
      <VideoChatTab
        isVideoCall={false}
        setIsVideoCall={setIsVideoCall}
      />
    );

    const startCallButton = screen.getByRole('button', { name: /démarrer l'appel vidéo/i });
    fireEvent.click(startCallButton);
    expect(screen.getByText(/autorisation/i)).toBeInTheDocument();
  });
});
