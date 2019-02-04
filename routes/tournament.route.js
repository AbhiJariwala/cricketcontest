const { Router } = require('express');
const router = Router();

const { Tournament, Team, TournamentMatch, Player, TournamentPoint } = require('../sequelize.js');

router.get('/:offset/:limit/:sortByColumn/:sortDirection', (req, res) => {
    let offset = parseInt(req.params.offset);
    let limit = parseInt(req.params.limit);
    let sortByColumn = req.params.sortByColumn;
    let sortDirection = req.params.sortDirection;

    Tournament.findAll({
        where: {
            isDelete: 0
        },
        include: [{
            model: Team,
            required: false,
            through: { attributes: ['id','isDelete'] },
            include: [{
                model: Player,
                required: false,
                as: 'player',
                through: { attributes: ['id'] }
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
        },
        {
            model: TournamentPoint,
            as: 'points'
        },
        {
            model : Player,
            required : false,
            through : {attributes : []},
            attributes : ['id']
        }
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

router.get('/', (req, res) => {
   Tournament.findAll({
        where: {
            isDelete: 0
        },
        include: [{
            model: Team,
            required: false,
            through: { attributes: ['id','isDelete'] },
            include: [{
                model: Player,
                required: false,
                as: 'player',
                through: { attributes: ['id'] }
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
        },
        {
            model: TournamentPoint,
            as: 'points'
        },
        {
            model : Player,
            required : false,
            through : {attributes : []},
            attributes : ['id']
        }
        ]
    }).then((resp) => {
        res.json(resp).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });
});

router.get('/:id', (req, res) => {
    Tournament.findById(req.params.id, {
        where: {
            isDelete: 0
        },
        include: [{
            model: Team,
            required: false,
            through: { attributes: [] },
            include: [{
                model: Player,
                required: false,
                as: 'player',
                through: { attributes: ['id'] }
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
    obj.createdBy = req.body.createdBy;
    return obj.save().then((tournament) => {
        res.json(tournament).status(200);
    }).catch((err) => {
        res.json({ "error": JSON.stringify(err) }).status(400);
    });

});

router.put('/:id', (req, res) => {
    let updatedTnt = {
        id: 0,
        tournamentName: "",
        tournamentDescription: ""
    };
    return Tournament.update({ tournamentName: req.body.tournamentName, tournamentDescription: req.body.tournamentDescription,updatedBy: req.body.updatedBy}, { where: { id: req.params.id } })
        .then((tournament) => {
            Tournament.findById(req.params.id)
                .then(tnt => {
                    res.send({
                        status: tournament,
                        tournament: tnt
                    }).status(200);
                })

        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});

router.delete('/:id', (req, res) => {
    return Tournament.update({ isDelete: 1 }, { where: { id: req.params.id } })
        .then((tournament) => {
            res.json(tournament).status(200);
        }).catch((err) => {
            res.json({ "error": JSON.stringify(err) }).status(400);
        });
});

module.exports = router;