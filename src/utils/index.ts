export const sortAscending = (a: string, b: string) => a.length - b.length
export const sortStatsAscending = (a: BaseStat, b: BaseStat) =>
  sortAscending(a.stat.name, b.stat.name)
