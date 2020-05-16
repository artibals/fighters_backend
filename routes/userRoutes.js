const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const fs = require('fs')
const userInfo = require('../models/user');



const router = Router();

// TODO: Implement route controllers for user
router.get('/api/users', (req, res) => {
    let users = fs.readFileSync(userInfo);
    
    res.send(users);
})

router.get('/api/users/:id', (req, res) => {
    let id = req.params.id; 
    let users = fs.readFileSync(userInfo, "utf8");
    let user = null

    for(let i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
})

router.post('/api/users', (req, res) => {
    if(!req.body) return res.sendStatus(400);
     
    let userName = req.body.name;
    let userlastName = req.body.lastName;
    let userEmail = req.body.email;
    let userPhoneNumber = req.body.phoneNumber;
    let userPassword = req.body.password;

    let user = {name: userName, 
        lastName: userlastName, 
        email: userEmail,
        phoneNumber: userPhoneNumber, 
        password: userPassword
    };
     
    let users = fs.readFileSync(userInfo);
     
    let id = Math.max.apply(Math,users.map(function(e){return e.id;}))

    user.id = id+1;
    
    users.push(user);
    //let data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync(userInfo, users);
    res.send(user);
})

router.put('/api/users/:id', (req, res) => {
    if(!req.body) return res.sendStatus(400);
     
    let userId = req.body.id;
    let userName = req.body.name;
    let userlastName = req.body.lastName;
    let userEmail = req.body.email;
    let userPhoneNumber = req.body.phoneNumber;
    let userPassword = req.body.password;
     
    let users = fs.readFileSync(userInfo);
    //let users = JSON.parse(data);
    let user;
    for(let i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    if(user){
        user.name = userName;
        user.lastName = userlastName;
        user.email = userEmail;
        user.phoneNumber = userPhoneNumber;
        user.password = userPassword;
        //let data = JSON.stringify(users);
        fs.writeFileSync(userInfo, users);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
})

router.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let users = fs.readFileSync(userInfo);
    let index = -1;
    // находим индекс пользователя в массиве
    for(let i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        let user = users.splice(index, 1)[0];
        //let data = JSON.stringify(users);
        fs.writeFileSync(userInfo, users);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;