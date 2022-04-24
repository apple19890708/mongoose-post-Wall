const {successHandle, errorHandle} = require('../../handler/index')
const Post = require('../../models/post');

const postPost = async (req, res, body) => {
	try {
		const data = JSON.parse(body);
		if (data.content !== undefined) {
			await Post.create({
				name: data.name,
				content: data.content,
			});
			const posts = await Post.find();
      successHandle(res, posts)
		} else {
      errorHandle(res, 'data 未正確填寫')
    }
	} catch (error) {
		errorHandle(res, 'JSON 格式錯誤')
	}
};

module.exports = postPost;