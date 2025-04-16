import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
    base: "/Lumo_Creatives/", // GitHub Pages用：リポジトリ名を指定
    build: {
        outDir: "dist", // 出力先ディレクトリ（デフォルトでdist）
        emptyOutDir: true, // ビルド前に dist を空にする
    },
    server: {
        port: 5173, // 開発用サーバーのポート番号
        open: true, // サーバー起動時にブラウザを自動で開く
    },
    plugins: [
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 70,
            },
            pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
        }),
    ],
});
