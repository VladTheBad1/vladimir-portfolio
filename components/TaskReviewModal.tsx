'use client'

import { useState, useEffect } from 'react'
import { epicCelebration } from '@/lib/video-celebration'

interface Task {
  id: number;
  title: string;
  phase: string;
  timeEstimate: string;
  completed: boolean;
  reasoning: string;
  details: string;
  blockedBy: string;
  unlocks: string;
}

interface Project {
  name: string;
  goal: string;
  currentTaskIndex: number;
  tasks: Task[];
}

interface TaskReviewModalProps {
  project: Project;
  projectKey: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

export default function TaskReviewModal({ 
  project, 
  projectKey,
  isOpen, 
  onClose, 
  onSave 
}: TaskReviewModalProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (isOpen && project) {
      setTasks([...project.tasks])
      setSelectedTaskId(null)
      setEditingTask(null)
      setHasChanges(false)
    }
  }, [isOpen, project])

  if (!isOpen) return null

  // Filter tasks based on search and filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.phase.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) ||
                         (filter === 'incomplete' && !task.completed)
    return matchesSearch && matchesFilter
  })

  // Group tasks by phase
  const tasksByPhase = filteredTasks.reduce((acc, task) => {
    if (!acc[task.phase]) {
      acc[task.phase] = []
    }
    acc[task.phase].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const selectedTask = tasks.find(t => t.id === selectedTaskId)
  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  // Auto-save task updates
  const handleTaskUpdate = (taskId: number, field: keyof Task, value: any) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    )
    setTasks(updatedTasks)
    setHasChanges(true)
    
    // Update editing task if it's the one being edited
    if (editingTask?.id === taskId) {
      setEditingTask({ ...editingTask, [field]: value })
    }
  }

  const deleteTask = (taskId: number) => {
    if (confirm('Delete this task?')) {
      const updatedTasks = tasks
        .filter(task => task.id !== taskId)
        .map((task, index) => ({ ...task, id: index + 1 }))
      
      setTasks(updatedTasks)
      setHasChanges(true)
      
      if (selectedTaskId === taskId) {
        setSelectedTaskId(null)
        setEditingTask(null)
      }
    }
  }

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    setHasChanges(true)
  }

  const addNewTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: 'New Task',
      phase: 'New Phase',
      timeEstimate: '1 hour',
      completed: false,
      reasoning: 'Why this task matters',
      details: 'Task details here',
      blockedBy: 'Nothing',
      unlocks: 'Next steps'
    }
    setTasks([...tasks, newTask])
    setSelectedTaskId(newTask.id)
    setEditingTask(newTask)
    setHasChanges(true)
  }

  const saveAllChanges = () => {
    const updatedProject = { ...project, tasks }
    onSave(updatedProject)
    onClose()
  }

  const handleClose = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl w-full max-w-7xl h-[85vh] flex flex-col overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Task Editor</h2>
              <p className="text-gray-300 mt-1">{project.name} - {project.goal}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-green-400">✓ {completedCount} completed</span>
                <span className="text-yellow-400">○ {totalCount - completedCount} remaining</span>
                <span className="text-white">Total: {totalCount}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-300 text-2xl leading-none p-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Simplified Toolbar */}
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-4 flex-shrink-0">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-md bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded text-sm ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter('incomplete')}
              className={`px-3 py-1.5 rounded text-sm ${
                filter === 'incomplete' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              To Do ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded text-sm ${
                filter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>

          <div className="h-6 w-px bg-gray-600" />

          <button
            onClick={addNewTask}
            className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          
          {/* Task List (Left Side) */}
          <div className="w-1/2 overflow-y-auto border-r border-gray-700 bg-gray-850" style={{ maxHeight: 'calc(85vh - 200px)' }}>
            <div className="p-4 space-y-6">
              {Object.entries(tasksByPhase).map(([phase, phaseTasks]) => (
                <div key={phase}>
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3 sticky top-0 bg-gray-850 py-2 z-10">
                    {phase} ({phaseTasks.filter(t => t.completed).length}/{phaseTasks.length})
                  </h3>
                  <div className="space-y-2">
                    {phaseTasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => {
                          setSelectedTaskId(task.id)
                          setEditingTask(task)
                        }}
                        className={`group p-3 rounded-lg cursor-pointer transition-all ${
                          selectedTaskId === task.id 
                            ? 'bg-purple-900/30 border border-purple-500' 
                            : 'bg-gray-800 border border-gray-700 hover:bg-gray-750'
                        } ${task.completed ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleTaskCompletion(task.id)
                            }}
                            className="mt-0.5 w-4 h-4 rounded border-gray-600 text-green-500 focus:ring-green-500 bg-gray-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                              {task.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{task.timeEstimate}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteTask(task.id)
                            }}
                            className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity text-lg"
                            title="Delete task"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredTasks.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p>No tasks found</p>
                </div>
              )}
            </div>
          </div>

          {/* Task Details (Right Side) - Inline Editing */}
          <div className="w-1/2 overflow-y-auto bg-gray-850" style={{ maxHeight: 'calc(85vh - 200px)' }}>
            {editingTask ? (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">Task Details</h3>
                  <p className="text-xs text-gray-400 mt-1">Changes are saved automatically</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => handleTaskUpdate(editingTask.id, 'title', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phase</label>
                      <input
                        type="text"
                        value={editingTask.phase}
                        onChange={(e) => handleTaskUpdate(editingTask.id, 'phase', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Time Estimate</label>
                      <input
                        type="text"
                        value={editingTask.timeEstimate}
                        onChange={(e) => handleTaskUpdate(editingTask.id, 'timeEstimate', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Why This Matters</label>
                    <textarea
                      value={editingTask.reasoning}
                      onChange={(e) => handleTaskUpdate(editingTask.id, 'reasoning', e.target.value)}
                      rows={3}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Task Details</label>
                    <textarea
                      value={editingTask.details}
                      onChange={(e) => handleTaskUpdate(editingTask.id, 'details', e.target.value)}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Select a task to view and edit details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Simplified Footer */}
        <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-between items-center flex-shrink-0">
          <div className="text-sm text-gray-400">
            {hasChanges && <span className="text-yellow-400 mr-2">• Unsaved changes</span>}
            {filteredTasks.length} tasks shown
          </div>
          <button
            onClick={saveAllChanges}
            className={`px-6 py-2 rounded transition-all ${
              hasChanges 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!hasChanges}
          >
            {hasChanges ? 'Save & Close' : 'Close'}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

// Add custom scrollbar styles
const style = `
  .bg-gray-850 {
    background-color: rgb(24, 24, 27);
  }
  .bg-gray-750 {
    background-color: rgb(39, 39, 42);
  }
  
  /* Custom scrollbar */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgb(31, 31, 35);
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgb(75, 75, 80);
    border-radius: 4px;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 100, 105);
  }
`

if (typeof document !== 'undefined' && !document.getElementById('task-review-styles')) {
  const styleSheet = document.createElement('style')
  styleSheet.id = 'task-review-styles'
  styleSheet.textContent = style
  document.head.appendChild(styleSheet)
}