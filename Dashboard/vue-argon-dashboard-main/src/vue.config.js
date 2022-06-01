configureWebpack: {
  module: {
    rules: [
      {
        test: /\.geojson$/,
        loader: "json-loader",
      },
    ];
  }
}
