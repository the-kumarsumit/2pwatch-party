const SERVER_URL = import.meta.env.VITE_SERVER_URL;

let intervalId = null;

export function startKeepAlive() {
  if (intervalId) return;

  // Ping immediately
  fetch(`${SERVER_URL}/health`).catch(() => {});

  // Then ping every 14 minutes
  intervalId = setInterval(() => {
    fetch(`${SERVER_URL}/health`).catch(() => {});
  }, 10 * 60 * 1000);
}

export function stopKeepAlive() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}