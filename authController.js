const User = require('./User')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')

let currentUser = ''

class authController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Пароль должен быть не меньше 3 символов"})
            }
            console.log(req.body)
            const username = req.body.userName
            const password = req.body.password
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Пользователь с таким логином уже есть"})
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const user = new User({username, password: hashPassword})
            await user.save()
            return res.json({message: "Вы зарегистрированы"})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    
    async login(req, res){
        try{
            const username = req.body.userName2
            const password = req.body.password2
            currentUser = username
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: `Пароль неверен`})
            }
            if (req.url === '/login'){
                fs.readFile(path.join(__dirname, 'public', 'cab.html'), (err, data) => {
                    if(err){
                    }
                    res.end(data)
                })
            }

        } catch(e){
            console.log(e)
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res){
        try{
            if (req.url === '/'){
                fs.readFile(path.join(__dirname, 'public', 'main.html'), (err, data) => {
                    if(err){
                    }
                    res.end(data)
                })
            }
        } catch(e){
            
        }
    }

    async delUsers(req, res){
        try{
            await User.findOneAndDelete({currentUser})
            if (req.url === '/del'){
                fs.readFile(path.join(__dirname, 'public', 'main.html'), (err, data) => {
                    if(err){
                    }
                    res.end(data)
                })
            }
        } catch(e){
            
        }
    }
}

module.exports = new authController()