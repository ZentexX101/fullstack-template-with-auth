const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");

const moduleRoutes = [
	{
		path: "/auth",
		route: authRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
