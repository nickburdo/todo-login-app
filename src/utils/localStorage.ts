const FAVORITES_KEY = 'favoriteTodoIds';

export function toggleFavorite(todoId: number) {
  let favoriteIds = getFavoriteTodoIds();
  if (favoriteIds.includes(todoId)) {
    favoriteIds = favoriteIds.filter(id => id !== todoId)
  } else {
    favoriteIds.push(todoId)
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
}

export function getFavoriteTodoIds(): number[] {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]')
}
