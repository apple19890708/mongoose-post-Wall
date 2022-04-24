const { errorHandle } = require('../../handler/index');
const routeErrorsHandler = require('../routeErrorsHandler');

const routeWrapper = (routePath, targetRoute) => {
	return (req, res) => {
		if (routeErrorsHandler(req, routePath)) {
			errorHandle(res, '無此網站路由', 404)
      return
		};
		return targetRoute.call(this, req, res);
	}
};

module.exports = routeWrapper;


