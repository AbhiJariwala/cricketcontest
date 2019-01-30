const { Router } = require('express');
const router = Router();

const { UserPlayer } = require('../sequelize.js');

// router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
//     let offset = parseInt(req.params.offset);
//     let limit = parseInt(req.params.limit);
//     let sortByColumn = req.params.sortByColumn;
//     let sortDirection = req.params.sortDirection;

//     Tournament.findAll({
//         include: [{
//             model: Team,
//             required: false,
//             through: { attributes: [] },
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
//         }
//         ],
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
//     Tournament.findById(req.params.id, {
//         include: [{
//             model: Team,
//             required: false,
//             through: { attributes: [] },
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
//         }
//         ]
//     }).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });


router.post('/', (req, res) => {
    const userPlayerObject = new UserPlayer();
    userPlayerObject.tournamentId = req.body.tournamentId;
    userPlayerObject.userId = req.body.userId;
    userPlayerObject.playerId = req.body.playerId;

    return userPlayerObject.save().then((userplayer) => {
        res.json(userplayer).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return UserPlayer.update({
        tournamentId : req.body.tournamentId,
        userId : req.body.userId,
        playerId : req.body.playerId,
    },
        { where: { id: req.params.id } }).then((userplayer) => {
            res.json(userplayer).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});


module.exports = router;