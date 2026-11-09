// The public methods of ApiNbaClient in api-nba-kotlin 1.0.4-alpha (the version on Maven Central),
// and the API-NBA v2 request each one makes.

export type KotlinType = "Int" | "String";

export interface MethodParam {
  /** Kotlin parameter name. */
  name: string;
  type: KotlinType;
  /** Query parameter the value is sent as. */
  query: string;
  /** Pre-filled example value. */
  example: string;
  hint?: string;
  /** Turns the user's values into the query value, e.g. h2h joins two team ids. */
  combine?: "h2h-first" | "h2h-second";
}

export interface NbaMethod {
  name: string;
  group: string;
  endpoint: string;
  params: MethodParam[];
  /** Query parameters the method always sends. */
  fixed?: Record<string, string>;
  /** The type parameter of EndpointResponse<T> the method returns. */
  returns: string;
  summary: string;
  /** getAccountStatus returns StatusResponse rather than EndpointResponse<T>. */
  rawReturn?: string;
}

const teamId = (name = "teamId"): MethodParam => ({
  name,
  type: "Int",
  query: "team",
  example: "2",
  hint: "2 is the Boston Celtics. Look up others with getTeamByCode.",
});
const season: MethodParam = {
  name: "season",
  type: "Int",
  query: "season",
  example: "2023",
  hint: "The year the season starts. Free plans only cover some seasons.",
};

