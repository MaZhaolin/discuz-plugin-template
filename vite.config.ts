import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from "path";

function absolutePathPlugin(baseURL) {
  return {
    name: 'absolute-path-plugin',
    transformIndexHtml(html) {
      return html.replace(/(src|href)="\//g, `$1="${baseURL}`)
      .replace("/@react-refresh", `${baseURL}@react-refresh`);
    }
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const base =  isDev
  ? "http://localhost:5173/"
  : "/source/plugin/plugin_identifier/assets/";
  return {
    root: "./react-front",
    plugins: [
      react(),
      absolutePathPlugin(base),
      {
        name: 'move-html',
        enforce: 'post',
        generateBundle(options, bundle) {
          for (const key in bundle) {
            const chunk = bundle[key];
            if (chunk.type === 'asset' && chunk.fileName.endsWith('.html')) {
              // 防止discuz移除 type="module"
              chunk.source = (chunk.source as any).replace(`type="module"`, `{eval echo 'type="module"'}`);
              let newFileName = chunk.fileName;
              newFileName = newFileName.replace(/\.html$/, '.htm');
              chunk.fileName = resolve(__dirname, `template/${newFileName}`);
            }
          }
        }
      }
    ],
    build: {
      outDir: resolve(__dirname, "assets"),
      assetsDir: "react",
      rollupOptions: {
        input: {
          admin: './react-front/admin.html',
          index: './react-front/index.html',
        }
      }
    },
  };
});
