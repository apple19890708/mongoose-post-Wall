
const { HEADERS } = require('../utils/constant');
const {getRoom, postRoom, deleteRoom, patchRoom} = require('../apis/index');
const routeWrapper = require('./common/routeWrapper');
const routePath = 'rooms';

	const roomsRoute = async (req, res) => {
		let body = "";
    req.on('data', chuck => {
        body += chuck;
    });
		const METHOD = req.method;
		switch (METHOD) {
			case 'GET':
				getRoom(res)
				break;
			case 'POST':
				req.on('end', () => {
					postRoom(req, res, body);
				});
				break;
			case 'DELETE':
				deleteRoom(req, res);
				break;
			case 'PATCH':
				req.on('end', () => {
					patchRoom(req, res, body)
				});
				break;
			case 'OPTIONS':
				res.writeHead(200, HEADERS)
      	res.end()
				break;
			default:
				break;

		}
	}


module.exports = routeWrapper(routePath, roomsRoute)