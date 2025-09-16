'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import {
  BookOpen,
  TrendingUp,
  BarChart3,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  Play,
  Lock,
  Award,
  Calendar,
  Users,
  Activity,
  Zap
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      const now = Date.now();

      if (sessionData.expiresAt > now) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('userSession');
        router.replace('/login');
        return;
      }
    } else {
      router.replace('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const modules: Module[] = [
    {
      id: 'trading-foundations',
      title: 'Trading Foundations',
      description: 'Master the fundamentals of trading including market basics, terminology, and essential concepts.',
      lessons: 8,
      duration: '3h 20m',
      completed: false,
      locked: false
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis Mastery',
      description: 'Learn chart patterns, indicators, and how to read market sentiment through price action.',
      lessons: 12,
      duration: '5h 45m',
      completed: false,
      locked: false
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      description: 'Protect your capital with proven risk management strategies and position sizing techniques.',
      lessons: 6,
      duration: '2h 30m',
      completed: false,
      locked: false
    },
    {
      id: 'trading-strategies',
      title: 'Proven Trading Strategies',
      description: 'Discover profitable trading strategies used by professional traders.',
      lessons: 10,
      duration: '4h 15m',
      completed: false,
      locked: true
    },
    {
      id: 'psychology',
      title: 'Trading Psychology',
      description: 'Master the mental game of trading and overcome emotional obstacles.',
      lessons: 7,
      duration: '3h 10m',
      completed: false,
      locked: true
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Trading Techniques',
      description: 'Advanced strategies for experienced traders including options and derivatives.',
      lessons: 9,
      duration: '4h 30m',
      completed: false,
      locked: true
    }
  ];

  const tradingFoundationsLessons: Lesson[] = [
    { id: '1', title: 'What is Trading?', duration: '25min', completed: false, locked: false },
    { id: '2', title: 'Market Types and Sessions', duration: '30min', completed: false, locked: false },
    { id: '3', title: 'Trading Terminology', duration: '20min', completed: false, locked: false },
    { id: '4', title: 'Order Types Explained', duration: '35min', completed: false, locked: false },
    { id: '5', title: 'Reading Market Data', duration: '28min', completed: false, locked: false },
    { id: '6', title: 'Brokers and Platforms', duration: '22min', completed: false, locked: true },
    { id: '7', title: 'Capital Requirements', duration: '18min', completed: false, locked: true },
    { id: '8', title: 'Creating Your Trading Plan', duration: '42min', completed: false, locked: true }
  ];

  const technicalAnalysisLessons: Lesson[] = [
    { id: '1', title: 'Introduction to Charts', duration: '30min', completed: false, locked: false },
    { id: '2', title: 'Support and Resistance', duration: '35min', completed: false, locked: false },
    { id: '3', title: 'Trend Analysis', duration: '28min', completed: false, locked: false },
    { id: '4', title: 'Candlestick Patterns', duration: '40min', completed: false, locked: false },
    { id: '5', title: 'Moving Averages', duration: '32min', completed: false, locked: false },
    { id: '6', title: 'RSI and Momentum Indicators', duration: '38min', completed: false, locked: true },
    { id: '7', title: 'MACD and Signal Lines', duration: '33min', completed: false, locked: true },
    { id: '8', title: 'Volume Analysis', duration: '29min', completed: false, locked: true },
    { id: '9', title: 'Fibonacci Retracements', duration: '36min', completed: false, locked: true },
    { id: '10', title: 'Multiple Timeframe Analysis', duration: '42min', completed: false, locked: true },
    { id: '11', title: 'Advanced Chart Patterns', duration: '45min', completed: false, locked: true },
    { id: '12', title: 'Technical Analysis in Practice', duration: '37min', completed: false, locked: true }
  ];

  const riskManagementLessons: Lesson[] = [
    { id: '1', title: 'Risk vs Reward', duration: '25min', completed: false, locked: false },
    { id: '2', title: 'Position Sizing', duration: '32min', completed: false, locked: false },
    { id: '3', title: 'Stop Loss Strategies', duration: '28min', completed: false, locked: false },
    { id: '4', title: 'Portfolio Diversification', duration: '35min', completed: false, locked: true },
    { id: '5', title: 'Managing Drawdowns', duration: '30min', completed: false, locked: true },
    { id: '6', title: 'Risk Management Tools', duration: '25min', completed: false, locked: true }
  ];

  const getLessonsForModule = (moduleId: string): Lesson[] => {
    switch (moduleId) {
      case 'trading-foundations':
        return tradingFoundationsLessons;
      case 'technical-analysis':
        return technicalAnalysisLessons;
      case 'risk-management':
        return riskManagementLessons;
      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">Trading Dashboard</h1>
              <p className="text-blue-100 text-xl">
                Welcome back! Continue your trading education journey.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Modules Completed</p>
                  <p className="text-2xl font-bold text-gray-900">0/6</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">12%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Completed</p>
                <p className="text-2xl font-bold text-gray-900">2.5h</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Achievements</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Trading Masterclass</h2>
                <p className="text-gray-600">
                  Complete trading education from beginner to advanced level
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className={`border rounded-lg transition-all ${
                        activeModule === module.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${
                              module.completed ? 'bg-green-100' : module.locked ? 'bg-gray-100' : 'bg-blue-100'
                            }`}>
                              {module.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : module.locked ? (
                                <Lock className="w-6 h-6 text-gray-400" />
                              ) : (
                                <Play className="w-6 h-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{module.title}</h3>
                              <p className="text-sm text-gray-600">{module.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-500">{module.lessons} lessons</span>
                                <span className="text-sm text-gray-500">{module.duration}</span>
                              </div>
                            </div>
                          </div>
                          {module.locked && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Locked
                            </span>
                          )}
                        </div>
                      </div>

                      {activeModule === module.id && !module.locked && (
                        <div className="border-t bg-gray-50 p-4">
                          <div className="space-y-3">
                            {getLessonsForModule(module.id).map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                  lesson.locked ? 'bg-gray-100' : 'bg-white border'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    lesson.completed ? 'bg-green-100' : lesson.locked ? 'bg-gray-100' : 'bg-blue-100'
                                  }`}>
                                    {lesson.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : lesson.locked ? (
                                      <Lock className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <Play className="w-4 h-4 text-blue-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className={`font-medium ${lesson.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                                  </div>
                                </div>
                                {!lesson.locked && (
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    {lesson.completed ? 'Review' : 'Start'}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trading Statistics */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Trading Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-semibold text-green-600">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Return</span>
                  <span className="font-semibold text-blue-600">+2.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Trades</span>
                  <span className="font-semibold text-gray-900">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk/Reward</span>
                  <span className="font-semibold text-purple-600">1:2.1</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Completed: What is Trading?</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Started: Market Types and Sessions</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Earned: First Lesson Badge</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">89 Active Traders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">156 Trades This Week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-600">23 Success Stories</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}