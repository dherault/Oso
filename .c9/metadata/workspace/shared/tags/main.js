{"changed":true,"filter":false,"title":"main.js","tooltip":"/shared/tags/main.js","value":"<todo>\n\n  <h3>{ opts.title }</h3>\n\n  <ul>\n    <li each={ items.filter(whatShow) }>\n      <label class={ completed: done }>\n        <input type=\"checkbox\" checked={ done } onclick={ parent.toggle }> { title }\n      </label>\n    </li>\n  </ul>\n\n  <form onsubmit={ add }>\n    <input name=\"input\" onkeyup={ edit }>\n    <button disabled={ !text }>Add #{ items.filter(whatShow).length + 1 }</button>\n\n    <button disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>\n    X{ items.filter(onlyDone).length } </button>\n  </form>\n\n  <!-- this script tag is optional -->\n  <script>\n    this.items = opts.items\n\n    edit(e) {\n      this.text = e.target.value\n    }\n\n    add(e) {\n      if (this.text) {\n        this.items.push({ title: this.text })\n        this.text = this.input.value = ''\n      }\n    }\n\n    removeAllDone(e) {\n      this.items = this.items.filter(function(item) {\n        return !item.done\n      })\n    }\n\n    // an two example how to filter items on the list\n    whatShow(item) {\n      return !item.hidden\n    }\n\n    onlyDone(item) {\n     return item.done\n   }\n\n    toggle(e) {\n      var item = e.item\n      item.done = !item.done\n      return true\n    }\n  </script>\n\n</todo>","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":57,"column":7},"action":"insert","lines":["<todo>","","  <h3>{ opts.title }</h3>","","  <ul>","    <li each={ items.filter(whatShow) }>","      <label class={ completed: done }>","        <input type=\"checkbox\" checked={ done } onclick={ parent.toggle }> { title }","      </label>","    </li>","  </ul>","","  <form onsubmit={ add }>","    <input name=\"input\" onkeyup={ edit }>","    <button disabled={ !text }>Add #{ items.filter(whatShow).length + 1 }</button>","","    <button disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>","    X{ items.filter(onlyDone).length } </button>","  </form>","","  <!-- this script tag is optional -->","  <script>","    this.items = opts.items","","    edit(e) {","      this.text = e.target.value","    }","","    add(e) {","      if (this.text) {","        this.items.push({ title: this.text })","        this.text = this.input.value = ''","      }","    }","","    removeAllDone(e) {","      this.items = this.items.filter(function(item) {","        return !item.done","      })","    }","","    // an two example how to filter items on the list","    whatShow(item) {","      return !item.hidden","    }","","    onlyDone(item) {","     return item.done","   }","","    toggle(e) {","      var item = e.item","      item.done = !item.done","      return true","    }","  </script>","","</todo>"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":2,"column":20},"end":{"row":2,"column":20},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1447871384742}