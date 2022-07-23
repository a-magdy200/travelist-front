const config = {
	apiUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:4000',
	webSocketUrl: process.env.REACT_APP_WEBSOCKET_URL ?? 'ws://localhost:4000',
}
export default config
