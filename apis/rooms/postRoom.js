const {successHandle, errorHandle} = require('../../handler/index')
const Room = require('../../models/room');

const postRoom = async (req, res, body) => {
	try {
		const data = JSON.parse(body);
		if (data != {}) {
			await Room.create({
				name: data.name,
				price: data.price,
				rating: data.rating
			});
			const rooms = await Room.find();
      successHandle(res, rooms)
		} else {
      errorHandle(res, 'data 未正確填寫')
    }
	} catch (error) {
		errorHandle(res, 'JSON 格式錯誤')
	}
};

module.exports = postRoom;