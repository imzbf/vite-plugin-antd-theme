const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

module.exports = (options) => {
  return {
    name: 'vite-antd-theme',
    options(opt) {
      // 获取需要生成的主题变量
      const { themesEntry, allVariables = false } = options;

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
              const themeVars = getLessVars(entryPath);

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

      generateTheme(options)
        .then((less) => {
          console.log('Theme generated successfully');
        })
        .catch((error) => {
          console.log('Error', error);
        });

      return opt;
    },
  };
};
