import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

export function AttendanceInput({
  onSubmit
}: {
  onSubmit: (name: string, age: number) => void
}) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && age) {
      onSubmit(name, parseInt(age))
      setName('')
      setAge('')
    }
  }

  return (
    <>
      <h2 className="text-center mb-4">Who is going to attend?</h2>
      <div
        style={{
          marginTop: '20px',
          height: '100px',
          border: '2px solid #dee2e6',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        <div style={{ padding: '20px' }}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ width: '30%', margin: '0px 10px', height: '30px' }}
              />
              <Form.Control
                type="number"
                placeholder="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                required
                style={{ width: '30%', margin: '0px 10px', height: '30px' }}
              />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  )
}
