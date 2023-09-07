import {
    SearchOutlined,
    HomeOutlined,
    HomeFilled,
    PlusOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Col, Row } from "antd";
import {FaUserCircle} from "react-icons/fa"
import { BsFillBookmarkFill } from "react-icons/bs"

const pages = [
    {
        icon: HomeOutlined,
        iconFilled: HomeFilled,
        name: "Home",
        class: "tabs__home tab tab--active",
    },
    {
        icon: SearchOutlined,
        iconFilled: SearchOutlined,
        name: "Search",
        class: "tabs__search tab",
    },
    {
        icon: BsFillBookmarkFill,
        iconFilled: BsFillBookmarkFill,
        name: "Library",
        class: "tabs__library tab",
    },
];

function LeftBar({ target = 1 }) {
    return (
        <div className="col-2 left">
            <div className="left__logo" onclick="window.location.href='/'">
                <img src="/logo1.png" alt="logo" />
            </div>
            <div className="left_content">
                <div>
                    <div className="left__tab tabs">
                        {pages.map((e, idx) => {
                            console.log(target === idx);
                            return (
                                <Row className={e.class} key={idx}>
                                    <Col span={6} className="tab__icon">
                                        <Icon
                                            component={
                                                target == idx
                                                    ? e.iconFilled
                                                    : e.icon
                                            }
                                        />
                                    </Col>
                                    <Col span={18}>
                                        <td className="tab__name">{e.name}</td>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>

                    <div className="left__tab tabs">
                        <div className="tabs__title playlist_title">
                            <p
                                style={{ display: "inline" }}
                                className="p-0 m-0 "
                            >
                                Your playlist
                            </p>
                            <PlusOutlined />
                        </div>
                    </div>
                </div>

                <div className="left__tab tabs" style={{paddingBottom: "30px"}}>
                    <div className="tabs__title">Settings</div>
                    <Row className="tabs__home tab">
                        <Col span={6} className="tab__icon">
                            <FaUserCircle />
                        </Col>
                        <Col span={18}>
                            <td className="tab__name">Account</td>
                        </Col>
                    </Row>
                    {/* <div className="tabs__home tab">
                        <table>
                            <tr
                                onclick="loginShow()"
                                className="setting_account"
                            >
                                <td className="tab__icon">
                                    <i className="fa-solid fa-user"></i>
                                </td>
                                <td className="tab__name">Account</td>
                            </tr>
                            <tr
                                onclick="accountShow()"
                                className="setting_user"
                                style={{ display: "none" }}
                            >
                                <td className="tab__icon">
                                    <i className="fa-solid fa-user"></i>
                                </td>
                                <td className="tab__name user_name">
                                    Hoàng Đức Duy
                                </td>
                            </tr>
                        </table>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
