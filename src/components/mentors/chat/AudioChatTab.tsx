
import React, { useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface AudioChatTabProps {
  mentorName: string;
  isAudioCall: boolean;
  isRecording: boolean;
  setIsAudioCall: (value: boolean) => void;
  setIsRecording: (value: boolean) => void;
}

const AudioChatTab: React.FC<AudioChatTabProps> = ({
  mentorName,
  isAudioCall,
  isRecording,
  setIsAudioCall,
  setIsRecording
}) => {
  const { t } = useLanguage();
  const [callDuration, setCallDuration] = useState(0);
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAudioCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAudioCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudioRecording = () => {
    if (isRecording) {
      // Stop recording logic
      setIsRecording(false);
      toast.info(t('chat.audio_recording_stopped'));
    } else {
      // Start recording logic
      setIsRecording(true);
      toast.info(t('chat.audio_recording_started'));
    }
  };

  const startAudioCall = () => {
    // Simulate audio call initialization
    setTimeout(() => {
      setIsAudioCall(true);
      toast.info(t('chat.audio_call_started'));
    }, 500);
  };

  const endAudioCall = () => {
    setIsAudioCall(false);
    toast.info(t('chat.audio_call_ended'));
  };

  return (
    <div className="flex-1 flex flex-col mt-2 space-y-4">
      <div className="flex-1 border rounded-md bg-gray-50 p-4 flex flex-col justify-center items-center">
        {isAudioCall ? (
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 relative">
              <Phone className="h-12 w-12 text-orange-500" />
              <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
            </div>
            <p className="text-lg font-medium mb-2">{t('chat.in_call_with')} {mentorName}</p>
            <p className="text-sm text-gray-500">{t('chat.audio_call_in_progress')}</p>
            <div className="mt-4 bg-gray-200 rounded-full px-4 py-1 inline-block">
              {formatDuration(callDuration)}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Mic className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg">{t('chat.start_audio_call')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('chat.or_record_message')}</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          onClick={isAudioCall ? endAudioCall : startAudioCall}
          variant={isAudioCall ? "destructive" : "secondary"}
          className="gap-2"
        >
          {isAudioCall ? (
            <>
              <PhoneOff className="h-4 w-4" />
              {t('chat.end_call')}
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              {t('chat.start_call')}
            </>
          )}
        </Button>
        
        <Button
          onClick={toggleAudioRecording}
          variant="outline"
          className={`gap-2 ${isRecording ? 'bg-red-100' : ''}`}
          disabled={isAudioCall}
        >
          {isRecording ? (
            <>
              <MicOff className="h-4 w-4" />
              {t('chat.stop_recording')}
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              {t('chat.record_message')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioChatTab;
