const env = {
	database: 'nuxtdb',
	username: 'postgres',
	password: 'test',
	host: 'localhost',
	dialect: "sqlite",  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};

module.exports = env;