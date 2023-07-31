/**
 * 一般在项目入口导入
 * 导入 ./src 下的所有 svg 文件
 */

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../src", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export {}; // 默认导出，ts如若不导出，会警告
