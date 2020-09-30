const { question } = require('./question');

(async () => {
  const query = process.argv[2];
  if (!query) {
    console.warn(`Usage: node ${process.argv[1]} QUERY`)
    process.exit(1);
  }

  const answer = await question(query);
  console.log(`A. ${answer}`);
})();