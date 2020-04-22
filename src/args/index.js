// Parse CMD arguments into arg:value dictionary
function parse() {
  return {
    operation: getOps(),
    args: getArgs() 
  };
}

function getOps() {
  return process.argv[2];
}

function getArgs() {
  let b;
  let args = {};

  process.argv.slice(3)
    .reduce((a, v, i) => {
      if (b) {
        a.push([b, v]);
        b = !b;
      } else {
        b = v;
      }

      return a;
    }, [])
    .forEach(([argKey, argValue]) => {
      args[argKey.replace(/\-/g, '')] = argValue;
    });


  return args;
}

module.exports = { parse };

