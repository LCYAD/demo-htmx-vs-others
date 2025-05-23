import { html } from 'hono/html'
import type { Attendance } from '../data'

export const createAttendanceRowTemplate = (attendance: Attendance) => html`
  <tr>
    <td style="text-align: center">${attendance.name}</td>
    <td style="text-align: center">${attendance.age}</td>
    <td style="text-align: center">
      <button
        class="btn btn-danger btn-sm"
        hx-delete="/htmx/attendances/${attendance.id}"
        hx-target="closest tr"
        hx-swap="outerHTML"
      >
        Delete
      </button>
    </td>
  </tr>
`
