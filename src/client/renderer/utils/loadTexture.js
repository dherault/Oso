import _ from 'three';
import log from '../../../utils/log';
import config from '../../../../config';

export default url => new Promise((resolve, reject) => new _.TextureLoader().load(
  'http://' + config.publicIp + ':' + config.webServerPort + '/' + url, 
  resolve, 
  xhr => log('... Loading', url, (xhr.loaded / xhr.total * 100).toFixed(0), '%'), 
  reject
));
