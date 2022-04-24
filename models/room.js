// 建立新資料Schema
const {Schema, model} = require('mongoose');

const roomSchema = new Schema(
	{
			name: String,
			price: {
					type: Number,
					required: [true, "價格必填"]
			},
			rating: Number,
			// 自定義時間，不使用 timestamps
			createdAt: {
					type: Date,
					default: Date.now(),
					select: false  // 如果不希望在 .find() 時被搜尋到可以寫 false 將其保護起來
			}
	},
	{
			versionKey: false,
			// collection 固定名稱，後面不加上 s 方法
			// collection: 'room',
	}
)

// 建立新資料model
const Room = model('Room', roomSchema);

module.exports = Room;