const { Router } = require('express');
const router = Router();

const { Tournament, Team, TournamentMatch,Player, TournamentPoint } = require('../sequelize.js');

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;

    Tournament.findAll({
        include: [{
            model: Team,
            required: false,
            through: { attributes: [] },
            include: [{
                model: Player,
                required: false,
                as: 'player',
                through: { attributes: [] }
            }]
        },
        {
            model: TournamentMatch,
            include: [{
                model: Team,
                as: 'Team1',
            },
            {
                model: Team,
                as: 'Team2',
            }
            ]
        }, { model: TournamentPoint, as: 'points' }
        ],
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

router.get('/:id', (req, res) => {
    Tournament.findById(req.params.id, {
        include: [{
            model: Team,
            required: false,
            through: { attributes: [] },
            include: [{
                model: Player,
                required: false,
                as: 'player',
                through: { attributes: [] }
            }]
        },
        {
            model: TournamentMatch,
            include: [{
                model: Team,
                as: 'Team1',
            },
            {
                model: Team,
                as: 'Team2',
            }
            ]
        }, { model: TournamentPoint, as: 'points' }
        ]
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


router.post('/', (req, res) => {
    const obj = new Tournament();
    obj.tournamentName = req.body.tournamentName;
    obj.tournamentDescription = req.body.tournamentDescription;

    return obj.save().then((tournament) => {
        res.json(tournament).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    let updatedTnt = {
        id : 0,
        tournamentName : "",
        tournamentDescription : ""
    };
    return Tournament.update({ tournamentName: req.body.tournamentName, tournamentDescription: req.body.tournamentDescription }, { where: { id: req.params.id } })
    .then((tournament) => {
        Tournament.findById(req.params.id)
        .then(tnt => {
            res.send({
                status : tournament,
                tournament : tnt
             }).status(200);
        })
      
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});


module.exports = router;