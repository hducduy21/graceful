function getAllCookies() {
    const cookies = document.cookie.split(";");
    const cookieObj = {};

    cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        cookieObj[name] = decodeURIComponent(value);
    });

    return cookieObj;
}
function getTokenFromCookie() {
    const cookies = getAllCookies();
    return cookies.graceful_token;
}

$(document).ready(function () {
    fetch("/auth/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + getTokenFromCookie(),
        },
    })
        .then((data) => {
            const status = data.status;
            if (status === 200) return data.json();
            else throw new Error("Login error!");
        })
        .then((data) => {
            $(".user_name").text(data.user.name)
            $(".setting_user").show()
            $(".setting_account").hide()

        });

    //control right bar
    let isRightBarOpen = true;
    const checkContentResponsive = () => {
        if ($(".middle__content").width() < 720) {
            $(".GraceChart_left").removeClass("col-6");
            $(".GraceChart_left").addClass("col-12");
            $(".GraceChart_right").removeClass("col-6");
            $(".GraceChart_right").addClass("col-12");
        } else {
            $(".GraceChart_left").removeClass("col-12");
            $(".GraceChart_left").addClass("col-6");
            $(".GraceChart_right").removeClass("col-12");
            $(".GraceChart_right").addClass("col-6");
        }
    };
    const rightBarToLeft = () => {
        $(".right_bar_control i").removeClass("fa-angles-right");
        $(".right_bar_control i").addClass("fa-angles-left");
    };
    const rightBarToRight = () => {
        $(".right_bar_control i").removeClass("fa-angles-left");
        $(".right_bar_control i").addClass("fa-angles-right");
    };
    let closeRightBar = () => {
        $(".right").addClass("d-none");
        $(".middle").removeClass("col-8");
        $(".middle").addClass("col-10");
        rightBarToLeft();
        if ($(window).width() > 1400)
            $(".laylist_card-bestPlaylist--last").removeClass("d-none");
        isRightBarOpen = false;
        checkContentResponsive();
    };
    let openRightBar = () => {
        $(".right").removeClass("d-none");
        $(".middle").removeClass("col-10");
        $(".middle").addClass("col-8");
        rightBarToRight();
        $(".laylist_card-bestPlaylist--last").addClass("d-none");
        isRightBarOpen = true;
        checkContentResponsive();
    };

    const rightBarControlClick = () => {
        if ($(window).width() <= 992) {
            $(".right").removeClass("d-none");
            $(".right").removeClass("col-2");
            $(".right").addClass("col-4");
            $(".right").toggleClass("rightbar-active");
            if ($(".right").hasClass("rightbar-active")) {
                $(".middle__content").css("opacity", "50%");
                rightBarToLeft();
            } else {
                $(".middle__content").css("opacity", "100%");
                rightBarToRight();
            }
            checkContentResponsive();
        } else {
            if (isRightBarOpen) {
                closeRightBar();
            } else {
                openRightBar();
            }
        }
    };
    const handleBarControl = () => {
        if ($(window).width() > 1200) {
            openRightBar();
            $(".left").removeClass("col-3");
            $(".left").removeClass("col-4");
            $(".left").addClass("col-2");

            $(".middle").removeClass("col-12");
            $(".middle").removeClass("col-10");
            $(".middle").removeClass("col-9");
            $(".middle").addClass("col-8");

            $(".right").removeClass("col-4");
            $(".right").addClass("col-2");
        } else if ($(window).width() >= 992) {
            rightBarToLeft();
            $(".left").removeClass("col-2");
            $(".left").removeClass("col-6");
            $(".left").addClass("col-3");

            $(".middle").removeClass("col-8");
            $(".middle").removeClass("col-10");
            $(".middle").removeClass("col-12");
            $(".middle").addClass("col-9");

            $(".right").removeClass("col-4");
            $(".right").addClass("col-2");
        } else if ($(window).width() > 768) {
            rightBarToLeft();
            $(".left").removeClass("col-2");
            $(".left").addClass("col-3");
            $(".left").removeClass("col-4");

            $(".middle").removeClass("col-8");
            $(".middle").removeClass("col-10");
            $(".middle").removeClass("col-12");
            $(".middle").addClass("col-9");

            $(".right").removeClass("d-none");
            $(".right").removeClass("col-2");
            $(".right").addClass("col-4");
        } else {
            rightBarToLeft();
            $(".left").removeClass("col-2");
            $(".left").removeClass("col-3");
            $(".left").addClass("col-4");

            $(".middle").removeClass("col-9");
            $(".middle").removeClass("col-10");
            $(".middle").addClass("col-12");

            $(".right").removeClass("d-none");
            $(".right").removeClass("col-2");
            $(".right").addClass("col-4");
        }
    };
    $(".right_bar_control").click(() => {
        rightBarControlClick();
    });
    $(".left_bar_control").click(() => {
        $(".left").toggleClass("leftbar-active");
        if ($(".left").hasClass("leftbar-active")) {
            $(".middle__content").css("opacity", "50%");
        } else {
            $(".middle__content").css("opacity", "100%");
        }
    });
    handleBarControl();
    checkContentResponsive();

    $(window).on("resize", function () {
        handleBarControl();
        checkContentResponsive();
    });

    $(".middle__content").click(() => {
        if ($(window).width() <= 992) {
            $(".right").removeClass("rightbar-active");
            if ($(".right").hasClass("rightbar-active")) {
                rightBarToLeft();
                $(".middle__content").css("opacity", "50%");
            } else {
                rightBarToRight();
                $(".middle__content").css("opacity", "100%");
            }
        }
        if ($(window).width() <= 768) {
            $(".left").removeClass("leftbar-active");
            if ($(".left").hasClass("leftbar-active")) {
                $(".middle__content").css("opacity", "50%");
            } else {
                $(".middle__content").css("opacity", "100%");
            }
        }
    });

    //add lyrict
    $(".createLyricts").click(() => {
        if ($(".createLyricts_right_tab").hasClass("d-none")) {
            $("#warningCreateLyricts").modal("show");
        } else {
            $(".createLyricts_right_tab").Class("d-none");
        }
    });
    $(".submitAddLyrics").click(() => {
        $("#warningCreateLyricts").modal("hide");
        $(".createLyricts_right_tab--prepare").addClass("d-none");
        $(".createLyricts_right_tab").removeClass("d-none");
        lyrics = [];
    });
    $(".addLyrics").click(() => {
        lyrics.push({
            time: audio.currentTime,
            lyric: $("#lyricsInsertValue").val(),
        });
        let el =
            `<tr>
    <td>` +
            audio.currentTime +
            `</td>
        <td>` +
            $("#lyricsInsertValue").val() +
            `</td>
    </tr>`;
        $(".table_body_lyric").append(el);
        $("#lyricsInsertValue").val("");
    });
});
function hideModel() {
    $("#loginModal").modal("hide");
    $("#signupModal").modal("hide");
}
function loginShow() {
    $("#loginModal").modal("show");
    $("#signupModal").modal("hide");
}
function signupShow() {
    $("#signupModal").modal("show");
    $("#loginModal").modal("hide");
}

