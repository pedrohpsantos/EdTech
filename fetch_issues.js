const fs = require('fs');
const fetchAll = async () => {
  let all = [];
  for(let i=1; i<=10; i++) {
    const r = await fetch(`https://api.github.com/repos/pedrohpsantos/EdTech/issues?state=all&per_page=100&page=${i}`);
    const data = await r.json();
    if(data.length === 0) break;
    all = all.concat(data);
  }
  const issuesOnly = all.filter(i => !i.pull_request).map(i => ({
    number: i.number,
    title: i.title,
    state: i.state
  }));
  fs.writeFileSync('issues.json', JSON.stringify(issuesOnly, null, 2));
};
fetchAll();
