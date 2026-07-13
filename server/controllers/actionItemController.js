const ActionItem = require('../models/ActionItem');
const Meeting = require('../models/Meeting');
const User = require('../models/User');
const Department = require('../models/Department');

// Create action item
exports.createActionItem = async (req, res) => {
  try {
    const {
      date,
      description,
      ownerId,
      departmentId,
      deadlineDate,
      status,
      meetingType,
      escalateTo
    } = req.body;

    // Check if user has permission
    const user = req.user;
    const isAdmin = user.role === 'admin';
    const isManager = user.role === 'manager';
    
    // If not admin or manager, check if user belongs to the department
    if (!isAdmin && !isManager) {
      const userDept = await User.findById(user.id).populate('department');
      if (userDept.department?._id.toString() !== departmentId) {
        return res.status(403).json({ message: 'Not authorized to create action items for this department' });
      }
    }

    // Validate owner belongs to department
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    if (owner.department?.toString() !== departmentId) {
      return res.status(400).json({ message: 'Owner does not belong to the specified department' });
    }

    const actionItem = new ActionItem({
      date: date || new Date(),
      description,
      owner: ownerId,
      department: departmentId,
      deadlineDate,
      status: status || 'not-started',
      meetingType,
      escalatedTo: escalateTo || 'none',
      createdBy: user.id,
      week: getWeekNumber(date || new Date()),
      year: new Date(date || new Date()).getFullYear()
    });

    await actionItem.save();

    // Populate for response
    await actionItem.populate('owner', 'name email');
    await actionItem.populate('department', 'name code');
    await actionItem.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: actionItem
    });
  } catch (error) {
    console.error('Create action item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update action item
exports.updateActionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    const actionItem = await ActionItem.findById(id);
    if (!actionItem) {
      return res.status(404).json({ message: 'Action item not found' });
    }

    // Check permission
    const isAdmin = user.role === 'admin';
    const isManager = user.role === 'manager';
    const isOwner = actionItem.owner.toString() === user.id;
    const userDept = await User.findById(user.id).populate('department');
    const isSameDept = userDept.department?._id.toString() === actionItem.department.toString();

    if (!isAdmin && !isManager && !isOwner && !isSameDept) {
      return res.status(403).json({ message: 'Not authorized to update this action item' });
    }

    // Only allow status updates if not admin
    if (!isAdmin && !isManager) {
      // Non-admin can only update status and comments
      const allowedUpdates = ['status', 'progress', 'comments'];
      const requestedUpdates = Object.keys(updates);
      const isValid = requestedUpdates.every(key => allowedUpdates.includes(key));
      
      if (!isValid) {
        return res.status(403).json({ message: 'You can only update status, progress, and comments' });
      }
    }

    // Handle escalation
    if (updates.escalateTo && updates.escalateTo !== 'none') {
      // Only managers and admins can escalate
      if (!isAdmin && !isManager) {
        return res.status(403).json({ message: 'Only managers and admins can escalate action items' });
      }
      
      actionItem.escalatedTo = updates.escalateTo;
      
      // Find the appropriate meeting to escalate to
      const meetingType = updates.escalateTo === 'EXCO' ? 'F3' : 'EXCO';
      // Here you would send notification to the meeting participants
    }

    // Update fields
    Object.keys(updates).forEach(key => {
      if (key !== 'escalateTo' && key !== '_id' && key !== 'createdAt') {
        actionItem[key] = updates[key];
      }
    });

    actionItem.updatedBy = user.id;
    actionItem.updatedAt = new Date();
    await actionItem.save();

    await actionItem.populate('owner', 'name email');
    await actionItem.populate('department', 'name code');
    await actionItem.populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: actionItem
    });
  } catch (error) {
    console.error('Update action item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get action items by week and department
exports.getActionItems = async (req, res) => {
  try {
    const { departmentId, week, year, status, meetingType } = req.query;
    const user = req.user;
    
    let query = { isActive: true };
    
    if (departmentId) {
      query.department = departmentId;
    } else if (user.role !== 'admin' && user.role !== 'manager') {
      const userDept = await User.findById(user.id).populate('department');
      query.department = userDept.department?._id;
    }
    
    if (week) {
      query.week = week;
    }
    
    if (year) {
      query.year = parseInt(year);
    }
    
    if (status) {
      query.status = status;
    }
    
    if (meetingType) {
      query.meetingType = meetingType;
    }

    const actionItems = await ActionItem.find(query)
      .populate('owner', 'name email')
      .populate('department', 'name code')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: actionItems
    });
  } catch (error) {
    console.error('Get action items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get action items by meeting
exports.getActionItemsByMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const actionItems = await ActionItem.find({
      _id: { $in: meeting.actionItems },
      isActive: true
    }).populate('owner', 'name email')
      .populate('department', 'name code');

    res.json({
      success: true,
      data: actionItems
    });
  } catch (error) {
    console.error('Get meeting action items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Escalate action item
exports.escalateActionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { escalateTo, reason } = req.body;
    const user = req.user;

    if (!['F3', 'EXCO', 'none'].includes(escalateTo)) {
      return res.status(400).json({ message: 'Invalid escalation target' });
    }

    const actionItem = await ActionItem.findById(id);
    if (!actionItem) {
      return res.status(404).json({ message: 'Action item not found' });
    }

    // Check if user has permission to escalate
    const isAdmin = user.role === 'admin';
    const isManager = user.role === 'manager';

    if (!isAdmin && !isManager) {
      return res.status(403).json({ message: 'Only managers and admins can escalate action items' });
    }

    actionItem.escalatedTo = escalateTo;
    actionItem.escalateReason = reason || '';
    actionItem.updatedBy = user.id;
    actionItem.updatedAt = new Date();
    await actionItem.save();

    // Create notification for the other meeting type
    const targetMeetingType = escalateTo;
    // Here you would notify the meeting participants

    res.json({
      success: true,
      message: `Action item escalated to ${escalateTo}`,
      data: actionItem
    });
  } catch (error) {
    console.error('Escalate action item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}