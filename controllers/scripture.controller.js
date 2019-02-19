const Scripture = require('../models/scripture.model')

// TODO: check that next is working properly
// const next = (err) => {
//   console.err('error occured: ', err)
// }

exports.create = (req, res, next) => {
  const scripture = new Scripture({
    doc_id: req.body.doc_id,
    name: req.body.name,
    value: req.body.value
  })
  scripture.save(function (err) {
    if (err) return next(err)
    console.log('saved')
    res.send('Scripture created successfully')
  })
}

exports.getVerse = (req, res, next) => {
  const { doc_id, name } = req.body
  Scripture.findOne({ doc_id, name }, (err, verse) => {
    if (err) return next(err)
    res.send(verse)
  })
}

exports.updateVerse = (req, res, next) => {
  const { doc_id, name, value } = req.body
  Scripture.findOneAndUpdate({ doc_id, name }, { value }, (err, verse) => {
    if (err) return next(err)
    res.send('Verse updated!!')
  })
}

exports.deleteVerse = (req, res, next) => {
  Scripture.findOneAndRemove(req.body, (err) => {
    if (err) return next(err)
    res.send('Deleted successfully!')
  })
}