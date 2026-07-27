import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFilePdf, 
  FaFileExcel, 
  FaDownload, 
  FaCalendarAlt, 
  FaChartBar,
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFilter,
  FaTimes,
  FaPrint,
  FaShare,
  FaEye,
  FaFileAlt,
  FaChartLine,
  FaUserCheck
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('this-week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('task');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Sample report data
  useEffect(() => {
    generateReportData();
  }, [dateRange]);

  const generateReportData = () => {
    // Sample data - in production, this would come from API
    const data = {
      summary: {
        totalTasks: 45,
        completedTasks: 28,
        inProgressTasks: 12,
        pendingTasks: 5,
        completionRate: 62,
        totalWorkers: 24,
        activeWorkers: 20,
        totalMeetings: 18,
        attendanceRate: 85
      },
      taskCompletion: [
        { name: 'Design', total: 12, completed: 8 },
        { name: 'Development', total: 18, completed: 10 },
        { name: 'Marketing', total: 8, completed: 6 },
        { name: 'HR', total: 5, completed: 3 },
        { name: 'Operations', total: 2, completed: 1 }
      ],
      workerPerformance: [
        { name: 'Ahmed Ali', tasks: 12, completed: 10, rate: 83 },
        { name: 'Fathima Noor', tasks: 15, completed: 8, rate: 53 },
        { name: 'Mohamed Rashid', tasks: 10, completed: 7, rate: 70 },
        { name: 'Sara Ahmed', tasks: 6, completed: 3, rate: 50 },
        { name: 'Ali Hassan', tasks: 20, completed: 15, rate: 75 }
      ],
      meetingAttendance: [
        { name: 'F3 Meeting', total: 10, present: 8, late: 1, absent: 1 },
        { name: 'EXCO Meeting', total: 8, present: 7, late: 1, absent: 0 }
      ]
    };
    setReportData(data);
  };

  const handleExportPDF = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('PDF report generated successfully!');
      setIsLoading(false);
    }, 1500);
  };

  const handleExportExcel = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Excel report generated successfully!');
      setIsLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getDateRangeLabel = () => {
    switch(dateRange) {
      case 'today': return 'Today';
      case 'this-week': return 'This Week';
      case 'this-month': return 'This Month';
      case 'custom': return `${startDate || 'Start'} - ${endDate || 'End'}`;
      default: return 'Custom Range';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'tasks', label: 'Tasks', icon: FaTasks },
    { id: 'workers', label: 'Workers', icon: FaUsers },
    { id: 'meetings', label: 'Meetings', icon: FaCalendarAlt }
  ];

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-white/40 text-sm">Generate and export reports</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handlePrint}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <FaPrint />
            Print
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isLoading}
            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm"
          >
            <FaFilePdf />
            {isLoading ? 'Generating...' : 'PDF'}
          </button>
          <button 
            onClick={handleExportExcel}
            disabled={isLoading}
            className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
          >
            <FaFileExcel />
            {isLoading ? 'Generating...' : 'Excel'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-white/30 text-sm" />
            <span className="text-white/60 text-sm">Date Range:</span>
          </div>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateRange === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-white/40">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-white/40 text-sm">
              {getDateRangeLabel()}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="text-sm" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold text-white">{reportData.summary.totalTasks}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <FaTasks className="text-blue-400 text-lg" />
                  </div>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{reportData.summary.completedTasks}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FaCheckCircle className="text-green-400 text-lg" />
                  </div>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold text-purple-400">{reportData.summary.completionRate}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FaChartLine className="text-purple-400 text-lg" />
                  </div>
                </div>
              </GlassCard>
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Attendance Rate</p>
                    <p className="text-2xl font-bold text-yellow-400">{reportData.summary.attendanceRate}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <FaUserCheck className="text-yellow-400 text-lg" />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4">Task Completion by Department</h3>
                <div className="space-y-3">
                  {reportData.taskCompletion.map((dept, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{dept.name}</span>
                        <span className="text-white">{dept.completed}/{dept.total}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${(dept.completed / dept.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-white font-medium mb-4">Worker Performance</h3>
                <div className="space-y-3">
                  {reportData.workerPerformance.map((worker, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{worker.name}</span>
                        <span className="text-white">{worker.rate}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${worker.rate}%`,
                            backgroundColor: worker.rate >= 70 ? '#10B981' : 
                                          worker.rate >= 50 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </>
        )}

        {activeTab === 'tasks' && (
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800/30">
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Department</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Completed</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">In Progress</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Pending</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.taskCompletion.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white">{dept.name}</td>
                      <td className="py-3 px-4 text-white/60">{dept.total}</td>
                      <td className="py-3 px-4 text-green-400">{dept.completed}</td>
                      <td className="py-3 px-4 text-blue-400">{dept.total - dept.completed}</td>
                      <td className="py-3 px-4 text-yellow-400">0</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          (dept.completed / dept.total) >= 0.7 ? 'bg-green-500/20 text-green-400' :
                          (dept.completed / dept.total) >= 0.4 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {Math.round((dept.completed / dept.total) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === 'workers' && (
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800/30">
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Worker</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tasks Assigned</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Completed</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Completion Rate</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.workerPerformance.map((worker, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white">{worker.name}</td>
                      <td className="py-3 px-4 text-white/60">{worker.tasks}</td>
                      <td className="py-3 px-4 text-green-400">{worker.completed}</td>
                      <td className="py-3 px-4 text-white">{worker.rate}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          worker.rate >= 70 ? 'bg-green-500/20 text-green-400' :
                          worker.rate >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {worker.rate >= 70 ? 'Excellent' :
                           worker.rate >= 50 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === 'meetings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportData.meetingAttendance.map((meeting, index) => (
              <GlassCard key={index}>
                <h3 className="text-white font-medium mb-4">{meeting.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Present</span>
                      <span className="text-green-400">{meeting.present}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full rounded-full bg-green-500 transition-all duration-500"
                        style={{ width: `${(meeting.present / meeting.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Late</span>
                      <span className="text-yellow-400">{meeting.late}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full rounded-full bg-yellow-500 transition-all duration-500"
                        style={{ width: `${(meeting.late / meeting.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Absent</span>
                      <span className="text-red-400">{meeting.absent}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full rounded-full bg-red-500 transition-all duration-500"
                        style={{ width: `${(meeting.absent / meeting.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Export Footer */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">Report generated: {format(new Date(), 'PPpp')}</span>
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/40 text-sm">Records: {reportData?.summary?.totalTasks || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportPDF}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-xs flex items-center gap-1"
            >
              <FaFilePdf className="text-xs" />
              PDF
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-xs flex items-center gap-1"
            >
              <FaFileExcel className="text-xs" />
              Excel
            </button>
            <button 
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
            >
              <FaPrint className="text-xs" />
              Print
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Reports;