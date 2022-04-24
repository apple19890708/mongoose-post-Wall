const { errorHandle, successHandle } = require('../../handler');
const Post = require('../../models/post');

const patchPost = async (req, res, body) => {
	const id = req.url.split('/').pop();
	try {
		if (id) {
			const data = JSON.parse(body);
			const posts = await Post.findByIdAndUpdate(
				id, 
				{...data},
				{
				returnDocument: 'after',
				}
			);
			if (posts) {
        successHandle(res, {data: posts})
      }
		} 
	} catch (error) {
		errorHandle(res, {data: `ID: '${id}' 不存在`})
	}
};

module.exports = patchPost;
