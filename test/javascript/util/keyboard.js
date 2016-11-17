describe('Keyboard util', function() {
  /**
   * Create object to use as fake event.
   * @param  {number} keyCode Key code of the key that is simulated.
   * @param  {object} opts    Options that say if modifiers are pressed.
   * @return {object}         Object to use intead of an event.
   */
  const createEvent = function(keyCode, opts) {
    let options = opts || {},
        isCtrl = !!options.ctrl,
        isAlt = !!options.alt,
        isShift = !!options.shift,
        isMeta = !!options.meta,
        event = {
          shiftKey: isShift,
          altKey: isAlt,
          ctrlKey: isCtrl,
          metaKey: isMeta,
          keyCode: keyCode,
          which: keyCode
        };
    return event;
  };
  const keyCodes = {
    'A': 65,
    'TAB': 9,
    'ENTER': 13,
    'ESCAPE': 27,
    'SPACE': 32,
    'ARROW_LEFT': 37,
    'ARROW_UP': 38,
    'ARROW_RIGHT': 39,
    'ARROW_DOWN': 40
  };

  it('exists on the Foundation API', function() {
    (window.Foundation.Keyboard).should.be.an('object');
  });

  describe('parseKey()', function() {
    it('returns the character pressed for a normal key', function() {
      let event = createEvent(keyCodes['A']),
          parsedKey = Foundation.Keyboard.parseKey(event);

      parsedKey.should.be.equal('A');
    });
    it('returns the character pressed for special keys', function() {
      for (let key in keyCodes) {
        let keyCode = keyCodes[key];
        let event = createEvent(keyCode),
            parsedKey = Foundation.Keyboard.parseKey(event);

        parsedKey.should.be.equal(key);
      }
    });
    it('recognizes if CTRL was pressed', function() {
      let event = createEvent(keyCodes['A'], {ctrl: true}),
          parsedKey = Foundation.Keyboard.parseKey(event);

      parsedKey.should.be.equal('CTRL_A');
    });
    it('recognizes if ALT was pressed', function() {
      let event = createEvent(keyCodes['A'], {alt: true}),
          parsedKey = Foundation.Keyboard.parseKey(event);

      parsedKey.should.be.equal('ALT_A');
    });
    it('recognizes if SHIFT was pressed', function() {
      let event = createEvent(keyCodes['A'], {shift: true}),
          parsedKey = Foundation.Keyboard.parseKey(event);

      parsedKey.should.be.equal('SHIFT_A');
    });
    it('recognizes if multiple modifiers were pressed', function() {
      let event = createEvent(keyCodes['A'], {shift: true, alt: true, ctrl: true}),
          parsedKey = Foundation.Keyboard.parseKey(event);

      parsedKey.should.be.equal('ALT_CTRL_SHIFT_A');
    });
  });
  describe('handleKey()', function() {
    it('executes callback for given key event', function() {
      let spy = sinon.spy();

      // Register component
      Foundation.Keyboard.register('MyComponent', {
        'ESCAPE': 'close'
      });

      let event = createEvent(keyCodes['ESCAPE']);

      Foundation.Keyboard.handleKey(event, 'MyComponent', {
        close: () => {
          spy();
        }
      });

      spy.called.should.be.true;
    });
    it('executes handled callback for given key event', function() {
      let spy = sinon.spy();

      // Register component
      Foundation.Keyboard.register('MyComponent', {
        'ESCAPE': 'close'
      });

      let event = createEvent(keyCodes['ESCAPE']);

      Foundation.Keyboard.handleKey(event, 'MyComponent', {
        close: () => {
          // stuff
        },
        handled: () => {
          spy();
        }
      });

      spy.called.should.be.true;
    });
    it('executes unhandled callback for given key event', function() {
      let spy = sinon.spy();

      // Register component
      Foundation.Keyboard.register('MyComponent', {
      });

      let event = createEvent(keyCodes['ESCAPE']);

      Foundation.Keyboard.handleKey(event, 'MyComponent', {
        unhandled: () => {
          spy();
        }
      });

      spy.called.should.be.true;
    });
  });

  describe('findFocusable()', function() {
    it('finds focusable elements inside a container', function() {
      let $html = $(`<div>
            <a href="#">Link</a>
            <button>Button</button>
          </div>`).appendTo('body');

      let $focusable = Foundation.Keyboard.findFocusable($html);

      $focusable.length.should.be.equal(2);

      $html.remove();
    });

    it('does not find hidden focusable elements', function() {
      let $html = $(`<div>
            <a style="display: none;" href="#">Link</a>
            <button style="display: none;">Button</button>
          </div>`).appendTo('body');

      let $focusable = Foundation.Keyboard.findFocusable($html);

      $focusable.length.should.be.equal(0);

      $html.remove();
    });

    it('does not find disabled focusable elements', function() {
      let $html = $(`<div>
            <button disabled>Button</button>
          </div>`).appendTo('body');

      let $focusable = Foundation.Keyboard.findFocusable($html);

      $focusable.length.should.be.equal(0);

      $html.remove();
    });

    it('does not find focusable elements with negative tabindex', function() {
      let $html = $(`<div>
            <button tabindex="-1">Button</button>
          </div>`).appendTo('body');

      let $focusable = Foundation.Keyboard.findFocusable($html);

      $focusable.length.should.be.equal(0);

      $html.remove();
    });
  });
});
