import { defineConfig } from "vite";
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
});
