module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { node: 'current' },
            },
        ],
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    ignore: ['node_modules'],
}
