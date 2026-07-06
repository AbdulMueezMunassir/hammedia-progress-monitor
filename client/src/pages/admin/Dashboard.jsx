import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTasks, FaCalendarCheck, FaClock, FaChartLine } from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard || { stats: {}, loading: false });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate recent activity
    setRecentActivity([
      { user: 'Ahmed', action: 'completed task', time: '2 min ago' },
      { user: 'Ali', action: 'updated progress', time: '15 min ago' },
      { user: 'Fathima', action: 'assigned new task', time: '1 hour ago' },
      { user: 'Mohamed', action: 'joined meeting', time: '3 hours ago' },
    ]);
  }, []);

  const statsData = [
    { label: 'Total Workers', value: stats?.totalWorkers || 24, icon: FaUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Tasks', value: stats?.activeTasks || 18, icon: FaTasks, color: 'from-purple-500 to-purple-600' },
    { label: 'Completed Tasks', value: stats?.completedTasks || 42, icon: FaCalendarCheck, color: 'from-green-500 to-green-600' },
    { label: 'Completion Rate', value: `${stats?.completionRate || 78}%`, icon: FaChartLine, color: 'from-orange-500 to-orange-600' },
  ];

  // Chart data
  const taskChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 15, 22, 28, 35],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Pending Tasks',
        data: [8, 12, 10, 15, 12, 8],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const attendanceChartData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b'],
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
      },
    ],
  };

  const performanceChartData = {
    labels: ['Ahmed', 'Ali', 'Fathima', 'Mohamed', 'Sara'],
    datasets: [
      {
        label: 'Task Completion',
        data: [85, 70, 90, 65, 80],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <GlassCard key={index} delay={index * 0.1}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">Task Completion Trend</h3>
          <Line data={taskChartData} options={chartOptions} />
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">Attendance Overview</h3>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Doughnut data={attendanceChartData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom',
                  },
                },
              }} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">Worker Performance</h3>
          <Bar data={performanceChartData} options={{
            ...chartOptions,
            indexAxis: 'y',
            plugins: {
              ...chartOptions.plugins,
              legend: {
                display: false,
              },
            },
          }} />
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-white/60 text-sm">{activity.action}</p>
                </div>
                <span className="text-white/40 text-sm">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;