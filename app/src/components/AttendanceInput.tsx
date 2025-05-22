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
    <div>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Form.Control
            type="number"
            placeholder="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
          <Button type="submit" variant="primary">
            Add
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}
