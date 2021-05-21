# vite-plugin-antd-theme

vite 下的 antd-design-vue 主题生成插件，依赖 antd-theme-generator

## demo

vite.config.ts

```ts
// ...
import viteAntdTheme, { ThemeEntry, AntdThemeOptions } from 'vite-plugin-antd-theme';


const themesEntry: Array<ThemeEntry> = [
  // 暗黑主题
  {
    entryPath: './node_modules/ant-design-vue/lib/style/themes/dark.less',
    outputName: 'dark',
    outputPath: './src/config'
  },
  // 默认主题
  {
    entryPath: './src/styles/vars.less',
    outputName: 'light',
    outputPath: './src/config'
  },
  // 紧凑主题
  {
    entryPath: './node_modules/ant-design-vue/lib/style/themes/compact.less',
    outputName: 'compact',
    outputPath: './src/config'
  },
  // ...其他自定义主题
];

const options: AntdThemeOptions = {
  themesEntry,
  // 是否提取全部变量，默认false，优先级低于设置themeVariables
  allVariables: true,
  // 以下是antd-theme-generator配置项
  antdDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  themeVariables: [],
  outputFilePath: path.join(__dirname, './public/static/color.less')
  customColorRegexArray: [/^fade\(.*\)$/]
};

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    // ...
    plugins: [
      // ...
      viteAntdTheme(options)
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  };
};
```

index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vite-plugin-antd-theme</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
    <!--必须将引用放在最后，否则生成的主题会被其他覆盖-->
    <link rel="stylesheet/less" type="text/css" href="/static/color.less" />
    <script src="/static/libs/less.min.js"></script>
  </body>
</html>
```

App.tsx(App.vue?)

```ts
// ...
import { defineComponent } from 'vue';
import 'ant-design-vue/dist/antd.less';
import darkVars from '@/config/dark.json';

export default defineComponent({
  mounted() {
    window.ddd = () => {
      window['less'].modifyVars(darkVars).then(console.log);
    };
  },
  setup() {
    return () => <span>嗯嗯</span>;
  },
});
```

// 测试

```js
window.ddd();
```
