export async function json(req, res) {
  const buffers = []

  for await (const buffer of req) {
    buffers.push(buffer)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}
