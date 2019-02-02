const { Router } = require('express');
const router = Router();

const { TournamentPoint } = require('../sequelize.js');

router.post('/', (req, res) => {
    const obj = new TournamentPoint();
    obj.tournamentId = req.body.tournamentId;
    obj.pointJson = req.body.pointJson;

    return obj.save().then((tournamentpoint) => {
        res.json(tournamentpoint).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    return TournamentPoint.update({
       tournamentId: req.body.tournamentId,
        pointJson: req.body.pointJson
    }, { where: { id: req.params.id } }).then((tournamentpoint) => {
        res.json(tournamentpoint).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


module.exports = router;