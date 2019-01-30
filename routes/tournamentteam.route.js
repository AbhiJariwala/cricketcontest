const { Router } = require('express');
const router = Router();

const { TournamentTeam } = require('../sequelize.js');

// router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
//     let offset = parseInt(req.params.offset);
//     let limit = parseInt(req.params.limit);
//     let sortByColumn = req.params.sortByColumn;
//     let sortDirection = req.params.sortDirection;

//     TournamentTeam.findAll({

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
//     Tournament.findById(req.params.id).then((resp) => {
//         res.json(resp).status(200);
//     }).catch((err) => {
//         res.json({ "error": JSON.stringify(err) }).status(400);
//     });
// });


router.post('/', (req, res) => {
    const tournamentTeamObject = new TournamentTeam();
    tournamentTeamObject.tournamentId = req.body.tournamentId;
    tournamentTeamObject.teamId = req.body.teamId;

    return tournamentTeamObject.save().then((tournamentTeam) => {
        res.json(tournamentTeam).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return TournamentTeam.update({
        tournamentId: req.body.tournamentId,
        teamId: req.body.teamId
    },
        { where: { id: req.params.id } }).then((tournamentTeam) => {
            res.json(tournamentTeam).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});


module.exports = router;