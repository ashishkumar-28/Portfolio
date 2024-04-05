(function (global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('ActiveMenuLink', [], factory);
  } else if (typeof exports === 'object') {
    exports.ActiveMenuLink = factory();
  } else {
    global.ActiveMenuLink = factory();
  }
})(this, function () {
  return function (t) {
    var e = {};

    function n(i) {
      if (e[i]) return e[i].exports;
      var r = e[i] = {
        i: i,
        l: false,
        exports: {}
      };
      return t[i].call(r.exports, r, r.exports, n), r.l = true, r.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, i) {
      !n.o(t, e) && Object.defineProperty(t, e, {
        enumerable: true,
        get: i
      });
    }, n.r = function (t) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Module'
        });
      }
      Object.defineProperty(t, '__esModule', {
        value: true
      });
    }, n.t = function (t, e) {
      if (1 & e) t = n(t);
      if (8 & e) return t;
      if (4 & e && typeof t === 'object' && t && t.__esModule) return t;
      var i = Object.create(null);
      n.r(i);
      Object.defineProperty(i, 'default', {
        enumerable: true,
        value: t
      });
      if (2 & e && typeof t !== 'string') {
        for (var r in t) n.d(i, r, function (e) {
          return t[e];
        }.bind(null, r));
      }
      return i;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      n.d(e, 'a', e);
      return e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = '', n(n.s = 1);
  }([function (t, e) {
    var n = Object.prototype.toString;

    t.exports = function (t) {
      switch (n.call(t)) {
        case '[object Date]':
          return 'date';
        case '[object RegExp]':
          return 'regexp';
        case '[object Arguments]':
          return 'arguments';
        case '[object Array]':
          return 'array';
        case '[object Error]':
          return 'error';
      }
      return t === null ? 'null' : void 0 === t ? 'undefined' : t !== t ? 'nan' : t && 1 === t.nodeType ? 'element' : typeof (t = t.valueOf ? t.valueOf() : Object.prototype.valueOf.apply(t));
    };
  }, function (t, e, n) {
    'use strict';

    var i = this && this.__assign || function () {
      return (i = Object.assign || function (t) {
        for (var e, n = 1, i = arguments.length; n < i; n++)
          for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t;
      }).apply(this, arguments);
    };

    Object.defineProperty(e, '__esModule', {
      value: true
    });

    var r = n(2),
      o = n(3),
      u = function () {
        function t(t, e) {
          var n = this;
          this.activeIndex = -1;
          this.nameAttribute = 'link-name';
          this.params = {
            itemTag: 'li',
            activeClass: 'active',
            scrollOffset: 0,
            scrollDuration: 500,
            ease: 'out-circ',
            headerHeight: null,
            default: null,
            showHash: true
          };

          if (!(t.length < 1)) {
            this.manuSelector = t;
            this.params = i(i({}, this.params), e);
            var r = document.querySelectorAll(this.manuSelector)[0];

            if (r !== undefined) {
              if (this.params.headerHeight === null) {
                this.params.headerHeight = r.clientHeight;
              }

              this.menu = r;
              this.links = this.getLinks();
              this.setNames(this.links);
              this.defaultLink = this.getDefaultLink();
              this.onScrollLinks(this.links);
              this.onClickLinks(this.links);
            }

            document.addEventListener('scroll', function (t) {
              n.onScrollLinks(n.links);
            });
          }
        }

        t.prototype.getLinks = function () {
          return this.menu === undefined ? null : this.menu.querySelectorAll(this.params.itemTag + ' a');
        };

        t.prototype.getDefaultLink = function () {
          var t = this;

          if (this.menu === undefined) return null;

          var e = this.getLinks(),
            n = null;

          e.forEach(function (e) {
            var i = e.getAttribute('href');

            if (i !== undefined && i.indexOf('#') === 0) {
              i = i.replace('#', '');

              if (i === t.params.default) {
                n = e;
              }
            }
          });

          return n;
        };

        t.prototype.setNames = function (t) {
          var e = this;
          t.forEach(function (t) {
            var n = t.getAttribute('href');

            if (n !== undefined && n.indexOf('#') !== -1) {
              var i = n.split('#')[1];
              t.setAttribute(e.nameAttribute, i);
            }
          });
        };

        t.prototype.setDefaultActive = function () {
          if (this.defaultLink !== null) {
            this.defaultLink.classList.add(this.params.activeClass);
          }
        };

        t.prototype.unsetDefaultActive = function () {
          if (this.defaultLink !== null) {
            this.defaultLink.classList.remove(this.params.activeClass);
          }
        };

        t.prototype.onScrollLinks = function (t) {
          var e = this,
            n = window.scrollY;
          this.activeIndex = -1;

          t.forEach(function (t, i) {
            var o = t.getAttribute(e.nameAttribute),
              u = document.getElementById(o);

            if (u !== null) {
              var a = u.offsetTop - r.getMarginTop(u);
              t.classList.remove(e.params.activeClass);

              if (o !== e.params.default && u && a <= n + e.params.headerHeight && a + r.getAbsoluteHeight(u) > n + e.params.headerHeight) {
                t.classList.add(e.params.activeClass);
                e.activeIndex = i;
                e.unsetDefaultActive();
              }
            }
          });

          if (this.activeIndex === -1) {
            this.setDefaultActive();
          }
        };

        t.prototype.onClickLinks = function (t) {
          var e = this;
          t.forEach(function (t) {
            var n = t.getAttribute(e.nameAttribute),
              i = document.getElementById(n);

            t.addEventListener('click', function (t) {
              t.preventDefault();
              var u = null,
                a = e.params.scrollOffset;

              if (n !== e.params.default && i) {
                u = i.offsetTop - a - r.getMarginTop(i) - e.params.headerHeight;
              }

              if (n === e.params.default) {
                u = 0;
              }

              if (u !== null) {
                o(0, u, {
                  ease: e.params.ease,
                  duration: e.params.scrollDuration
                });
              }

              if (e.params.showHash) {
                var s = '#' + n;

                if (history.pushState && document.origin !== undefined) {
                  history.pushState(null, null, s);
                } else {
                  location.hash = s;
                }
              }
            });
          });
        };

        return t;
      }();

    e.default = u;
  }, function (t, e, n) {
    'use strict';

    Object.defineProperty(e, '__esModule', {
      value: true
    });
    e.getMarginTop = e.getAbsoluteHeight = void 0;

    e.getAbsoluteHeight = function (t) {
      var e = window.getComputedStyle(t),
        n = parseFloat(e.marginTop) + parseFloat(e.marginBottom);
      return Math.ceil(t.offsetHeight + n);
    };

    e.getMarginTop = function (t) {
      var e = window.getComputedStyle(t);
      return parseFloat(e.marginTop);
    };
  }, function (t, e, n) {
    'use strict';

    var i = n(4),
      r = n(8);

    t.exports = function (t, e, n) {
      n = n || {};
      var o = function () {
        var t = window.pageYOffset || document.documentElement.scrollTop,
          e = window.pageXOffset || document.documentElement.scrollLeft;
        return {
          top: t,
          left: e
        };
      }(),
        u = i(o).ease(n.ease || 'out-circ').to({
          top: e,
          left: t
        }).duration(n.duration || 1000);

      function a() {
        r(a);
        u.update();
      }

      return u.update(function (t) {
        window.scrollTo(0 | t.left, 0 | t.top);
      }), u.on('end', function () {
        a = function () {};
      }), a(), u;
    };
  }, function (t, e, n) {
    'use strict';

    var i = n(5),
      r = n(6),
      o = n(0),
      u = n(7);

    function a(t) {
      if (!(this instanceof a)) return new a(t);
      this._from = t;
      this.ease('linear');
      this.duration(500);
    }

    t.exports = a;
    i(a.prototype);
    a.prototype.reset = function () {
      return this.isArray = 'array' === o(this._from), this._curr = r(this._from), this._done = false, this._start = Date.now(), this;
    };

    a.prototype.to = function (t) {
      return this.reset(), this._to = t, this;
    };

    a.prototype.duration = function (t) {
      return this._duration = t, this;
    };

    a.prototype.ease = function (t) {
      if (typeof t === 'function') t = u[t];
      if (typeof t !== 'function') throw new TypeError('invalid easing function');
      return this._ease = t, this;
    };

    a.prototype.stop = function () {
      return this.stopped = true, this._done = true, this.emit('stop'), this.emit('end'), this;
    };

    a.prototype.step = function () {
      if (!this._done) {
        var t = this._duration,
          e = Date.now();
        if (e - this._start >= t) {
          this._from = this._to;
          this._update(this._to);
          this._done = true;
          this.emit('end');
          return this;
        }

        var n = this._from,
          i = this._to,
          o = this._curr,
          u = (0, this._ease)((e - this._start) / t);

        if (this.isArray) {
          for (var a = 0; a < n.length; ++a) o[a] = n[a] + (i[a] - n[a]) * u;

          this._update(o);
          return this;
        }

        for (var s in n) o[s] = n[s] + (i[s] - n[s]) * u;

        this._update(o);
      }

      return this;
    };

    a.prototype.update = function (t) {
      return arguments.length === 0 ? this.step() : (this._update = t, this);
    };
  }, function (t, e, n) {
    'use strict';

    var i;
    try {
      i = n(0);
    } catch (t) {
      i = n(0);
    }

    t.exports = function t(e) {
      switch (i(e)) {
        case 'object':
          var n = {};
          for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
          return n;
        case 'array':
          n = new Array(e.length);
          for (var o = 0; o < e.length; o++) n[o] = t(e[o]);
          return n;
        case 'regexp':
          var u = '';
          return u += e.multiline ? 'm' : '', u += e.global ? 'g' : '', u += e.ignoreCase ? 'i' : '', new RegExp(e.source, u);
        case 'date':
          return new Date(e.getTime());
        default:
          return e;
      }
    };
  }, function (t, e) {
    function n(t) {
      if (t) return function (t) {
        for (var e in n.prototype) t[e] = n.prototype[e];
        return t;
      }(t);
    }

    t.exports = n;
    n.prototype.on = n.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks['$' + t] = this._callbacks['$' + t] || []).push(e), this;
    };

    n.prototype.once = function (t, e) {
      function n() {
        this.off(t, n);
        e.apply(this, arguments);
      }

      return n.fn = e, this.on(t, n), this;
    };

    n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var n, i = this._callbacks['$' + t];
      if (!i) return this;
      if (1 == arguments.length) return delete this._callbacks['$' + t], this;
      for (var r = 0; r < i.length; r++)
        if ((n = i[r]) === e || n.fn === e) {
          i.splice(r, 1);
          break;
        } return this;
    };

    n.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
        n = this._callbacks['$' + t];
      if (n)
        for (var i = 0, r = (n = n.slice(0)).length; i < r; ++i) n[i].apply(this, e);
      return this;
    };

    n.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks['$' + t] || [];
    };

    n.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e) {
    e = t.exports = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
      var e = (new Date).getTime(),
        n = Math.max(0, 16 - (e - i)),
        r = setTimeout(t, n);
      return i = e, r;
    };
    var i = (new Date).getTime();
    var n = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout;
    e.cancel = function (t) {
      n.call(window, t);
    };
  }]).default;
});
