{"changed":true,"filter":false,"title":"after_deploy.sh","tooltip":"/after_deploy.sh","value":"#!/bin/sh\n\nnpm i -g nodemon\n\nread -p \"Please enter your Github email: \" answer\ngit config --global user.email $answer\ngit config --global push.default simple\n\necho \"Development environnement deployed\"\n","undoManager":{"mark":10,"position":100,"stack":[[{"start":{"row":2,"column":7},"end":{"row":2,"column":8},"action":"remove","lines":[" "],"id":107}],[{"start":{"row":2,"column":7},"end":{"row":2,"column":8},"action":"insert","lines":["g"],"id":108}],[{"start":{"row":2,"column":8},"end":{"row":2,"column":9},"action":"insert","lines":[" "],"id":109}],[{"start":{"row":2,"column":9},"end":{"row":2,"column":10},"action":"insert","lines":["n"],"id":110}],[{"start":{"row":2,"column":10},"end":{"row":2,"column":11},"action":"insert","lines":["o"],"id":111}],[{"start":{"row":2,"column":11},"end":{"row":2,"column":12},"action":"insert","lines":["d"],"id":112}],[{"start":{"row":2,"column":12},"end":{"row":2,"column":13},"action":"insert","lines":["e"],"id":113}],[{"start":{"row":2,"column":13},"end":{"row":2,"column":14},"action":"insert","lines":["m"],"id":114}],[{"start":{"row":2,"column":14},"end":{"row":2,"column":15},"action":"insert","lines":["o"],"id":115}],[{"start":{"row":2,"column":15},"end":{"row":2,"column":16},"action":"insert","lines":["n"],"id":116}],[{"start":{"row":2,"column":16},"end":{"row":3,"column":0},"action":"insert","lines":["",""],"id":117}],[{"start":{"row":6,"column":39},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":118}],[{"start":{"row":7,"column":0},"end":{"row":8,"column":0},"action":"insert","lines":["",""],"id":119}],[{"start":{"row":8,"column":0},"end":{"row":8,"column":1},"action":"insert","lines":["e"],"id":120}],[{"start":{"row":8,"column":1},"end":{"row":8,"column":2},"action":"insert","lines":["c"],"id":121}],[{"start":{"row":8,"column":2},"end":{"row":8,"column":3},"action":"insert","lines":["h"],"id":122}],[{"start":{"row":8,"column":3},"end":{"row":8,"column":4},"action":"insert","lines":["o"],"id":123}],[{"start":{"row":8,"column":4},"end":{"row":8,"column":5},"action":"insert","lines":[" "],"id":124}],[{"start":{"row":8,"column":5},"end":{"row":8,"column":7},"action":"insert","lines":["\"\""],"id":125}],[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"insert","lines":["d"],"id":126}],[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"insert","lines":["e"],"id":127}],[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"insert","lines":["p"],"id":128}],[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"insert","lines":["l"],"id":129}],[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"insert","lines":["o"],"id":130}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"insert","lines":["y"],"id":131}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"remove","lines":["y"],"id":132}],[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"remove","lines":["o"],"id":133}],[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"remove","lines":["l"],"id":134}],[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"remove","lines":["p"],"id":135}],[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"remove","lines":["e"],"id":136}],[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"remove","lines":["d"],"id":137}],[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"insert","lines":["D"],"id":138}],[{"start":{"row":8,"column":7},"end":{"row":8,"column":8},"action":"insert","lines":["e"],"id":139}],[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"insert","lines":["p"],"id":140}],[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"insert","lines":["l"],"id":141}],[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"insert","lines":["o"],"id":142}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"insert","lines":["y"],"id":143}],[{"start":{"row":8,"column":12},"end":{"row":8,"column":13},"action":"insert","lines":["m"],"id":144}],[{"start":{"row":8,"column":13},"end":{"row":8,"column":14},"action":"insert","lines":["e"],"id":145}],[{"start":{"row":8,"column":14},"end":{"row":8,"column":15},"action":"insert","lines":["n"],"id":146}],[{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"insert","lines":["t"],"id":147}],[{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"insert","lines":[" "],"id":148}],[{"start":{"row":8,"column":17},"end":{"row":8,"column":18},"action":"insert","lines":["c"],"id":149}],[{"start":{"row":8,"column":18},"end":{"row":8,"column":19},"action":"insert","lines":["o"],"id":150}],[{"start":{"row":8,"column":19},"end":{"row":8,"column":20},"action":"insert","lines":["m"],"id":151}],[{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"insert","lines":["p"],"id":152}],[{"start":{"row":8,"column":21},"end":{"row":8,"column":22},"action":"insert","lines":["l"],"id":153}],[{"start":{"row":8,"column":22},"end":{"row":8,"column":23},"action":"insert","lines":["e"],"id":154}],[{"start":{"row":8,"column":23},"end":{"row":8,"column":24},"action":"insert","lines":["t"],"id":155}],[{"start":{"row":8,"column":24},"end":{"row":8,"column":25},"action":"insert","lines":["e"],"id":156}],[{"start":{"row":8,"column":25},"end":{"row":8,"column":26},"action":"insert","lines":["d"],"id":157}],[{"start":{"row":8,"column":25},"end":{"row":8,"column":26},"action":"remove","lines":["d"],"id":158}],[{"start":{"row":8,"column":24},"end":{"row":8,"column":25},"action":"remove","lines":["e"],"id":159}],[{"start":{"row":8,"column":23},"end":{"row":8,"column":24},"action":"remove","lines":["t"],"id":160}],[{"start":{"row":8,"column":22},"end":{"row":8,"column":23},"action":"remove","lines":["e"],"id":161}],[{"start":{"row":8,"column":21},"end":{"row":8,"column":22},"action":"remove","lines":["l"],"id":162}],[{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"remove","lines":["p"],"id":163}],[{"start":{"row":8,"column":19},"end":{"row":8,"column":20},"action":"remove","lines":["m"],"id":164}],[{"start":{"row":8,"column":18},"end":{"row":8,"column":19},"action":"remove","lines":["o"],"id":165}],[{"start":{"row":8,"column":17},"end":{"row":8,"column":18},"action":"remove","lines":["c"],"id":166}],[{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"remove","lines":[" "],"id":167}],[{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"remove","lines":["t"],"id":168}],[{"start":{"row":8,"column":14},"end":{"row":8,"column":15},"action":"remove","lines":["n"],"id":169}],[{"start":{"row":8,"column":13},"end":{"row":8,"column":14},"action":"remove","lines":["e"],"id":170}],[{"start":{"row":8,"column":12},"end":{"row":8,"column":13},"action":"remove","lines":["m"],"id":171}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"remove","lines":["y"],"id":172}],[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"remove","lines":["o"],"id":173}],[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"remove","lines":["l"],"id":174}],[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"remove","lines":["p"],"id":175}],[{"start":{"row":8,"column":8},"end":{"row":8,"column":9},"action":"insert","lines":["v"],"id":176}],[{"start":{"row":8,"column":9},"end":{"row":8,"column":10},"action":"insert","lines":["e"],"id":177}],[{"start":{"row":8,"column":10},"end":{"row":8,"column":11},"action":"insert","lines":["l"],"id":178}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"insert","lines":["o"],"id":179}],[{"start":{"row":8,"column":12},"end":{"row":8,"column":13},"action":"insert","lines":["p"],"id":180}],[{"start":{"row":8,"column":13},"end":{"row":8,"column":14},"action":"insert","lines":["m"],"id":181}],[{"start":{"row":8,"column":14},"end":{"row":8,"column":15},"action":"insert","lines":["e"],"id":182}],[{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"insert","lines":["n"],"id":183}],[{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"insert","lines":["t"],"id":184}],[{"start":{"row":8,"column":17},"end":{"row":8,"column":18},"action":"insert","lines":[" "],"id":185}],[{"start":{"row":8,"column":18},"end":{"row":8,"column":19},"action":"insert","lines":["e"],"id":186}],[{"start":{"row":8,"column":19},"end":{"row":8,"column":20},"action":"insert","lines":["n"],"id":187}],[{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"insert","lines":["v"],"id":188}],[{"start":{"row":8,"column":21},"end":{"row":8,"column":22},"action":"insert","lines":["i"],"id":189}],[{"start":{"row":8,"column":22},"end":{"row":8,"column":23},"action":"insert","lines":["r"],"id":190}],[{"start":{"row":8,"column":23},"end":{"row":8,"column":24},"action":"insert","lines":["o"],"id":191}],[{"start":{"row":8,"column":24},"end":{"row":8,"column":25},"action":"insert","lines":["n"],"id":192}],[{"start":{"row":8,"column":25},"end":{"row":8,"column":26},"action":"insert","lines":["n"],"id":193}],[{"start":{"row":8,"column":26},"end":{"row":8,"column":27},"action":"insert","lines":["e"],"id":194}],[{"start":{"row":8,"column":27},"end":{"row":8,"column":28},"action":"insert","lines":["m"],"id":195}],[{"start":{"row":8,"column":28},"end":{"row":8,"column":29},"action":"insert","lines":["e"],"id":196}],[{"start":{"row":8,"column":29},"end":{"row":8,"column":30},"action":"insert","lines":["n"],"id":197}],[{"start":{"row":8,"column":30},"end":{"row":8,"column":31},"action":"insert","lines":["t"],"id":198}],[{"start":{"row":8,"column":31},"end":{"row":8,"column":32},"action":"insert","lines":[" "],"id":199}],[{"start":{"row":8,"column":32},"end":{"row":8,"column":33},"action":"insert","lines":["d"],"id":200}],[{"start":{"row":8,"column":33},"end":{"row":8,"column":34},"action":"insert","lines":["e"],"id":201}],[{"start":{"row":8,"column":34},"end":{"row":8,"column":35},"action":"insert","lines":["p"],"id":202}],[{"start":{"row":8,"column":35},"end":{"row":8,"column":36},"action":"insert","lines":["l"],"id":203}],[{"start":{"row":8,"column":36},"end":{"row":8,"column":37},"action":"insert","lines":["o"],"id":204}],[{"start":{"row":8,"column":37},"end":{"row":8,"column":38},"action":"insert","lines":["y"],"id":205}],[{"start":{"row":8,"column":38},"end":{"row":8,"column":39},"action":"insert","lines":["e"],"id":206}],[{"start":{"row":8,"column":39},"end":{"row":8,"column":40},"action":"insert","lines":["d"],"id":207}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":8,"column":40},"end":{"row":8,"column":40},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1447856701247}