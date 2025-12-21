import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname);
    
    // Track user engagement
    trackUserEngagement();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track clicks
    trackClicks();
    
    // Track time on page
    const startTime = Date.now();
    return () => {
      const timeSpent = Date.now() - startTime;
      trackTimeOnPage(location.pathname, timeSpent);
    };
  }, [location]);

  // Function to track page views
  const trackPageView = (path: string) => {
    const analyticsData = {
      event: 'page_view',
      path,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      userAgent: navigator.userAgent,
    };

    // Send to localStorage for analytics
    sendAnalytics(analyticsData);
  };

  // Track user engagement (clicks, scrolls, etc.)
  const trackUserEngagement = () => {
    const events = ['click', 'scroll', 'mousemove', 'keydown'];
    
    const engagementTracker = () => {
      const engagementData = {
        event: 'user_engagement',
        timestamp: new Date().toISOString(),
        active: true,
      };
      sendAnalytics(engagementData);
    };

    // Debounced engagement tracking
    let timeout: NodeJS.Timeout;
    const debouncedEngagement = () => {
      clearTimeout(timeout);
      timeout = setTimeout(engagementTracker, 1000);
    };

    events.forEach(event => {
      window.addEventListener(event, debouncedEngagement);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, debouncedEngagement);
      });
    };
  };

  // Track scroll depth
  const trackScrollDepth = () => {
    let maxScroll = 0;
    
    const trackScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Record at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(Math.floor(scrollPercentage / 25) * 25)) {
          const scrollData = {
            event: 'scroll_depth',
            depth: Math.floor(scrollPercentage / 25) * 25,
            path: location.pathname,
            timestamp: new Date().toISOString(),
          };
          sendAnalytics(scrollData);
        }
      }
    };

    window.addEventListener('scroll', trackScroll);
    return () => window.removeEventListener('scroll', trackScroll);
  };

  // Track clicks on important elements
  const trackClicks = () => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Track project clicks
      const projectElement = target.closest('[data-project]');
      if (projectElement) {
        const project = projectElement.getAttribute('data-project');
        const clickData = {
          event: 'project_click',
          project,
          timestamp: new Date().toISOString(),
        };
        sendAnalytics(clickData);
      }
      
      // Track external link clicks
      const externalLink = target.closest('a[target="_blank"]');
      if (externalLink) {
        const link = externalLink.getAttribute('href');
        const linkData = {
          event: 'external_link_click',
          link,
          timestamp: new Date().toISOString(),
        };
        sendAnalytics(linkData);
      }
      
      // Track download clicks
      const downloadElement = target.closest('[data-download]');
      if (downloadElement) {
        const download = downloadElement.getAttribute('data-download');
        const downloadData = {
          event: 'download_click',
          file: download,
          timestamp: new Date().toISOString(),
        };
        sendAnalytics(downloadData);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  };

  // Track time on page
  const trackTimeOnPage = (path: string, timeSpent: number) => {
    const timeData = {
      event: 'time_on_page',
      path,
      timeSpent,
      timestamp: new Date().toISOString(),
    };
    sendAnalytics(timeData);
  };

  // Send analytics data to localStorage
  const sendAnalytics = (data: any) => {
    try {
      // Store in localStorage for batch sending
      const analyticsQueue = JSON.parse(localStorage.getItem('portfolio_analytics_queue') || '[]');
      analyticsQueue.push(data);
      
      // Keep only last 500 events to prevent localStorage overflow
      const trimmedQueue = analyticsQueue.slice(-500);
      localStorage.setItem('portfolio_analytics_queue', JSON.stringify(trimmedQueue));
      
      // Update summary stats
      updateAnalyticsSummary(data);
      
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // Update summary analytics
  const updateAnalyticsSummary = (data: any) => {
    try {
      const summary = JSON.parse(localStorage.getItem('portfolio_analytics_summary') || '{}');
      
      // Initialize summary if empty
      if (!summary.totalVisitors) summary.totalVisitors = 0;
      if (!summary.pageViews) summary.pageViews = 0;
      if (!summary.topPages) summary.topPages = {};
      if (!summary.devices) summary.devices = {};
      if (!summary.recentActivity) summary.recentActivity = [];
      
      // Update counts
      if (data.event === 'page_view') {
        summary.totalVisitors = (summary.totalVisitors || 0) + 1;
        
        // Track page views
        summary.pageViews = (summary.pageViews || 0) + 1;
        
        // Track top pages
        const page = data.path;
        summary.topPages[page] = (summary.topPages[page] || 0) + 1;
        
        // Track device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(data.userAgent);
        const deviceType = isMobile ? 'Mobile' : 'Desktop';
        summary.devices[deviceType] = (summary.devices[deviceType] || 0) + 1;
      }
      
      // Track recent activity (limit to last 10)
      if (['project_click', 'external_link_click', 'download_click'].includes(data.event)) {
        const activity = {
          action: data.event.replace('_', ' '),
          details: data.project || data.link || data.file,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString()
        };
        
        summary.recentActivity.unshift(activity);
        summary.recentActivity = summary.recentActivity.slice(0, 10);
      }
      
      localStorage.setItem('portfolio_analytics_summary', JSON.stringify(summary));
      
    } catch (error) {
      console.error('Summary update error:', error);
    }
  };

  // Send queued analytics periodically (optional - for future backend integration)
  useEffect(() => {
    const interval = setInterval(() => {
      const queue = JSON.parse(localStorage.getItem('portfolio_analytics_queue') || '[]');
      if (queue.length > 0) {
        // For now, just clear old data to prevent overflow
        // In future, you can send to your backend here
        if (queue.length > 1000) {
          localStorage.setItem('portfolio_analytics_queue', JSON.stringify(queue.slice(-500)));
        }
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return null; // This is a hidden component
};

export default Analytics;