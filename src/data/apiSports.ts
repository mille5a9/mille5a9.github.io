// The public methods of the api-sports-kotlin 2.0.0 clients, and the request each one makes.
// Source: https://github.com/mille5a9/api-sports-kotlin/tree/2.0.0

export const LIBRARY_VERSION = "2.0.0";

export type KotlinType = "Int" | "String" | "Boolean";

export interface MethodParam {
  /** Kotlin parameter name (for DSL methods, the builder property). */
  name: string;
  type: KotlinType;
  /** Query parameter the value is sent as. */
  query: string;
  /** Pre-filled value. */
  example?: string;
  hint?: string;
  /** Optional (nullable) parameters are left out of the call and the request when empty. */
  optional?: boolean;
  /** h2h joins two team ids into one query value. */
  combine?: "h2h-first" | "h2h-second";
  /** Shown as ApiNflClient.NFL / NCAA in Kotlin when the value matches. */
  league?: boolean;
}

export interface ApiMethod {
  /** Unique within its sport; used in the URL hash. */
  id: string;
  name: string;
  group: string;
  endpoint: string;
  params: MethodParam[];
  /** Query parameters the method always sends. */
  fixed?: Record<string, string>;
  /** The Kotlin return type. */
  returns: string;
  summary: string;
  /** Written as `client.name { prop = value }` with the parameter DSL. */
  dsl?: boolean;
}

export interface SportApi {
  id: "nba" | "nfl";
  label: string;
  apiName: string;
  docsUrl: string;
  baseUrl: string;
  client: string;
  pkg: string;
  artifact: string;
  /** Variable name in snippets. */
  variable: string;
  defaultMethod: string;
  methods: ApiMethod[];
}

const accountStatus: ApiMethod = {
  id: "getAccountStatus",
  name: "getAccountStatus",
  group: "Account",
  endpoint: "status",
  params: [],
  returns: "ApiResponse<AccountStatus>",
  summary: "Your plan and how many requests you have left today. Doesn't count against the limit.",
};

const season: MethodParam = {
  name: "season",
  type: "Int",
  query: "season",
  example: "2023",
  hint: "The year the season starts. Free plans only cover some seasons.",
};

// ---------------------------------------------------------------- NBA

const nbaTeam = (name = "teamId", query = "team"): MethodParam => ({
  name,
  type: "Int",
  query,
  example: "2",
  hint: "2 is the Boston Celtics. Look up others with getTeamByCode.",
});
const nbaGameId = (query = "id"): MethodParam => ({
  name: "gameId",
  type: "Int",
  query,
  example: "",
  hint: "Find a game id with getGamesByDate.",
});
const nbaPlayerId: MethodParam = {
  name: "playerId",
  type: "Int",
  query: "id",
  example: "",
  hint: "Find a player id with searchPlayers.",
};

