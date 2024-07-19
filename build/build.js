const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { minimatch } = require("minimatch");

// 读取配置文件
const config = require("./config.json"); // 路径调整为相对于 build 目录
const { exit } = require("process");

const { input: inputDir, output: outputDir, exclude, processFiles } = config;

// 调整路径为相对 build 目录
const baseInputDir = path.resolve(__dirname, "../", inputDir);
const baseOutputDir = path.resolve(__dirname, "../", outputDir);

// 创建输出目录
if (!fs.existsSync(baseOutputDir)) {
  fs.mkdirSync(baseOutputDir, { recursive: true });
}

// 复制文件到目标目录
async function copyFiles() {
  // 获取所有匹配的文件
  const files = await glob(`${baseInputDir}/**/*`, { ignore: exclude});

  files.forEach((file) => {

    const relativePath = path.relative(baseInputDir, file);
    const destPath = path.join(baseOutputDir, relativePath);

    if (fs.lstatSync(file).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(file, destPath);
    }

  });
}

copyFiles();

console.log("build successfully.");
