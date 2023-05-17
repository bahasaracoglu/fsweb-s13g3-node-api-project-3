const userModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let timestamp = new Date().toLocaleString();
  let url = req.originalUrl;
  let method = req.method;
  console.log(`${timestamp} -- ${method} -- ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const user = await userModel.getById(req.params.id);
    if (!user) {
      res.status(404).json({ mesaj: "kullanıcı bulunamadı" });
    } else {
      req.currentUser = user; // burada currentUser yerine istediğini yazabilirsin. Amaç user'a zaten ulaştığımızdan DB'e tekrardan gidilmesini engellemek.
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { logger, validateUserId };
