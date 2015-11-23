export function loadScripts(urls) {
  if (!(urls instanceof Array)) throw('loadScripts : wrong arg type');
  return Promise.all(urls.map(url => loadScript.call(this, url)));
}  

// Stackoverflow
// Loads a script from its url, then add it to top of the other <script> tags
export default function loadScript(source) {
  const scripts = document.getElementsByTagName('script');
  return new Promise((resolve, reject) => {
    if ([].slice.call(scripts).every(script => script.src !== source)) {
      console.log('... Loading ', source);
      const newElement = document.createElement('script');
      const scriptElement = scripts[0];
      newElement.src = source;
      newElement.onerror = reject;
      newElement.onload = newElement.onreadystatechange = () => {
        // if (!this.readyState || this.readyState === 'complete') resolve();
        // Bad code :
        if (!this || !this.readyState || this.readyState === 'complete') resolve();
      };
      scriptElement.parentNode.insertBefore(newElement, scriptElement);
    } 
    else resolve();
  });
}