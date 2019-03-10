var fs = require('fs')
const scriptures = require('./scriptures.json')
const bookIndexes = require('./book_index.json')
const logs = []
const docNames = []
const indexes = []

const getBookName = scripture => {
  let theIndex
  for (let index of bookIndexes) {
    if (index.ZLANGUAGE === scripture.ZLANGUAGE && index.ZLINK === scripture.ZBOOK) theIndex = index
  }
  if (theIndex) return theIndex.ZBOOK
  else {
    console.log('none: ', scripture.ZLANGUAGE, scripture.ZBOOK)
  }
}

// const bookName = getBookName(scriptures[100])
// console.log('TCL: bookName', bookName)
// return

const convertedScriptures = scriptures.map(s => {
  let { ZID } = s
  const replaceKeys = [
    ['한울안 한이치에-', 'hh-'],
    ['정전-', 'jj-'],
    ['대종경-', 'dj-'],
    ['불조요경-', 'bj-'],
    ['정산종사법어-', 'jb-'],
    ['예전-', 'yj-'],
    ['성가-', 'sg-'],
    ['대종경선외록-', 'djs-'],
    ['대산종사법어-', 'db-'],
    ['대산종사법문집 제1집-', 'db1-'],
    ['대산종사법문집 제2집-', 'db2-'],
    ['대산종사법문집 제3집-', 'db3-'],
    ['대산종사법문집 제4집-', 'db4-'],
    ['대산종사법문집 제5집-', 'db5-'],
    ['독경집-', 'dk-'],
    ['교사-', 'ks-'],
    ['교헌-', 'kh-']
  ]
  for (const key of replaceKeys) {
    ZID = ZID.replace(key[0], key[1])
  }
  const keyStrings = replaceKeys.map(k => k[1])
  if (!keyStrings.includes(`${ZID.split('-')[0]}-`)) console.log('check: ', ZID)
  // ZID = ZID.replace(/(-0){1,}/, '')

  s.doc_name = ZID
  const locale = s.ZLANGUAGE
  const [book, section, t1, t2] = ZID.split('-')
  const book_id = `${book}-${locale}`
  s.doc_id = `verse-${book_id}`
  s.value = s.ZTEXT
  // s.doc_version = -1
  if (s.ZIMAGE) s.image = s.ZIMAGE

  const index_doc_id = `index-${locale}`
  const index_doc_name = book
  let the_index
  for (const i of indexes) {
    if (i.doc_id === index_doc_id && i.doc_name === index_doc_name) {
      the_index = i
    }
  }
  if (!the_index) {
    the_index = {}
    the_index.doc_id = index_doc_id
    the_index.doc_name = index_doc_name
    indexes.push(the_index)
  }

  // logs.push(`${book}-${section}-${t1}-${t2}`)
  the_index[book] = getBookName(s)
  the_index[[book, section].join('-')] = s.ZSECTIONSTRING

  const titleIndex = [book, section, t1].join('-')
  const title2Index = [book, section, t1, t2].join('-')
  if (s.ZTITLE) {
    the_index[titleIndex] = s.ZTITLE
    s.doc_name = titleIndex
  } else {
    s.doc_name = [book, section].join('-')
    // if (s.ZID.split('-').length > 2) logs.push('check ZID: ', s.ZID)
  }
  if (s.ZTITLE2) {
    the_index[title2Index] = s.ZTITLE2
    s.doc_name = title2Index
  } else {
    // if (s.ZID.split('-').length > 3) logs.push('check ZID: ', s.ZID)
  }

  // delete unnecessary keys
  const toDeleteKeys = [
    'Z_ENT',
    'Z_OPT',
    'Z_PK',
    'ZBOOK',
    'ZID',
    'ZCHAPTER',
    'ZLANGUAGE',
    'ZSECTION',
    'ZSECTIONSTRING',
    'ZTITLE',
    'ZTITLE2',
    'ZVERSE',
    'ZFAVORITE',
    'ZTEXT',
    'ZIMAGE'
  ]

  if (s.ZIMAGE) {
    if (s.ZIMAGE && s.ZTEXT) {
      logs.push('has image and text together: ', s.ZID)
    }
  } else {
    toDeleteKeys.push('ZIMAGE')
  }

  for (const key of toDeleteKeys) {
    delete s[key]
  }
  //
  const docNameToCheck = `${s.doc_name}-${locale}`
  if (docNames.includes(docNameToCheck)) {
    logs.push('DUPLICATED DOC_NAME: ', s.doc_name)
  } else {
    docNames.push(docNameToCheck)
  }

  return s
})

for (const index of indexes) {
  const { doc_id, doc_name } = index
  const index_value = { ...index }
  for (const key of ['doc_id', 'doc_name']) {
    delete index_value[key]
  }
  const new_index = { doc_id, doc_name, value: JSON.stringify(index_value) }
  convertedScriptures.push(new_index)
}

fs.writeFile('./data/convertedScriptures.json', JSON.stringify(convertedScriptures, null, 2), 'utf-8', () => {
  console.log('convertedScriptures saved')
})
// fs.writeFile('./data/indexes.json', JSON.stringify(indexes, null, 2) , 'utf-8', () => {
//   console.log('indexes saved')
// })
fs.writeFile('./data/logs.json', JSON.stringify(logs, null, 2), 'utf-8', () => {
  console.log('logs saved')
})
