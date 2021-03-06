// Dependendices
import config from 'react-global-configuration';

const internals = {
  env: window.location.hostname === 'localhost' ? 'dev' : 'prd',
  apiURL: 'http://localhost:3000'
};

// Env Check
if( internals.env !== 'dev') {
  internals.apiURL = 'https://acklen-coding-test.herokuapp.com';
}

internals.init = () => {
  config.set({ app: internals },  { freeze: false });
};

internals.init();
