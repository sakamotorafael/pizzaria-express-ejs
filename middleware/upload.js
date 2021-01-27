const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/')
  },
  filename: function (req, file, cb) {
    let filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    req.body.imagem = '/img/' + filename
    cb(null, filename)
  }
})
 
const upload = multer({ storage: storage })

module.exports = upload