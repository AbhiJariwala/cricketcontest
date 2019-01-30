const Sequelize = require('sequelize');
const { host, database, username, password } = require('./configs/database.js');

const UserModel = require('./schemas/user.schema');
const TournamentModel = require('./schemas/tournament.schema');
const TeamModel = require('./schemas/team.schema');
const PlayerModel = require('./schemas/player.schema');
const TournamentTeamModel = require('./schemas/tournamentteam.schema');
const UserPlayerModel = require('./schemas/userplayer.schema');
const TournamentMatchModel = require('./schemas/tournamentmatch.schema');
const TeamPlayerModel = require('./schemas/teamplayer.schema');
const TournamentPointModel = require('./schemas/tournamentpoint.schema');
const TournamentMatchPlayerScoreModel = require('./schemas/tournamentmatchplayerscore.schema');

const Op = Sequelize.Op;

// connect to db
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  operatorsAliases: Op,
  port: 3307,
});

const User = UserModel(sequelize, Sequelize);
const Tournament = TournamentModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Player = PlayerModel(sequelize, Sequelize);
const TournamentTeam = TournamentTeamModel(sequelize, Sequelize);
const UserPlayer = UserPlayerModel(sequelize,Sequelize);
const TournamentMatch = TournamentMatchModel(sequelize,Sequelize);
const TeamPlayer = TeamPlayerModel(sequelize, Sequelize);
const TournamentPoint =TournamentPointModel(sequelize, Sequelize);
const TournamentMatchPlayerScore =TournamentMatchPlayerScoreModel(sequelize, Sequelize);
// sequelize.sync().then(() => {
//   console.log(`Users db and user table have been created`);
// });

//To get Data Of Teams in Tournament Model
Team.belongsToMany(Tournament, { through: TournamentTeam, foreignKey: 'teamId'});
Tournament.belongsToMany(Team, { through: TournamentTeam, foreignKey: 'tournamentId'});

//To get Data Of Tournaments in User   Model
Tournament.belongsToMany(User, {through : UserPlayer, foreignKey : 'tournamentId'});
User.belongsToMany(Tournament, {through : UserPlayer, foreignKey : 'userId'});

//To get Data Of Players selected By User in Tournament Model 
Player.belongsToMany(Tournament, {through : UserPlayer, foreignKey : 'playerId'});
Tournament.belongsToMany(Player, {through : UserPlayer, foreignKey : 'tournamentId'});

//To get Data Of Match in  Tournament Model 
Tournament.hasMany(TournamentMatch,{foreignKey:'tournamentId',sourceKey:'id'});

//To get Data Of Team  in Particular Match Tournament Model (Both the Team)
TournamentMatch.hasMany(Team,{foreignKey:'id',sourceKey:'teamId1',as:'Team1'});
TournamentMatch.hasMany(Team,{foreignKey:'id',sourceKey:'teamId2',as:'Team2'});

//Get Data of Player In Team
Player.belongsToMany(Team, {through: TeamPlayer, foreignKey: 'playerId', as: 'player'});
Team.belongsToMany(Player, { through: TeamPlayer, foreignKey: 'teamId',  as: 'player'});

//Get Data of Tournamanet Point in Tournamnet
TournamentPoint.belongsTo(Tournament, {foreignKey:'tournamentId', as:'points'});  
Tournament.belongsTo(TournamentPoint, {foreignKey:'id',as:'points'}); 



sequelize
  .authenticate()
  .then(() => {
    console.log('Mysql connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports = { User, Tournament, Team, Player, TournamentTeam , TournamentMatch, UserPlayer,TournamentPoint, TeamPlayer , TournamentMatchPlayerScore };