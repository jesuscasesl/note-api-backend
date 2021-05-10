let notes = [
  {
    id: 1,
    content: 'Note 1',
    date: '2021-01-01',
    important: true
  }, {
    id: 2,
    content: 'Note 2',
    date: '2021-02-01',
    important: false
  }, {
    id: 3,
    content: 'Note 3',
    date: '2021-03-01',
    important: true
  }
]

// HTTP
// const http = require('http')
// const app = http.createServer((request, response) => {
// response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server Port: ${PORT}`)

const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

// app.get('/', (request, response) => {
//   response.send('<h1>Hello Wold</h1>')
// })

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const note = notes.find(note => note.id === parseInt(id))
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  console.log(notes)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const noteBody = request.body
  if (!noteBody || !noteBody.content) {
    console.log('a')
    return response.status(400).json({
      error: 'No has enviado el contenido'
    })
  } else {
    const idsList = notes.map(note => note.id)
    const idMax = Math.max(...idsList)

    const newNote = {
      // id: notes.length + 1,
      id: idMax + 1,
      content: noteBody.content,
      date: new Date().toISOString(),
      important: typeof noteBody.important !== 'undefined' ? noteBody.important : false
    }
    notes = [...notes, newNote]
    response.status(201).json(newNote)
  }
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server Port: ${PORT}`)
})
