
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface MentorsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const MentorsSearchBar = ({ searchTerm, setSearchTerm }: MentorsSearchBarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder={t('mentors.search')}
          className="pl-10 pr-4 py-2 border rounded-full w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        {t('mentors.filter')}
      </Button>
    </div>
  );
};

export default MentorsSearchBar;
