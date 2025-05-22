import { Table, Button } from 'react-bootstrap'
import type { Attendance } from '../../../server/data'

export function AttendanceList({
  attendances,
  onDelete
}: {
  attendances: Attendance[]
  onDelete: (id: number) => void
}) {
  return (
    <Table
      striped
      bordered
      hover
      style={{
        width: '100%',
        border: '2px solid #dee2e6',
        marginTop: '20px'
      }}
    >
      <thead>
        <tr>
          <th style={{ width: '40%', textAlign: 'center' }}>Name</th>
          <th style={{ width: '40%', textAlign: 'center' }}>Age</th>
          <th style={{ width: '20%' }}></th>
        </tr>
      </thead>
      <tbody>
        {attendances.map(attendance => (
          <tr key={attendance.id}>
            <td style={{ textAlign: 'center' }}>{attendance.name}</td>
            <td style={{ textAlign: 'center' }}>{attendance.age}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(attendance.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
