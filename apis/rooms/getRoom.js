const {successHandle, errorHandle} = require('../../handler/index');
const Room = require('../../models/room');

const getRoom = async (res) => {
	try {
		const rooms = await Room.find();
		successHandle(res, rooms)
	} catch (error) {
		console.log('errorHandle', errorHandle)
		errorHandle(res, '頁面發生問題，請稍後再試。')
	}
};

module.exports = getRoom;