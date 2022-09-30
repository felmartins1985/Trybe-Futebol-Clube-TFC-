const calculateGoals = (matches: any) => {
  const goalsDone = matches.reduce((acc: number, match: any) => acc + match.homeTeamGoals, 0);
  const goalsTaken = matches.reduce((acc: number, match: any) => acc + match.awayTeamGoals, 0);
  const goalsDifference = goalsDone - goalsTaken;
  return { goalsDone, goalsTaken, goalsDifference };
};

const calculateMatch = (matches: any) => {
  let win = 0;
  let defeat = 0;
  let draws = 0;
  let total = 0;
  matches.forEach((match: any) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      win += 1; total += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
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

const calculateLeaderboard = ({ teamName, matchesHome }:any) => {
  const { goalsDone, goalsTaken, goalsDifference } = calculateGoals(matchesHome);
  const { win, defeat, draws, total } = calculateMatch(matchesHome);
  const efficacy = calculateEfficacy(total, matchesHome.length);
  return {
    name: teamName,
    totalPoints: total,
    totalGames: matchesHome.length,
    totalVictories: win,
    totalDraws: draws,
    totalLosses: defeat,
    goalsFavor: goalsDone,
    goalsOwn: goalsTaken,
    goalsBalance: goalsDifference,
    efficiency: efficacy.toFixed(2),
  };
};

const sortLeaderboard = (leaderboard: any) => {
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
export { calculateLeaderboard, sortLeaderboard };
