const {successHandle, errorHandle} = require('../../handler/index');
const Post = require('../../models/post');

const getPost = async (res) => {
	try {
		const posts = await Post.find();
		successHandle(res, posts)
	} catch (error) {
		console.log('errorHandle', errorHandle)
		errorHandle(res, '頁面發生問題，請稍後再試。')
	}
};

module.exports = getPost;