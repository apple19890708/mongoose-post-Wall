const getRoom = require('./rooms/getRoom');
const postRoom = require('./rooms/postRoom');
const deleteRoom = require('./rooms/deleteRoom');
const patchRoom = require('./rooms/patchRoom');
const getPost = require('./posts/getPost');
const postPost = require('./posts/postPost');
const deletePost = require('./posts/deletePost');
const patchPost = require('./posts/patchPost');

module.exports = {
	getRoom,
	postRoom,
	deleteRoom,
	patchRoom,
	getPost,
	postPost,
	deletePost,
	patchPost
}