import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

interface CountryCodeSelectProps {
  options: CountryCode[];
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export function CountryCodeSelect({ options, value, onChange, className = '' }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.code.includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.code === value) || options[0];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-3 border-r-2 border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{selectedOption.flag}</span>
        <span className="text-sm font-medium text-gray-700">{selectedOption.code}</span>
        <ChevronDown className={`size-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 top-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-2xl w-64 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 focus:outline-none text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="size-3 text-gray-400" />
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-64">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(option.code);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-indigo-50 transition-colors flex items-center gap-2 ${
                    value === option.code ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{option.flag}</span>
                  <span className="text-sm font-medium">{option.code}</span>
                  <span className="text-sm text-gray-600">{option.country}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
