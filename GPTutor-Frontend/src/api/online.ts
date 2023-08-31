const BACKEND_HOST = _env_.REACT_APP_BACKEND_HOST_WS;

export function online() {
  try {
    const socket = new WebSocket(`${BACKEND_HOST}online${location.search}`);

    socket.onerror = function (event) {
      console.log(event);
    };
  } catch (e) {
    console.log(e);
  }
}
