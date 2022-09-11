import { badRequest, Boom } from '@hapi/boom';
import { ObjectSchema } from 'joi';

export default function validatorHandler(schema: ObjectSchema<any>, property: string) {
	return (req: any, res: any, next: Function) => {
		const data = req[property];

		const { error } : any = schema.validate(data, { abortEarly: false });
		if (error) {
			next(badRequest(error));
		}
		next();
	};
}
