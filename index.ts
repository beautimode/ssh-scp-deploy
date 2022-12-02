import * as core from '@actions/core';
import { execSync } from 'child_process';

try {
  const src = core.getInput('src');
  const host = core.getInput('host');
  const remote = core.getInput('remote');
  const port = core.getInput('port');
  const user = core.getInput('user');
  const key = core.getInput('key');

  execSync(`echo -e "${key}" >__TEMP_INPUT_KEY_FILE`);
  execSync(`chmod 600 __TEMP_INPUT_KEY_FILE`);
  execSync(`scp -o StrictHostKeyChecking=no -v -i __TEMP_INPUT_KEY_FILE -P ${port} -r ${src} ${user}@${host}:${remote}`);

} catch (error: any) {
  core.setFailed(error.message);
}
