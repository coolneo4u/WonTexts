const mongoose = require('mongoose')
const Schema = mongoose.Schema

// scriptures id: jj, dj, djs, jb ...
// language_codes: ko, en, de, zh ...
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// doc_id (partition_key): <scriptures_id>-<language_code>, book-index, comments, user, ...
// doc_name: jj-3-2, jj-1-2-3, tcho, ...
// dov_version: -1 (original), 0 (current), 1,2,3 ...
const ScriptureSchema = new Schema({
    doc_id: { type: String, required: true },
    doc_name: { type: String, required: true },
    // doc_version: { type: Number, required: false },  
    value: { type: String, required: true },
    image: { type: String, required: false }
})

module.exports = mongoose.model('Scripture', ScriptureSchema)


