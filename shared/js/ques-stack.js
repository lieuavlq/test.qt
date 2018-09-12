var ques_stack_vn = [
{img: "valhein1", name: "Valhein là một Xạ thủ?", anleft: 1, anright: 0, star: 0},
{img: "valhein1", name: "Valhein là một Pháp sư?", anleft: 0, anright: 1, star: 0},
{img: "valhein8", name: "Nội tại Valhein có hiệu ứng đặc biệt ở đòn thứ 3?", anleft: 1, anright: 0, star: 1},
{img: "valhein8", name: "Nội tại Valhein không đổi màu Phi tiêu?", anleft: 0, anright: 1, star: 1},
{img: "valhein2", name: "Chiêu cuối Valhein giúp tăng tốc độ chạy?", anleft: 1, anright: 0, star: 1},
{img: "valhein2", name: "Chiêu cuối Valhein không tăng tốc đánh?", anleft: 0, anright: 1, star: 1},
{img: "valhein2", name: "Chiêu cuối Valhein có 5 viên đạn?", anleft: 0, anright: 1, star: 1},
{img: "valhein2", name: "Chiêu cuối Valhein sát thương như nhau từ viên 2?", anleft: 0, anright: 1, star: 1},
{img: "valhein3", name: "Vũ Khí Tối Thượng không là skin của Valhein?", anleft: 0, anright: 1, star: 0},
{img: "valhein4", name: "Đại Công Tước là skin của Valhein?", anleft: 1, anright: 0, star: 0},
{img: "valhein5", name: "Quang Vinh là skin của Valhein?", anleft: 1, anright: 0, star: 0},
{img: "valhein6", name: "Số 7 Thần Sầu không là skin của Valhein?", anleft: 0, anright: 1, star: 0},
{img: "thane1", name: "Thane là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "thane1", name: "Thane là một Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "thane1", name: "Thane là một Đấu sĩ?", anleft: 1, anright: 0, star: 0},
{img: "thane4", name: "Nội tại Thane giúp hồi máu?", anleft: 1, anright: 0, star: 1},
{img: "thane4", name: "Nội tại Thane hồi máu khi mất máu?", anleft: 0, anright: 1, star: 1},
{img: "thane3", name: "Chiêu cuối Thane có thể bị hủy khi đang dùng?", anleft: 0, anright: 1, star: 1},
{img: "thane3", name: "Chiêu cuối Thane miễn thương khi đang dùng?", anleft: 1, anright: 0, star: 1},
{img: "thane3", name: "Chiêu cuối Thane có gây Sát thương chuẩn?", anleft: 1, anright: 0, star: 1},
{img: "thane5", name: "Quang Vinh không là skin của Thane?", anleft: 0, anright: 1, star: 0},
{img: "veera1", name: "Veera là một Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "veera1", name: "Veera là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "veera6", name: "Nội tại Veera giảm giáp phép mục tiêu?", anleft: 1, anright: 0, star: 1},
{img: "veera6", name: "Nội tại Veera không giảm hồi các chiêu khi phụ hạ?", anleft: 0, anright: 1, star: 1},
{img: "veera2", name: "Chiêu cuối Veera có 5 lượt tấn công?", anleft: 1, anright: 0, star: 1},
{img: "veera2", name: "Chiêu cuối Veera có thể tấn công nhiều mục tiêu?", anleft: 1, anright: 0, star: 1},
{img: "veera2", name: "Chiêu cuối Veera sát thương như nhau từ lượt 2?", anleft: 0, anright: 1, star: 1},
{img: "veera2", name: "Không thể né được bởi Chiêu cuối Veera?", anleft: 0, anright: 1, star: 1},
{img: "veera4", name: "Nàng Dơi Tuyết không là skin của Veera?", anleft: 0, anright: 1, star: 0},
{img: "veera5", name: "Y Tá Bạo Loạn là skin của Veera?", anleft: 1, anright: 0, star: 0},
{img: "lubo1", name: "Lữ Bố là một Đấu sĩ?", anleft: 1, anright: 0, star: 0},
{img: "lubo1", name: "Lữ Bố là một Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "lubo7", name: "Nội tại Lữ Bố giảm hồi chiêu kỹ năng khác?", anleft: 1, anright: 0, star: 1},
{img: "lubo7", name: "Nội tại Lữ Bố chỉ kích hoạt khi đánh thường?", anleft: 0, anright: 1, star: 1},
{img: "lubo3", name: "Chiêu cuối Lữ Bố tự hồi máu khi đang dùng?", anleft: 0, anright: 1, star: 1},
{img: "lubo3", name: "Chiêu cuối Lữ Bố hồi máu trên đòn đánh?", anleft: 1, anright: 0, star: 1},
{img: "lubo3", name: "Chiêu cuối Lữ Bố không kháng hiệu ứng?", anleft: 0, anright: 1, star: 1},
{img: "lubo4", name: "Đặc Nhiệm SWAT là skin của Lữ Bố?", anleft: 1, anright: 0, star: 0},
{img: "lubo5", name: "Tiệc Bãi Biển không là skin của Lữ Bố?", anleft: 0, anright: 1, star: 0},
{img: "mina1", name: "Mina là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "mina1", name: "Mina là một Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "mina4", name: "Nội tại Mina kích hoạt khi chịu sát thương?", anleft: 1, anright: 0, star: 1},
{img: "mina4", name: "Nội tại Mina kích hoạt khi ở cạnh Đồng đội?", anleft: 0, anright: 1, star: 1},
{img: "mina2", name: "Chiêu cuối Mina khiến địch tấn công cô?", anleft: 1, anright: 0, star: 1},
{img: "mina2", name: "Mina miễn thương khi dùng Chiêu cuối?", anleft: 0, anright: 1, star: 1},
{img: "mina2", name: "Tất cả địch chỉ tấn công Mina bởi Chiêu cuối?", anleft: 1, anright: 0, star: 1},
{img: "mina5", name: "Tiệc Bánh Kẹo là skin của Mina?", anleft: 1, anright: 0, star: 0},
{img: "krixi1", name: "Krixi là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "krixi1", name: "Krixi là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "krixi6", name: "Nội tại Krixi tăng tốc chạy khi đánh thường?", anleft: 0, anright: 1, star: 1},
{img: "krixi6", name: "Kĩ năng trúng đích kích hoạt Nội tại Krixi?", anleft: 1, anright: 0, star: 1},
{img: "krixi3", name: "Chiêu cuối Krixi giúp Đồng đội tăng tốc chạy?", anleft: 0, anright: 1, star: 1},
{img: "krixi3", name: "Chiêu cuối Krixi chỉ dùng khi có mục tiêu?", anleft: 0, anright: 1, star: 1},
{img: "krixi3", name: "Chiêu cuối Krixi giúp cô tăng tốc chạy?", anleft: 1, anright: 0, star: 1},
{img: "krixi3", name: "Không thể dùng Chiêu khác khi Krixi dùng Chiêu cuối?", anleft: 0, anright: 1, star: 1},
{img: "krixi3", name: "Chiêu cuối Krixi có thể hủy khi đang dùng?", anleft: 0, anright: 1, star: 1},
{img: "krixi4", name: "Tiệc Bãi Biển không là skin của Krixi?", anleft: 0, anright: 1, star: 0},
{img: "krixi5", name: "Cô Tiên Thỏ là skin của Krixi?", anleft: 1, anright: 0, star: 0},
{img: "mganga1", name: "Mganga có thể là một Trợ thủ?", anleft: 1, anright: 0, star: 0},
{img: "mganga1", name: "Mganga đánh tay ko cộng dồn Ấn Tà Thuật?", anleft: 0, anright: 1, star: 1},
{img: "mganga2", name: "Độc Khí của Mganga có 2 điểm tích lũy?", anleft: 1, anright: 0, star: 1},
{img: "mganga3", name: "Trượng của Mganga Tiệc Bánh Kẹo là cây kem?", anleft: 0, anright: 1, star: 0},
{img: "trieuvan1", name: "Triệu Vân là một Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "trieuvan2", name: "Long Huyết tăng tốc chạy cho Triệu Vân?", anleft: 1, anright: 0, star: 1},
{img: "trieuvan3", name: "Triệu Vân Quang Vinh thưởng hạng mùa 3?", anleft: 0, anright: 1, star: 1},
{img: "trieuvan4", name: "Triệu Vân Dũng Sĩ Đồ Long mở tại AIC 2018?", anleft: 0, anright: 1, star: 0},
{img: "omega1", name: "Omega là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "omega1", name: "Omega có thể dùng chiêu thức lên công trình?", anleft: 1, anright: 0, star: 1},
{img: "omega2", name: "Chế Độ Hủy Diệt làm Omega xoay liên tục?", anleft: 1, anright: 0, star: 0},
{img: "omega3", name: "Omega tăng tốc chạy với Chế Độ Xung Phong?", anleft: 1, anright: 0, star: 0},
{img: "kahlii1", name: "Kahlii là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "kahlii1", name: "Có phải Kahlii là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "kahlii2", name: "Chiêu cuối Kahlii có thể hủy khi đang dùng?", anleft: 0, anright: 1, star: 1},
{img: "kahlii2", name: "Đang dùng Chiêu cuối Kahlii có thể đánh thường?", anleft: 0, anright: 1, star: 0},
{img: "kahlii3", name: "Nội tại Kahlii đánh thường xuyên mục tiêu?", anleft: 1, anright: 0, star: 0},
{img: "zephys1", name: "Zephys là một Sát thủ?", anleft: 1, anright: 0, star: 0},
{img: "zephys2", name: "Zephys hất văng kẻ địch với Không Kích?", anleft: 1, anright: 0, star: 0},
{img: "zephys2", name: "Với Không Kích Zephys ko thể bay xuyên tường?", anleft: 0, anright: 1, star: 0},
{img: "zephys3", name: "Đầu của Zephys Hiệp Sĩ Bí Ngô là trái táo?", anleft: 0, anright: 1, star: 0},
{img: "zephys4", name: "Với Đâm Lao Zephys có thể lướt xuyên tường?", anleft: 1, anright: 0, star: 1},
{img: "dieuthuyen1", name: "Điêu Thuyền là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "dieuthuyen2", name: "Điêu Thuyền bất động khi dùng chiêu cuối?", anleft: 1, anright: 0, star: 1},
{img: "dieuthuyen4", name: "Điêu Thuyền dùng Tuyết Liên 3 lần?", anleft: 0, anright: 1, star: 1},
{img: "dieuthuyen3", name: "Điêu Thuyền Tiệc Bể Bơi cầm cây trượng?", anleft: 0, anright: 1, star: 0},
{img: "dieuthuyen3", name: "Ko chịu thêm sát thương bởi đóng băng của Điêu Thuyền?", anleft: 0, anright: 1, star: 1},
{img: "chaugnar1", name: "Chaugnar là một tay Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "chaugnar1", name: "Chaugnar là một con Trâu?", anleft: 0, anright: 1, star: 0},
{img: "chaugnar1", name: "Chaugnar là Voi có cánh?", anleft: 1, anright: 0, star: 0},
{img: "chaugnar2", name: "Vực Hỗn Loạn chỉ giúp Chaugnar giải khống chế?", anleft: 0, anright: 1, star: 1},
{img: "chaugnar2", name: "Với Vực Hỗn Loạn Chaugnar giải khống chế phe ta?", anleft: 1, anright: 0, star: 1},
{img: "chaugnar3", name: "Chaugnar Quang Vinh thưởng hạng mùa 6?", anleft: 1, anright: 0, star: 1},
{img: "violet1", name: "Violet là một Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "violet2", name: "Với Đạn Xuyên Thấu Violet bắn được 2 viên?", anleft: 1, anright: 0, star: 1},
{img: "violet2", name: "Violet ko thể lộn qua tường với Đạn Xuyên Thấu?", anleft: 0, anright: 1, star: 1},
{img: "violet6", name: "Pháo Đại của Violet tìm diệt mục tiêu?", anleft: 0, anright: 1, star: 1},
{img: "violet3", name: "Mèo Siêu Quậy là skin của Violet?", anleft: 1, anright: 0, star: 0},
{img: "violet4", name: "Phi Công Trẻ ko là skin của Violet?", anleft: 0, anright: 1, star: 0},
{img: "violet5", name: "Violet Tiệc Bể Bơi có giá 2 viên đá quý?", anleft: 1, anright: 0, star: 0},
{img: "butterfly1", name: "Butterfly là một Sát thủ?", anleft: 1, anright: 0, star: 0},
{img: "butterfly3", name: "Hạ hoặc phụ sẽ làm mới hồi chiêu của Butterfly?", anleft: 1, anright: 0, star: 1},
{img: "butterfly2", name: "Với Ám Sát Butterfly đột kích địch có máu cao nhất?", anleft: 0, anright: 1, star: 1},
{img: "butterfly2", name: "Chiêu Ám Sát của Butterfly ko thể dùng lên quái?", anleft: 0, anright: 1, star: 1},
{img: "butterfly4", name: "Nữ Quái Nổi Loạn là skin của Butterfly?", anleft: 1, anright: 0, star: 0},
{img: "butterfly5", name: "Quận Chúa Đế Chế ko là skin của Butterfly?", anleft: 0, anright: 1, star: 0},
{img: "butterfly6", name: "Teen Nữ Công Nghệ là skin của Butterfly?", anleft: 1, anright: 0, star: 0},
{img: "ormarr1", name: "Ormarr là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "ormarr5", name: "Mọi chiêu thức của Ormarr đều có tỷ lệ làm choáng?", anleft: 1, anright: 0, star: 1},
{img: "ormarr6", name: "Chiêu Búa Tạ của Ormarr chắc chắn làm choáng?", anleft: 0, anright: 1, star: 1},
{img: "ormarr2", name: "Có thể hủy Bão Búa của Ormarr khi đang bật?", anleft: 0, anright: 1, star: 1},
{img: "ormarr3", name: "Thông Thỏa Thích là skin của Ormarr?", anleft: 1, anright: 0, star: 0},
{img: "ormarr4", name: "Giáo Viên Thể Hình ko là skin của Ormarr?", anleft: 0, anright: 1, star: 0},
{img: "azzenka1", name: "Azzen'Ka là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "azzenka1", name: "Azzen'Ka là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "azzenka3", name: "Nội tại Azzen'Ka hóa đá đối thủ?", anleft: 1, anright: 0, star: 1},
{img: "azzenka2", name: "Chiêu cuối Azzen'Ka triệu hồi Bão cát?", anleft: 1, anright: 0, star: 1},
{img: "alice1", name: "Alice là một Trợ thủ?", anleft: 1, anright: 0, star: 0},
{img: "alice1", name: "Alice không là Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "alice3", name: "Nội tại giúp Alice tăng tốc chạy?", anleft: 1, anright: 0, star: 1},
{img: "alice3", name: "Nội tại Alice giúp Đồng đội tăng tốc chạy?", anleft: 0, anright: 1, star: 1},
{img: "alice2", name: "Chiêu cuối Alice làm câm lặng đối thủ?", anleft: 1, anright: 0, star: 1},
{img: "alice2", name: "Giảm Tốc đánh khi dính Chiêu cuối Alice?", anleft: 0, anright: 1, star: 1},
{img: "alice2", name: "Chiêu cuối Alice giúp Đồng đội tăng tốc chạy?", anleft: 0, anright: 1, star: 1},
{img: "alice4", name: "Bé Gấu Tuyết là skin của Alice?", anleft: 1, anright: 0, star: 0},
{img: "gildur4", name: "Nội tại Gildur đẩy lùi mục tiêu?", anleft: 1, anright: 0, star: 1},
{img: "gildur4", name: "Nội tại Gildur không tạo lá chắn?", anleft: 0, anright: 1, star: 1},
{img: "gildur4", name: "Nội tại Gildur kích hoạt ở đòn đánh thường thứ 3?", anleft: 0, anright: 1, star: 1},
{img: "gildur1", name: "Gildur là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "gildur1", name: "Gildur có thể là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "gildur1", name: "Gildur không phải tướng Đỡ đòn?", anleft: 0, anright: 1, star: 0},
{img: "gildur2", name: "Gildur có thể hủy Chiêu cuối lúc đang bật?", anleft: 1, anright: 0, star: 1},
{img: "gildur2", name: "Chiêu cuối Gildur có thể làm choáng cả bên địch?", anleft: 1, anright: 0, star: 1},
{img: "gildur2", name: "Có thể hủy Chiêu cuối Gildur bằng làm choáng?", anleft: 1, anright: 0, star: 1},
{img: "gildur3", name: "Gildur có skin Tiệc Bãi Biển?", anleft: 1, anright: 0, star: 0},
{img: "yorn1", name: "Yorn là một Xạ thủ?", anleft: 1, anright: 0, star: 0},
{img: "yorn1", name: "Yorn có thể là Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "yorn5", name: "Đòn đánh thường thứ 5 kích hoạt Nội tại Yorn?", anleft: 1, anright: 0, star: 1},
{img: "yorn5", name: "Nội tại Yorn công kích 1 mục tiêu?", anleft: 0, anright: 1, star: 1},
{img: "yorn2", name: "Chiêu cuối Yorn bắn mũi tên xuyên bản đồ?", anleft: 1, anright: 0, star: 1},
{img: "yorn2", name: "Chiêu cuối Yorn không sát thương lên quái?", anleft: 0, anright: 1, star: 1},
{img: "yorn2", name: "Chiêu cuối Yorn dừng lại khi trúng địch?", anleft: 1, anright: 0, star: 1},
{img: "yorn3", name: "Yorn có skin Đặc Nhiệm Swat?", anleft: 1, anright: 0, star: 0},
{img: "yorn4", name: "Thế Tử Nguyệt Tộc không là skin của Yorn?", anleft: 0, anright: 1, star: 0},
{img: "toro1", name: "Toro là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "toro1", name: "Toro là một tay Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "toro5", name: "Nội tại Toro miễn khống chế khi dùng chiêu?", anleft: 1, anright: 0, star: 1},
{img: "toro5", name: "Nội tại Toro không tăng miễn thương?", anleft: 0, anright: 1, star: 1},
{img: "toro2", name: "Chiêu cuối Toro giảm tốc chạy đối thủ?", anleft: 1, anright: 0, star: 1},
{img: "toro2", name: "Chiêu cuối Toro không thể hất tung địch?", anleft: 0, anright: 1, star: 1},
{img: "toro4", name: "Trung Phong Cắm không là skin của Toro?", anleft: 0, anright: 1, star: 0},
{img: "taara1", name: "Taara là một tay Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "taara1", name: "Taara có thể là Đấu sĩ?", anleft: 1, anright: 0, star: 0},
{img: "taara1", name: "Taara là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "taara5", name: "Nội tại Taara tăng sát thương khi mất máu?", anleft: 1, anright: 0, star: 1},
{img: "taara5", name: "Nội tại Taara không hồi máu khi dùng chiêu?", anleft: 0, anright: 1, star: 1},
{img: "taara2", name: "Chiêu cuối Taara tự động hồi máu?", anleft: 1, anright: 0, star: 1},
{img: "taara2", name: "Chiêu cuối Taara không tăng tốc chạy?", anleft: 0, anright: 1, star: 1},
{img: "taara2", name: "Chiêu cuối Taara giúp Đồng đội hồi máu?", anleft: 0, anright: 1, star: 1},
{img: "taara4", name: "Hỏa Ngọc Nữ Đế là skin của Taara?", anleft: 1, anright: 0, star: 0},
{img: "taara3", name: "Tiệc Bãi Biển không là skin của Taara?", anleft: 0, anright: 1, star: 0},
{img: "nakroth1", name: "Nakroth là một Sát thủ?", anleft: 1, anright: 0, star: 0},
{img: "nakroth1", name: "Nakroth có thể là Đấu sĩ?", anleft: 1, anright: 0, star: 0},
{img: "nakroth7", name: "Nội tại Nakroth hất tung địch ở đòn thứ 4?", anleft: 1, anright: 0, star: 1},
{img: "nakroth7", name: "Nội tại Nakroth có thể tăng tốc đánh?", anleft: 1, anright: 0, star: 1},
{img: "nakroth2", name: "Nakroth không bị khống chế khi dùng Chiêu cuối?", anleft: 1, anright: 0, star: 1},
{img: "nakroth2", name: "Chiêu cuối Nakroth không thể hất văng địch?", anleft: 0, anright: 1, star: 1},
{img: "nakroth4", name: "Bboy Công Nghệ không là skin của Nakroth?", anleft: 0, anright: 1, star: 0},
{img: "nakroth5", name: "Chiến Binh Hỏa Ngục là skin của Nakroth?", anleft: 1, anright: 0, star: 0},
{img: "nakroth6", name: "Siêu Việt Bậc I không là skin của Nakroth?", anleft: 0, anright: 1, star: 0},
{img: "grakk1", name: "Grakk là một Trợ thủ?", anleft: 0, anright: 1, star: 0},
{img: "grakk1", name: "Grakk là một tay Đỡ đòn?", anleft: 1, anright: 0, star: 0},
{img: "grakk1", name: "Grakk có thể là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "grakk5", name: "Nội tại Grakk kích hoạt sau khi hy sinh?", anleft: 1, anright: 0, star: 1},
{img: "grakk6", name: "Chiêu cuối Grakk có thể hủy khi đang dùng?", anleft: 1, anright: 0, star: 1},
{img: "grakk6", name: "Chiêu cuối Grakk không thể đổi hướng?", anleft: 0, anright: 1, star: 1},
{img: "grakk6", name: "Chiêu cuối Grakk có tạo lá chắn?", anleft: 1, anright: 0, star: 1},
{img: "grakk3", name: "Chàng Gấu Tuyết không là skin của Grakk?", anleft: 0, anright: 1, star: 0},
{img: "grakk4", name: "Thuyền Trưởng Râu Đỏ là skin của Grakk?", anleft: 1, anright: 0, star: 0},
{img: "aleister1", name: "Aleister là một Pháp sư?", anleft: 1, anright: 0, star: 0},
{img: "aleister1", name: "Aleister là một Sát thủ chăng?", anleft: 0, anright: 1, star: 0},
{img: "aleister4", name: "Nội tại Aleister tăng sát thương với 3 điểm ma thuật?", anleft: 1, anright: 0, star: 1},
{img: "aleister2", name: "Chiêu cuối Aleister có thể hủy khi đang dùng?", anleft: 1, anright: 0, star: 1},
{img: "aleister2", name: "Có thể đánh thường khi dính Chiêu cuối Aleister?", anleft: 0, anright: 1, star: 1},
{img: "aleister3", name: "Quang Vinh không là skin của Aleister?", anleft: 0, anright: 1, star: 0},
{img: "fennik1", name: "Fennik là một Xạ thủ?", anleft: 1, anright: 0, star: 0},
{img: "fennik1", name: "Dường như Fennik là một Sát thủ?", anleft: 0, anright: 1, star: 0},
{img: "fennik4", name: "Nội tại Fennik lan sát thương quanh mục tiêu?", anleft: 1, anright: 0, star: 1},
{img: "fennik2", name: "Chiêu cuối Fennik trói chân kẻ địch?", anleft: 0, anright: 1, star: 1},
{img: "fennik2", name: "Chiêu cuối Fennik giảm tốc chạy kẻ địch?", anleft: 1, anright: 0, star: 1},
{img: "fennik2", name: "Tăng tốc chạy khi đi qua Chiêu cuối Fennik?", anleft: 0, anright: 1, star: 1},
{img: "fennik3", name: "Tuần Lộc Láu Lỉnh không là skin của Fennik?", anleft: 0, anright: 1, star: 0},
{img: "fennik5", name: "Tiệc Bánh Kẹo là skin của Fennik?", anleft: 1, anright: 0, star: 0},
];