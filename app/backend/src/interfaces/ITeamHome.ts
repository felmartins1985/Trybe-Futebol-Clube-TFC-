export interface ITeamMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeamHome {
  id: number,
  teamName: string,
  matchesHome: ITeamMatch[],
}

export interface ITeamAway {
  id: number,
  teamName: string,
  matchesAway: ITeamMatch[],
}
