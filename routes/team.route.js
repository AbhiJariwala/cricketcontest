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
            through: { attributes: [] }
        }],
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
    Team.findById(req.params.id, {
        include: [{
            model: Player,
            required: false,
            as: 'player',
            through: { attributes: [] }
        }]
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


router.post('/', (req, res) => {
    const obj = new Team();
    obj.teamName = req.body.teamName;

    return obj.save().then((team) => {
        res.json(team).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return Team.update({ teamName: req.body.teamName }, { where: { id: req.params.id } }).then((team) => {
        res.json(team).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

module.exports = router;