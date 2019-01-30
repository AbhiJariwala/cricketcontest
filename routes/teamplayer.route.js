const { Router } = require('express');
const router = Router();

const { TeamPlayer } = require('../sequelize.js');

// router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
//     let offset = parseInt(req.params.offset);
//     let limit = parseInt(req.params.limit);
//     let sortByColumn = req.params.sortByColumn;
//     let sortDirection = req.params.sortDirection;

//     TeamPlayer.findAll({
//         limit: limit,
//         offset: offset,
//         order: [
//             [sortByColumn, sortDirection]
//         ],

//     }).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });
// router.get('/:id', (req, res) => {
//     TeamPlayer.findById(req.params.id).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });


router.post('/', (req, res) => {
    const obj = new TeamPlayer();
    obj.tournamentId = req.body.tournamentId;
    obj.teamId = req.body.teamId;
    obj.playerId = req.body.playerId;

    return obj.save().then((teamplayer) => {
        res.json(teamplayer).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return TeamPlayer.update({
        tournamentId: req.body.tournamentId,
        teamId: req.body.teamId,
        playerId: req.body.playerId
    }, { where: { id: req.params.id } }).then((teamplayer) => {
        res.json(teamplayer).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


module.exports = router;