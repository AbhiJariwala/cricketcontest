const { Router } = require('express');
const router = Router();

const { TournamentMatch } = require('../sequelize.js');

// router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
//     let offset = parseInt(req.params.offset);
//     let limit = parseInt(req.params.limit);
//     let sortByColumn = req.params.sortByColumn;
//     let sortDirection = req.params.sortDirection;

//     TournamentMatch.findAll({
       
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
    const tournamentMatchObject = new TournamentMatch();
    tournamentMatchObject.tournamentId = req.body.tournamentId;
    tournamentMatchObject.teamId1 = req.body.teamId1;
    tournamentMatchObject.teamId2 = req.body.teamId2;
    tournamentMatchObject.matchDate = req.body.matchDate;
    tournamentMatchObject.winningTeamId = req.body.winningTeamId;

    return tournamentMatchObject.save().then((tournamentMatch) => {
        res.json(tournamentMatch).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return TournamentMatch.update({
        tournamentId: req.body.tournamentId,
        teamId1: req.body.teamId1,
        teamId2: req.body.teamId2,
        matchDate: req.body.matchDate,
        winningTeamId: req.body.winningTeamId,
     }, 
          { where: { id: req.params.id } }).then((tournamentMatch) => {
        res.json(tournamentMatch).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


module.exports = router;