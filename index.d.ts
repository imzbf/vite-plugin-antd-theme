import { Plugin } from 'vite';

export declare interface ThemeEntry {
  entryPath: string | string[];
  outputName: string;
  outputPath: string;
}

/**
 * antd-theme-generator generateTheme options
 */
export declare interface AntdThemeGeneratorOptions {
  antDir?: string;
  stylesDir?: string | Array<string>;
  varFile?: string;
  themeVariables?: Array<string>;
  outputFilePath?: string;
  customColorRegexArray?: Array<RegExp>;
}

export declare interface AntdThemeOptions extends AntdThemeGeneratorOptions {
  themesEntry?: Array<ThemeEntry>;
  allVariables?: boolean;
}

declare function createPlugin(options?: AntdThemeOptions): Plugin;

export default createPlugin;
