const { Router } = require('express');
const router = Router();
let multer = require('multer');
const { Player } = require('../sequelize.js');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage
});

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;

    Player.findAll({
        limit: limit,
        offset: offset,
        order: [
            [sortByColumn, sortDirection]
        ]
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.get('/:id', (req, res) => {
    Player.findById(req.params.id).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


router.post('/', (req, res) => {
    const obj = new Player();
    obj.firstName = req.body.firstName;
    obj.lastName = req.body.lastName;
    obj.dob = req.body.dob;
    obj.gender = req.body.gender;
    obj.description = req.body.description;
    obj.playerImage=req.file.originalname;

    return obj.save().then((player) => {
        res.json(player).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return Player.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        description: req.body.description,
        playerImage: req.file.playerImage
    },
        { where: { id: req.params.id } }).then((player) => {
            res.json(player).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});

router.delete('/:id', (req, res) => {
    return Player.update({
        isActive : false
    },
        { where: { id: req.params.id } }).then((player) => {
            res.json(player).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});


module.exports = router;