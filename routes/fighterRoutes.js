const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');
const fs = require("fs");
const jsonParser = bodyParser.json();
const fighterInfo = require('../models/fighter')

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/api/fighters', (req, res) => {
    let content = fs.readFileSync(fighterInfo, "utf8");
    let fighters = JSON.parse(content);
    res.send(fighters);
})

router.get('/api/fighters/:id', (req, res) => {
    let id = req.params.id; // получаем id
    let content = fs.readFileSync(fighterInfo, "utf8");
    let fighters = JSON.parse(content);
    let fighter = null;
    // находим в массиве пользователя по id
    for(let i=0; i<fighters.length; i++){
        if(fighters[i].id==id){
            fighter = fighters[i];
            break;
        }
    }
    // отправляем пользователя
    if(fighter){
        res.send(fighter);
    }
    else{
        res.status(404).send();
    }
})

router.post('/api/fighters', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
     
    let fighterName = req.body.name;
    let fighterHealth = req.body.health;
    let fighterPower = req.body.power;
    let fighterDefense = req.body.defense;

    let fighter = {
        name: fighterName, 
        health: fighterHealth,
        power: fighterPower,
        defense: fighterDefense
    };
     
    let data = fs.readFileSync(fighterInfo, "utf8");
    let fighters = JSON.parse(data);
     
    // находим максимальный id
    let id = Math.max.apply(Math,fighters.map(function(e){return e.id;}))
    // увеличиваем его на единицу
    fighter.id = id+1;
    // добавляем пользователя в массив
    fighters.push(fighter);
    let data = JSON.stringify(fighters);
    // перезаписываем файл с новыми данными
    fs.writeFileSync(fighterInfo, data);
    res.send(fighter);
})

router.put('/api/fighters/:id', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
     
    let fighterId = req.body.id;
    let fighterName = req.body.name;
    let fighterHealth = req.body.health;
    let fighterPower = req.body.power;
    let fighterDefense = req.body.defense;
     
    let data = fs.readFileSync(fightersInfo, "utf8");
    let fighters = JSON.parse(data);
    let fighter;
    for(let i=0; i<fighters.length; i++){
        if(fighters[i].id==fighterId){
            fighter = fighters[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(fighter){
        fighter.name = fighterName;
        fighter.health = fighterHealth;
        fighter.power = fighterPower;
        fighter.defense = fighterDefense;

        let data = JSON.stringify(fighters);
        fs.writeFileSync(fighterInfo, data);
        res.send(fighter);
    }
    else{
        res.status(404).send(fighter);
    }
})

router.delete('/api/fighters/:id', (req, res) => {
    let id = req.params.id;
    let data = fs.readFileSync(fighterInfo, "utf8");
    let fighters = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(let i=0; i<fighters.length; i++){
        if(fighters[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        let fighter = fighters.splice(index, 1)[0];
        let data = JSON.stringify(fighters);
        fs.writeFileSync(fighterInfo, data);
        // отправляем удаленного пользователя
        res.send(fighter);
    }
    else{
        res.status(404).send();
    }
})

module.exports = router;