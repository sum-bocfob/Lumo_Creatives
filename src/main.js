import "./style.css";

// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

import Viewer from "viewerjs";
import imagesLoaded from "imagesloaded";
import $ from "jquery";
import Masonry from "masonry-layout";

// jQueryのインスタンスにimagesLoadedを追加
$.fn.imagesLoaded = function (...args) {
    return imagesLoaded(this.get(), ...args);
};

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
    preload: "none",
    muted: true,
    controls: true,
    autoplay: false,
    fluid: true,
    poster: "img/thumb_movie.jpg",
    languages: {
        ja: {
            Play: "再生",
            Pause: "停止",
            "Play Video": "再生",
            Mute: "ミュート",
            Unmute: "ミュート解除",
            "Playback Rate": "再生速度",
            "Picture-in-Picture": "ピクチャインピクチャ",
            Fullscreen: "全画面表示",
            "Non-Fullscreen": "通常表示",
        },
    }, // 日本語の言語対応
    language: "ja", // 言語を日本語に設定
};
document.querySelectorAll(".video-js").forEach((e) => {
    videojs(e, videojs.options);
});

// * Viewer.js
const viewer = new Viewer(document.querySelector(".works__list--pic"), {
    toolbar: {
        zoomIn: 3,
        zoomOut: 3,
        oneToOne: 3,
        reset: 3,
        prev: 3,
        play: {
            show: 3,
            size: "large",
        },
        next: 3,
        rotateLeft: 0,
        rotateRight: 0,
        flipHorizontal: 0,
        flipVertical: 0,
    },
});

$(function () {
    // *Masonry
    var list = $(".works__list--pic"); //コンテナとなる要素を指定

    $(".works__list--pic").imagesLoaded(function () {
        // images have loaded
        new Masonry(".works__list--pic", {
            //オプション指定箇所
            itemSelector: ".works__pic-item", //コンテンツを指定
            columnWidth: ".works__pic-item", //カラム幅を設定
            percentPosition: true,
            gutter: ".gutter-sizer",
        });
    });

    // * Worksタブ切り替え
    const tab_btns = $(".works__cat-item");
    const lists = [$(".works__list--movie"), $(".works__list--pic"), $(".works__list--design")];
    const view_more_movie_btn = $(".movie-btn-wrapper");
    lists.forEach((l, idx) => {
        if (idx !== 0) {
            l.hide();
        }
    });

    tab_btns.on("click", function () {
        tab_btns.each(function () {
            $(this).removeClass("works__cat-item--active");
        });

        const btn = $(this);

        lists.forEach((l) => {
            l.slideUp("0.2s");
        });
        setTimeout(function () {
            lists[tab_btns.index(btn)].slideDown("0.2s");
            btn.addClass("works__cat-item--active");
        }, 400);

        // Movieならもっと見るボタン表示
        if (btn.hasClass("works__cat-item--movies")) {
            view_more_movie_btn.fadeIn();
        } else {
            view_more_movie_btn.fadeOut();
        }
    });

    // *ハンバーガーメニュー
    const ham = $(".hamburger");
    const gnav = $(".header__gnav");
    const header = $(".header");
    ham.on("click", function () {
        $(this).toggleClass("js-open-menu");
        gnav.toggleClass("js-open-menu");
        header.toggleClass("js-open-menu");
    });
    gnav.on("click", function () {
        $(this).removeClass("js-open-menu");
        ham.removeClass("js-open-menu");
        header.removeClass("js-open-menu");
    });

    // *SP用Movieもっと見る
    const movie_btn = $(".movie-btn");
    movie_btn.on("click", function () {
        $(".works__item--hideSP").slideToggle().css("display", "flex");
        $(this).text($(this).text() === "もっと見る" ? "閉じる" : "もっと見る");
    });

    // *ナビゲーションアクティブ
    let area_tops = [];
    function PositionCheck() {
        $(".area").each(function (i) {
            area_tops[i] = $(this).offset().top;
        });
    }
    function SetNavActive() {
        const win_top = $(window).scrollTop();
        const header_links = $(".header__link");
        header_links.removeClass("header__link--active");

        let idx = 0;
        for (let t of area_tops) {
            if (idx === area_tops.length - 1) {
                $(header_links[idx]).addClass("header__link--active");
                return;
            }
            if (win_top >= t && win_top <= area_tops[idx + 1]) {
                $(header_links[idx]).addClass("header__link--active");
                return;
            }
            idx++;
        }
    }

    // * ページ内スクロール
    // ヘッダーの高さ取得
    const header_height = header.outerHeight();
    $("a[href^='#']").on("click", function () {
        const href = $(this).attr("href");
        const target = $(href === "#" || href === "" ? "html" : href);
        const pos = target.offset().top;
        $("html, body").animate({
            scrollTop: pos - header_height - 32,
        });
    });

    // *スクロール
    const top_btn = $(".page-top-btn");
    $(window).on("scroll", function () {
        // *一定量スクロールでヘッダーの背景透過
        if ($(this).scrollTop() > window.outerHeight) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }

        // *一定量スクロールでトップへ戻るボタン表示
        if ($(this).scrollTop() > $(document).height() / 2) {
            top_btn.fadeIn();
        } else {
            top_btn.fadeOut();
        }

        // *ナビゲーションアクティブ
        PositionCheck();
        SetNavActive();
    });

    // *トップへ戻るボタン
    top_btn.on("click", function () {
        $("html, body").animate({
            scrollTop: 0,
        });
    });

    $(window).on("load", function () {
        // *ナビゲーションアクティブ
        PositionCheck();
        SetNavActive();
    });
    $(window).on("resize", function () {
        // *ナビゲーションアクティブ
        PositionCheck();
        SetNavActive();
    });
});
