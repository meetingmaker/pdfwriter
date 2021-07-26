import { _ as _createClass, a as _classCallCheck, b as _asyncToGenerator } from './_rollupPluginBabelHelpers-4955e3f9.js';
import _replace from 'lodash/replace';
import _split from 'lodash/split';

function rgb2hex(str) {
  return '#' + str.split(',').map(function (s) {
    return (s.replace(/\D/g, '') | 0).toString(16);
  }).map(function (s) {
    return s.length < 2 ? '0' + s : s;
  }).join('');
}

function findBoldTag(str, open) {
  var i = 0;
  var normalText = str.substr(i, open - i);
  var boldText;
  i = open + 3;
  var close = str.indexOf('</b>', i);

  if (close > i) {
    boldText = str.substr(i, close - i);
    i = close + 3;
  } else {
    boldText = str.substr(i);
    i = str.length;
  }

  if (i < 0) {
    i = 0;
  }

  return {
    n: i,
    normalText: normalText,
    boldText: boldText
  };
}

function findSpanTag(str, open) {
  // console.log('findSpanTag', str);
  var i = 0;
  var normalText = str.substr(i, open - i);
  var span = {
    text: '',
    font: 'n'
  };
  var close = str.indexOf('</span>', open);

  if (close > open) {
    var spanHTML = str.substr(open, close + 6 - i);
    i = close + 6;
    var div = document.createElement('div');
    div.innerHTML = spanHTML;

    if (div.firstChild && div.firstChild.style && div.firstChild.style !== undefined) {
      if (div.firstChild.style.color !== undefined) {
        span.color = rgb2hex(div.firstChild.style.color);
      }

      if (div.firstChild.style.fontWeight === 'bold') {
        span.font = 'b';
      }
    }

    span.text = div.firstChild.innerText;
  } else {
    span.text = str.substr(i);
    i = str.length;
  }

  if (i < 0) {
    i = 0;
  }

  return {
    i: i,
    normalText: normalText,
    span: span
  };
}

var Pdf =
/*#__PURE__*/
function () {
  function Pdf() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Pdf);

    this.host = 'https://nclong87.github.io';
    this.path = '/pdfwriter';
    this.data = [];
    this.options = options;
  }

  _createClass(Pdf, [{
    key: "setHost",
    value: function setHost(host) {
      this.host = host;
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: "addPage",
    value: function addPage(options) {
      this.data.push({
        type: 'addPage',
        item: {
          options: options
        }
      });
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.data.push({
        type: 'move',
        item: {
          direction: 'up',
          value: value
        }
      });
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.data.push({
        type: 'move',
        item: {
          direction: 'down',
          value: value
        }
      });
    }
  }, {
    key: "addIcon",
    value: function addIcon(icon) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.data.push({
        type: 'icon',
        item: {
          icon: icon,
          style: style,
          options: options
        }
      });
    }
  }, {
    key: "addImage",
    value: function addImage(image) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.data.push({
        type: 'image',
        item: {
          image: image,
          options: options
        }
      });
    }
  }, {
    key: "addText",
    value: function addText(text) {
      var _this = this;

      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var newContent = _replace(text, '<br/>', '<br>');

      newContent = _replace(text, '<br></b>', '</b><br>');

      _split(newContent, '<br>').forEach(function (text) {
        if (text.length === 0) {
          _this.data.push({
            type: 'text',
            item: {
              text: ' ',
              style: style,
              options: options
            }
          });

          return;
        }

        var array = [];
        var max = 0;

        for (var i = 0; i < text.length; i++) {
          if (max > 30) {
            break;
          }

          max += 1;
          var str = text.substr(i);
          var regex = /(<span|<b>)/g;
          var matches = regex.exec(str);

          if (matches) {
            if (matches[0].includes('<b>')) {
              var _findBoldTag = findBoldTag(str, matches.index),
                  normalText = _findBoldTag.normalText,
                  boldText = _findBoldTag.boldText,
                  n = _findBoldTag.n;

              i += n;

              if (normalText) {
                array.push({
                  text: normalText,
                  type: 'n'
                });
              }

              if (boldText) {
                array.push({
                  text: boldText,
                  type: 'b'
                });
              }
            } else if (matches[0].includes('<span')) {
              var findSpanTagResp = findSpanTag(str, matches.index);
              i += findSpanTagResp.i;
              var _normalText = findSpanTagResp.normalText,
                  span = findSpanTagResp.span;
              var _text = span.text,
                  font = span.font,
                  color = span.color;

              if (_normalText) {
                array.push({
                  text: _normalText,
                  type: 'n'
                });
              }

              if (_text) {
                array.push({
                  text: _text,
                  type: font,
                  color: color
                });
              }
            }
          } else {
            i = text.length;
            array.push({
              text: str,
              type: 'n'
            });
          }
        }

        if (array.length === 1 && array[0].type === 'n') {
          _this.data.push({
            type: 'text',
            item: {
              text: array[0].text,
              style: style,
              options: options
            }
          });
        } else {
          _this.data.push({
            type: 'formatted-text',
            item: {
              text: array,
              style: style,
              options: options
            }
          });
        }
      });
    }
  }, {
    key: "output",
    value: function output() {
      var host = this.host,
          path = this.path;
      this.iframe = document.createElement('iframe');
      this.iframe.style = 'border:0 ;position: fixed;left: 0;top: 0;z-index: 9999;cursor: wait;background-color: #fff;opacity: 0.5;';
      this.iframe.width = '100%';
      this.iframe.height = '100%';
      this.iframe.src = "".concat(host).concat(path);
      document.body.appendChild(this.iframe);
      var self = this;
      var promise = new Promise(function (resolve) {
        function handleOnReceivedMessage(event) {
          if (event.data && event.data.type) {
            if (event.data.type === 'ready') {
              var data = {
                data: self.data,
                options: self.options
              }; // console.log('data', data);

              self.iframe.contentWindow.postMessage(data, '*');
            } else if (event.data.type === 'finish') {
              // console.log(event.data.data);
              resolve(event.data.data);
              document.body.removeChild(self.iframe);
              window.removeEventListener('message', handleOnReceivedMessage, false);
            }
          }
        }

        window.addEventListener('message', handleOnReceivedMessage);
      });
      return promise["catch"](function (error) {
        console.log('ERROR', error);
        return null;
      });
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var fileName,
            blob,
            url,
            a,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileName = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                _context.next = 3;
                return this.output();

              case 3:
                blob = _context.sent;
                url = window.URL.createObjectURL(blob);
                a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                a.href = url;
                a.download = fileName || 'untitled.pdf';
                a.click();
                window.URL.revokeObjectURL(url);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }]);

  return Pdf;
}();

export default Pdf;
