import chalk from 'chalk';
import isClient from './isClient';

const isServer = !isClient();
const colorMatching = { // Color schemes definition, text isn't optionnal
  '!!!': {
    text: 'red'
  },
  '...': {
    text: 'gray'
  },
  '.P.': {
    text: 'white',
    bg: 'yellow'
  },
  'o_o': {
    text: 'white',
    bg: 'yellow'
  },
  '.A.': {
    text: 'white',
    bg: 'green',
    bgClient : 'YellowGreen'
  },
  '.R.': {
    text: 'white',
    bg: 'cyan',
    bgClient: 'SkyBlue'
  },
  '.X.': {
    text: 'gray',
  },
  '.E.': {
    text: 'white',
    bg: 'cyan',
    bgClient: 'Gold'
  },
  '+++': {
    text: 'white',
    bg: 'magenta',
    bgClient: 'LightPink'
  },
  '_w_': {
    text: 'white',
    bg: 'black',
    bgClient: 'DarkSlateGray'
  },
};

export default function log(...messages) {
  
  const firstMessage = messages[0];
  
  if (typeof firstMessage === 'string') { // Should we colorize the first message ?
    const prefix = firstMessage.slice(0, 3);
    const match  = colorMatching[prefix];
    
    if (match) { // If a colored prefix is found
      const {text, bg, bgClient} = match;
      messages.shift(); // The first message is removed from the message list
      
      // Then displayed with colors (server : chalk, client: CSS)
      if (isServer) console.log(chalk[bg ? 'bg' + bg.slice(0, 1).toUpperCase() + bg.slice(1) : text](prefix), firstMessage.slice(3), ...messages);
      else {
        let css = `color:${text};`;
        css += bg ? bgClient ? `background:${bgClient};` : `background:${bg};` : '';
        console.log(`%c${prefix}`, css, firstMessage.slice(3), ...messages);
      }
    }
    else console.log(...messages);
  } 
  else console.log(...messages);
    
}

// Logs an error. Could also be used for client-side error reporting
export function logError(msg, error) {
  const err = error || '';
  if (err instanceof Error) {
    log('!!!', msg);
    log(err.stack);
  } 
  else log('!!!', msg, err);
}
