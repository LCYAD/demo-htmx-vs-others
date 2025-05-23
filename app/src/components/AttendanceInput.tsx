import { useState } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'

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
      <h2 className="mb-4">Who is going to attend?</h2>
      <div
        style={{
          marginTop: '20px',
          height: '100px',
          border: '2px solid #dee2e6',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginTop: '10px'
          }}
        >
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ margin: '0px 10px' }}
            />
            <FormControl
              type="number"
              placeholder="Age"
              value={age}
              onChange={e => setAge(e.target.value)}
              required
              min={0}
              max={120}
              style={{ margin: '0px 10px' }}
            />
            <Button type="submit" variant="primary">
              Add
            </Button>
          </InputGroup>
        </Form>
      </div>
    </>
  )
}
