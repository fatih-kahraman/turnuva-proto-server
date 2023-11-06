import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const clientPath = path.join('..', 'client', 'dist');
console.log(clientPath);

app.use(express.static(clientPath))

app.get('/', (req, res) => {
	res.sendFile(path.join(clientPath, 'index.html'));
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
