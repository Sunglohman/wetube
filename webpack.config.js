// 여기서는 클라이언트 코드로 babel 을 통해서 es6 를 사용할수 없기때문에 es5 를 사용한다.
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
const MODE = process.env.WEBPACK_ENV;
console.log(process.env.WEBPACK_ENV);
// __dirname 현재프로젝트 디렉토리 이름 반환 node.js 의 전역변수이다.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    // rules 에서는 정규식만 사용가능
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          // extract 는 코드를 하단부터 읽는다. sass -> postcss -> css
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
