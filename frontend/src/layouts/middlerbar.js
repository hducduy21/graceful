import { BarsOutlined,PauseCircleFilled } from "@ant-design/icons";
import useCollapse from "~/hooks/useCollapse";

const audio = new Audio()

function MiddlerBar({rangeValue, song = "song.mp3", play = true}) {
    audio.src = song
    const [isPlaying, collapsePlay] = useCollapse(play)
    return (
        <div class="middle__bar p-0 m-0">
            <input
                id="currentTimeSong"
                type="range"
                min="0"
                max="1000"
                defaultValue="0"
                value={rangeValue}
            />
            <div class="left_bar_control">
                <BarsOutlined size={"xs"}></BarsOutlined>
            </div>
            <div class="right_bar_control">
                <i class="fa-solid fa-angles-right fa-xs"></i>
            </div>
            <div class="middle__bar__control m-0">
                <div class="bar__song">
                    <img src="/image/square.png" alt="" class="bar__song_img" />
                    <div class="bar__song__title">
                        <span class="bar__song__name">Have a nice song</span>
                        <span class="bar__song__author">Graceful</span>
                    </div>
                </div>

                <div class="bar__control">
                    <div class="bar__control__random">
                        <i class="fa-solid fa-shuffle fa-xl"></i>
                    </div>
                    <div class="bar__control__prev">
                        <i class="fa-solid fa-backward-step fa-2xl"></i>
                    </div>
                    {/* <div class="bar__control__play"> */}
                        {/* <div class="play_circle">
                            <i class="fa-solid fa-play fa-xs current_play"></i>
                        </div> */}
                        <PauseCircleFilled className="bar__control__play" size={"lg"}></PauseCircleFilled>
                    {/* </div> */}
                    <div class="bar__control__next">
                        <i class="fa-solid fa-forward-step fa-2xl"></i>
                    </div>
                    <div class="bar__control__loop">
                        <i class="fa-solid fa-repeat fa-xl"></i>
                    </div>
                </div>
                <div class="bar__setting">
                    <div class="bar__setting__volume">
                        <i
                            class="fa-solid fa-volume-high fa-xl volume_icon"
                            style={{width: "30px"}}
                        ></i>
                    </div>
                    <input
                        id="volume"
                        type="range"
                        min="0"
                        max="100"
                        value="100"
                    />
                </div>
            </div>
        </div>
    );
}

export default MiddlerBar;
