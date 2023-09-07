const mongoose = require("mongoose");
const {Artist , User, Song, Playlist, PlaylistCategory} = require("./src/models/model");

const db = require("./src/utils/db");
db.Connect();

async function initDatabase() {
    const artists = [
        {
            image: {
                squareImg: "439dc6a8-727e-449e-be39-746d4d5db7d2.jpg",
                bannerImg: "b53c821f-1510-4cc7-a711-6331bc94f677.jpg"
            },
            _id: "6443be5bf2138107ced5a1f2",
            name: "Sơn tùng MTP",
            gender: true,
            birthday: "1994-05-07",
            view: 0,
            albums: [],
            content: "Sơn Tùng M-TP (tên thật là Nguyễn Thanh Tùng) sinh ra và lớn lên tại một vùng quê của tỉnh Thái Bình. Vốn sở hữu “gen di truyền” từ người mẹ của mình, một nghệ sĩ biểu diễn hát chèo tại Nhà hát Thái Bình nên Tùng đã bộc lộ khả năng âm nhạc của mình ngay từ khi còn là một cậu bé mới chập chững những bước đi đầu tiên.",
            createdAt: "2023-04-22T11:00:43.859Z",
            author: "6443be5bf2138107ced5a218",
            __v: 0
        },
        {
            image: {
                squareImg: "7e24b10b-7eb9-4b2a-96ce-a4c6a86ac9a3.jpg",
                bannerImg: "1a07e1d8-fcb0-4e5a-809b-39471b84bebc.jpg"
            },
            _id: "6443be5bf2138107ced5a1f8",
            name: "Hà Anh Tuấn",
            gender: true,
            birthday: "1984-12-17",
            view: 0,
            albums: [],
            content: "Năm 2006, theo lời một số bạn bè 'xúi giục', Hà Anh Tuấn tạm gác lại chương trình đại học bên Đức và trở về Việt Nam đăng kí tham dự cuộc thi Sao Mai điểm hẹn của Đài truyền hình Việt Nam, theo lời anh thì: 'Thi để chơi thôi. Ban đầu tôi không hề nghĩ có thể đoạt giải gì vì mình là dân ngoại đạo trong khi hầu hết thí sinh khác từng đi hát chuyên nghiệp. Nhưng khi thấy lượng khán giả tăng lên theo từng vòng, tôi biết mình có thể đạt được một cái gì đó, nhưng được một trong ba giải cao nhất thì thật bất ngờ'.",
            createdAt: "2023-04-22T11:00:43.861Z",
            author: "6443be5bf2138107ced5a21e",
            __v: 0
        },
        {
            image: {
                squareImg: "8138d683-3381-402a-a2ce-e10c288edb5f.jpg",
                bannerImg: "c037eaa1-736d-42cf-b7dd-4dd6ba702996.jpg"
            },
            _id: "6443be5bf2138107ced5a1f9",
            name: "Trúc Nhân",
            gender: true,
            birthday: "1995-03-10",
            view: 0,
            albums: [],
            content: "Trúc Nhân tham gia Giọng hát Việt năm 2012, là thí sinh trong đội Thu Minh và lọt vào Top 8 của chương trình. 2013, sau Giọng hát Việt, Trúc Nhân ra mắt mini album Đông[3] gồm các ca khúc được khán giả yêu thích và biết đến Trúc Nhân qua cuộc thi như: Gió mùa về (Lê Minh Sơn), Mercy và Đông (Vũ Cát Tường). Trúc Nhân nhận được sự ủng hộ của người thầy là huấn luyện viên - ca sĩ Thu Minh, nhà sản xuất âm nhạc Nguyễn Hải Phong và các nhạc sĩ khác khi thực hiện album này.",
            createdAt: "2023-04-22T11:00:43.862Z",
            author: "6443be5bf2138107ced5a21f",
            __v: 0
        },
        {
            image: {
                squareImg: "e43fee81-8eff-4924-90c7-e8770968f562.jpg",
                bannerImg: "52eee426-9c10-495e-99d1-9a67d359eb96.jpg"
            },
            _id: "6443be5bf2138107ced5a1f1",
            name: "Noo Phước Thịnh",
            gender: true,
            birthday: "1988-12-18",
            view: 0,
            albums: [],
            content: "Các album đã phát hành: Album 'Ba chấm', Single 'Đổi thay', Single 'Nỗi nhớ đầy vơi', Album 'Lạc bước trong đêm' phát hành ngày 21/11/2011, Mini album 'EM' phát hành ngày 22/11/2012. Năm 2013, Noo ra mắt MV 'Chờ ngày mưa tan' cùng với rapper Tonny Việt. Trong đó, phân nửa MV được quay tại Hàn Quốc. Bài hát cũng nhanh chóng trở thành hit, thống trị các bảng xếp hạng thời điểm đó",
            createdAt: "2023-04-22T11:00:43.859Z",
            author: "6443be5bf2138107ced5a217",
            __v: 0
        },
        {
            image: {
                squareImg: "0bfc9427-dcf7-429c-a16d-984375385a6f.jpg",
                bannerImg: "0eaf1f12-57b3-4103-8ae4-342129e7cf56.jpg"
            },
            _id: "6443be5bf2138107ced5a1f3",
            name: "Phương Ly",
            gender: false,
            birthday: "1997-10-13",
            view: 0,
            albums: [],
            content: "Phương Ly tên đầy đủ là Trần Phương Ly, sinh năm 1990, vốn được khán giả bắt đầu biết đến khi tham gia chương trình Vietnam Idol năm 2007. Sau chương trình, Phương Ly gần như im hơn lặng tiếng và ít xuất hiện trên các phương tiện truyền thông trừ những lúc tham gia biểu diễn cùng chị gái - nữ ca sỹ Phương Linh. Đầu năm 2015, Phương Ly bắt đầu trở lại showbiz và đầu quân vào công ty OnOn Entertainment.",
            createdAt: "2023-04-22T11:00:43.860Z",
            author: "6443be5bf2138107ced5a219",
            __v: 0
        },
        {
            image: {
                squareImg: "423b150e-70bc-4cb1-958b-74d0dd28f287.png",
                bannerImg: "bc1e9f4-3531-4ff0-903d-4e74400c0fc9.jpg"
            },
            _id: "6443be5bf2138107ced5a1fa",
            name: "Vũ.",
            gender: true,
            birthday: "1995-3-10",
            view: 0,
            albums: [],
            content: "Vũ, được viết cách điệu là Vũ tên đầy đủ là Hoàng Thái Vũ sinh tại Hà Nội, là ca sĩ kiêm sáng tác nhạc người Việt Nam.Sinh ra trong gia đình có bố là quân nhân và mẹ là giáo viên, Vũ thường đăng tải các sáng tác của mình trên Soundcloud. Thể loại của anh theo đuổi là nhạc indie pop, acoustic, rock... .Trước khi đi hát, Vũ từng gia nhập quân ngũ và làm giảng viên tiếng Anh tại một trường quân sự. Đây cũng chính là khoảng thời gian anh sáng tác.",
            createdAt: "2023-04-22T11:00:43.862Z",
            author: "6443be5bf2138107ced5a220",
            __v: 0
        }
    ]

    const songs =[
        {
            _id: "6443be5bf2138107ced5a1fc",
            title: "Mãi Mãi Bên Nhau",
            artist: [
                "6443be5bf2138107ced5a1f1"
            ],
            playlist: [],
            link: "4d69e0f7-a2cb-4302-973f-8b761f8a9ca1.mp3",
            year: 2014,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            desc: "'Mãi Mãi Bên Nhau' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            comment: [],
            lyrics: [
                {
                    "time": 18.531311,
                    "lyric": "Xin em đừng ra đi",
                    "_id": "6443e27a34c3928ce6911dbb"
                },
                {
                    "time": 21.906429,
                    "lyric": "Con tim anh vẫn mãi yêu em từng ngày nào",
                    "_id": "6443e27a34c3928ce6911dbc"
                },
                {
                    "time": 26.964648,
                    "lyric": "Cho anh chạm nhẹ phút giây",
                    "_id": "6443e27a34c3928ce6911dbd"
                },
                {
                    "time": 30.454531,
                    "lyric": "Làn gió dịu êm đưa em ra đi, em đang chốn nào ?",
                    "_id": "6443e27a34c3928ce6911dbe"
                },
                {
                    "time": 34.027483,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dbf"
                },
                {
                    "time": 35.099048,
                    "lyric": "Mình anh ngồi đây mong chờ em !",
                    "_id": "6443e27a34c3928ce6911dc0"
                },
                {
                    "time": 38.514625,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dc1"
                },
                {
                    "time": 40.198493,
                    "lyric": "Hãy níu em về đi, quay về trở lại trở lại giây phút đầu",
                    "_id": "6443e27a34c3928ce6911dc2"
                },
                {
                    "time": 44.660288,
                    "lyric": "Đừng bỏ lại anh nữa mà, chỉ còn lại kí ức đó",
                    "_id": "6443e27a34c3928ce6911dc3"
                },
                {
                    "time": 50.17524,
                    "lyric": "Với một niềm đâu...",
                    "_id": "6443e27a34c3928ce6911dc4"
                },
                {
                    "time": 52.039564,
                    "lyric": "Chìm sâu vào những giấc ngủ say",
                    "_id": "6443e27a34c3928ce6911dc5"
                },
                {
                    "time": 54.331636,
                    "lyric": "Liệu anh có thể lại xa đôi môi ấy",
                    "_id": "6443e27a34c3928ce6911dc6"
                }
            ],
            createdAt: "2023-04-22T11:00:43.863Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a1fd",
            title: "Xa Em",
            artist: [
                "6443be5bf2138107ced5a1f1"
            ],
            playlist: [],
            link: "b5909cb9-99bd-433d-bf2c-eb4b5b40eb32.mp3",
            year: 2014,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            desc: "'Xa em' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            comment: [],
            lyrics: [],
            createdAt: "2023-04-22T11:00:43.863Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a1fe",
            title: "Xin lỗi em",
            artist: [
                "6443be5bf2138107ced5a1f1"
            ],
            desc: "'Xin lỗi em' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "4d69e0f7-a2cb-4302-973f-8b761f8a9ca1.mp3",
            year: 2014,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 18.531311,
                    "lyric": "Xin em đừng ra đi",
                    "_id": "6443e27a34c3928ce6911dbb"
                },
                {
                    "time": 21.906429,
                    "lyric": "Con tim anh vẫn mãi yêu em từng ngày nào",
                    "_id": "6443e27a34c3928ce6911dbc"
                },
                {
                    "time": 26.964648,
                    "lyric": "Cho anh chạm nhẹ phút giây",
                    "_id": "6443e27a34c3928ce6911dbd"
                },
                {
                    "time": 30.454531,
                    "lyric": "Làn gió dịu êm đưa em ra đi, em đang chốn nào ?",
                    "_id": "6443e27a34c3928ce6911dbe"
                },
                {
                    "time": 34.027483,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dbf"
                },
                {
                    "time": 35.099048,
                    "lyric": "Mình anh ngồi đây mong chờ em !",
                    "_id": "6443e27a34c3928ce6911dc0"
                },
                {
                    "time": 38.514625,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dc1"
                },
                {
                    "time": 40.198493,
                    "lyric": "Hãy níu em về đi, quay về trở lại trở lại giây phút đầu",
                    "_id": "6443e27a34c3928ce6911dc2"
                },
                {
                    "time": 44.660288,
                    "lyric": "Đừng bỏ lại anh nữa mà, chỉ còn lại kí ức đó",
                    "_id": "6443e27a34c3928ce6911dc3"
                },
                {
                    "time": 50.17524,
                    "lyric": "Với một niềm đâu...",
                    "_id": "6443e27a34c3928ce6911dc4"
                },
                {
                    "time": 52.039564,
                    "lyric": "Chìm sâu vào những giấc ngủ say",
                    "_id": "6443e27a34c3928ce6911dc5"
                },
                {
                    "time": 54.331636,
                    "lyric": "Liệu anh có thể lại xa đôi môi ấy",
                    "_id": "6443e27a34c3928ce6911dc6"
                }
            ],
            createdAt: "2023-04-22T11:00:43.863Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a1ff",
            title: "Ký ức xa xôi",
            artist: [
                "6443be5bf2138107ced5a1f1"
            ],
            playlist: [],
            desc: "'Ký ức xa xôi' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            link: "4d69e0f7-a2cb-4302-973f-8b761f8a9ca1.mp3",
            year: 2015,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 18.531311,
                    "lyric": "Xin em đừng ra đi",
                    "_id": "6443e27a34c3928ce6911dbb"
                },
                {
                    "time": 21.906429,
                    "lyric": "Con tim anh vẫn mãi yêu em từng ngày nào",
                    "_id": "6443e27a34c3928ce6911dbc"
                },
                {
                    "time": 26.964648,
                    "lyric": "Cho anh chạm nhẹ phút giây",
                    "_id": "6443e27a34c3928ce6911dbd"
                },
                {
                    "time": 30.454531,
                    "lyric": "Làn gió dịu êm đưa em ra đi, em đang chốn nào ?",
                    "_id": "6443e27a34c3928ce6911dbe"
                },
                {
                    "time": 34.027483,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dbf"
                },
                {
                    "time": 35.099048,
                    "lyric": "Mình anh ngồi đây mong chờ em !",
                    "_id": "6443e27a34c3928ce6911dc0"
                },
                {
                    "time": 38.514625,
                    "lyric": "Cơn mưa kia vẫn rơi",
                    "_id": "6443e27a34c3928ce6911dc1"
                },
                {
                    "time": 40.198493,
                    "lyric": "Hãy níu em về đi, quay về trở lại trở lại giây phút đầu",
                    "_id": "6443e27a34c3928ce6911dc2"
                },
                {
                    "time": 44.660288,
                    "lyric": "Đừng bỏ lại anh nữa mà, chỉ còn lại kí ức đó",
                    "_id": "6443e27a34c3928ce6911dc3"
                },
                {
                    "time": 50.17524,
                    "lyric": "Với một niềm đâu...",
                    "_id": "6443e27a34c3928ce6911dc4"
                },
                {
                    "time": 52.039564,
                    "lyric": "Chìm sâu vào những giấc ngủ say",
                    "_id": "6443e27a34c3928ce6911dc5"
                },
                {
                    "time": 54.331636,
                    "lyric": "Liệu anh có thể lại xa đôi môi ấy",
                    "_id": "6443e27a34c3928ce6911dc6"
                }
            ],
            createdAt: "2023-04-22T11:00:43.863Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a200",
            title: "Thương em là điều anh không thể ngờ",
            artist: [
                "6443be5bf2138107ced5a1f1"
            ],
            desc: "'Thương em là điều anh không thể ngờ' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2014,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a203",
            title: "Nắng ấm xa dần",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Nắng ấm xa dần' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2016,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a204",
            title: "Có chắc yêu là đây",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Có chắc yêu là đây' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2022,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a205",
            title: "Hãy trao cho anh",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Hãy trao cho anh' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2021,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a206",
            title: "Muộn rồi mà sao còn",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            playlist: [],
            desc: "'Muộn rồi mà sao còn' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2020,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a207",
            title: "Anh sai rồi",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Anh sai rồi' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2016,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a201",
            title: "Lạc trôi",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Lạc trôi' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2019,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443be5bf2138107ced5a202",
            title: "Âm thầm bên em",
            artist: [
                "6443be5bf2138107ced5a1f2"
            ],
            desc: "'Âm thầm bên em' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2017,
            image: "6afb8ff-0375-4e86-ac2c-a556bba921ba.jpg",
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:00:43.864Z",
            __v: 0
        },
        {
            _id: "6443bfa6041d9846d6335af2",
            title: "Lạ Lùng",
            artist: [
                "6443be5bf2138107ced5a1fa"
            ],
            desc: "'Lạ lùng' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2018,
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:06:14.051Z",
            __v: 0
        },
        {
            _id: "6443bfcd041d9846d6335af9",
            title: "Bước qua nhau",
            artist: [
                "6443be5bf2138107ced5a1fa"
            ],
            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2018,
            view: 0,
            desc: "'Bước qua nhau' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:06:53.073Z",
            __v: 0
        },
        {
            _id: "6443c054041d9846d6335b1c",
            title: "Có không giữ mất đừng tìm",
            artist: [
                "6443be5bf2138107ced5a1f9"
            ],
            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            year: 2019,
            view: 0,
            desc: "'Có không giữ mất đừng tìm' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:09:08.920Z",
            __v: 0
        },
        {
            _id: "6443c054041d9846d6335b1f",
            title: "Thật bất ngờ",
            artist: [
                "6443be5bf2138107ced5a1f9"
            ],
            playlist: [],
            link: "93e956a0-2275-435d-be78-c6a4b4c9f23e.mp3",
            desc: "'Thật bất ngờ' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            year: 2020,
            view: 0,
            comment: [],
            lyrics: [
                {
                    "time": 4.106465,
                    "lyric": "....",
                    "_id": "6443e0f6d5c1a89ccc7ec473"
                },
                {
                    "time": 29.877834,
                    "lyric": "Ѕóng vỗ rì rào ánh nắng dật dìu dàng taу ôm trọn thân ta",
                    "_id": "6443e0f6d5c1a89ccc7ec474"
                },
                {
                    "time": 35.140519,
                    "lyric": "Gió nói thầm thì cát trắng dìu êm đưa mâу baу cuốn ưu phiền",
                    "_id": "6443e0f6d5c1a89ccc7ec475"
                },
                {
                    "time": 39.876497,
                    "lyric": "Ɓình minh mang giọt sương ban mai",
                    "_id": "6443e0f6d5c1a89ccc7ec476"
                },
                {
                    "time": 43.180022,
                    "lyric": "cùng đàn chim phiêu dạt về nơi ấm áp",
                    "_id": "6443e0f6d5c1a89ccc7ec477"
                },
                {
                    "time": 45.588524,
                    "lyric": "Ɲơi con tim chờ mong ngàу mau tới",
                    "_id": "6443e0f6d5c1a89ccc7ec478"
                },
                {
                    "time": 47.904383,
                    "lyric": "Ɲơi đôi vai cuốn sầu lo lòng phơi phới",
                    "_id": "6443e0f6d5c1a89ccc7ec479"
                },
                {
                    "time": 50.536387,
                    "lyric": "Ɲhớ trên đôi mi trao hồn ta saу ngất ngâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47a"
                },
                {
                    "time": 55.635495,
                    "lyric": "Ɓước bao nô đùa hòa ca múa tung baу",
                    "_id": "6443e0f6d5c1a89ccc7ec47b"
                },
                {
                    "time": 59.644366,
                    "lyric": "Ϲho ta xin vài giâу đùa cùng mình tại đâу",
                    "_id": "6443e0f6d5c1a89ccc7ec47c"
                },
                {
                    "time": 63.356491,
                    "lyric": "Mang bên ta những уên bình",
                    "_id": "6443e0f6d5c1a89ccc7ec47d"
                }
            ],
            createdAt: "2023-04-22T11:09:08.923Z",
            __v: 0
        },
        {
            _id: "6443c0bd041d9846d6335b30",
            title: "Thích thích",
            artist: [
                "6443be5bf2138107ced5a1f3"
            ],
            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2022,
            desc: "'Thích thích' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:10:53.160Z",
            __v: 0
        },
        {
            _id: "6443c0e1041d9846d6335b37",
            title: "Mặt trời của em",
            artist: [
                "6443be5bf2138107ced5a1f3"
            ],
            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            year: 2018,
             desc: "'Mặt trời của em' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",

            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:11:29.120Z",
            __v: 0
        },
        {
            _id: "6443c112041d9846d6335b41",
            title: "Tháng tư là lời nói dối của em",
            artist: [
                "6443be5bf2138107ced5a1f8"
            ],
            playlist: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            desc: "'Tháng tư là lời nói dối của em' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            year: 2017,
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:12:18.626Z",
            __v: 0
        },
        {
            _id: "6443c127041d9846d6335b48",
            title: "Cảm ơn",
            artist: [
                "6443be5bf2138107ced5a1f8"
            ],
            playlist: [],
            link: "649f0bbf-2399-41bc-979d-7a90f7b09bd1.mp3",
            desc: "'Cảm ơn' là bản ballad nhẹ nhàng với ca tử buồn do nhạc sĩ trẻ Triết Phạm sáng tác. Trong sản phẩm lần này, Noo Phước Thịnh sẽ vào vai một chàng trai tên Thịnh, con của một đại ca làng chài. Thịnh yêu My, một cô gái nghèo của làng chài nhưng Thịnh phải xa quê đi học phi công. Chuyện tình cảm của Thịnh và My sẽ ra sao, mời các bạn cùng đón xem tại Graceful.Com",
            year: 2019,
            view: 0,
            comment: [],
            lyrics: [
                {
                    time: 13.413895,
                    lyric: "Cơn mưa ngang qua (cơn mưa ngang qua)",
                    _id: "6443de9bf15a271f055c3847"
                },
                {
                    time: 15.222456,
                    lyric: "Cơn mưa đi ngang qua (cơn mưa đi ngang qua)",
                    _id: "6443de9bf15a271f055c3848"
                },
                {
                    time: 17.550247,
                    lyric: "Đừng làm rơi thêm thêm thêm nhiều giọt lệ",
                    _id: "6443de9bf15a271f055c3849"
                },
                {
                    time: 20.177665,
                    lyric: "Còn đâu đây bao câu ca anh tặng em (uh ah uh ah)",
                    _id: "6443de9bf15a271f055c384a"
                },
                {
                    time: 22.882239,
                    lyric: "Tình yêu em mang cuốn lấp đi bao nhiêu câu ca",
                    _id: "6443de9bf15a271f055c384b"
                },
                {
                    time: 27.067918,
                    lyric: "Và còn lại đây đôi môi đau thương trong màn đêm (i a i a i a i a)",
                    _id: "6443de9bf15a271f055c384c"
                },
                {
                    time: 31.428024,
                    lyric: "Phải lẻ loi gồng mình bước qua niềm đau khi em rời xa",
                    _id: "6443de9bf15a271f055c384d"
                },
                {
                    time: 34.90789,
                    lyric: "Cơn mưa rồi lại thêm lại thêm lại thêm",
                    _id: "6443de9bf15a271f055c384e"
                }
            ],
            createdAt: "2023-04-22T11:12:39.745Z",
            __v: 0
        }
    ]

    const playlist = [
        {
            _id: "6443be5bf2138107ced5a217",
            type: "author",
            title: "Noo Phước Thịnh",
            author: "6443be5bf2138107ced5a1f1",
            songs: [
                "6443be5bf2138107ced5a200",
                "6443be5bf2138107ced5a1fc",
                "6443be5bf2138107ced5a1fd",
                "6443be5bf2138107ced5a1fe",
                "6443be5bf2138107ced5a1ff",
            ],
            view: 0,
            createdAt: "2023-04-22T11:00:43.878Z",
            __v: 5,
        },
        {
            _id: "6443be5bf2138107ced5a218",
            type: "author",
            title: "Sơn tùng MTP",
            author: "6443be5bf2138107ced5a1f2",
            songs: [
                "6443be5bf2138107ced5a201",
                "6443be5bf2138107ced5a204",
                "6443be5bf2138107ced5a205",
                "6443be5bf2138107ced5a206",
                "6443be5bf2138107ced5a207",
                "6443be5bf2138107ced5a202",
                "6443be5bf2138107ced5a203",
            ],
            view: 0,
            createdAt: "2023-04-22T11:00:43.878Z",
            __v: 7,
        },
        {
            _id: "6443be5bf2138107ced5a219",
            type: "author",
            title: "Phương Ly",
            author: "6443be5bf2138107ced5a1f3",
            songs: ["6443c0bd041d9846d6335b30", "6443c0e1041d9846d6335b37"],
            view: 0,
            createdAt: "2023-04-22T11:00:43.878Z",
            __v: 2,
        },
        {
            _id: "6443be5bf2138107ced5a21e",
            type: "author",
            title: "Hà Anh Tuấn",
            author: "6443be5bf2138107ced5a1f8",
            songs: ["6443c112041d9846d6335b41", "6443c127041d9846d6335b48"],
            view: 0,
            createdAt: "2023-04-22T11:00:43.879Z",
            __v: 2,
        },
        {
            _id: "6443be5bf2138107ced5a21f",
            type: "author",
            title: "Trúc Nhân",
            author: "6443be5bf2138107ced5a1f9",
            songs: ["6443c054041d9846d6335b1c", "6443c054041d9846d6335b1f"],
            view: 0,
            createdAt: "2023-04-22T11:00:43.879Z",
            __v: 2,
        },
        {
            _id: "6443be5bf2138107ced5a220",
            type: "author",
            title: "Vũ.",
            author: "6443be5bf2138107ced5a1fa",
            songs: ["6443bfa6041d9846d6335af2", "6443bfcd041d9846d6335af9"],
            view: 0,
            createdAt: "2023-04-22T11:00:43.879Z",
            __v: 2,
        },
        {
            _id: "6443c32c63223c6bba50abd0",
            type: "system",
            title: "January",
            desc: "beautiful day",
            songs: [
                "6443be5bf2138107ced5a201",
                "6443be5bf2138107ced5a204",
                "6443bfa6041d9846d6335af2",
                "6443bfcd041d9846d6335af9",
            ],
            view: 0,
            createdAt: "2023-04-22T11:21:16.659Z",
            __v: 0,
        },
        {
            _id: "6443c35763223c6bba50abd5",
            type: "system",
            title: "Weekend",
            desc: "beautiful week",
            songs: [
                "6443c112041d9846d6335b41",
                "6443c127041d9846d6335b48",
                "6443be5bf2138107ced5a207",
                "6443be5bf2138107ced5a202",
                "6443be5bf2138107ced5a203",
            ],
            view: 0,
            createdAt: "2023-04-22T11:21:59.269Z",
            __v: 0,
        },
        {
            _id: "6443c36d63223c6bba50abda",
            type: "system",
            title: "Plaza",
            songs: [
                "6443be5bf2138107ced5a1fe",
                "6443be5bf2138107ced5a1ff",
                "6443c127041d9846d6335b48",
                "6443be5bf2138107ced5a207",
                "6443be5bf2138107ced5a202",
            ],
            view: 0,
            createdAt: "2023-04-22T11:22:21.833Z",
            __v: 0,
        },
        {
            _id: "6443c37d63223c6bba50abdf",
            type: "system",
            title: "Mean",
            songs: [
                "6443c0bd041d9846d6335b30",
                "6443c0e1041d9846d6335b37",
                "6443be5bf2138107ced5a1ff",
                "6443c127041d9846d6335b48",
            ],
            view: 0,
            createdAt: "2023-04-22T11:22:37.497Z",
            __v: 0,
        }
    ]
    const cate = [
        {
            _id: "6443be5bf2138107ced5a1e6",
            type: "home",
            name: "Top listents",
            playlist: [
                "6443c36d63223c6bba50abda",
                "6443c32c63223c6bba50abd0",
                "6443c35763223c6bba50abd5",
                "6443be5bf2138107ced5a220",
                "6443c37d63223c6bba50abdf",
            ],
            createdAt: "2023-04-22T11:00:43.688Z",
            __v: 7,
        },
        {
            _id: "6443be5bf2138107ced5a1ed",
            type: "home",
            name: "Chill",
            playlist: [
                "6443c36d63223c6bba50abda",
                "6443c37d63223c6bba50abdf",
                "6443be5bf2138107ced5a21f",
                "6443be5bf2138107ced5a21e",
                "6443be5bf2138107ced5a220",
            ],
            createdAt: "2023-04-22T11:00:43.853Z",
            __v: 5,
        },
        {
            _id: "6443be5bf2138107ced5a1ef",
            type: "home",
            name: "Recommend today",
            playlist: [
                "6443c37d63223c6bba50abdf",
                "6443c36d63223c6bba50abda",
                "6443c32c63223c6bba50abd0",
                "6443be5bf2138107ced5a21e",
                "6443be5bf2138107ced5a220",
            ],
            createdAt: "2023-04-22T11:00:43.855Z",
            __v: 7,
        }
    ];
    await Promise.all([
        Artist.insertMany(artists),
        Song.insertMany(songs),
        Playlist.insertMany(playlist),
        PlaylistCategory.insertMany(cate),
    ])
    let u = new User({name: "Hoàng Đức Duy", email:"admin@gmail.com", role:"admin",password: "123456"})
    await u.save()
}

module.exports = { initDatabase };



