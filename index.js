import { WebSocketServer } from 'ws';
import express from 'express';
import cookieSession from 'cookie-session';

const app = express();
const port = 3000;

app.use(cookieSession({ secret: 'manny is cool' }));

const activeSessions = [];

app.get('/', (req, res) => {
	if (!req.session.key) {
		const sessionKey = Date.now().toString();
		req.session.key = sessionKey
		activeSessions.push(sessionKey);
	}
	res.send(sessionKey);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
	ws.on('error', console.error);

	ws.on('message', function message(data) {
		console.log('received: %s', data);
	});

	ws.send('something');
});
