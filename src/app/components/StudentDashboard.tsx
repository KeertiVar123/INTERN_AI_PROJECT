import { FileCheck, Briefcase, Route, Target, Award, Download, Home, TrendingUp, AlertCircle } from 'lucide-react';

interface Internship {
  id: number;
  title: string;
  company: string;
  mode: string;
  deadline: string;
  duration: string;
  location: string;
  stipend: string;
  category: string;
  description: string;
  applyUrl: string;
  isNew: boolean;
  postedDate: string;
  icon: any;
  domains: string[];
  authenticityScore: number;
}

interface StudentDashboardProps {
  matchedInternships: Internship[];
  selectedDomains: string[];
  onNavigate: (page: string) => void;
}

export const StudentDashboard = ({ matchedInternships, selectedDomains, onNavigate }: StudentDashboardProps) => {
  
  // Calculate skill gaps
  const allRequiredSkills = [
    'Python Programming',
    'JavaScript',
    'Data Structures & Algorithms',
    'Machine Learning',
    'Web Development',
    'SQL & Databases',
    'Git & Version Control',
    'Cloud Computing',
    'Problem Solving',
    'Communication Skills'
  ];

  const currentSkills = ['Python Programming', 'Data Structures & Algorithms', 'Git & Version Control'];
  const skillGaps = allRequiredSkills.filter(skill => !currentSkills.includes(skill));

  return (
    <div className="min-h-screen px-4 py-20 relative">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Student Dashboard
          </h1>
          <p className="text-gray-700 text-center text-lg mb-4">Welcome back! Here's your personalized overview</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/80 backdrop-blur-md text-gray-800 rounded-xl border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all font-medium flex items-center gap-2"
          >
            <Home className="size-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="size-8" />
              <TrendingUp className="size-6 opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-1">{matchedInternships.length}</p>
            <p className="text-blue-100 text-sm">Matched Internships</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Target className="size-8" />
              <TrendingUp className="size-6 opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-1">{selectedDomains.length}</p>
            <p className="text-purple-100 text-sm">Selected Domains</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <Award className="size-8" />
              <TrendingUp className="size-6 opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-1">{currentSkills.length}</p>
            <p className="text-green-100 text-sm">Skills Acquired</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <AlertCircle className="size-8" />
              <TrendingUp className="size-6 opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-1">{skillGaps.length}</p>
            <p className="text-orange-100 text-sm">Skill Gaps</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Insights */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
                alt="Background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>
            <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileCheck className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Resume Insights</h2>
                <p className="text-sm text-gray-600">AI-powered analysis</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 mb-1">Strong Points</p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Well-structured education section</li>
                      <li>• Relevant technical skills highlighted</li>
                      <li>• Clean and professional formatting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">!</span>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900 mb-1">Areas for Improvement</p>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Add more quantified achievements</li>
                      <li>• Include relevant project links</li>
                      <li>• Expand work experience section</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                <p className="text-sm font-semibold text-indigo-900 mb-2">ATS Compatibility Score</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">85%</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
                alt="Background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>
            <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Target className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h2>
                <p className="text-sm text-gray-600">Skills to learn</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-600 mb-4">Based on your matched internships, consider learning:</p>
              {skillGaps.slice(0, 5).map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-orange-100">
                  <span className="font-medium text-gray-900 text-sm">{skill}</span>
                  <span className="text-xs px-3 py-1 bg-orange-500 text-white rounded-full font-semibold">
                    High Priority
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              View Learning Resources
            </button>
            </div>
          </div>

          {/* Career Roadmap Quick Access */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
                alt="Background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>
            <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Route className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Career Roadmap</h2>
                <p className="text-sm text-gray-600">Your personalized path</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">Selected Domains:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDomains.map((domain, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Foundation Skills (Weeks 1-4)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Intermediate Level (Weeks 5-8)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced Projects (Weeks 9-12)</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => onNavigate('career-roadmap')}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  View Full Roadmap
                </button>
                <button className="px-4 py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50 transition-all">
                  <Download className="size-5" />
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Skill Assessment */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
                alt="Background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>
            <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Award className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Skill Assessment</h2>
                <p className="text-sm text-gray-600">Test your knowledge</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm text-green-900 mb-3">Your Current Skills:</p>
                <div className="space-y-2">
                  {currentSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{skill}</span>
                      <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Ready to add more skills?</p>
                <p className="text-xs text-blue-800">Take skill assessments to verify your expertise and stand out to employers</p>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                Take Skill Assessment
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Matched Internships Section */}
        <div className="relative mt-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img
              src="https://i.pinimg.com/1200x/6f/00/21/6f0021c55d8d81220a757d696ad9d6e4.jpg"
              alt="Background"
              className="w-full h-full object-cover blur-sm"
            />
          </div>
          <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Matched Internships</h2>
                <p className="text-sm text-gray-600">{matchedInternships.length} opportunities waiting for you</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('matched-internships')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              View All Opportunities
            </button>
          </div>

          {matchedInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedInternships.slice(0, 3).map((internship) => (
                <div key={internship.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-1">{internship.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{internship.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-indigo-500 text-white rounded-full font-medium">
                      {internship.stipend}
                    </span>
                    <span className="text-xs text-gray-500">{internship.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No matched internships yet. Complete your profile to get personalized recommendations!</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
