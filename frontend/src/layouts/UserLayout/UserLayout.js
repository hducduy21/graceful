import { Outlet } from "react-router-dom";

import "~/layouts/layout.scss";

import LeftBar from "./leftbar/LeftBar";
import RightBar from "./rightbar/RightBar";
import MiddlerBar from "../middlerbar";

function UserLayout() {
    return (
        <div className="wrapper row">
            <LeftBar></LeftBar>
            <div className="middle col-8">
                {/* <Outlet></Outlet>
                 */}
                <div class="middle__content">
                    <h3 class="middle_title">#GraceChart month</h3>
                    <div class="middle_element row GraceChart">
                        <div class="chart_top_1 col-6 GraceChart_left"></div>
                        <div class="chart_top col-6 GraceChart_right"></div>
                    </div>
                    <div class="category_row">
                        <div class="middle_element list_card_playlist list_card_playlist-bestPlaylist"></div>
                    </div>
                </div>
                <MiddlerBar></MiddlerBar>
            </div>
            <RightBar></RightBar>
        </div>
    );
}

export default UserLayout;
