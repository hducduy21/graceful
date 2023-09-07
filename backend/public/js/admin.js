    let countSong = 1;
$(".add_1_line").click(() => {
    //only add maximum 5 element at time
    if (countSong < 5) {
        countSong = countSong + 1;
        $(".add_table_body").append(elementRow(countSong));
        $(".btn_remove_row").remove();
        if ($(".song_input_" + countSong))
            $(".song_input_" + countSong).append(
                `<td class="btn_remove_row"><button class="btn btn-warning" style="line-height: 10px;" type="button" onclick="deleteRow(this)">-</button></td>`
            );
        if ($(".artist_input_" + countSong))
            $(".artist_input_" + countSong).append(
                `<td class="btn_remove_row"><button class="btn btn-warning" style="line-height: 10px;" type="button" onclick="deleteRow(this)">-</button></td>`
            );
    } else {
        //if > 5 show error
        toast({
            title: "Error!",
            message: "You can only add up to 5 arctist at a time",
            type: "error",
            duration: 5000,
        });
    }
});

function deleteRow(element) {
    countSong = countSong - 1;
    $(element).parent().parent().remove();
    if (countSong > 1) {
        $(".song_input_" + countSong).append(
            `<td class="btn_remove_row"><button class="btn btn-warning" style="line-height: 10px;" type="button" onclick="deleteRow(this)">-</button></td>`
        );
    }
}
function uploadSong(i) {
    let formData = new FormData();
    let file = $(".song_input_audio_" + i)[0].files[0];
    if (
        !$(".song_input_name_" + i).val() ||
        !$(".song_input_author_" + i).val() ||
        !$(".song_input_year_" + i).val()
    ) {
        toast({
            title: "Error!",
            message: "Please enter all field of song",
            type: "error",
            duration: 5000,
        });
    } else if (!file) {
        toast({
            title: "Error!",
            message: "Please select all the audio files for the song",
            type: "error",
            duration: 5000,
        });
    } else {
        formData.append("audioFile", file);
        formData.append("name", $(".song_input_name_" + i).val());
        formData.append("artist", $(".song_input_author_" + i).val());
        formData.append("year", $(".song_input_year_" + i).val());
        formData.append("desc", $(".song_input_desc_" + i).val());

        $.ajax({
            url: "/api/song",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                $("#submitAddSong").modal("hide");
                if (response.status === 200) {
                    reloadSongManage();
                    for (let i = 1; i <= 5; i++) {
                        if ($(".song_input_" + i)) {
                            $(".song_input_name_" + i).val("");
                            $(".song_input_author_" + i).val("");
                            $(".song_input_audio_" + i).val("");
                            $(".song_input_year_" + i).val("");
                            $(".song_input_desc_" + i).val("");
                        }
                    }
                    toast({
                        title: "Success!",
                        message: response.message || "Upload Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#submitAddSong").modal("hide");
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
}
$(".submitAddSong").click(async () => {
    for (let i = 1; i <= 5; i++) {
        if ($(".song_input_" + i)) {
            uploadSong(i);
        }
    }
});
$(".submitUpdateSong").click(async () => {
    await fetch("/api/song", {
        body: JSON.stringify({
            name: $(".song_input_name_1").val(),
            artist: $(".song_input_author_1").val(),
            year: $(".song_input_year_1").val(),
            desc: $(".song_input_desc_1").val(),
            id: $(".song_input_id_1").val(),
        }),
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
        .then((data) => data.json())
        .then((data) => {
            $("#submitUpdateSong").modal("hide");
            if (data.status) {
                toast({
                    title: "Success!",
                    message: data.message || "Update Successfully!",
                    type: "success",
                    duration: 5000,
                });
            } else {
                toast({
                    title: "Error!",
                    message: data.message,
                    type: "error",
                    duration: 5000,
                });
            }
        })
        .catch((err) => {
            toast({
                title: "Error!",
                message: err,
                type: "error",
                duration: 5000,
            });
        });
    let formData = new FormData();
    let file = $(".song_input_audio_1")[0].files[0];
    if (file) {
        formData.append("audioFile", file);
        formData.append("id", $(".song_input_id_1").val());
        await $.ajax({
            url: "/api/song/audio",
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    console.log(e.loaded);
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                if (response.status) {
                    toast({
                        title: "Success!",
                        message:
                            response.message || "Upload audio Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
    let formData2 = new FormData();
    let file2 = $(".song_input_image_1")[0].files[0];
    if (file2) {
        formData2.append("imageFile", file2);
        formData2.append("id", $(".song_input_id_1").val());
        await $.ajax({
            url: "/api/song/image",
            type: "PUT",
            data: formData2,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    console.log(e.loaded);
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                if (response.status) {
                    toast({
                        title: "Success!",
                        message:
                            response.message || "Upload image Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
    setTimeout(() => {
        location.reload();
    }, 2000);
});
function chooseArtist(i) {
    $("#selectArtist").modal("show");
    $(".selectArtist").click(() => {
        $(".song_input_author_" + i).val($("#idArtistSelect").val());
        $("#selectArtist").modal("hide");
    });
}
$("#fillterArtist").keyup(() => {
    fetch("/api/artist/getIdByName?name=" + $("#fillterArtist").val(), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then((data) => data.json())
        .then((data) => {
            if (data[0]) {
                $(".checkIdArtist").text(data[0]._id);
                let t = $("#idArtistSelect").val()
                    ? $("#idArtistSelect").val() + ", " + data[0]._id
                    : data[0]._id;
                $(".addIdArtistCheck").click(() => {
                    $("#idArtistSelect").val(t);
                });
            } else {
                $(".checkIdArtist").text("");
            }
        });
});
function deleteSong(name, id) {
    $(".nameSongToDelete").text(name);
    $("#submitDeleteSong").modal("show");
    $(".submitDelete").click(() => {
        fetch("/api/song/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((data) => data.json())
            .then((data) => {
                $("#submitDeleteSong").modal("hide");
                reloadSongManage();

                if (data.status) {
                    toast({
                        title: "Success!",
                        message: data.message || "Delete Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            data.message.code ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            });
    });
}
function deleteArtist(name, id) {
    $(".nameArtistToDelete").text(name);
    $("#submitDeleteArtist").modal("show");

    $(".submitDeleteArtist").click(() => {
        fetch("/api/artist/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                $("#submitDeleteArtist").modal("hide");
                reloadArtistManage();
                if (data.status) {
                    toast({
                        title: "Success!",
                        message: data.message || "Delete Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message: data.message.code || "Can not delete!",
                        type: "error",
                        duration: 5000,
                    });
                }
            });
    });
}
function uploadArtist(i) {
    let formData = new FormData();
    let squareImage = $(".artist_input_squareImage_" + i)[0].files[0];
    let rectImage = $(".artist_input_rectImage_" + i)[0].files[0];
    if (
        !$(".artist_input_name_" + i).val() ||
        !$(".artist_input_gender_" + i).val() ||
        !$(".artist_input_birthday_" + i).val()
    ) {
        toast({
            title: "Error!",
            message: "Please enter all field of song",
            type: "error",
            duration: 5000,
        });
    } else if (!squareImage || !rectImage) {
        toast({
            title: "Error!",
            message: "Please select all the image files for artist",
            type: "error",
            duration: 5000,
        });
    } else {
        // let date = $(".artist_input_birthday_" + i).val()
        // const dateString = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        // console.log(dateString)
        formData.append("squareImage", squareImage);
        formData.append("rectImage", rectImage);
        formData.append("name", $(".artist_input_name_" + i).val());
        formData.append(
            "gender",
            $(".artist_input_gender_" + i).val() == "male" ? true : false
        );
        formData.append("birthday", $(".artist_input_birthday_" + i).val());
        formData.append("desc", $(".artist_input_desc_" + i).val() || "");

        $.ajax({
            url: "/api/artist",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                console.log(response);
                $("#submitAddArtist").modal("hide");
                if (response.status == true) {
                    reloadArtistManage();
                    for (let i = 1; i <= 5; i++) {
                        if ($(".artist_input_" + i)) {
                            $(".artist_input_name_" + i).val("");
                            $(".artist_input_gender_" + i).val("");
                            $(".artist_input_birthday_" + i).val("");
                            $(".artist_input_desc_" + i).val("");
                            $(".artist_input_squareImage_" + i).val("");
                            $(".artist_input_rectImage_" + i).val("");
                        }
                    }
                    toast({
                        title: "Success!",
                        message: response.message || "Upload Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#submitAddSong").modal("hide");
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
}
$(".submitAddArtist").click(async () => {
    for (let i = 1; i <= 5; i++) {
        if ($(".artist_input_" + i)) {
            uploadArtist(i);
        }
    }
});

$(".submitUpdateArtist").click(async () => {
    await fetch("/api/artist", {
        body: JSON.stringify({
            id: $(".artist_input_id_1").val(),
            name: $(".artist_input_name_1").val(),
            gender: $(".artist_input_gender_1").val() == "male" ? true : false,
            birthday: $(".artist_input_birthday_1").val(),
            desc: $(".artist_input_desc_1").val(),
        }),
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
        .then((data) => data.json())
        .then((data) => {
            $("#submitUpdateArtist").modal("hide");
            if (data.status) {
                toast({
                    title: "Success!",
                    message: data.message || "Update Successfully!",
                    type: "success",
                    duration: 5000,
                });
            } else {
                toast({
                    title: "Error!",
                    message: data.message,
                    type: "error",
                    duration: 5000,
                });
            }
        })
        .catch((err) => {
            toast({
                title: "Error!",
                message: err,
                type: "error",
                duration: 5000,
            });
        });
    let formData = new FormData();
    let file = $(".artist_input_squareImage_1")[0].files[0];
    if (file) {
        formData.append("squareImage", file);
        formData.append("id", $(".artist_input_id_1").val());
        await $.ajax({
            url: "/api/artist/squareImage",
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    console.log(e.loaded);
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                if (response.status) {
                    toast({
                        title: "Success!",
                        message:
                            response.message || "Upload audio Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
    let formData2 = new FormData();
    let file2 = $(".artist_input_rectImage_1")[0].files[0];
    if (file2) {
        formData2.append("bannerImage", file2);
        formData2.append("id", $(".artist_input_id_1").val());
        await $.ajax({
            url: "/api/artist/bannerImage",
            type: "PUT",
            data: formData2,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === xhr.DONE) {
                        console.log("Upload complete!");
                    }
                };

                xhr.upload.addEventListener("progress", function (e) {
                    console.log(e.loaded);
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        $(".progress-bar")
                            .css("width", percent + "%")
                            .attr("aria-valuenow", percent);
                    }
                });
                return xhr;
            },
            success: function (response) {
                if (response.status) {
                    toast({
                        title: "Success!",
                        message:
                            response.message || "Upload audio Successfully!",
                        type: "success",
                        duration: 5000,
                    });
                } else {
                    toast({
                        title: "Error!",
                        message:
                            response.message ||
                            "Can not upload file, please contact to software engineer to fix this problem!",
                        type: "error",
                        duration: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                toast({
                    title: "Error!",
                    message:
                        error ||
                        "Can not upload file, please contact to software engineer to fix this problem!",
                    type: "error",
                    duration: 5000,
                });
            },
        });
    }
    setTimeout(() => {
        location.reload();
    }, 2000);
});

function editPlaylist(id){
    console.log({id: id,title: $("#title_"+id).val(), desc: $("#desc_"+id).val()})
    $("#editplaylist").modal("show")
    $(".editplaylist").click(()=>{
        fetch("/api/playlist",{ method: "PUT", body: JSON.stringify({id: id,title: $("#title_"+id).val(), desc: $("#desc_"+id).val()}), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
            $("#editplaylist").modal("hide")
            if(data.status){
                toast({
                    title: "Success!",
                    message:
                        data.message || "Edit playlist information successfully!",
                    type: "success",
                    duration: 5000,
                });
                setTimeout(()=>{loadplaylist()},2000)
            }
        }).catch(err=>{
            $("#editplaylist").modal("hide")
            toast({
                title: "Error!",
                message:
                data.message || "Edit playlist information faily!",
                type: "error",
                duration: 5000,
            });
        })
    })
}

function deletePlaylist(id){
    $("#submitDeletePlaylist").modal("show")
    $(".idPlaylistToDelete").val(id)
}


$(".createCategory").click(()=>{
    if($("#nameCategory").val()){
        fetch("/api/playlist/category", { method:"POST", body:JSON.stringify({name: $("#nameCategory").val()}), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
            if(!data.status){
                toast({
                    title: "Error!",
                    message:
                    data.message,
                    type: "error",
                    duration: 5000,
                });
            }else{
                loadplaylist()
            }
        })
    }else{
        toast({
            title: "Error!",
            message:
            "Name is empty",
            type: "error",
            duration: 5000,
        });
    }
    $("#createCategory").modal("hide")
})
function addToHomePage(id){
    fetch("/api/playlist/home", { method:"POST", body:JSON.stringify({id: id}), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
            if(!data.status){
                toast({
                    title: "Notification!",
                    message:
                    data.message,
                    type: "info",
                    duration: 5000,
                });
            }else{
                loadplaylist()
            }
        })
}
function removeFromHomePage(id){
    fetch("/api/playlist/home", { method:"DELETE", body:JSON.stringify({id: id}), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
            if(!data.status){
                toast({
                    title: "Notification!",
                    message:
                    data.message,
                    type: "info",
                    duration: 5000,
                });
            }else{
                loadplaylist()
            }
        })
}
function removePlaylistCate(category, playlist){
    console.log(category)
    fetch("/api/playlist/category/"+category, { method:"DELETE", body:JSON.stringify({playlist: playlist}), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
                loadplaylist()
        })
}
function showConfirmDeleteCategory(id,name){
    $(".nameCategoryToDelete").text(name)
    $(".idCategoryToDelete").val(id)
    $("#submitDeleteCategory").modal("show")
}
$(".submitDeleteCategory").click(()=>{
    fetch("/api/playlist/category", {method:"DELETE",body: JSON.stringify({id: $(".idCategoryToDelete").val()}), headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(data=>data.json()).then(data=>{
        $("#submitDeleteCategory").modal("hide")
        if(data.state){
            toast({
                title: "Success!",
                message: "Delete successfully!",
                type: "success",
                duration: 5000,
            });
        }else{
            toast({
                title: "Error!",
                message: data.message||"Delete faily!",
                type: "error",
                duration: 5000,
            });
        }
        loadplaylist()
    }).catch(err=>{
        $("#submitDeleteCategory").modal("hide")
        toast({
            title: "Error!",
            message: err||"Delete faily!",
            type: "error",
            duration: 5000,
        });
    })
})

function createPlaylistAdmin(){
    console.log($("#titleNewPlayList").val())
    if($("#titleNewPlayList").val()===""){
        toast({
            title: "Waring!",
            message: "Please enter playlist name",
            type: "error",
            duration: 5000,
        })
    }else {
        fetch("/api/playlist",{method: "POST", body: JSON.stringify(
            {title: $("#titleNewPlayList").val(),desc: $("#descNewPlayList").val()}
        ), headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=> data.json()).then(data=>{
            console.log(data)
            if(data.state){
                toast({
                    title: "Success!",
                    message: "Create playlist successfully!",
                    type: "success",
                    duration: 5000,
                })
            }else{
                toast({
                    title: "Fail!",
                    message: data.message,
                    type: "error",
                    duration: 5000,
                })
            }
        }). catch(err=>{
            toast({
                title: "Fail!",
                message: err,
                type: "error",
                duration: 5000,
            })
        })
        loadplaylist()
    }
}

$("#fillterSong").keyup(() => {
    fetch("/api/song/getIdByName?name=" + $("#fillterSong").val(), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            if (data.status) {
                $(".checkIdSong").text(data.data);
                let t = $("#idSongSelect").val()
                    ? $("#idSongSelect").val() + ", " + data.data
                    : data.data;
                $(".addIdSongCheck").click(() => {
                    console.log(t)
                    $("#idSongSelect").val(t);
                    $("#fillterSong").val("");
                });
            } else {
                $(".checkIdSong").text("");
            }
        });
});
$("#fillterCategory").keyup(() => {
    fetch("/api/playlist/category/getIdByName?name=" + $("#fillterCategory").val(), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            if (data.state) {
                $(".checkIdCategory").text(data.data);
                $(".addIdCategoryCheck").click(() => {
                    $("#idCategorySelect").val(data.data);
                    $("#fillterCategory").val("");
                });
            } else {
                $(".checkIdCategory").text("");
            }
        });
});
function addToCategory(id){
    $("#idrowcategoryadd").val(id)
    $("#selectCategory").modal("show")
}
$(".card_song_action_like").click(()=>{
    toast({
        title: "Sorry!",
        message:"This function is for users only!",
        type: "success",
        duration: 5000,
    });
})
$(".card_song_action_add").click(()=>{
    toast({
        title: "Sorry!",
        message:"This function is for users only!",
        type: "success",
        duration: 5000,
    });
})
$(document).ready(()=>{
    
    $(".selectCategory").click(()=>{
        let category =  $("#idCategorySelect").val()
        let playlist = $("#idrowcategoryadd").val()
        fetch("/api/playlist/category/playlist", {
            method: "POST",
            body: JSON.stringify({category: category, playlist:playlist}),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        }).then(data=>data.json()).then(data=>{
            $("#selectCategory").modal("hide")
            loadplaylist()
        })
    })
    $(".submitDeletePlaylist").click(()=>{
        fetch("/api/playlist/"+$(".idPlaylistToDelete").val(),{ method: "DELETE", headers: { "Content-Type": "application/json; charset=utf-8" }})
        .then(data=>data.json()).then(data=>{
            $("#submitDeletePlaylist").modal("hide")
            if(data.status){
                toast({
                    title: "Success!",
                    message:
                        data.message || "Edit playlist information successfully!",
                    type: "success",
                    duration: 5000,
                });
                setTimeout(()=>{loadplaylist()},2000)
            }else{
                toast({
                    title: "Error!",
                    message:
                    data.message || "Delete playlist information faily!",
                    type: "error",
                    duration: 5000,
                });

            }
            loadplaylist()
        }).catch(err=>{
            $("#submitDeletePlaylist").modal("hide")
            toast({
                title: "Error!",
                message:
                data.message || "Edit playlist information faily!",
                type: "error",
                duration: 5000,
            });
            loadplaylist()
        })
    })
    $(".selectSong").click(()=>{
        console.log(playlistIndex)
        console.log( $("#idSongSelect").val())
        if($("#idSongSelect").val()!==""){
            fetch("/api/playlist/song", {
                method: "POST",
                body: JSON.stringify({id: playlistIndex, context: $("#idSongSelect").val()}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            }).then(data=>data.json()).then(data=>{
                if(data.state){
                    window.location.href = "/manage/playlist/"+playlistIndex
                }else{
                    toast({
                        title: "Error!",
                        message:
                        data.message || "Can not add song",
                        type: "error",
                        duration: 5000,
                    });
                }
            })
        }else{
            toast({
                title: "Warning!",
                message:
                data.message || "Please select songs",
                type: "warning",
                duration: 5000,
            });
        }
        
    })
})