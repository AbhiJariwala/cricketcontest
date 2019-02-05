const { Router } = require('express');
const router = Router();

const { TeamPlayer, Player } = require('../sequelize.js');


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
//         include: [{
//             model: Tournament,
//             attributes: ['tournamentName', 'tournamentDescription'],
//         }]

//     }).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });

router.get('/:id', (req, res) => {
    TeamPlayer.findById(req.params.id).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.get('/:tournamentId/:teamId', (req, res) => {
    TeamPlayer.findAll({
        where: {
            tournamentId: req.params.tournamentId,
            teamId: req.params.teamId
        },
        include: [{
            model: Player,
            where: { isActive: true }
        }],
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
})

router.post('/', (req, res) => {
    let teamPlayerArray = [];
    let selectedPlayers = req.body.selectedPlayers;
    for (const index in req.body.selectedPlayers) {
        let obj = {};
        obj.tournamentId = req.body.tournamentId;
        obj.teamId = req.body.teamId;
        obj.playerId = selectedPlayers[index];
        teamPlayerArray.push(obj);
    }

    TeamPlayer.bulkCreate(teamPlayerArray, { returning: true }).then((teamPlayers) => {
        res.json(teamPlayers).status(200);
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

router.delete('/:id', (req, res) => {
    return TeamPlayer.destroy({ where: { id: req.params.id } }).then((teamplayer) => {
        res.json(teamplayer).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


// router.get('/:id', (req, res) => {
//     Tournament.findById(req.params.id, {
//         where: {
//             isDelete: 0
//         },
//         include: [{
//             model: Team,
//             required: false,
//             through: { attributes: [] },
//             include: [{
//                 model: Player,
//                 required: false,
//                 as: 'player',
//                 through: { attributes: ['id'] }
//             }]
//         },
//         {
//             model: TournamentMatch,
//             include: [{
//                 model: Team,
//                 as: 'Team1',
//             },
//             {
//                 model: Team,
//                 as: 'Team2',
//             }
//             ]
//         }, { model: TournamentPoint, as: 'points' }
//         ]
//     }).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;

    TeamPlayer.findAll({
        limit: limit,
        offset: offset,
        order: [
            [sortByColumn, sortDirection]
        ],

    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

module.exports = router;