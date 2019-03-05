const Scripture = require('../models/scripture.model')

// TODO: check that next is working properly
// const next = (err) => {
//   console.err('error occured: ', err)
// }

exports.create = (req, res, next) => {
  const { doc_id, doc_name, value, image } = req.body
  const scripture = new Scripture({ doc_id, doc_name, value, image })
  // if (image) scripture.image = image
  scripture.save(function (err) {
    if (err) return next(err)
    console.log('saved')
    res.send('Scripture created successfully')
  })
}

exports.get = (req, res, next) => {
  const { doc_id, doc_name } = req.body
  Scripture.findOne({ doc_id, doc_name }, (err, verse) => {
    if (err) return next(err)
    res.send(verse)
  })
}

exports.update = (req, res, next) => {
  const { doc_id, doc_name, value, image } = req.body
  Scripture.findOneAndUpdate({ doc_id, doc_name }, { value, image }, (err, verse) => {
    if (err) return next(err)
    res.send('Verse updated!!')
  })
}

exports.delete = (req, res, next) => {
  // TODO: check permisstion first
  return
  const { doc_id, doc_name } = req.body
  // if (!(parseInt(doc_version, 10) >= 0)) return
  Scripture.findOneAndRemove(req.body, (err) => {
    if (err) return next(err)
    res.send('Deleted successfully!')
  })
}

exports.indexes = (req, res, next) => {
  if (!req.query.doc_id) {
    res.send('doc_id is requried')
    return
  }
  Scripture.find(req.query, (err, result) => {
    if (err) {
      return next(err)
    }
    console.log('result: ', result)
    res.send(result)
  })
}