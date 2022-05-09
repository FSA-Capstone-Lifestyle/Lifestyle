module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
	env: {
		production: {
			plugins: ['transform-remove-console', 'react-native-reanimated/plugin'],
		},
	},
  };
};