export const nbaMethods: NbaMethod[] = [
  {
    name: "getAccountStatus",
    group: "Account",
    endpoint: "status",
    params: [],
    returns: "",
    rawReturn: "StatusResponse",
    summary: "Your plan and how many requests you have left today. Doesn't count against the limit.",
  },
  {
    name: "getSeasons",
    group: "Seasons and leagues",
    endpoint: "seasons",
    params: [],
    returns: "Int",
    summary: "Every season the API has data for.",
  },
  {
    name: "getLeagues",
    group: "Seasons and leagues",
    endpoint: "leagues",
    params: [],
    returns: "String",
    summary: "Every league the API covers, such as standard and vegas.",
  },
  {
    name: "getAllTeams",
    group: "Teams",
    endpoint: "teams",
    params: [],
    returns: "TeamsResponse",
    summary: "Every team, including All-Star and international teams.",
  },
  {
    name: "getTeamById",
    group: "Teams",
    endpoint: "teams",
    params: [{ ...teamId(), query: "id" }],
    returns: "TeamsResponse",
    summary: "One team by its id.",
  },
  {
    name: "getTeamByCode",
    group: "Teams",
    endpoint: "teams",
    params: [{ name: "code", type: "String", query: "code", example: "BOS", hint: "A three-letter team code." }],
    returns: "TeamsResponse",
    summary: "One team by its three-letter code.",
  },
  {
    name: "getTeamsByConference",
    group: "Teams",
    endpoint: "teams",
    params: [{ name: "conference", type: "String", query: "conference", example: "east", hint: "east or west" }],
    returns: "TeamsResponse",
    summary: "Teams in a conference.",
  },
  {
    name: "getTeamsByDivision",
    group: "Teams",
    endpoint: "teams",
    params: [
      { name: "division", type: "String", query: "division", example: "atlantic", hint: "For example atlantic, pacific, southeast." },
    ],
    returns: "TeamsResponse",
    summary: "Teams in a division.",
  },
  {
    name: "searchTeams",
    group: "Teams",
    endpoint: "teams",
    params: [{ name: "query", type: "String", query: "search", example: "lakers", hint: "At least 3 characters." }],
    returns: "TeamsResponse",
    summary: "Teams whose name contains the search term.",
  },
  {
    name: "getPlayerById",
    group: "Players",
    endpoint: "players",
    params: [{ name: "playerId", type: "Int", query: "id", example: "", hint: "Find a player id with searchPlayers." }],
    returns: "PlayersResponse",
    summary: "One player by id.",
  },
  {
    name: "getPlayersByTeamAndSeason",
    group: "Players",
    endpoint: "players",
    params: [teamId(), season],
    returns: "PlayersResponse",
    summary: "A team's roster for a season.",
  },
  {
    name: "getPlayersByCountry",
    group: "Players",
    endpoint: "players",
    params: [{ name: "country", type: "String", query: "country", example: "Canada" }],
    returns: "PlayersResponse",
    summary: "Players born in a country.",
  },
  {
    name: "searchPlayers",
    group: "Players",
    endpoint: "players",
    params: [{ name: "query", type: "String", query: "search", example: "james", hint: "At least 3 characters." }],
    returns: "PlayersResponse",
    summary: "Players whose name contains the search term.",
  },
  {
    name: "getGameById",
    group: "Games",
    endpoint: "games",
    params: [{ name: "gameId", type: "Int", query: "id", example: "", hint: "Find a game id with getGamesByDate." }],
    returns: "GamesResponse",
    summary: "One game by id.",
  },
  {
    name: "getGamesByDate",
    group: "Games",
    endpoint: "games",
    params: [{ name: "date", type: "String", query: "date", example: "2024-01-15", hint: "YYYY-MM-DD" }],
    returns: "GamesResponse",
    summary: "All games on a date.",
  },
  {
    name: "getGamesByTeamAndSeason",
    group: "Games",
    endpoint: "games",
    params: [teamId(), season],
    returns: "GamesResponse",
    summary: "A team's games in a season.",
  },
  {
    name: "getGamesBetweenTwoTeams",
    group: "Games",
    endpoint: "games",
    params: [
      { ...teamId("teamId1"), query: "h2h", combine: "h2h-first" },
      { ...teamId("teamId2"), query: "h2h", example: "1", hint: "1 is the Atlanta Hawks.", combine: "h2h-second" },
    ],
    returns: "GamesResponse",
    summary: "Every head-to-head game between two teams.",
  },
  {
    name: "getGamesBySeason",
    group: "Games",
    endpoint: "games",
    params: [season],
    returns: "GamesResponse",
    summary: "Every game in a season. This is a very large response.",
  },
  {
    name: "getLiveGames",
    group: "Games",
    endpoint: "games",
    params: [],
    fixed: { live: "all" },
    returns: "GamesResponse",
    summary: "Games in progress right now.",
  },
  {
    name: "getGameStatistics",
    group: "Statistics",
    endpoint: "games/statistics",
    params: [{ name: "gameId", type: "Int", query: "id", example: "", hint: "Find a game id with getGamesByDate." }],
    returns: "GamesStatisticsResponse",
    summary: "Both teams' box-score totals for a game.",
  },
  {
    name: "getTeamStatistics",
    group: "Statistics",
    endpoint: "teams/statistics",
    params: [{ ...teamId(), query: "id" }, season],
    returns: "TeamsStatisticsResponse",
    summary: "A team's season totals.",
  },
  {
    name: "getPlayersStatisticsByGame",
    group: "Statistics",
    endpoint: "players/statistics",
    params: [{ name: "gameId", type: "Int", query: "game", example: "", hint: "Find a game id with getGamesByDate." }],
    returns: "PlayersStatisticsResponse",
    summary: "Every player's box-score line for a game.",
  },
  {
    name: "getPlayersStatisticsByTeamAndSeason",
    group: "Statistics",
    endpoint: "players/statistics",
    params: [teamId(), season],
    returns: "PlayersStatisticsResponse",
    summary: "Every box-score line for a team's players in a season.",
  },
  {
    name: "getPlayerStatisticsByPlayerAndSeason",
    group: "Statistics",
    endpoint: "players/statistics",
    params: [{ name: "playerId", type: "Int", query: "id", example: "", hint: "Find a player id with searchPlayers." }, season],
    returns: "PlayersStatisticsResponse",
    summary: "Every box-score line for one player in a season.",
  },
  {
    name: "getStandingsByConferenceAndSeason",
    group: "Standings",
    endpoint: "standings",
    params: [{ name: "conference", type: "String", query: "conference", example: "east", hint: "east or west" }, season],
    fixed: { league: "standard" },
    returns: "StandingsResponse",
    summary: "Standings for a conference in the standard league.",
  },
  {
    name: "getStandingsByDivisionAndSeason",
    group: "Standings",
    endpoint: "standings",
    params: [{ name: "division", type: "String", query: "division", example: "atlantic" }, season],
    fixed: { league: "standard" },
    returns: "StandingsResponse",
    summary: "Standings for a division in the standard league.",
  },
  {
    name: "getStandingsByTeamAndSeason",
    group: "Standings",
    endpoint: "standings",
    params: [teamId(), season],
    fixed: { league: "standard" },
    returns: "StandingsResponse",
    summary: "One team's standing in the standard league.",
  },
];
