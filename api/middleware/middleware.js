function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let timestamp = new Date().toLocaleString();
  let url = req.originalUrl;
  let method = req.method;
  console.log(`${timestamp} -- ${method} -- ${url}`);
  next();
}

function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { logger };
