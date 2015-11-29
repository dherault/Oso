import key from './vendor/keymaster';

export default function registerShortcuts(getState) {
  
  key('ctrl+shift+\'', () => console.log('state :', getState()));
  key('ctrl+shift+0', () => console.log('records :', getState().records));

  ['users', 'agents', 'jobs', 'skills'].map((x, i) => key('ctrl+shift+' + (i + 1), () => console.log(x + ':', getState()[x])));
}
