export function fullScreen() {
  const element = document.documentElement;
  element.requestFullscreen();
}

export function cancelFullScreen() {
  document.exitFullscreen();
}
