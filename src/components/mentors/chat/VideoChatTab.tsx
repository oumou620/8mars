
import React, { useState, useEffect } from 'react';
import { Video, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface VideoChatTabProps {
  isVideoCall: boolean;
  setIsVideoCall: (value: boolean) => void;
}

const VideoChatTab: React.FC<VideoChatTabProps> = ({
  isVideoCall,
  setIsVideoCall
}) => {
  const { t } = useLanguage();
  const [callDuration, setCallDuration] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isVideoCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startVideoCall = () => {
    // Simulate video call initialization
    setTimeout(() => {
      setIsVideoCall(true);
      toast.info(t('chat.video_call_started'));
    }, 500);
  };

  const endVideoCall = () => {
    setIsVideoCall(false);
    toast.info(t('chat.video_call_ended'));
  };

  return (
    <div className="flex-1 flex flex-col mt-2 space-y-4">
      <div className="flex-1 border rounded-md bg-gray-50 flex flex-col justify-center items-center">
        {isVideoCall ? (
          <div className="w-full h-full relative">
            <div className="absolute top-0 right-0 m-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {t('chat.live')}
            </div>
            <div className="text-center flex items-center justify-center h-full">
              <Video className="h-24 w-24 text-gray-400" />
            </div>
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
              <div className="flex items-center justify-center h-full">
                <Video className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full">
              {formatDuration(callDuration)}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg">{t('chat.start_video_call')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('chat.video_call_description')}</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={isVideoCall ? endVideoCall : startVideoCall}
          variant={isVideoCall ? "destructive" : "secondary"}
          className="gap-2"
        >
          {isVideoCall ? (
            <>
              <VideoOff className="h-4 w-4" />
              {t('chat.end_video_call')}
            </>
          ) : (
            <>
              <Video className="h-4 w-4" />
              {t('chat.start_video_call_button')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoChatTab;
