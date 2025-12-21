import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Eye, MousePointer, Clock, TrendingUp, 
  BarChart3, Globe, Smartphone, Download 
} from 'lucide-react';

// Define proper TypeScript interfaces
interface PageView {
  page: string;
  views: number;
}

interface Device {
  device: string;
  percentage: number;
}

interface Location {
  country: string;
  visitors: number;
}

interface Activity {
  action: string;
  project?: string;
  email?: string;
  time: string;
}

interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  avgTimeOnSite: number;
  bounceRate: number;
  topPages: PageView[];
  devices: Device[];
  locations: Location[];
  recentActivity: Activity[];
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    pageViews: 0,
    avgTimeOnSite: 0,
    bounceRate: 0,
    topPages: [],
    devices: [],
    locations: [],
    recentActivity: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics from localStorage or your backend
    const fetchAnalytics = () => {
      setIsLoading(true);
      
      // Get from localStorage (mock data for demo)
      const storedAnalytics = localStorage.getItem('portfolio_analytics');
      
      if (storedAnalytics) {
        try {
          setAnalytics(JSON.parse(storedAnalytics));
        } catch (error) {
          console.error('Error parsing analytics data:', error);
          loadMockData();
        }
      } else {
        loadMockData();
      }
      
      setIsLoading(false);
    };

    // Mock data function
    const loadMockData = () => {
      setAnalytics({
        totalVisitors: 1247,
        pageViews: 5432,
        avgTimeOnSite: 182, // seconds
        bounceRate: 32.5, // percentage
        topPages: [
          { page: '/', views: 1247 },
          { page: '/#projects', views: 892 },
          { page: '/#ai-features', views: 654 },
          { page: '/#contact', views: 543 }
        ],
        devices: [
          { device: 'Desktop', percentage: 58 },
          { device: 'Mobile', percentage: 35 },
          { device: 'Tablet', percentage: 7 }
        ],
        locations: [
          { country: 'India', visitors: 45 },
          { country: 'USA', visitors: 22 },
          { country: 'Germany', visitors: 12 },
          { country: 'UK', visitors: 8 },
          { country: 'Other', visitors: 13 }
        ],
        recentActivity: [
          { action: 'Project viewed', project: 'AI Email Responder', time: '2 mins ago' },
          { action: 'Contact form submitted', email: 'john@example.com', time: '15 mins ago' },
          { action: 'Resume downloaded', time: '1 hour ago' },
          { action: 'GitHub clicked', time: '2 hours ago' }
        ]
      });
    };

    fetchAnalytics();
    const interval = window.setInterval(fetchAnalytics, 30000); // Update every 30 seconds

    return () => window.clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Users />,
      label: 'Total Visitors',
      value: analytics.totalVisitors.toLocaleString(),
      change: '+12%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Eye />,
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      change: '+8%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Clock />,
      label: 'Avg. Time',
      value: `${Math.floor(analytics.avgTimeOnSite / 60)}m ${analytics.avgTimeOnSite % 60}s`,
      change: '+5%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MousePointer />,
      label: 'Bounce Rate',
      value: `${analytics.bounceRate}%`,
      change: '-3%',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Portfolio Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Real-time insights about your portfolio visitors</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live data</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white w-5 h-5 sm:w-6 sm:h-6">{stat.icon}</div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                stat.change.startsWith('+') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
            <TrendingUp className="mr-2 text-primary-600 w-5 h-5 sm:w-6 sm:h-6" />
            Top Pages
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1 mr-4">
                  <span className="text-gray-400 mr-2 sm:mr-3 text-sm">#{index + 1}</span>
                  <span className="font-medium text-sm sm:text-base truncate">{page.page}</span>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <div className="w-20 sm:w-24 lg:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2 sm:mr-3">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      style={{ 
                        width: `${analytics.topPages[0]?.views ? (page.views / analytics.topPages[0].views) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
            <Smartphone className="mr-2 text-secondary-600 w-5 h-5 sm:w-6 sm:h-6" />
            Device Distribution
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics.devices.map((device, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1 items-center">
                  <div className="flex items-center">
                    {device.device === 'Desktop' && <span className="mr-2">💻</span>}
                    {device.device === 'Mobile' && <span className="mr-2">📱</span>}
                    {device.device === 'Tablet' && <span className="mr-2">📟</span>}
                    <span className="text-sm sm:text-base">{device.device}</span>
                  </div>
                  <span className="font-semibold text-sm sm:text-base">{device.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      device.device === 'Desktop' ? 'bg-blue-500' :
                      device.device === 'Mobile' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Locations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
            <Globe className="mr-2 text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
            Visitor Locations
          </h3>
          <div className="space-y-3">
            {analytics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <span className="text-lg mr-2 sm:mr-3">
                    {location.country === 'India' && '🇮🇳'}
                    {location.country === 'USA' && '🇺🇸'}
                    {location.country === 'Germany' && '🇩🇪'}
                    {location.country === 'UK' && '🇬🇧'}
                    {location.country === 'Other' && '🌍'}
                  </span>
                  <span className="text-sm sm:text-base truncate">{location.country}</span>
                </div>
                <div className="flex items-center flex-shrink-0 ml-2">
                  <div className="w-16 sm:w-20 lg:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2 sm:mr-3">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      style={{ width: `${location.visitors}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">{location.visitors}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
            <BarChart3 className="mr-2 text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
            Recent Activity
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">
                  {activity.action.includes('Project') && <Eye size={14} className="sm:w-4 sm:h-4 text-blue-500" />}
                  {activity.action.includes('Contact') && <MousePointer size={14} className="sm:w-4 sm:h-4 text-green-500" />}
                  {activity.action.includes('Resume') && <Download size={14} className="sm:w-4 sm:h-4 text-purple-500" />}
                  {activity.action.includes('GitHub') && <TrendingUp size={14} className="sm:w-4 sm:h-4 text-orange-500" />}
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <div className="font-medium text-sm sm:text-base truncate">{activity.action}</div>
                  {activity.project && (
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      Project: {activity.project}
                    </div>
                  )}
                  {activity.email && (
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      Email: {activity.email}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(analytics, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            document.body.appendChild(linkElement);
            linkElement.click();
            document.body.removeChild(linkElement);
          }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center min-h-[44px] w-full sm:w-auto"
        >
          <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Export Analytics Data</span>
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;