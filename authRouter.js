const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('password', 'Пароль должен быть не меньше 3 символов').isLength({min:3, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/', controller.getUsers)
router.get('/del', controller.delUsers)

module.exports = router