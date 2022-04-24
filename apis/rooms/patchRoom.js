const { errorHandle, successHandle } = require('../../handler');
const Room = require('../../models/room');

const patchRoom = async (req, res, body) => {
	const id = req.url.split('/').pop();
	try {
		if (id) {
			const data = JSON.parse(body);
			const rooms = await Room.findByIdAndUpdate(
				id, 
				{...data},
				{
				returnDocument: 'after',
				}
			);
			if (rooms) {
        successHandle(res, {data: rooms})
      }
		} 
	} catch (error) {
		errorHandle(res, {data: `ID: '${id}' 不存在`})
	}
};

module.exports = patchRoom;
