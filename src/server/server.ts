import express from 'express';
import routerApi from '../routes';
import cors from 'cors';
import * as middlewareFunctions from '../middlewares/error.handler';
import helmet from 'helmet';

const app = express();

const whitelist = ['http://localhost:3000', 'https://myapp.co'];
const options = {
	origin: (origin: any, callback: any) => {
		if (origin === undefined || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('no permitido'));
		}
	}
};
app.use(cors(options));
app.use(helmet());
app.use(express.json());

app.get('/', (req: any, res: any) => {
	res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req: any, res: any) => {
	res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(middlewareFunctions.logErrors);
app.use(middlewareFunctions.boomErrorHandler);
app.use(middlewareFunctions.errorHandler);

export default app;
