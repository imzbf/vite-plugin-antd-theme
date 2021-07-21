const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const TEHME_JSON_OUTPUT_PATH = './src/config';
// 1.1.0版本后支持默认导入antd的三种主题了
const defaultThemesEntry = [
  // 默认主题
  {
    entryPath: './node_modules/ant-design-vue/lib/style/themes/default.less',
    outputName: 'default',
    outputPath: TEHME_JSON_OUTPUT_PATH,
  },
  // 暗黑主题
  {
    entryPath: './node_modules/ant-design-vue/lib/style/themes/dark.less',
    outputName: 'dark',
    outputPath: TEHME_JSON_OUTPUT_PATH,
  },
  // 紧凑主题
  {
    entryPath: './node_modules/ant-design-vue/lib/style/themes/compact.less',
    outputName: 'compact',
    outputPath: TEHME_JSON_OUTPUT_PATH,
  },
];

module.exports = (options) => {
  return {
    name: 'vite-antd-theme',
    async config() {
      // 在生成完整的配置前打包主题文件，防止build命令无法找到color.less文件
      // 获取需要生成的主题变量
      const { themesEntry = defaultThemesEntry, allVariables = false } =
        options;

      if (themesEntry === defaultThemesEntry) {
        console.log(
          'vite-antd-theme：Json文件默认生成地址：',
          TEHME_JSON_OUTPUT_PATH
        );

        if (!fs.existsSync(TEHME_JSON_OUTPUT_PATH)) {
          console.log('vite-antd-theme：默认地址不存在，即将创建！');
          fs.mkdirSync(TEHME_JSON_OUTPUT_PATH);
        }
      }

      if (themesEntry instanceof Array && themesEntry.length !== '') {
        // 判断是否提供了个别的名称，否则添加全部变量名
        const overrideVariables =
          !options.themeVariables instanceof Array ||
          options.themeVariables.length === 0 ||
          allVariables;

        themesEntry.forEach(
          ({ entryPath = '', outputName = '', outputPath = '/' }, index) => {
            // 提供了less变量地址，继续。
            if (entryPath) {
              let themeVars = {};

              if (entryPath instanceof Array) {
                entryPath.forEach((pathItem) => {
                  themeVars = {
                    ...themeVars,
                    ...getLessVars(pathItem),
                  };
                });
              } else {
                themeVars = getLessVars(entryPath);
              }

              outputName = outputName ? outputName : `theme${index}`;

              fs.writeFileSync(
                `${outputPath}/${outputName}.json`,
                JSON.stringify(themeVars)
              );

              if (overrideVariables) {
                options.themeVariables =
                  options.themeVariables instanceof Array
                    ? options.themeVariables
                    : [];

                options.themeVariables = [
                  ...options.themeVariables,
                  ...Object.keys(themeVars),
                ];
              }
            }
          }
        );
      }

      await generateTheme(options);
    },
  };
};
