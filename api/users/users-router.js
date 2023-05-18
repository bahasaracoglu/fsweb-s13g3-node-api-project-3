const express = require("express");
const userModel = require("../users/users-model");
const postsModel = require("../posts/posts-model");
const mw = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    const users = await userModel.get();
    res.json(users);
  } catch (error) {}
});

router.get("/:id", mw.validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try {
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateUser, async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    const insertedUser = await userModel.insert({ name: req.body.name });
    res.json(insertedUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.validateUserId, mw.validateUser, async (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    const updatedUSer = await userModel.update(req.params.id, {
      name: req.body.name,
    });
    res.json(updatedUSer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", mw.validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const deletedUser = await userModel.remove(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", mw.validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const userPosts = await postsModel.getById(req.params.id);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  mw.validateUserId,
  mw.validatePost,
  async (req, res, next) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const insertedPost = await postsModel.insert(req.body.text);
      res.json(insertedPost);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

// routerı dışa aktarmayı unutmayın
