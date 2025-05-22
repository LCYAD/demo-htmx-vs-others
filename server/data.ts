export type Attendance = {
  id: number
  name: string
  age: number
}

// Initial data
let attendances: Attendance[] = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 }
]

// Get all attendances
export const getAllAttendances = (): Attendance[] => attendances

// Get attendance by ID
export const getAttendanceById = (id: number): Attendance | undefined => {
  return attendances.find(attendance => attendance.id === id)
}

// Get next ID
const getNextId = (): number => {
  const maxId = attendances.reduce(
    (max, attendance) => Math.max(max, attendance.id),
    0
  )
  return maxId + 1
}

// Add new attendance
export const addAttendance = (name: string, age: number): Attendance => {
  const newAttendance: Attendance = {
    id: getNextId(),
    name,
    age
  }
  attendances.push(newAttendance)
  return newAttendance
}

// Update attendance
export const updateAttendance = (
  id: number,
  updates: Partial<Omit<Attendance, 'id'>>
): Attendance | undefined => {
  const index = attendances.findIndex(attendance => attendance.id === id)
  if (index === -1) return undefined

  attendances[index] = {
    ...attendances[index],
    ...updates
  }
  return attendances[index]
}

// Remove attendance
export const removeAttendance = (id: number): boolean => {
  const initialLength = attendances.length
  attendances = attendances.filter(attendance => attendance.id !== id)
  return attendances.length !== initialLength
}
