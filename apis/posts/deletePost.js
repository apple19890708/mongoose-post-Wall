const { successHandle, errorHandle } = require('../../handler/index');
const Post = require('../../models/post');

const deletePost = async (req, res) => {
	const splitUrl = req.url.split('/').filter(item => item);
	switch (splitUrl.length) {
		case 1:
			await Post.deleteMany({});
			successHandle(res, {data: []});
			break;
		case 2:
			try {
				const id = req.url.split('/').pop();
				const rooms = await Post.findByIdAndDelete(id);
				successHandle(res, rooms);
			} catch (error) {
				errorHandle(res, '此id不存在');
			}
			break;
		default:
			errorHandle(res, '此id不存在');
			break;

	}
};

module.exports = deletePost;