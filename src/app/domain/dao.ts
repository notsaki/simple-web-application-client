import {User, UserDto, UserListItemDto} from "./entities/user.entity";
import {Admin} from "./entities/admin.entity";
import {Jwt, RefreshJwt} from "./entities/jwt.entity";

/**
 * Access user date from the API.
 */
export interface UserDao {
	/**
	 * Save a new user. Possible status codes: 201, 400, 401, 422.
	 * @param user User data excluding the ID.
	 * @returns User The created user including the ID.
	 * @throws For unauthorised request (401), invalid user format (422) and invalid JSON format or invalid gender value
	 * (400).
	 */
	save(user: UserDto): Promise<User>;

	/**
	 * Remove a user. Possible status codes: 204, 401, 404.
	 * @param id The user ID.
	 * @throws For unauthorised request (401), invalid ID format (400) or the user ID was not found (404).
	 */
	remove(id: number): Promise<void>;

	/**
	 * Update a user. Possible status codes: 200, 400, 401, 403, 404, 422.
	 * @param id the user ID.
	 * @param user User data excluding the ID.
	 * @returns User The updated user including the ID.
	 * @throws For unauthorised request (401),
	 */
	updateById(id: number, user: UserDto): Promise<User>;

	/**
	 * Retrieve all users. Possible status codes: 200, 401
	 * @returns UserListItemDto[] A list of users' ID, name and surname.
	 * @throws For unauthorised request (401), for invalid CSRF token (403), invalid ID format (400), user not found (404), invalid us
	 */
	findAll(): Promise<UserListItemDto[]>;

	/**
	 * Retrieve user data that matches the specified ID. Possible status codes: 200, 400, 401, 403, 404.
	 * @param id The user ID.
	 * @throws For unauthorised request (401), for invalid CSRF token (403), for invalid ID or JSON body format or gender
	 * value (400) and for user not found (404), invalid user format (422).
	 */
	findById(id: number): Promise<User>;
}

export interface AuthDao {
	/**
	 * Authorise session. Possible status codes: 201, 401, 403.
	 * @param admin The admin credentials.
	 * @throws For invalid username or password (401), for invalid CSRF token (403).
	 */
	login(admin: Admin): Promise<Jwt>;

	/**
	 * Retrieve a new CSRF token and check if session is authorised. Possible status codes: 204, 401, 403.
	 * @throws For invalid CSRF token (403), for unauthorised session (401).
	 */
	token(): Promise<Jwt>;

	/**
	 * Remove authorisation from session. Possible status codes: 204, 401, 403.
	 * @throws For invalid CSRF token (403), unauthorised session (401).
	 */
	logout(): Promise<void>;
}