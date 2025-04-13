// Swiper
const swiper = new Swiper(".swiper", {
    loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

$(function () {
    // クリックで動画再生
    const video_wrapper = $(".works__video-wrapper");
    video_wrapper.on("click", function () {
        const video = $(this).children("video").get(0);
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        $(this).toggleClass("playing");
    });
});
