import { useState, useEffect } from 'react'
import { Container, Row, Col, FormControl } from 'react-bootstrap'
import { AttendanceInput } from './components/AttendanceInput'
import { AttendanceList } from './components/AttendanceList'
import type { Attendance } from '../../server/data'
import { hc } from 'hono/client'
import type { AppType } from '../../server'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const client = hc<AppType>('http://localhost:3000/')

function App() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [nameFilter, setNameFilter] = useState('')

  const fetchAttendances = async (filterValue?: string) => {
    try {
      // @ts-expect-error client is not typed
      const response = await client.api.attendances.$get({
        query: filterValue ? { name: filterValue } : undefined
      })
      const data = await response.json()
      setAttendances(data)
    } catch (error) {
      console.error('Error fetching attendances:', error)
    }
  }

  // Add debounced effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAttendances(nameFilter)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [nameFilter]) // Only re-run when nameFilter changes

  // Initial fetch
  useEffect(() => {
    fetchAttendances()
  }, [])

  const handleFilterChange = (value: string) => {
    setNameFilter(value)
  }

  const handleSubmit = async (name: string, age: number) => {
    try {
      // @ts-expect-error client is not typed
      const response = await client.api.attendances.$post({
        json: { name, age }
      })

      if (response.ok) {
        fetchAttendances()
      } else {
        const error = await response.json()
        console.log(error.error.issues[0].message)
        alert(error?.error?.issues[0]?.message ?? 'Failed to add attendance')
      }
    } catch (error) {
      console.error('Error adding attendance:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      // @ts-expect-error client is not typed
      const response = await client.api.attendances[':id'].$delete({
        param: { id: id }
      })

      if (response.ok) {
        setNameFilter('')
        fetchAttendances()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete attendance')
      }
    } catch (error) {
      console.error('Error deleting attendance:', error)
    }
  }

  const handleUpdate = async (id: number, name: string, age: number) => {
    try {
      // @ts-expect-error client is not typed
      const response = await client.api.attendances[':id'].$put({
        param: { id },
        json: { name, age }
      })

      if (response.ok) {
        fetchAttendances(nameFilter)
      } else {
        const error = await response.json()
        alert(error?.error?.issues?.[0]?.message ?? 'Failed to update attendance')
      }
    } catch (error) {
      console.error('Error updating attendance:', error)
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} style={{ width: '800px', height: '100vh' }}>
          <h2 className="mb-4">Attendances</h2>
          <FormControl
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={e => handleFilterChange(e.target.value)}
            className="mb-3"
          />
          <AttendanceList
            attendances={attendances}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
          <AttendanceInput onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
