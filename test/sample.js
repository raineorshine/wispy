server.get((req, res) => {
  fs.readFile('myfile', 'utf-8', (err, text) => {
    if (err) {
      console.log('There was an error reading the file.')
      res.status(500).send(err)
    }
    else {
      console.log('The contents of your file are: \n' + text)
      res.status(200).send(text)
    }
  })
})
