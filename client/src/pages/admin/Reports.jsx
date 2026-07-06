import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaFileExcel, FaDownload, FaCalendarAlt, FaChartBar } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState('this-week');

  const reports = [
    { id: 1, name: 'Task Completion Report', type: 'PDF', date: '2024-01-14', size: '2.4 MB' },
    { id: 2, name: 'Meeting Attendance Report', type: 'Excel', date: '2024-01-13', size: '1.8 MB' },
    { id: 3, name: 'Worker Performance Report', type: 'PDF', date: '2024-01-12', size: '3.1 MB' },
    { id: 4, name: 'Project Progress Report', type: 'Excel', date: '2024-01-11', size: '2.9 MB' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-white/60 mt-1">Generate and export reports</p>
      </div>

      {/* Report Generation */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-white/80 block mb-2">Report Type</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-field"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80 block mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-field"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80 block mb-2">Export Format</label>
            <div className="flex gap-2">
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                <FaFilePdf />
                PDF
              </button>
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                <FaFileExcel />
                Excel
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-2">
            <FaDownload />
            Generate Report
          </button>
        </div>
      </GlassCard>

      {/* Recent Reports */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      {report.type === 'PDF' ? 
                        <FaFilePdf className="text-white text-xl" /> : 
                        <FaFileExcel className="text-white text-xl" />
                      }
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{report.date}</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <FaDownload />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;