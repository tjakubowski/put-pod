(function(t){function e(e){for(var a,s,o=e[0],l=e[1],c=e[2],p=0,d=[];p<o.length;p++)s=o[p],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/put-pod/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"245c":function(t,e,n){},2929:function(t,e,n){"use strict";var a=n("ba44"),r=n.n(a);r.a},"2be0":function(t,e,n){"use strict";var a=n("9247"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[n("v-container",{attrs:{fluid:""}},[n("app-bar"),n("router-view")],1)],1),n("app-footer")],1)},i=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app-bar",{attrs:{app:"",flat:"",color:"white"}},[t.isHomepage?t._e():n("v-btn",{attrs:{to:"/",icon:""}},[n("v-icon",[t._v("mdi-arrow-left")])],1),n("v-toolbar-title",[t._v(t._s(t.$route.meta.title))]),n("v-spacer"),n("v-btn",{attrs:{text:"",href:t.sourceLink}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-github")]),t._v(" Source ")],1),t.isHomepage?t._e():n("v-dialog",{attrs:{width:"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{color:"primary",icon:""}},"v-btn",r,!1),a),[n("v-icon",[t._v("mdi-help-circle-outline")])],1)]}}],null,!1,2309922593)},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v("Jak to działa?")])]),n("portal-target",{attrs:{name:"app-info"}})],1)],1)],1)},o=[],l=(n("b0c0"),{name:"AppBar",data:function(){return{sourceLink:"https://github.com/tjakubowski/put-pod"}},computed:{isHomepage:function(){return"home"===this.$route.name}}}),c=l,u=n("2877"),p=n("6544"),d=n.n(p),h=n("40dc"),f=n("8336"),v=n("b0af"),b=n("99d9"),m=n("169a"),y=n("132d"),g=n("2fa4"),x=n("2a7f"),w=Object(u["a"])(c,s,o,!1,null,null,null),k=w.exports;d()(w,{VAppBar:h["a"],VBtn:f["a"],VCard:v["a"],VCardTitle:b["d"],VDialog:m["a"],VIcon:y["a"],VSpacer:g["a"],VToolbarTitle:x["a"]});var _=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-footer",{attrs:{padless:""}},[n("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[n("v-card-text",{staticClass:"text-center"},[t._v(" Tymon Jakubowski ")])],1)],1)},j=[],S={name:"AppFooter"},C=S,V=n("553a"),z=Object(u["a"])(C,_,j,!1,null,null,null),O=z.exports;d()(z,{VCard:v["a"],VCardText:b["c"],VFooter:V["a"]});var M={name:"App",components:{AppFooter:O,AppBar:k}},P=M,A=(n("5c0b"),n("7496")),D=n("a523"),I=n("f6c4"),T=Object(u["a"])(P,r,i,!1,null,null,null),R=T.exports;d()(T,{VApp:A["a"],VContainer:D["a"],VMain:I["a"]});var L=n("f309");a["default"].use(L["a"]);var E=new L["a"]({theme:{options:{customProperties:!0},themes:{light:{background:"#f0f0f0"}}}}),F=n("8c4f"),$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("portal",{attrs:{to:"app-info"}},[n("info-panels",{attrs:{panels:t.panels}})],1),n("v-row",[n("v-col",{staticClass:"text-right"},[n("v-btn",{attrs:{outlined:"",text:""},on:{click:t.reverse}},[n("v-icon",{class:{"v-icon--rotate":!t.encrypt},attrs:{left:""},domProps:{textContent:t._s("mdi-swap-vertical")}}),t._v(" "+t._s(t.encrypt?"Encrypt":"Decrypt")+" ")],1)],1)],1),n("v-form",{ref:"form"},[n("v-row",[n("v-col",{attrs:{cols:"12",md:"6",lg:"3"}},[n("base-card",{attrs:{title:"Input data",icon:"text-subject"},scopedSlots:t._u([{key:"actions",fn:function(){return[n("v-btn",{attrs:{text:"",color:"error"},on:{click:t.clearInput}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-delete-outline")}}),t._v(" Clear ")],1)]},proxy:!0}])},[n("v-textarea",{attrs:{label:t.inputLabel,filled:"",dense:"",rules:t.textRules},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),n("file-btn",{attrs:{text:"",block:"",color:"primary"},on:{input:t.importFile}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-import")}}),t._v("Import data ")],1)],1)],1),n("v-col",{attrs:{cols:"12",md:"6",lg:"6"}},[n("base-card",{attrs:{title:"Secrets",icon:"key-outline"},scopedSlots:t._u([{key:"actions",fn:function(){return[n("v-btn",{attrs:{text:"",color:"error"},on:{click:t.clearSecrets}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-delete-outline")}}),t._v(" Clear ")],1)]},proxy:!0}])},[n("div",{staticClass:"text-right"},[n("v-menu",{attrs:{"close-on-content-click":!1,"close-on-click":!1,"nudge-width":200},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{text:"",color:"primary"}},"v-btn",r,!1),a),[t._v(" Presets "),n("v-icon",{attrs:{right:""},domProps:{textContent:t._s(t.alphabetCreatorMenu?"mdi-menu-up":"mdi-menu-down")}})],1)]}}]),model:{value:t.alphabetCreatorMenu,callback:function(e){t.alphabetCreatorMenu=e},expression:"alphabetCreatorMenu"}},[n("AlphabetCreator",{on:{input:t.setAlphabetPreset,close:function(e){t.alphabetCreatorMenu=!t.alphabetCreatorMenu}}})],1),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:t.shuffleAlphabet}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-shuffle")}}),t._v(" Shuffle ")],1)],1),n("AlphabetTable",{attrs:{"is-valid":t.isAlphabetValid},on:{increase:function(e){t.alphabetMatrixSize++},decrease:function(e){t.alphabetMatrixSize--}},model:{value:t.alphabet,callback:function(e){t.alphabet=e},expression:"alphabet"}}),n("v-divider",{staticClass:"mb-3"}),n("v-text-field",{attrs:{rules:t.encryptionKeyRules,label:"Key",clearable:"",filled:"",dense:""},model:{value:t.encryptionKey,callback:function(e){t.encryptionKey=e},expression:"encryptionKey"}})],1)],1),n("v-col",{attrs:{cols:"12",md:"6",lg:"3"}},[n("base-card",{attrs:{title:"Result",icon:"lock-outline"},scopedSlots:t._u([{key:"actions",fn:function(){return[n("v-btn",{attrs:{text:"",color:"primary",disabled:0===t.result.length},on:{click:t.downloadResult}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-download")}}),t._v(" Download ")],1)]},proxy:!0}])},[n("v-textarea",{attrs:{value:t.result,label:"Encrypted text",readonly:"",filled:"",dense:""}}),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(e){t.encryptionTableShow=!t.encryptionTableShow}}},[n("v-icon",[t._v(t._s(t.encryptionTableShow?"mdi-chevron-up":"mdi-chevron-down"))])],1)],1),n("v-expand-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.encryptionTableShow,expression:"encryptionTableShow"}]},[n("v-divider",{staticClass:"mb-3"}),n("encryption-table",{directives:[{name:"show",rawName:"v-show",value:t.isFormValid,expression:"isFormValid"}],attrs:{"encryption-key":t.encryptionKeyMapped,text:t.inputMapped}}),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isFormValid,expression:"!isFormValid"}],staticClass:"text-center caption"},[t._v("Encryption table not available")])],1)])],1)],1)],1)],1)],1)},B=[],K=(n("99af"),n("a623"),n("4de4"),n("0481"),n("a630"),n("caad"),n("c975"),n("a15b"),n("d81d"),n("fb6a"),n("a434"),n("4069"),n("a9e3"),n("8ba4"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("2532"),n("3ca3"),n("466d"),n("4d90"),n("2909")),N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-expansion-panels",{attrs:{accordion:""}},t._l(t.panels,(function(e){return n("v-expansion-panel",{key:e.name},[n("v-expansion-panel-header",{domProps:{textContent:t._s(e.header)}}),n("v-expansion-panel-content",t._l(e.content,(function(e){return n("p",[t._v(t._s(e))])})),0)],1)})),1)},q=[],G={name:"InfoPanels",props:{panels:{type:Array,required:!0}}},W=G,J=n("cd55"),H=n("49e2"),Q=n("c865"),U=n("0393"),X=Object(u["a"])(W,N,q,!1,null,null,null),Y=X.exports;d()(X,{VExpansionPanel:J["a"],VExpansionPanelContent:H["a"],VExpansionPanelHeader:Q["a"],VExpansionPanels:U["a"]});var Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{loading:t.loading}},[n("v-card-title",{staticClass:"heading"},[t.icon?n("v-icon",{staticClass:"mr-3",attrs:{large:"",color:"primary"}},[t._v("mdi-"+t._s(t.icon))]):t._e(),t._v(" "+t._s(t.title)+" "),n("v-spacer"),t._t("actions")],2),n("v-divider"),n("v-card-text",[t._t("default")],2)],1)},tt=[],et={name:"BaseCard",props:{title:{type:String,required:!0},icon:{type:String,default:null},loading:{type:Boolean,default:!1}}},nt=et,at=n("ce7e"),rt=Object(u["a"])(nt,Z,tt,!1,null,null,null),it=rt.exports;d()(rt,{VCard:v["a"],VCardText:b["c"],VCardTitle:b["d"],VDivider:at["a"],VIcon:y["a"],VSpacer:g["a"]});var st=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"alphabet-table"},[n("table",{},[n("tr",[n("th",[n("div",[n("v-btn",{attrs:{"x-small":"",icon:"",disabled:t.alphabetMatrixSize>=t.maxAlphabetMatrixSize},on:{click:function(e){return t.$emit("increase")}}},[n("v-icon",[t._v("mdi-plus")])],1)],1),n("div",[n("v-btn",{attrs:{"x-small":"",icon:"",disabled:t.alphabetMatrixSize<=t.minAlphabetMatrixSize},on:{click:function(e){return t.$emit("decrease")}}},[n("v-icon",[t._v("mdi-minus")])],1)],1)]),t._l(t.alphabetMatrixSize,(function(e){return n("th",{key:"top-"+e},[t._v(" "+t._s(e)+" ")])}))],2),t._l(t.alphabetMatrixSize,(function(e){return n("tr",{key:"left-"+e},[n("th",[t._v(" "+t._s(e)+" ")]),t._l(t.alphabetMatrixSize,(function(a){return n("td",{key:"value-"+a},[n("label",[n("input",{class:t.cellClasses({x:a,y:e}),attrs:{type:"text",maxlength:"1","data-index":t.getCellIndex({x:a,y:e})},domProps:{value:t.alphabet[t.getCellIndex({x:a,y:e})]},on:{input:function(n){return t.onInput(n,{x:a,y:e})},click:function(e){return t.selectInputContent(e.target)}}}),n("span",{staticClass:"caption"},[t._v(t._s(e)+t._s(a))])])])}))],2)}))],2),n("base-error",{staticClass:"px-2 mt-1",attrs:{"is-valid":t.isAlphabetEmpty||!(t.dirty&&!t.isValid)}},[t._v("Alphabet characters are missing")])],1)},ot=[],lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"error-message"},[n("transition",{attrs:{name:"error-slide"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isValid,expression:"!isValid"}],staticClass:"error--text"},[t._t("default")],2)])],1)},ct=[],ut={name:"BaseError",props:{isValid:{type:Boolean}}},pt=ut,dt=(n("2be0"),Object(u["a"])(pt,lt,ct,!1,null,null,null)),ht=dt.exports,ft={name:"AlphabetTable",components:{BaseError:ht},data:function(){return{dirty:!1}},model:{prop:"alphabet"},props:{alphabet:{type:Array,required:!0},maxAlphabetMatrixSize:{type:Number,default:6},minAlphabetMatrixSize:{type:Number,default:2},isValid:{type:Boolean,required:!0}},computed:{alphabetMatrixSize:function(){return Math.sqrt(this.alphabet.length)},isAlphabetEmpty:function(){return this.alphabet.every((function(t){return!t.length}))}},methods:{onInput:function(t,e){this.dirty=!0;var n=this.getCellIndex(e);this.alphabet.includes(t.target.value)||0===t.target.value.length?t.target.value="":(this.focusNextInput(n),this.$set(this.alphabet,n,t.target.value),this.emitValue())},selectInputContent:function(t){t.setSelectionRange(0,t.value.length)},focusNextInput:function(t){var e=document.querySelector(".alphabet-table__input[data-index='".concat(t+1,"']"));e&&(e.focus(),this.selectInputContent(e))},getCellIndex:function(t){var e=t.x,n=t.y;return(n-1)*this.alphabetMatrixSize+e-1},cellClasses:function(t){var e=this.getCellIndex(t),n=this.alphabet[e],a=Object(K["a"])(this.alphabet);return a.splice(e,1),{"alphabet-table__input":!0,"alphabet-table__input--error":0===n.length||a.includes(n)}},emitValue:function(){this.$emit("input",this.alphabet)}}},vt=ft,bt=(n("2929"),Object(u["a"])(vt,st,ot,!1,null,null,null)),mt=bt.exports;d()(bt,{VBtn:f["a"],VIcon:y["a"]});var yt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"encryption-table"},[n("table",[n("tr",t._l(t.encryptionKey,(function(e){var a=e.letter,r=e.value;return n("th",[n("div",{domProps:{innerHTML:t._s(t.getLetterOrWhitespace(a))}}),n("span",{staticClass:"caption"},[t._v(t._s(r))])])})),0),t._l(t.text,(function(e){return n("tr",t._l(e,(function(e){var a=e.letter,r=e.value;return n("td",[n("div",{domProps:{innerHTML:t._s(t.getLetterOrWhitespace(a))}}),n("span",{staticClass:"caption"},[t._v(t._s(r))])])})),0)}))],2)])},gt=[],xt={name:"EncryptionTable",props:{encryptionKey:{type:Array,required:!0},text:{type:Array,required:!0}},methods:{getLetterOrWhitespace:function(t){return" "===t?"&nbsp;":t}}},wt=xt,kt=(n("f2df"),Object(u["a"])(wt,yt,gt,!1,null,null,null)),_t=kt.exports,jt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-card-text",[n("v-select",{attrs:{items:t.presets,"item-text":"name","item-value":"characters",label:"Alphabet presets",hint:"Create an alphabet from presets",multiple:"","persistent-hint":"",dense:""},scopedSlots:t._u([{key:"selection",fn:function(e){e.item;var a=e.index;return[0===a?n("span",[t._v(" Selected "+t._s(t.selectedPresets.length)+" presets ("+t._s(t.selectedCharactersCount)+" characters) ")]):t._e()]}}]),model:{value:t.selectedPresets,callback:function(e){t.selectedPresets=e},expression:"selectedPresets"}})],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.close}},[t._v(" Cancel ")]),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.create}},[t._v(" Create ")])],1)],1)},St=[],Ct=(n("13d5"),{name:"AlphabetCreator",data:function(){return{menu:!1,selectedPresets:[],presets:[{name:"Small letters",characters:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]},{name:"Big letters",characters:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]},{name:"Small polish letters",characters:["ą","ć","ę","ł","ń","ó","ś","ź","ż"]},{name:"Big polish letters",characters:["Ą","Ć","Ę","Ł","Ń","Ó","Ś","Ź","Ż"]},{name:"Numbers",characters:["0","1","2","3","4","5","6","7","8","9"]},{name:"Special characters",characters:["~","`","!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","}","[","]","|","'","/",":",";",'"',"'","<",">",",",".","?"]}]}},computed:{selectedCharactersCount:function(){return this.selectedPresets.reduce((function(t,e){return t+e.length}),0)}},methods:{close:function(){this.$emit("close"),this.selectedPresets=[]},create:function(){if(0!==this.selectedPresets.length){var t=this.selectedPresets.flat(),e=Math.ceil(Math.sqrt(t.length)),n=Array.from({length:e*e-t.length},(function(){return""}));this.$emit("input",[].concat(Object(K["a"])(t),Object(K["a"])(n))),this.close()}}}}),Vt=Ct,zt=n("b974"),Ot=Object(u["a"])(Vt,jt,St,!1,null,"fc1852e8",null),Mt=Ot.exports;d()(Ot,{VBtn:f["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["c"],VSelect:zt["a"],VSpacer:g["a"]});var Pt=[{header:"Klucz jawny",content:["Tekst jawny jest wymagany i powinien zawierać znaki, które zawiera alfabet. Jeśli wystepują w nim znaki, których nie zawiera alfabet, są one pomijane."]},{header:"Alfabet",content:["Aflabet jest wymagany. Musi on zawierać unikatowe znaki, które składają się na macierz N x N. Dla każego znaku przypisywana jest jego pozycja w macierzy."]},{header:"Klucz",content:["Klucz jest wymagany. Musi składać się ze znaków występujących w alfabecie. Do każdego znaku klucza przypisywana jest pozycja z alfabetu."]},{header:"Szyfrowanie",content:["Każdy znak tekstu jawnego jest przepisywany do tabeli, która zawiera tyle samo kolumn ile znaków zawiera klucz. Każdy przepisany znak z tekstu jawnego otrzymuje wartość wyliczana na podstawie sumy pozycji znaku w alfabecie i pozycji znaku klucza w danej kolumnie.","Jeżeli wartość jest większa od 100, od wartości jest odejmowana liczba 100.","Dla macierzy większych niż 5x5 zastosowano kodowanie 3 cyfrowe, co jest rozszerzeniem metody szyfrowania Nihilistów."]}],At=[{header:"LFSR",content:["LFSR (Linear Feedback Shift Register) - rejestr przesuwający, którego bit wejściowy jest funkcją liniową jego poprzedniego stanu.","Do zapisu funkcji bitu wejściowego używamy wielomian, którego najwyższy stopień równy jest N-1, gdzie N to długość rejestru."]},{header:"Generator obcinający",content:["Generator ten składa się z dwóch rejestrów LFSR. Wyjście rejestru LFSR-A jest nazywane wyjściem danych, a wyjście rejestru LFSR-S warunkuje czy wyjście LFSR-A zostanie zapisane do wyniku działania generatora.","Jeżeli wyjście rejestru LFSR-S jest równe 1, do wyjścia generatora jest zapisywany bit wyjściowy rejestru LFSR-A. W przeciwnym wypadku, wartości wyjściowe obu rejestrów są pomijane i generator jest taktowany ponownie."]}],Dt=n("19de"),It=n.n(Dt),Tt=function(t,e){if(t){var n=new FileReader;n.onload=function(t){var n=t.target;return e(n.result)},n.readAsText(t)}},Rt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",t._b({attrs:{loading:t.isSelecting},on:{click:t.onClick}},"v-btn",t.$attrs,!1),[t._t("default"),n("input",{ref:"fileInput",staticClass:"d-none",attrs:{type:"file",accept:t.accept},on:{change:t.onFileChanged}})],2)},Lt=[],Et={name:"FileBtn",props:{accept:{type:String}},data:function(){return{isSelecting:!1}},methods:{onClick:function(t){var e=this;this.isSelecting=!0,window.addEventListener("focus",(function(){e.isSelecting=!1}),{once:!0}),this.$refs.fileInput.click(),this.$emit("click",t)},onFileChanged:function(t){this.$emit("input",t.target.files[0])}}},Ft=Et,$t=Object(u["a"])(Ft,Rt,Lt,!1,null,null,null),Bt=$t.exports;d()($t,{VBtn:f["a"]});var Kt={name:"NihilistSubstitution",components:{FileBtn:Bt,InfoPanels:Y,AlphabetCreator:Mt,EncryptionTable:_t,AlphabetTable:mt,BaseCard:it},data:function(){var t=this;return{panels:Pt,encrypt:!0,alphabetCreatorMenu:!1,alphabetMatrixSize:5,text:"",textRules:[function(e){return!!e||"".concat(t.inputLabel," is required")},function(e){return!t.encrypt||Object(K["a"])(e).every((function(e){return t.alphabet.includes(e)}))||"Some characters in the text are not in the alphabet and will be omitted"}],alphabet:[],encryptionKey:"",encryptionKeyRules:[function(e){return Object(K["a"])(e).every((function(e){return t.alphabet.includes(e)}))||"Encryption key must contain alphabet characters only"},function(t){return!!t||"Encryption key is required"},function(t){return t&&t.length>=2||"Encryption key must be more than 2 characters"}],encryptionTableShow:!0}},watch:{alphabetMatrixSize:function(t){Number.isInteger(t)&&this.resizeAlphabet()},inputMapped:function(t){(t.length>0&&t[0].length>6||t.length>4)&&(this.encryptionTableShow=!1)},alphabet:function(){this.$refs.form.validate()}},computed:{inputLabel:function(){return this.encrypt?"Plaintext":"Encoded text"},isAlphabetValid:function(){return this.alphabet.every((function(t){return t.length>0}))},isFormValid:function(){var t=this;return this.inputCleared.length>0&&this.encryptionKey.length>0&&Object(K["a"])(this.encryptionKey).every((function(e){return t.alphabet.includes(e)}))&&this.isAlphabetValid},result:function(){return this.isFormValid?this.encrypt?this.inputMapped.flat().map((function(t){t.letter;var e=t.value;return e})).join(" "):this.inputMapped.flat().map((function(t){var e=t.letter;t.value;return e})).join(""):""},encryptionKeyMapped:function(){var t=this;return Object(K["a"])(this.encryptionKey).map((function(e){return{letter:e,value:t.getLetterCode(e)}}))},inputCleared:function(){var t=this;return this.encrypt?Object(K["a"])(this.text).filter((function(e){return t.alphabet.includes(e)})):this.text.replaceAll(" ","")},inputMapped:function(){var t=this;if(!this.isFormValid)return[];var e=this.alphabetMatrixSize<=5?2:3,n=this.encryptionKey.length,a=[];return a=this.encrypt?Object(K["a"])(this.inputCleared).map((function(a,r){var i=t.getLetterCode(a)+t.getLetterCode(t.encryptionKey[r%n]);return t.alphabetMatrixSize<=5&&(i%=100),{letter:a,value:i.toString().padStart(e,"0")}})):this.inputCleared.match(new RegExp(".{1,".concat(e,"}"),"g")).map((function(e,a){var r=+e-t.getLetterCode(t.encryptionKey[a%n]);r<0&&t.alphabetMatrixSize<=5&&(r+=100);var i=(+"".concat(r)[0]-1)*t.alphabetMatrixSize+(+"".concat(r)[1]-1);return{letter:t.alphabet[i]||"-",value:e}})),Array.from({length:Math.ceil(a.length/n)},(function(t,e){return a.slice(e*n,e*n+n)}))}},methods:{resizeAlphabet:function(){var t=this.alphabetMatrixSize*this.alphabetMatrixSize,e=this.alphabet.length;if(t<e)this.alphabet.splice(t);else if(t>e){var n=Array.from({length:t-e},(function(){return""}));this.alphabet=[].concat(Object(K["a"])(this.alphabet),Object(K["a"])(n))}},setAlphabetPreset:function(t){this.alphabet=t,this.alphabetMatrixSize=Math.sqrt(this.alphabet.length)},getLetterCode:function(t){var e=this.alphabet.indexOf(t);return 10*Math.floor(e/this.alphabetMatrixSize+1)+e%this.alphabetMatrixSize+1},shuffleAlphabet:function(){for(var t=Object(K["a"])(this.alphabet),e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),a=[t[n],t[e]];t[e]=a[0],t[n]=a[1]}t=t.filter((function(t){return""!==t}));var r=Array.from({length:this.alphabet.length-t.length},(function(){return""}));this.alphabet=[].concat(Object(K["a"])(t),Object(K["a"])(r))},clearInput:function(){this.text=""},clearSecrets:function(){this.alphabet=this.alphabet.map((function(){return""})),this.encryptionKey=""},reverse:function(){this.text=this.result,this.encrypt=!this.encrypt},downloadResult:function(){It()(this.result,"".concat(this.encrypt?"encryption":"decryption","-result.txt"))},importFile:function(t){var e=this;Tt(t,(function(t){e.text=t}))}},created:function(){this.resizeAlphabet()}},Nt=Kt,qt=n("62ad"),Gt=n("0789"),Wt=n("4bd4"),Jt=n("e449"),Ht=n("0fd9"),Qt=n("8654"),Ut=n("a844"),Xt=Object(u["a"])(Nt,$,B,!1,null,null,null),Yt=Xt.exports;d()(Xt,{VBtn:f["a"],VCardActions:b["a"],VCol:qt["a"],VDivider:at["a"],VExpandTransition:Gt["a"],VForm:Wt["a"],VIcon:y["a"],VMenu:Jt["a"],VRow:Ht["a"],VSpacer:g["a"],VTextField:Qt["a"],VTextarea:Ut["a"]});var Zt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("v-col",{attrs:{cols:"12",md:"6","offset-md":"3"}},[n("v-row",t._l(t.pages,(function(e){return n("v-col",{key:e.title,attrs:{cols:"12",sm:"6"}},[n("v-card",[n("v-card-title",[t._v(t._s(e.title))]),n("v-card-text",[t._v(t._s(e.description))]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{depressed:"",text:"",color:"primary",to:e.to}},[t._v("Go")])],1)],1)],1)})),1)],1)],1)},te=[],ee={name:"Homepage",data:function(){return{pages:[{title:"Nihilist substitution cipher",description:"An easy-to-use tool for encrypting and decrypting texts using nihilist ciphers.",to:"/nihilist-substitution"},{title:"Shrinking generator",description:"Shrinking generator is a form of pseudorandom number generator intended to be used in a stream cipher.",to:"/shrinking-generator"}]}}},ne=ee,ae=Object(u["a"])(ne,Zt,te,!1,null,null,null),re=ae.exports;d()(ae,{VBtn:f["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["c"],VCardTitle:b["d"],VCol:qt["a"],VRow:Ht["a"],VSpacer:g["a"]});var ie=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("portal",{attrs:{to:"app-info"}},[n("info-panels",{attrs:{panels:t.panels}})],1),n("v-col",{attrs:{cols:"12",md:"6",lg:"3"}},[n("base-card",{attrs:{title:"Input data",icon:"text-subject"},scopedSlots:t._u([{key:"actions",fn:function(){return[n("file-btn",{attrs:{text:"",color:"primary"},on:{input:t.importInputData}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-import")}}),t._v(" Import ")],1),n("v-btn",{attrs:{text:"",color:"primary",disabled:!t.isInputDataValid},on:{click:t.downloadInputData}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-download")}}),t._v(" Download ")],1)]},proxy:!0}])},[n("v-form",{ref:"inputForm",model:{value:t.isInputDataValid,callback:function(e){t.isInputDataValid=e},expression:"isInputDataValid"}},[n("v-text-field",{staticClass:"mt-3",attrs:{dense:"",outlined:"",clearable:"",type:"number",label:"Bits to generate",rules:t.generatedDigitsRules},on:{input:t.validate},model:{value:t.generatedDigitsTarget,callback:function(e){t.generatedDigitsTarget=t._n(e)},expression:"generatedDigitsTarget"}}),n("v-divider"),n("lfsr-editor",{staticClass:"mt-3",attrs:{lfsr:t.lfsr.a,name:"LFSR-A"},on:{input:t.reset}}),n("v-divider"),n("lfsr-editor",{staticClass:"mt-3",attrs:{lfsr:t.lfsr.s,name:"LFSR-S"},on:{input:t.reset}})],1)],1)],1),n("v-col",{attrs:{cols:"12",md:"6",lg:"3"}},[n("base-card",{attrs:{title:"Clock control",icon:"update",loading:t.isGenerating},scopedSlots:t._u([{key:"actions",fn:function(){return[n("v-btn",{attrs:{text:"",color:"error"},on:{click:t.reset}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-restart")}}),t._v(" Reset ")],1)]},proxy:!0}])},[n("v-row",[n("v-col",[n("v-btn",{attrs:{text:"",block:"",outlined:"",disabled:t.isRunning||t.isDone},on:{click:t.tick}},[t._v("Single tick")])],1),n("v-col",[n("v-btn",{attrs:{text:"",block:"",outlined:"",disabled:t.isRunning||t.isDone},on:{click:t.run}},[t._v("Generate")])],1)],1),n("v-divider"),n("v-card-subtitle",[t._v("Continuous work")]),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{type:"number",outlined:"","hide-details":"",dense:"",label:"Clock interval (ms)",readonly:t.isRunning},model:{value:t.clockInterval,callback:function(e){t.clockInterval=e},expression:"clockInterval"}})],1),n("v-col",[n("v-btn",{attrs:{text:"",block:"",outlined:"",disabled:t.isRunning||t.isDone},on:{click:t.runClock}},[t._v("Start")])],1),n("v-col",[n("v-btn",{attrs:{text:"",block:"",outlined:"",disabled:t.isGenerating||!t.isRunning||t.isDone},on:{click:t.stopClock}},[t._v("Stop")])],1)],1)],1)],1),n("v-col",{attrs:{cols:"12",lg:"6"}},[n("base-card",{attrs:{title:"Result",icon:"numeric"},scopedSlots:t._u([{key:"actions",fn:function(){return[n("v-btn",{attrs:{text:"",color:"primary",disabled:!t.isDone},on:{click:t.downloadResult}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s("mdi-download")}}),t._v(" Download ")],1)]},proxy:!0}])},[n("LfsrViewer",{attrs:{lfsrs:t.lfsr}}),n("v-textarea",{staticClass:"mb-3",attrs:{readonly:"",counter:"",outlined:"",dense:"",height:"200",label:"Generated bits",value:t.result}})],1)],1)],1)},se=[],oe=(n("4160"),n("96cf"),n("1da1")),le=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-text-field",{attrs:{clearable:"",dense:"",counter:"",outlined:"",type:"number",rules:t.stateRules,label:t.stateLabel},on:{input:t.onInput},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}}),n("v-combobox",{attrs:{multiple:"",counter:"",outlined:"","small-chips":"",type:"number","append-icon":null,rules:t.polynomialRules,label:t.polynomialLabel},on:{input:t.onInput},model:{value:t.polynomial,callback:function(e){t.polynomial=e},expression:"polynomial"}})],1)},ce=[],ue={name:"LfsrEditor",props:{lfsr:{type:Object,required:!0},name:{type:String,required:!0}},data:function(){var t=this;return{polynomialRules:[function(t){return t.length>0||"Polynomial is required"},function(e){var n=t.register.getMaxPolynomial();return e.every((function(t){return+t<=n}))||"Max polynomial degree is ".concat(n)}],stateRules:[function(t){return t.length>0||"State cannot be empty"},function(t){return Object(K["a"])(t).every((function(t){return[0,1].includes(+t)}))||"State must be a binary string"}]}},computed:{register:function(){return this.lfsr.register},state:{set:function(t){this.register.initialState=t},get:function(){return this.lfsr.initialState.join("")}},polynomial:{set:function(t){this.register.polynomial=t},get:function(){return this.lfsr.polynomial.map((function(t){return"".concat(t)}))}},stateLabel:function(){return"".concat(this.name," state")},polynomialLabel:function(){return"".concat(this.name," polynomial")}},methods:{onInput:function(){this.$emit("input",{state:this.state,polynomial:this.polynomial})}}},pe=ue,de=n("2b5d"),he=Object(u["a"])(pe,le,ce,!1,null,null,null),fe=he.exports;d()(he,{VCombobox:de["a"],VTextField:Qt["a"]});var ve=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.lfsrs,(function(e,a){return n("div",{key:a,staticClass:"lfsr-list"},[n("div",{staticClass:"d-flex justify-center"},[n("v-slide-group",{staticClass:"py-3",attrs:{"show-arrows":""}},t._l(e.state,(function(a,r){return n("v-slide-item",{key:r},[n("span",{class:["lfsr-list__item",{"lfsr-list__item--polynomial":t.isPolynomial(e.polynomial,r)}]},[t._v(" "+t._s(a)+" ")])])})),1)],1),n("div",{staticClass:"d-flex justify-center"},[t._v(" "+t._s(t.polynomialString(e))+" = "+t._s(t.nextDigit(e))+" ")])])})),0)},be=[],me={name:"LfsrViewer",props:{lfsrs:{type:Object,required:!0}},methods:{isPolynomial:function(t,e){return t.includes(e)},nextDigit:function(t){return t.register.next()},polynomialString:function(t){var e=Object(K["a"])(t.polynomial).sort((function(t,e){return t-e}));return e.map((function(e){return t.state[e]})).join(" ^ ")}}},ye=me,ge=(n("5d85"),n("7efd")),xe=n("9dbe"),we=Object(u["a"])(ye,ve,be,!1,null,null,null),ke=we.exports;d()(we,{VSlideGroup:ge["a"],VSlideItem:xe["a"]});n("6062"),n("10d1"),n("ddb0");var _e=n("d4ec"),je=n("bee2"),Se=n("ade3"),Ce=n("5364"),Ve=n("9bd1"),ze=new WeakMap,Oe=new WeakMap,Me=new WeakMap,Pe=function(){function t(e,n){var a=this;Object(_e["a"])(this,t),ze.set(this,{writable:!0,value:void 0}),Oe.set(this,{writable:!0,value:void 0}),Me.set(this,{writable:!0,value:void 0}),Object(Se["a"])(this,"isStateValid",(function(t){return Object(K["a"])(t).every((function(t){return[0,1].includes(t)}))})),Object(Se["a"])(this,"isPolynomialValid",(function(t){var e=a.getMaxPolynomial();return t.length>0&&t.every((function(t){return t<=e}))})),Object(Se["a"])(this,"normalizeState",(function(t){return Object(K["a"])(t).map((function(t){return+t}))})),Object(Se["a"])(this,"normalizePolynomial",(function(t){return Object(K["a"])(new Set(t.map((function(t){return+t}))))})),Object(Se["a"])(this,"getMaxPolynomial",(function(){return Object(Ce["a"])(a,Oe).length-1})),Object(Se["a"])(this,"next",(function(){return a.polynomial.reduce((function(t,e){var n=a.state[t],r=a.state[e];return n^r}))})),Object(Se["a"])(this,"tick",(function(){var t=a.next(),e=Object(Ce["a"])(a,Oe).pop();return Object(Ce["a"])(a,Oe).unshift(t),e})),Object(Se["a"])(this,"reset",(function(){a.initialState=Object(K["a"])(Object(Ce["a"])(a,ze))})),this.initialState=e,this.polynomial=n}return Object(je["a"])(t,[{key:"initialState",set:function(t){var e=this.normalizeState(t);this.isStateValid(e)&&(Object(Ve["a"])(this,ze,e),Object(Ve["a"])(this,Oe,Object(K["a"])(e)))},get:function(){return Object(Ce["a"])(this,ze)}},{key:"state",set:function(t){var e=this.normalizeState(t);this.isStateValid(t)&&Object(Ve["a"])(this,Oe,Object(K["a"])(e))},get:function(){return Object(Ce["a"])(this,Oe)}},{key:"polynomial",set:function(t){var e=this.normalizePolynomial(t);this.isPolynomialValid(e)&&Object(Ve["a"])(this,Me,e)},get:function(){return Object(Ce["a"])(this,Me)}}]),t}(),Ae=n("ebb0"),De=n.n(Ae),Ie=function(){return new Worker(n.p+"js/worker.3ebdce63.worker.js")},Te=new De.a(new Ie),Re=function(t){return Te.postMessage(t)},Le={send:Re},Ee={name:"ShrinkingGenerator",components:{FileBtn:Bt,InfoPanels:Y,LfsrViewer:ke,LfsrEditor:fe,BaseCard:it},data:function(){return{panels:At,lfsr:{a:{state:[],initialState:"100001010010110111010111010",polynomial:[0,1,5,8]},s:{state:[],initialState:"10101000010010001001111010010010010001",polynomial:[4,1,6,9,11,17,14]}},isInputDataValid:!1,clockInterval:100,clock:null,isGenerating:!1,generatedDigitsTarget:2e4,generatedDigitsRules:[function(t){return!!t||"Bits to generate must be a number greater than 0"}],result:""}},computed:{isRunning:function(){return!!this.clock||this.isGenerating},isDone:function(){return this.generatedDigitsTarget===this.generatedDigits},generatedDigits:function(){return this.result.length}},methods:{runClock:function(){this.isDone?this.stopClock():(this.tick(),this.clock=setTimeout(this.runClock,this.clockInterval))},stopClock:function(){this.clock&&(clearTimeout(this.clock),this.clock=null)},tick:function(){var t=this.lfsr.a.register.tick(),e=this.lfsr.s.register.tick();this.mapLfsrs(),0!==e&&(this.result=t+this.result)},run:function(){var t=this;return Object(oe["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.isGenerating=!0,!window.Worker){e.next=6;break}return e.next=4,t.runAsync();case 4:e.next=7;break;case 6:t.runSync();case 7:t.isGenerating=!1;case 8:case"end":return e.stop()}}),e)})))()},runSync:function(){while(this.generatedDigits<this.generatedDigitsTarget)this.tick()},runAsync:function(){var t=this;return Object(oe["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.getInputDataObject(),e.next=3,Le.send(n);case 3:a=e.sent,r=a.result,i=a.lfsr,t.result=r,t.lfsr.a.register.state=i.a.state,t.lfsr.s.register.state=i.s.state,t.mapLfsrs();case 10:case"end":return e.stop()}}),e)})))()},reset:function(){this.stopClock(),this.result="",this.lfsr.a.register.reset(),this.lfsr.s.register.reset(),this.mapLfsrs(),this.validate()},validate:function(){this.$refs.inputForm.validate()},mapLfsrs:function(){var t=this,e=["state","initialState","polynomial"];e.forEach((function(e){t.lfsr.a[e]=t.lfsr.a.register[e]})),e.forEach((function(e){t.lfsr.s[e]=t.lfsr.s.register[e]}))},getInputDataObject:function(){return{bits:this.generatedDigitsTarget,lfsr:{a:{initialState:this.lfsr.a.register.initialState,polynomial:this.lfsr.a.register.polynomial},s:{initialState:this.lfsr.s.register.initialState,polynomial:this.lfsr.s.register.polynomial}}}},downloadResult:function(){this.isDone&&It()(this.result,"shrinking-generator-result.txt")},downloadInputData:function(){var t=this.getInputDataObject();It()(JSON.stringify(t),"shrinking-generator-input.txt")},importInputData:function(t){var e=this;Tt(t,(function(t){var n=JSON.parse(t);e.generatedDigitsTarget=n.bits;var a=e.lfsr.a.register,r=e.lfsr.s.register;a.initialState=n.lfsr.a.initialState,a.polynomial=n.lfsr.a.polynomial,r.initialState=n.lfsr.s.initialState,r.polynomial=n.lfsr.s.polynomial,e.reset()}))}},created:function(){this.lfsr.a.register=new Pe(this.lfsr.a.initialState,this.lfsr.a.polynomial),this.lfsr.s.register=new Pe(this.lfsr.s.initialState,this.lfsr.s.polynomial),this.mapLfsrs()}},Fe=Ee,$e=Object(u["a"])(Fe,ie,se,!1,null,null,null),Be=$e.exports;d()($e,{VBtn:f["a"],VCardSubtitle:b["b"],VCol:qt["a"],VDivider:at["a"],VForm:Wt["a"],VIcon:y["a"],VRow:Ht["a"],VTextField:Qt["a"],VTextarea:Ut["a"]});var Ke=n("5f35");a["default"].use(F["a"]);var Ne=new F["a"]({mode:"history",base:Ke["publicPath"],routes:[{path:"/",name:"home",component:re,meta:{title:"POD"}},{path:"/nihilist-substitution",name:"nihilist",component:Yt,meta:{title:"Nihilist Substitution"}},{path:"/shrinking-generator",name:"shrinking",component:Be,meta:{title:"Shrinking Generator"}}]}),qe="POD";Ne.beforeEach((function(t,e,n){document.title=t.meta.title||qe,n()}));var Ge=Ne,We=n("2b88"),Je=n.n(We);a["default"].use(Je.a),a["default"].config.productionTip=!1,new a["default"]({router:Ge,vuetify:E,render:function(t){return t(R)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"5d85":function(t,e,n){"use strict";var a=n("245c"),r=n.n(a);r.a},"5f35":function(t,e,n){t.exports={publicPath:"/put-pod/",transpileDependencies:["vuetify"],lintOnSave:!0}},9247:function(t,e,n){},"9c0c":function(t,e,n){},ba44:function(t,e,n){},e96d:function(t,e,n){},f2df:function(t,e,n){"use strict";var a=n("e96d"),r=n.n(a);r.a}});
//# sourceMappingURL=app.76ab3383.js.map