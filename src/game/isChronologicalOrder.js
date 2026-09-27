export function isChronologicalOrder(albums) {
  return albums.every((album, index) => index === 0 || albums[index - 1].year < album.year);
}
