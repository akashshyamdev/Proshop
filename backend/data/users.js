import bcrypt from 'bcryptjs';

const users = [
	{ name: 'Admin', email: 'admin@example.com', password: bcrypt.hashSync('123456', 12), isAdmin: true },
	{ name: 'user1', email: 'user1@example.com', password: bcrypt.hashSync('123456', 12) },
	{ name: 'user1', email: 'user2@example.com', password: bcrypt.hashSync('123456', 12) },
];

export default users;
