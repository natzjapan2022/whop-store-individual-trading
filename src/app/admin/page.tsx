"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  TrendingUp,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Home,
  Activity,
  X,
  LogOut,
  Columns
} from 'lucide-react'

interface Column {
  key: string
  label: string
  type: 'text' | 'email' | 'date' | 'select'
  options?: string[]
  required: boolean
}

interface User {
  id: string
  [key: string]: string | boolean | number
}

// Default columns structure
const defaultColumns = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'datePurchased', label: 'Date Purchased', type: 'date', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending'], required: true }
]

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [columns, setColumns] = useState(defaultColumns)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // New column form data
  const [newColumn, setNewColumn] = useState({
    key: '',
    label: '',
    type: 'text',
    options: '',
    required: false
  })

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated')
      const loginTime = localStorage.getItem('admin_login_time')

      // Check if session is valid (24 hours)
      if (isAuth === 'true' && loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime)
        const twentyFourHours = 24 * 60 * 60 * 1000

        if (timeDiff < twentyFourHours) {
          setIsAuthenticated(true)
          loadData()
        } else {
          // Session expired
          localStorage.removeItem('admin_authenticated')
          localStorage.removeItem('admin_login_time')
          router.push('/admin/login')
        }
      } else {
        router.push('/admin/login')
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // Load data from localStorage
  const loadData = () => {
    const savedUsers = localStorage.getItem('admin_users')
    const savedColumns = localStorage.getItem('admin_columns')

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }

    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    }
  }

  // Save data to localStorage
  const saveUsers = (updatedUsers: User[]) => {
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
  }

  const saveColumns = (updatedColumns: Column[]) => {
    localStorage.setItem('admin_columns', JSON.stringify(updatedColumns))
    setColumns(updatedColumns)
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_login_time')
    router.push('/admin/login')
  }

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Handle add/edit user
  const handleAddUser = () => {
    setEditingUser(null)
    const emptyFormData: Record<string, string | number | boolean> = { id: Date.now().toString() }
    columns.forEach(col => {
      emptyFormData[col.key] = ''
    })
    setFormData(emptyFormData)
    setShowUserModal(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({ ...user })
    setShowUserModal(true)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId)
      saveUsers(updatedUsers)
    }
  }

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? formData : user
      )
      saveUsers(updatedUsers)
    } else {
      // Add new user
      const newUser = { ...formData, id: Date.now() }
      saveUsers([...users, newUser])
    }

    setShowUserModal(false)
  }

  // Handle column management
  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newColumn.key || !newColumn.label) {
      alert('Column key and label are required')
      return
    }

    const columnData = {
      key: newColumn.key,
      label: newColumn.label,
      type: newColumn.type,
      required: newColumn.required,
      ...(newColumn.type === 'select' && { options: newColumn.options.split(',').map(opt => opt.trim()) })
    }

    const updatedColumns = [...columns, columnData]
    saveColumns(updatedColumns)

    // Update existing users to include new column
    const updatedUsers = users.map(user => ({
      ...user,
      [newColumn.key]: ''
    }))
    saveUsers(updatedUsers)

    setNewColumn({ key: '', label: '', type: 'text', options: '', required: false })
    setShowColumnModal(false)
  }

  const handleRemoveColumn = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey)
    if (column?.required) {
      alert('Cannot remove required columns')
      return
    }

    if (confirm('Are you sure you want to remove this column? This will delete all data in this column.')) {
      const updatedColumns = columns.filter(col => col.key !== columnKey)
      saveColumns(updatedColumns)

      // Remove column data from all users
      const updatedUsers = users.map(user => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [columnKey]: _removed, ...rest } = user
        return rest
      })
      saveUsers(updatedUsers)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev: Record<string, string | number | boolean>) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNewColumnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setNewColumn(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Individual Trading Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowColumnModal(true)}
              >
                <Columns className="h-4 w-4 mr-2" />
                Manage Columns
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-gray-600">
                Users in database
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.status === 'Active').length}
              </div>
              <p className="text-xs text-gray-600">
                Currently active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Columns</CardTitle>
              <Columns className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{columns.length}</div>
              <p className="text-xs text-gray-600">
                Custom fields
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage your users with custom fields and data storage
                </CardDescription>
              </div>
              <Button onClick={handleAddUser}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th key={column.key} className="text-left py-3 px-4 font-medium">
                        {column.label}
                      </th>
                    ))}
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      {columns.map((column) => (
                        <td key={column.key} className="py-3 px-4">
                          {column.key === 'status' ? (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user[column.key] === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : user[column.key] === 'Inactive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user[column.key] || 'N/A'}
                            </span>
                          ) : (
                            <span className="text-gray-900">{user[column.key] || 'N/A'}</span>
                          )}
                        </td>
                      ))}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500">
                        No users found. {users.length === 0 ? 'Add your first user!' : 'Try adjusting your search.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingUser ? 'Edit User' : 'Add New User'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                {columns.map((column) => (
                  <div key={column.key}>
                    <label className="text-sm font-medium mb-2 block">
                      {column.label} {column.required && <span className="text-red-500">*</span>}
                    </label>
                    {column.type === 'select' ? (
                      <select
                        name={column.key}
                        value={formData[column.key] || ''}
                        onChange={handleInputChange}
                        required={column.required}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <option value="">Select {column.label}</option>
                        {column.options?.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : column.type === 'textarea' ? (
                      <textarea
                        name={column.key}
                        value={formData[column.key] || ''}
                        onChange={handleInputChange}
                        required={column.required}
                        className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        rows={3}
                      />
                    ) : (
                      <Input
                        name={column.key}
                        type={column.type}
                        value={formData[column.key] || ''}
                        onChange={handleInputChange}
                        required={column.required}
                        placeholder={`Enter ${column.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
                <div className="flex space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUserModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingUser ? 'Update User' : 'Add User'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Column Management Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage Columns</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowColumnModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Add or remove columns from your user table
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Columns */}
              <div>
                <h3 className="text-lg font-medium mb-4">Current Columns</h3>
                <div className="space-y-2">
                  {columns.map((column) => (
                    <div key={column.key} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <span className="font-medium">{column.label}</span>
                        <span className="text-sm text-gray-500 ml-2">({column.type})</span>
                        {column.required && <span className="text-red-500 ml-1">*</span>}
                      </div>
                      {!column.required && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveColumn(column.key)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Column */}
              <div>
                <h3 className="text-lg font-medium mb-4">Add New Column</h3>
                <form onSubmit={handleAddColumn} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Column Key</label>
                      <Input
                        name="key"
                        value={newColumn.key}
                        onChange={handleNewColumnChange}
                        placeholder="e.g., phone, notes"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Column Label</label>
                      <Input
                        name="label"
                        value={newColumn.label}
                        onChange={handleNewColumnChange}
                        placeholder="e.g., Phone Number, Notes"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Field Type</label>
                    <select
                      name="type"
                      value={newColumn.type}
                      onChange={handleNewColumnChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="date">Date</option>
                      <option value="number">Number</option>
                      <option value="select">Select Dropdown</option>
                      <option value="textarea">Textarea</option>
                    </select>
                  </div>
                  {newColumn.type === 'select' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Options (comma-separated)</label>
                      <Input
                        name="options"
                        value={newColumn.options}
                        onChange={handleNewColumnChange}
                        placeholder="Option 1, Option 2, Option 3"
                        required
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="required"
                      name="required"
                      checked={newColumn.required}
                      onChange={handleNewColumnChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="required" className="text-sm font-medium">
                      Required field
                    </label>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Column
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}