const { Router } = require('express');
const router = Router();

const { Team, Player } = require('../sequelize.js');

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;

    Team.findAll({
        include: [{
            model: Player,
            required: false,
            as: 'player',
            through: { attributes: ['id'] }
        }],
        limit: limit,
        offset: offset,
        order: [
            [sortByColumn, sortDirection]
        ],
        where: {
            isDelete: 0
        }
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.get('/', (req, res) => {
    Team.findAll({
        include: [{
            model: Player,
            required: false,
            as: 'player',
            through: { attributes: ['id'] }
        }],
        where: {
            isDelete: 0
        }
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.get('/:id', (req, res) => {
    Team.findById(req.params.id, {
        include: [{
            model: Player,
            required: false,
            as: 'player',
            through: { attributes: ['id'] }
        }],
        where: {
            isDelete: 0
        }
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


router.post('/', (req, res) => {
    const obj = new Team();
    obj.teamName = req.body.teamName;
    obj.createdBy = req.body.createdBy;
    return obj.save().then((team) => {
        res.json(team).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return Team.update({ teamName: req.body.teamName,updatedBy: req.body.updatedBy }, { where: { id: req.params.id } }).then((team) => {
        res.json(team).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.delete('/:id', (req, res) => {
    return Team.update({ isDelete: 1 }, { where: { id: req.params.id } }).then((team) => {
        res.json(team).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});



module.exports = router;