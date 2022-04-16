const http = require("http");
const mongoose = require('mongoose'); // 載入mongoose
const Room = require('./models/room'); // 載入Room Model
const dotenv = require('dotenv');

dotenv.config({path:"./config.env"});

// 使用環境變數保護連線方式

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

// 連接資料庫
mongoose.connect(DB) // 指定要到的資料庫
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error);
    });

// 建立新資料 方法1
// const testRoom = new Room(
//     {
//         name: '宇宙級套房69',
//         price: 6666,
//         rating: 5.0
//     }
// );

// testRoom.save()
//     .then(()=> {
//         console.log('建立資料成功')
//     })
//     .catch(error => {
//         console.log(error.errors)
//     })

// 建立新資料 方法2 create = new + save
// Room.create(
//     {
//         name: '宇宙級套房model版',
//         price: 6666,
//         rating: 5.0
//     }
// )
//     .then(() => {
//         console.log('資料寫入成功')
//     })
//     .catch(error => {
//         console.log(error.errors)
//     })


// 查看room內的資料
// const init = async () => {
//     const AllRoom = await Room.find();
//     console.log(AllRoom)
// }
// init();


const requestListener = async (req,res)=>{
    let body = "";
    req.on('data', chuck => {
        body += chuck;
    })

    const headers = {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    if (req.url=="/rooms" && req.method == "GET") { // 取得資料API
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            rooms
        }))
        res.end();
    } else if (req.url=="/rooms" && req.method == "POST") {
        req.on('end', async() => {
            try {
                const data = JSON.parse(body);
                const newRoom = await Room.create(
                    {
                        name: data.name,
                        price: data.price,
                        rating: data.rating
                    }
                )
                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    "status": "success",
                    rooms: newRoom
                }))
                res.end();
            } catch (error) {
                console.log(error);
                res.writeHead(400, headers);
                res.write(JSON.stringify({
                    "status": "false",
                    "message": "欄位不正確，或沒此ID"
                }))
                res.end();
            }
        })
    } else if (req.url=="/rooms" && req.method == "DELETE") {
        const rooms = await Room.deleteMany({});
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            "message": "刪除全部資料",
            rooms
        }))
        res.end();
    } else if (req.url.startsWith("/rooms/") && req.method == "DELETE") {
        req.on('end', async () => {
            try {
                const id = req.url.split('/').pop();
                await Room.findByIdAndDelete(id);
                res.writeHead(200,headers);
                res.write(JSON.stringify({
                    "status": "success",
                    "data": null,
                }));
                res.end();
            } catch (error) {
                res.writeHead(400,headers);
                res.write(JSON.stringify({
                    "status": "false",
                    "message": "沒此ID"
                }))
                res.end();
            }
        })
    } else if (req.url=="/rooms" && req.method == "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    }
}
const server = http.createServer(requestListener);
server.listen(process.env.PORT);