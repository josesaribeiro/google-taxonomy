const envs = ['local', 'stage', 'prod'];

function getEnvironmentSettings(env = null) {
  return {};
}

function getEnvironment(args) {
  return args.e;
}

function mergeDefaultSettings(args) {
  const env = getEnvironmentSettings(getEnvironment(args)); 
  return args; 
}

module.exports = { mergeDefaultSettings };

