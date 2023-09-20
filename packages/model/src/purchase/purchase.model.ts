import { IUser } from '../user/user.model';

export interface IPurchase {
	id: string;
	name: string;
	total: number;
	user: IUser;
}
