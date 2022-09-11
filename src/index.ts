import app from './server/server';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('My port ' + port);
});
