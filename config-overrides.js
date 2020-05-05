const { 
  override, 
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy 
} = require('customize-cra');
//path是nodeJs中内置库,专门用于解决路径问题的(无需下载)
const { resolve } = require("path"); 

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
      
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),

  addWebpackAlias({
    "@": resolve(__dirname, "src")
  }), 
  
  addDecoratorsLegacy()
);