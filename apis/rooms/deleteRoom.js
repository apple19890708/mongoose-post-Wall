const { successHandle, errorHandle } = require('../../handler/index');
const Room = require('../../models/room');

const deleteRoom = async (req, res) => {
	const splitUrl = req.url.split('/').filter(item => item);
	switch (splitUrl.length) {
		case 1:
			await Room.deleteMany({});
			successHandle(res, {data: []});
			break;
		case 2:
			try {
				const id = req.url.split('/').pop();
				const rooms = await Room.findByIdAndDelete(id);
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

module.exports = deleteRoom;