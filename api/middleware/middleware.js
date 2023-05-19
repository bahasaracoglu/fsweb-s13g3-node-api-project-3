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
      res.status(404).json({ message: "not found" });
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
  let { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const post = req.body.text;
  try {
    if (!post) {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    } else {
      req.newPost = post;
      next();
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { logger, validateUserId, validateUser, validatePost };