const nbaMethods: ApiMethod[] = [
  accountStatus,
  { id: "getSeasons", name: "getSeasons", group: "Seasons and leagues", endpoint: "seasons", params: [], returns: "ApiResponse<List<Int>>", summary: "Every season the API has data for." },
  { id: "getLeagues", name: "getLeagues", group: "Seasons and leagues", endpoint: "leagues", params: [], returns: "ApiResponse<List<String>>", summary: "Every league the API covers, such as standard and vegas." },

  { id: "getAllTeams", name: "getAllTeams", group: "Teams", endpoint: "teams", params: [], returns: "ApiResponse<List<Team>>", summary: "Every team, including All-Star and international teams." },
  { id: "getTeamById", name: "getTeamById", group: "Teams", endpoint: "teams", params: [nbaTeam("teamId", "id")], returns: "ApiResponse<List<Team>>", summary: "One team by its id." },
  { id: "getTeamByCode", name: "getTeamByCode", group: "Teams", endpoint: "teams", params: [{ name: "code", type: "String", query: "code", example: "BOS", hint: "A three-letter team code." }], returns: "ApiResponse<List<Team>>", summary: "One team by its three-letter code." },
  { id: "getTeamsByConference", name: "getTeamsByConference", group: "Teams", endpoint: "teams", params: [{ name: "conference", type: "String", query: "conference", example: "east", hint: "east or west" }], returns: "ApiResponse<List<Team>>", summary: "Teams in a conference." },
  { id: "getTeamsByDivision", name: "getTeamsByDivision", group: "Teams", endpoint: "teams", params: [{ name: "division", type: "String", query: "division", example: "atlantic", hint: "For example atlantic, pacific, southeast." }], returns: "ApiResponse<List<Team>>", summary: "Teams in a division." },
  { id: "searchTeams", name: "searchTeams", group: "Teams", endpoint: "teams", params: [{ name: "query", type: "String", query: "search", example: "lakers", hint: "At least 3 characters." }], returns: "ApiResponse<List<Team>>", summary: "Teams whose name contains the search term." },

  { id: "getPlayerById", name: "getPlayerById", group: "Players", endpoint: "players", params: [nbaPlayerId], returns: "ApiResponse<List<Player>>", summary: "One player by id." },
  { id: "getPlayersByTeamAndSeason", name: "getPlayersByTeamAndSeason", group: "Players", endpoint: "players", params: [nbaTeam(), season], returns: "ApiResponse<List<Player>>", summary: "A team's roster for a season." },
  { id: "getPlayersByCountry", name: "getPlayersByCountry", group: "Players", endpoint: "players", params: [{ name: "country", type: "String", query: "country", example: "Canada" }], returns: "ApiResponse<List<Player>>", summary: "Players born in a country." },
  { id: "searchPlayers", name: "searchPlayers", group: "Players", endpoint: "players", params: [{ name: "query", type: "String", query: "search", example: "james", hint: "At least 3 characters." }], returns: "ApiResponse<List<Player>>", summary: "Players whose name contains the search term." },

  { id: "getGameById", name: "getGameById", group: "Games", endpoint: "games", params: [nbaGameId()], returns: "ApiResponse<List<Game>>", summary: "One game by id." },
  { id: "getGamesByDate", name: "getGamesByDate", group: "Games", endpoint: "games", params: [{ name: "date", type: "String", query: "date", example: "2024-01-15", hint: "YYYY-MM-DD" }], returns: "ApiResponse<List<Game>>", summary: "All games on a date." },
  { id: "getGamesByTeamAndSeason", name: "getGamesByTeamAndSeason", group: "Games", endpoint: "games", params: [nbaTeam(), season], returns: "ApiResponse<List<Game>>", summary: "A team's games in a season." },
  {
    id: "getGamesBetweenTwoTeams",
    name: "getGamesBetweenTwoTeams",
    group: "Games",
    endpoint: "games",
    params: [
      { ...nbaTeam("teamId1", "h2h"), combine: "h2h-first" },
      { ...nbaTeam("teamId2", "h2h"), example: "1", hint: "1 is the Atlanta Hawks.", combine: "h2h-second" },
    ],
    returns: "ApiResponse<List<Game>>",
    summary: "Every head-to-head game between two teams.",
  },
  { id: "getGamesBySeason", name: "getGamesBySeason", group: "Games", endpoint: "games", params: [season], returns: "ApiResponse<List<Game>>", summary: "Every game in a season. This is a very large response." },
  { id: "getLiveGames", name: "getLiveGames", group: "Games", endpoint: "games", params: [], fixed: { live: "all" }, returns: "ApiResponse<List<Game>>", summary: "Games in progress right now." },

  { id: "getGameStatistics", name: "getGameStatistics", group: "Statistics", endpoint: "games/statistics", params: [nbaGameId()], returns: "ApiResponse<List<GameTeamStatistics>>", summary: "Both teams' box-score totals for a game." },
  { id: "getTeamStatistics", name: "getTeamStatistics", group: "Statistics", endpoint: "teams/statistics", params: [nbaTeam("teamId", "id"), season], returns: "ApiResponse<List<TeamStatistics>>", summary: "A team's season totals." },
  { id: "getPlayersStatisticsByGame", name: "getPlayersStatisticsByGame", group: "Statistics", endpoint: "players/statistics", params: [nbaGameId("game")], returns: "ApiResponse<List<PlayerStatistics>>", summary: "Every player's box-score line for a game." },
  { id: "getPlayersStatisticsByTeamAndSeason", name: "getPlayersStatisticsByTeamAndSeason", group: "Statistics", endpoint: "players/statistics", params: [nbaTeam(), season], returns: "ApiResponse<List<PlayerStatistics>>", summary: "Every box-score line for a team's players in a season." },
  { id: "getPlayerStatisticsByPlayerAndSeason", name: "getPlayerStatisticsByPlayerAndSeason", group: "Statistics", endpoint: "players/statistics", params: [nbaPlayerId, season], returns: "ApiResponse<List<PlayerStatistics>>", summary: "Every box-score line for one player in a season." },

  { id: "getStandingsByConferenceAndSeason", name: "getStandingsByConferenceAndSeason", group: "Standings", endpoint: "standings", params: [{ name: "conference", type: "String", query: "conference", example: "east", hint: "east or west" }, season], fixed: { league: "standard" }, returns: "ApiResponse<List<Standing>>", summary: "Standings for a conference in the standard league." },
  { id: "getStandingsByDivisionAndSeason", name: "getStandingsByDivisionAndSeason", group: "Standings", endpoint: "standings", params: [{ name: "division", type: "String", query: "division", example: "atlantic" }, season], fixed: { league: "standard" }, returns: "ApiResponse<List<Standing>>", summary: "Standings for a division in the standard league." },
  { id: "getStandingsByTeamAndSeason", name: "getStandingsByTeamAndSeason", group: "Standings", endpoint: "standings", params: [nbaTeam(), season], fixed: { league: "standard" }, returns: "ApiResponse<List<Standing>>", summary: "One team's standing in the standard league." },

  {
    id: "getGames-dsl",
    name: "getGames",
    group: "Any parameters (DSL)",
    endpoint: "games",
    dsl: true,
    params: [
      { name: "season", type: "Int", query: "season", example: "2023", optional: true },
      { name: "team", type: "Int", query: "team", example: "2", optional: true },
      { name: "date", type: "String", query: "date", optional: true, hint: "YYYY-MM-DD" },
      { name: "league", type: "String", query: "league", optional: true, hint: "For example standard or vegas." },
      { name: "h2h", type: "String", query: "h2h", optional: true, hint: "Two team ids, e.g. 1-2." },
    ],
    returns: "ApiResponse<List<Game>>",
    summary: "games with any combination of parameters, built with the generated DSL. Leave a field empty to skip it.",
  },
  {
    id: "getPlayers-dsl",
    name: "getPlayers",
    group: "Any parameters (DSL)",
    endpoint: "players",
    dsl: true,
    params: [
      { name: "team", type: "Int", query: "team", example: "2", optional: true },
      { name: "season", type: "Int", query: "season", example: "2023", optional: true },
      { name: "search", type: "String", query: "search", optional: true, hint: "At least 3 characters." },
      { name: "country", type: "String", query: "country", optional: true },
    ],
    returns: "ApiResponse<List<Player>>",
    summary: "players with any combination of parameters, built with the generated DSL.",
  },
  {
    id: "getStandings-dsl",
    name: "getStandings",
    group: "Any parameters (DSL)",
    endpoint: "standings",
    dsl: true,
    params: [
      { name: "league", type: "String", query: "league", example: "standard", hint: "Required by the API." },
      { name: "season", type: "Int", query: "season", example: "2023", hint: "Required by the API." },
      { name: "conference", type: "String", query: "conference", optional: true, hint: "east or west" },
      { name: "division", type: "String", query: "division", optional: true },
      { name: "team", type: "Int", query: "team", optional: true },
    ],
    returns: "ApiResponse<List<Standing>>",
    summary: "standings with any combination of parameters, built with the generated DSL.",
  },
];

