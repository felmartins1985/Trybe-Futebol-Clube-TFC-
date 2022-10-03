const calculateGoals = (matchHome:any, matchAway:any) => {
  const goalsDone = matchHome.goalsFavor + matchAway.goalsFavor;
  const goalsTaken = matchAway.goalsOwn + matchHome.goalsOwn;
  const goalsDifference = goalsDone - goalsTaken;
  return { goalsDone, goalsTaken, goalsDifference };
};

const calculateMatch = (matchHome: any, matchAway: any) => {
  const win = matchHome.totalVictories + matchAway.totalVictories;
  const defeat = matchHome.totalLosses + matchAway.totalLosses;
  const draws = matchHome.totalDraws + matchAway.totalDraws;
  const total = matchHome.totalPoints + matchAway.totalPoints;
  return { win, defeat, draws, total };
};

const calculateEfficacy = (matchHome:any, matchAway:any) => {
  const totalPoints = matchHome.totalPoints + matchAway.totalPoints;
  const totalGames = matchHome.totalGames + matchAway.totalGames;
  return Number(((totalPoints / (totalGames * 3)) * 100)).toFixed(2);
};

const calculateLeaderboard = (matchesHome: any, matchesAway: any) => matchesHome
  .map((matchHome: any) => {
    const matchAway = matchesAway.find((match: any) => match.name === matchHome.name);
    const { goalsDone, goalsTaken, goalsDifference } = calculateGoals(matchHome, matchAway);
    const { win, defeat, draws, total } = calculateMatch(matchHome, matchAway);
    const efficacy = calculateEfficacy(matchHome, matchAway);
    return {
      name: matchHome.name,
      totalPoints: total,
      totalGames: matchHome.totalGames + matchAway.totalGames,
      totalVictories: win,
      totalDraws: draws,
      totalLosses: defeat,
      goalsFavor: goalsDone,
      goalsOwn: goalsTaken,
      goalsBalance: goalsDifference,
      efficiency: efficacy,
    };
  });

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
