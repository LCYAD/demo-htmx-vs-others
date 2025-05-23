import { Table, Button, FormControl } from 'react-bootstrap'
import type { Attendance } from '../../../server/data'
import { useState } from 'react'

type EditingAttendance = {
  id: number
  name: string
  age: string
}

export function AttendanceList({
  attendances,
  onDelete,
  onUpdate
}: {
  attendances: Attendance[]
  onDelete: (id: number) => void
  onUpdate: (id: number, name: string, age: number) => void
}) {
  const [editingAttendance, setEditingAttendance] = useState<EditingAttendance | null>(null)

  const handleEdit = (attendance: Attendance) => {
    setEditingAttendance({
      id: attendance.id,
      name: attendance.name,
      age: attendance.age.toString()
    })
  }

  const handleCancel = () => {
    setEditingAttendance(null)
  }

  const handleConfirm = () => {
    if (editingAttendance) {
      const age = parseInt(editingAttendance.age)
      if (!isNaN(age)) {
        onUpdate(editingAttendance.id, editingAttendance.name, age)
        setEditingAttendance(null)
      }
    }
  }

  return (
    <Table
      striped
      bordered
      hover
      style={{
        width: '100%',
        border: '2px solid #dee2e6',
        borderRadius: '10px',
        marginTop: '20px',
        padding: '20px'
      }}
    >
      <thead>
        <tr>
          <th style={{ width: '35%', textAlign: 'center' }}>Name</th>
          <th style={{ width: '35%', textAlign: 'center' }}>Age</th>
          <th style={{ width: '30%' }}></th>
        </tr>
      </thead>
      <tbody>
        {attendances.map(attendance => (
          <tr key={attendance.id}>
            <td style={{ textAlign: 'center' }}>
              {editingAttendance?.id === attendance.id ? (
                <FormControl
                  type="text"
                  value={editingAttendance.name}
                  onChange={e =>
                    setEditingAttendance({
                      ...editingAttendance,
                      name: e.target.value
                    })
                  }
                  required
                />
              ) : (
                attendance.name
              )}
            </td>
            <td style={{ textAlign: 'center' }}>
              {editingAttendance?.id === attendance.id ? (
                <FormControl
                  type="number"
                  value={editingAttendance.age}
                  onChange={e =>
                    setEditingAttendance({
                      ...editingAttendance,
                      age: e.target.value
                    })
                  }
                  required
                  min={0}
                  max={120}
                />
              ) : (
                attendance.age
              )}
            </td>
            <td style={{ textAlign: 'center' }}>
              {editingAttendance?.id === attendance.id ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleConfirm}
                    className="me-2"
                  >
                    Confirm
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(attendance)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(attendance.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
