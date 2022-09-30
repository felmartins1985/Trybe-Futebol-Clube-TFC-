const calculateGoals = (matches: any) => {
  const goalsDone = matches.reduce((acc: number, match: any) => acc + match.awayTeamGoals, 0);
  const goalsTaken = matches.reduce((acc: number, match: any) => acc + match.homeTeamGoals, 0);
  const goalsDifference = goalsDone - goalsTaken;
  return { goalsDone, goalsTaken, goalsDifference };
};

const calculateMatch = (matches: any) => {
  let win = 0;
  let defeat = 0;
  let draws = 0;
  let total = 0;
  matches.forEach((match: any) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      win += 1; total += 3;
    } else if (match.awayTeamGoals < match.homeTeamGoals) {
      defeat += 1;
    } else {
      draws += 1; total += 1;
    }
  });
  return { win, defeat, draws, total };
};

const calculateEfficacy = (points: number, matches:number) => {
  const efficacy = (points / (matches * 3)) * 100;
  return efficacy;
};

const calculateLeaderboardA = ({ teamName, matchesAway }:any) => {
  const { goalsDone, goalsTaken, goalsDifference } = calculateGoals(matchesAway);
  const { win, defeat, draws, total } = calculateMatch(matchesAway);
  const efficacy = calculateEfficacy(total, matchesAway.length);
  return {
    name: teamName,
    totalPoints: total,
    totalGames: matchesAway.length,
    totalVictories: win,
    totalDraws: draws,
    totalLosses: defeat,
    goalsFavor: goalsDone,
    goalsOwn: goalsTaken,
    goalsBalance: goalsDifference,
    efficiency: efficacy.toFixed(2),
  };
};

const sortLeaderboardA = (leaderboard: any) => {
  const sortedLeaderboard = leaderboard.sort((a: any, b: any) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });
  return sortedLeaderboard;
};
export { calculateLeaderboardA, sortLeaderboardA };
