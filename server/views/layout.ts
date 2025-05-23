import { html } from 'hono/html'

export const createLayoutTemplate = () => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Attendance App - HTMX Version</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://unpkg.com/htmx.org@2.0.4"
        integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
        crossorigin="anonymous"
      ></script>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          padding: 2rem;
          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        }
        .attendance-container {
          width: 800px;
          margin: 0 auto;
        }
        .attendance-table {
          width: 100%;
          border: 2px solid #dee2e6;
          border-radius: 10px;
          margin-top: 20px;
          padding: 20px;
        }
        .input-container {
          margin-top: 20px;
          height: 100px;
          border: 2px solid #dee2e6;
          border-radius: 10px;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="attendance-container">
        <h2 class="mb-4">Attendances</h2>

        <input
          class="form-control mb-3"
          type="text"
          name="search"
          placeholder="Filter by name"
          hx-get="/htmx/attendances"
          hx-trigger="keyup changed delay:2000ms"
          hx-target="#attendance-list"
        />

        <table
          class="table table-striped table-bordered hover attendance-table"
        >
          <thead>
            <tr>
              <th style="width: 40%; text-align: center">Name</th>
              <th style="width: 40%; text-align: center">Age</th>
              <th style="width: 20%"></th>
            </tr>
          </thead>
          <tbody
            id="attendance-list"
            hx-get="/htmx/attendances"
            hx-trigger="load"
            hx-target="#attendance-list"
          ></tbody>
        </table>

        <h2 class="mb-4">Who is going to attend?</h2>
        <div
          class="w-100"
          style="margin-top: 20px; height: 100px; border: 2px solid #dee2e6; border-radius: 10px; padding: 20px; width: 100%"
        >
          <form
            hx-post="/htmx/attendances"
            hx-target="#attendance-list"
            hx-swap="beforeend"
            class="d-flex gap-2 align-items-center w-100 mt-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              class="form-control flex-grow-1"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              class="form-control flex-grow-1"
              required
              min="0"
              max="120"
            />
            <button type="submit" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </body>
  </html>
`
