const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/pedrohpsantos/.gemini/antigravity/brain/88df106b-cc36-406e-a8c2-1afc7753314c/.system_generated/steps/5392/output.txt', 'utf8'));

const mappings = {
  'RF01.1': 'RF01',
  'RF01.2': 'RF02',
  'RF01.3': 'RF03',
  'RF01.4': 'RF04',
  'RF01.5': 'RF05',
  'RF01.6': 'RF06',
  'RF02.1': 'RF07',
  'RF02.2': 'RF08',
  'RF02.3': 'RF09',
  'RF02.4': 'RF10',
  'RF02.5': 'RF11',
  'RF02.6': 'RF12',
  'RF02.7': 'RF13',
  'RF03.1': 'RF14',
  'RF03.2': 'RF15',
  'RF03.3': 'RF16',
  'RF03.4': 'RF17',
  'RF04.1': 'RF18',
  'RF04.2': 'RF19',
  'RF04.3': 'RF20',
  'RF04.4': 'RF21',
  'RF04.5': 'RF22'
};

const calls = [];

data.issues.forEach(issue => {
  if (!issue.body) return;
  
  let newBody = issue.body;
  let changed = false;
  
  for (const [oldRef, newRef] of Object.entries(mappings)) {
    if (newBody.includes(oldRef)) {
      const regex = new RegExp(oldRef.replace('.', '\\.'), 'g');
      newBody = newBody.replace(regex, newRef);
      changed = true;
    }
  }

  if (changed) {
    calls.push({
      issueNumber: issue.number,
      title: issue.title,
      body: newBody
    });
  }
});

fs.writeFileSync('updates.json', JSON.stringify(calls, null, 2));
console.log('Found ' + calls.length + ' issues to update.');
