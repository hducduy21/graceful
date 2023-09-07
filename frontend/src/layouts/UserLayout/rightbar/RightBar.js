import { BsHeadphones } from "react-icons/bs";

function RightBar() {
    return (
        <div className="col-2 right">
            <div className="lyrics" style={{"min-height": "250px"}}>
                <div className="lyrics__title"></div>
                <div className="lyrics__content">
                    <span className="lyrics__content--active lyrics_run_1"></span>
                    <span className="lyrics__content--prepare-0 lyrics_run_2"></span>
                    <span className="lyrics__content--prepare-0 lyrics_run_3"></span>
                    <span className="lyrics__content--prepare-1 lyrics_run_4"></span>
                    <span className="lyrics__content--prepare-1 lyrics_run_5"></span>
                    <span className="lyrics__content--prepare-2 lyrics_run_6"></span>
                </div>
                <span className="lyrics__content--prepare-3">...</span>
            </div>
            <div className="tabs tabs__friends">
                <div className="tabs__title">
                    <BsHeadphones style={{marginRight: "10px"}}/> Queue
                </div>
                <div className="righbar_queue"></div>
            </div>
        </div>
    );
}

export default RightBar;