function login() {
    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: $("#emailInputLogin").val(),
            password: $("#passwordInputLogin").val(),
        }),
    })
        .then((data) => {
            const status = data.status;
            if (status === 200) return data.json();
            else {
                $(".login_error").empty();
                return data.json().then((errorData) => {
                    console.log(errorData);
                    errorData.errors.forEach((e) => {
                        $(".login_error").append(
                            `<p class="login_error_element mb-0">` +
                                e.msg +
                                `</p>`
                        );
                    });
                    throw new Error("Login error!");
                });
            }
        })
        .then((data) => {
            location.reload()
            console.log(data);
            playlist = data;
            index_play = 0;
            changeSong(playlist[index_play], 0, true);
            $(".playing-active").removeClass("fa-pause");
            $(".playing-active").addClass("fa-play");
            $(".playing-active").removeClass("playing-active");
            element.classList.add("playing-active");

        })
        .catch((error) => {
            console.log(error);
        });
}
function signup() {
    fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: $("#emailInputSignin").val(),
            name: $("#nameInputSignin").val(),
            password: $("#passwordInputSignin").val(),
            repassword: $("#RePasswordInputSignin").val(),
        }),
    })
        .then((data) => {
            const status = data.status;
            if (status === 200) return data.json();
            else {
                $(".login_error").empty();
                return data.json().then((errorData) => {
                    console.log(errorData);
                    errorData.errors.forEach((e) => {
                        $(".login_error").append(
                            `<p class="login_error_element mb-0">` +
                                e.msg +
                                `</p>`
                        );
                    });
                    throw new Error("Login error!");
                });
            }
        })
        .then((data) => {
            console.log(data);
            playlist = data;
            index_play = 0;
            changeSong(playlist[index_play], 0, true);
            $(".playing-active").removeClass("fa-pause");
            $(".playing-active").addClass("fa-play");
            $(".playing-active").removeClass("playing-active");
            element.classList.add("playing-active");
        })
        .catch((error) => {
            console.log(error);
        });
}
