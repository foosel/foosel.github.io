module.exports = {
    target: "serverless",
    webpack: (config) => {
        config.module.rules.push({ test: /\.md$/, use: "raw-loader" });
        config.module.rules.push({
            test: /\.ya?ml$/,
            use: "js-yaml-loader",
        });
        config.module.rules.push({
            test: /sharp/,
            use: "null-loader",
        });
        return config;
    },
};
