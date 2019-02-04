const { Router } = require('express');
const router = Router();

const { TournamentTeam } = require('../sequelize.js');

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

router.delete('/:tournamentId/:teamId', (req, res) => {
    return TournamentTeam.update({
        isDelete : 1
    },
        { where: { tournamentId:req.params.tournamentId,teamId: req.params.teamId } }).then((tournamentTeam) => {
            res.json({...tournamentTeam,id}).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});


module.exports = router;