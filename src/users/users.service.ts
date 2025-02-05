import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name);
		await user.setPassword(password);
		return user;
	}

	validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return Promise.resolve(true);
	}
}
