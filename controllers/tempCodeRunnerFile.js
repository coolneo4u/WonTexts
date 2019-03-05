const Scripture = require('../models/scripture.model')
  const req = { body: { doc_id: 'index-ko' } }
  Scripture.find(req.body, (err, result) => {
    if (err) {
      console.log('error: ', err)
      return next(err)
    }
    console.log('result: ', result)
  })