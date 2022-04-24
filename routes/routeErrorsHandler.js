const routeErrorHandler = (req, routePath) => {
	let error = true;
	const routePathName = routePath.split('/').filter(item => item)[0];
	const splitReqUrl = req.url.split('/').filter(item => item);

	if(splitReqUrl.includes(routePathName)) { // 判斷路由是否正確
		if(req.url.startsWith(`/${routePathName}`)) { // 排除為startsWith的情況
			switch (req.method) {
				case 'DELETE':
        case 'PATCH':
          error = false
          break
        case 'GET':
        case 'POST':
        case 'OPTIONS':
        default:
          if (splitReqUrl.length === 1) error = false
          break
      }
		}
	}
	return error
}

module.exports = routeErrorHandler;