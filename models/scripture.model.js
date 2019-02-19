const mongoose = require('mongoose')
const Schema = mongoose.Schema

// scriptures id: jj, dj, djs, jb ...
// language_codes: ko, en, de, zh ...
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// doc_id (partition_key): <scriptures_id>-<language_code>, book-index, comments, user, ...
// name: 3-2, 1-2-3, tcho, ...
const ScriptureSchema = new Schema({
    doc_id: { type: String, required: true },
    name: { type: String, required: true },

    value: { type: String, required: true }
})

module.exports = mongoose.model('Scripture', ScriptureSchema)