// ---------------------------------------------------------------- NFL

const nflLeague: MethodParam = {
  name: "league",
  type: "Int",
  query: "league",
  example: "1",
  league: true,
  hint: "1 is the NFL (ApiNflClient.NFL), 2 is NCAA (ApiNflClient.NCAA).",
};
const nflTeam = (name = "teamId", query = "team", optional = false): MethodParam => ({
  name,
  type: "Int",
  query,
  example: "",
  optional,
  hint: optional ? "Optional." : "Find a team id with getTeams(league, season).",
});
const nflGameId: MethodParam = {
  name: "gameId",
  type: "Int",
  query: "id",
  example: "",
  hint: "Find a game id with getGamesByDate.",
};
const nflPlayerId = (query = "id"): MethodParam => ({
  name: "playerId",
  type: "Int",
  query,
  example: "",
  hint: "Find a player id with searchPlayers.",
});

const nflMethods: ApiMethod[] = [
  accountStatus,
  { id: "getTimezones", name: "getTimezones", group: "Reference data", endpoint: "timezone", params: [], returns: "ApiResponse<List<String>>", summary: "Time zones accepted by the timezone parameter of getGames." },
  { id: "getSeasons", name: "getSeasons", group: "Reference data", endpoint: "seasons", params: [], returns: "ApiResponse<List<Int>>", summary: "Every season the API has data for." },
  { id: "getLeagues", name: "getLeagues", group: "Reference data", endpoint: "leagues", params: [], returns: "ApiResponse<List<LeagueInfo>>", summary: "Leagues with their seasons and what data each season covers." },

  { id: "getTeams", name: "getTeams", group: "Teams and players", endpoint: "teams", params: [nflLeague, season], returns: "ApiResponse<List<Team>>", summary: "Every team in a league and season." },
  { id: "getTeamById", name: "getTeamById", group: "Teams and players", endpoint: "teams", params: [nflTeam("teamId", "id")], returns: "ApiResponse<List<Team>>", summary: "One team by id." },
  { id: "getPlayerById", name: "getPlayerById", group: "Teams and players", endpoint: "players", params: [nflPlayerId()], returns: "ApiResponse<List<Player>>", summary: "One player by id." },
  { id: "getPlayersByTeamAndSeason", name: "getPlayersByTeamAndSeason", group: "Teams and players", endpoint: "players", params: [nflTeam(), season], returns: "ApiResponse<List<Player>>", summary: "A team's roster for a season." },
  { id: "searchPlayers", name: "searchPlayers", group: "Teams and players", endpoint: "players", params: [{ name: "query", type: "String", query: "search", example: "mahomes", hint: "At least 3 characters." }], returns: "ApiResponse<List<Player>>", summary: "Players whose name contains the search term." },
  { id: "getPlayerStatistics", name: "getPlayerStatistics", group: "Teams and players", endpoint: "players/statistics", params: [nflPlayerId(), season], returns: "ApiResponse<List<PlayerStatistics>>", summary: "A player's season statistics." },
  { id: "getPlayerStatisticsByTeam", name: "getPlayerStatisticsByTeam", group: "Teams and players", endpoint: "players/statistics", params: [nflTeam(), season], returns: "ApiResponse<List<PlayerStatistics>>", summary: "Season statistics for every player on a team." },
  { id: "getInjuriesByTeam", name: "getInjuriesByTeam", group: "Teams and players", endpoint: "injuries", params: [nflTeam()], returns: "ApiResponse<List<Injury>>", summary: "The current injury report for a team." },
  { id: "getInjuriesByPlayer", name: "getInjuriesByPlayer", group: "Teams and players", endpoint: "injuries", params: [nflPlayerId("player")], returns: "ApiResponse<List<Injury>>", summary: "The current injury report for a player." },

  { id: "getGameById", name: "getGameById", group: "Games", endpoint: "games", params: [nflGameId], returns: "ApiResponse<List<Game>>", summary: "One game by id." },
  { id: "getGamesByDate", name: "getGamesByDate", group: "Games", endpoint: "games", params: [{ name: "date", type: "String", query: "date", example: "2023-09-10", hint: "YYYY-MM-DD" }], returns: "ApiResponse<List<Game>>", summary: "All games on a date." },
  { id: "getGamesBySeason", name: "getGamesBySeason", group: "Games", endpoint: "games", params: [nflLeague, season], returns: "ApiResponse<List<Game>>", summary: "Every game in a league and season, including pre- and post-season." },
  { id: "getGamesByTeamAndSeason", name: "getGamesByTeamAndSeason", group: "Games", endpoint: "games", params: [nflTeam(), season], returns: "ApiResponse<List<Game>>", summary: "A team's games in a season." },
  {
    id: "getGamesBetweenTwoTeams",
    name: "getGamesBetweenTwoTeams",
    group: "Games",
    endpoint: "games",
    params: [
      { ...nflTeam("teamId1", "h2h"), combine: "h2h-first" },
      { ...nflTeam("teamId2", "h2h"), combine: "h2h-second" },
    ],
    returns: "ApiResponse<List<Game>>",
    summary: "Every head-to-head game between two teams.",
  },
  { id: "getLiveGames", name: "getLiveGames", group: "Games", endpoint: "games", params: [], fixed: { live: "all" }, returns: "ApiResponse<List<Game>>", summary: "Games in progress right now." },
  { id: "getGameEvents", name: "getGameEvents", group: "Games", endpoint: "games/events", params: [nflGameId], returns: "ApiResponse<List<GameEvent>>", summary: "Scoring plays for a game." },
  { id: "getGameTeamStatistics", name: "getGameTeamStatistics", group: "Games", endpoint: "games/statistics/teams", params: [nflGameId, nflTeam("teamId", "team", true)], returns: "ApiResponse<List<GameTeamStatistics>>", summary: "Team box scores for a game, or for one side only." },
  {
    id: "getGamePlayerStatistics",
    name: "getGamePlayerStatistics",
    group: "Games",
    endpoint: "games/statistics/players",
    params: [nflGameId, nflTeam("teamId", "team", true), { name: "group", type: "String", query: "group", optional: true, hint: "Optional stat group, e.g. Passing." }],
    returns: "ApiResponse<List<GamePlayerStatistics>>",
    summary: "Player box scores for a game, optionally for one team or stat group.",
  },

  {
    id: "getStandings",
    name: "getStandings",
    group: "Standings",
    endpoint: "standings",
    params: [
      nflLeague,
      season,
      nflTeam("teamId", "team", true),
      { name: "conference", type: "String", query: "conference", optional: true, hint: "Optional. Names come from getConferences." },
      { name: "division", type: "String", query: "division", optional: true, hint: "Optional. Names come from getDivisions, e.g. AFC East." },
    ],
    returns: "ApiResponse<List<Standing>>",
    summary: "Standings for a league and season, optionally narrowed by team, conference or division.",
  },
  { id: "getConferences", name: "getConferences", group: "Standings", endpoint: "standings/conferences", params: [nflLeague, season], returns: "ApiResponse<List<String>>", summary: "Conference names for a league and season." },
  { id: "getDivisions", name: "getDivisions", group: "Standings", endpoint: "standings/divisions", params: [nflLeague, season], returns: "ApiResponse<List<String>>", summary: "Division names for a league and season." },

  {
    id: "getOdds",
    name: "getOdds",
    group: "Odds",
    endpoint: "odds",
    params: [
      { ...nflGameId, query: "game" },
      { name: "bookmakerId", type: "Int", query: "bookmaker", optional: true, hint: "Optional. Ids come from getBookmakers." },
      { name: "betId", type: "Int", query: "bet", optional: true, hint: "Optional. Ids come from getBetTypes." },
    ],
    returns: "ApiResponse<List<GameOdds>>",
    summary: "Pre-game odds for a game.",
  },
  { id: "getBetTypes", name: "getBetTypes", group: "Odds", endpoint: "odds/bets", params: [], returns: "ApiResponse<List<BetType>>", summary: "Bet types available in getOdds." },
  { id: "getBookmakers", name: "getBookmakers", group: "Odds", endpoint: "odds/bookmakers", params: [], returns: "ApiResponse<List<Bookmaker>>", summary: "Bookmakers available in getOdds." },

  {
    id: "getGames-dsl",
    name: "getGames",
    group: "Any parameters (DSL)",
    endpoint: "games",
    dsl: true,
    params: [
      { ...nflLeague, optional: true },
      { name: "season", type: "Int", query: "season", example: "2023", optional: true },
      { name: "team", type: "Int", query: "team", optional: true },
      { name: "date", type: "String", query: "date", optional: true, hint: "YYYY-MM-DD" },
      { name: "timezone", type: "String", query: "timezone", optional: true, hint: "An IANA zone from getTimezones, e.g. America/New_York." },
    ],
    returns: "ApiResponse<List<Game>>",
    summary: "games with any combination of parameters, built with the generated DSL. Leave a field empty to skip it.",
  },
  {
    id: "getTeams-dsl",
    name: "getTeams",
    group: "Any parameters (DSL)",
    endpoint: "teams",
    dsl: true,
    params: [
      { ...nflLeague, optional: true },
      { name: "season", type: "Int", query: "season", example: "2023", optional: true },
      { name: "code", type: "String", query: "code", optional: true, hint: "A team code, e.g. BUF." },
      { name: "search", type: "String", query: "search", optional: true, hint: "At least 3 characters." },
    ],
    returns: "ApiResponse<List<Team>>",
    summary: "teams with any combination of parameters, built with the generated DSL.",
  },
  {
    id: "getPlayers-dsl",
    name: "getPlayers",
    group: "Any parameters (DSL)",
    endpoint: "players",
    dsl: true,
    params: [
      { name: "team", type: "Int", query: "team", optional: true },
      { name: "season", type: "Int", query: "season", example: "2023", optional: true },
      { name: "search", type: "String", query: "search", example: "allen", optional: true, hint: "At least 3 characters." },
    ],
    returns: "ApiResponse<List<Player>>",
    summary: "players with any combination of parameters, built with the generated DSL.",
  },
];

export const sports: SportApi[] = [
  {
    id: "nba",
    label: "NBA",
    apiName: "API-NBA v2",
    docsUrl: "https://api-sports.io/documentation/nba/v2",
    baseUrl: "https://v2.nba.api-sports.io/",
    client: "ApiNbaClient",
    pkg: "io.github.mille5a9.apisports.nba",
    artifact: "api-nba-kotlin",
    variable: "nba",
    defaultMethod: "getTeamByCode",
    methods: nbaMethods,
  },
  {
    id: "nfl",
    label: "NFL & NCAA",
    apiName: "API-American-Football v1",
    docsUrl: "https://api-sports.io/documentation/american-football/v1",
    baseUrl: "https://v1.american-football.api-sports.io/",
    client: "ApiNflClient",
    pkg: "io.github.mille5a9.apisports.nfl",
    artifact: "api-nfl-kotlin",
    variable: "nfl",
    defaultMethod: "getTeams",
    methods: nflMethods,
  },
];
