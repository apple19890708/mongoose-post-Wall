const { HEADERS } = require('../utils/constant');
const { getPost, postPost, deletePost, patchPost } = require('../apis/index');
const routeWrapper = require('./common/routeWrapper');
const routePath = 'posts';

const postsRoute = async (req, res) => {
	let body = "";
    req.on('data', chuck => {
        body += chuck;
    });
	const METHOD = req.method;
	switch (METHOD) {
		case 'GET':
			getPost(res)
			break;
		case 'POST':
			req.on('end', () => {
				postPost(req, res, body)
			})
			break;
		case 'DELETE':
			deletePost(req, res);
			break;
		case 'PATCH':
			req.on('end', () => {
				patchPost(req, res, body)
			});
			break;
		case 'OPTIONS':
			res.writeHead(200, HEADERS)
			res.end()
			break;
		default:
			break;
	}
};

module.exports = routeWrapper(routePath, postsRoute)