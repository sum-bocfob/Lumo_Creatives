// const { default: videojs } = require("video.js");

// *Swiper
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

// *video-js
videojs.options = {
    "preload": "none",
    "muted": true,
    "controls": true,
    "autoplay": false,
    "fluid": true,
    "poster": "../img/thumb_movie.jpg",
    languages: {
        ja: {
            'Play': '再生',
            'Pause': '停止',
            'Play Video': '再生',
            'Mute': 'ミュート',
            'Unmute': 'ミュート解除',
            'Playback Rate': '再生速度',
            'Picture-in-Picture': 'ピクチャインピクチャ',
            'Fullscreen': '全画面表示',
            'Non-Fullscreen': '通常表示'
        }
    }, // 日本語の言語対応
    language: 'ja' // 言語を日本語に設定
};
document.querySelectorAll(".video-js").forEach((e)=> {
    videojs(e,videojs.options);
})

// * Viewer.js
const viewer = new Viewer(document.querySelector(".works__pic-list"), {
    toolbar: {
        zoomIn: 3,
        zoomOut: 3,
        oneToOne: 3,
        reset: 3,
        prev: 3,
        play: {
            show: 3,
            size: 'large',
        },
        next: 3,
        rotateLeft: 0,
        rotateRight: 0,
        flipHorizontal: 0,
        flipVertical: 0,
    }
});


$(function () {
    // *Masonry
    var list = $('.works__pic-list');   //コンテナとなる要素を指定

    //Masonryの関数↓
    list.masonry({              //オプション指定箇所
        itemSelector: '.works__pic-item',   //コンテンツを指定
        // columnWidth: 205,           //カラム幅を設定
        // fitWidth: true,             //コンテンツ数に合わせ親の幅を自動調整
        columnWidth: '.grid-sizer',
        gutter: 8,
        percentPosition: true
    });
});