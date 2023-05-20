const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "$/api": path.resolve(__dirname, "src/api"),
      "$/components": path.resolve(__dirname, "src/components"),
      "$/entity": path.resolve(__dirname, "src/entity"),
      "$/hooks": path.resolve(__dirname, "src/hooks"),
      "$/icons": path.resolve(__dirname, "src/icons"),
      "$/panels": path.resolve(__dirname, "src/panels"),
      "$/services": path.resolve(__dirname, "src/services"),
      "$/utility": path.resolve(__dirname, "src/utility"),
      "$/NavigationContext": path.resolve(__dirname, "src/NavigationContext"),
      "$/TabbarApp": path.resolve(__dirname, "src/TabbarApp"),
    },
  },
};
