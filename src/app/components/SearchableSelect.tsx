import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  showOther?: boolean;
  onOtherChange?: (value: string) => void;
  otherValue?: string;
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  showOther = true,
  onOtherChange,
  otherValue = '',
  id,
  onKeyDown,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allOptions = showOther && !options.includes('Others') 
    ? [...filteredOptions, 'Others'] 
    : filteredOptions;

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

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-gray-700 mb-2 font-medium text-sm">{label}</label>
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
        )}
        
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={onKeyDown}
          className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all bg-white text-left"
          aria-label={label}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
        </button>
        
        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
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
            {allOptions.length > 0 ? (
              allOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-indigo-50 transition-colors text-sm ${
                    value === option ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'
                  } ${option === 'Others' ? 'border-t border-gray-200 bg-gray-50' : ''}`}
                >
                  {option}
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

      {value === 'Others' && onOtherChange && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all mt-2"
          placeholder={`Enter your ${label.toLowerCase()}`}
          onKeyDown={onKeyDown}
          aria-label={`Other ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
}
