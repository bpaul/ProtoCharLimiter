// A Prototype class to limit textareas to a certain amount of characters
// also implements a counter to count down to this limit

var CharLimiter = Class.create();


CharLimiter.prototype = {
  // creation
  initialize: function(field, counter, options) {
    this.options = {
      'maxLimit':       140,
      'limited' :       false
      }
    Object.extend(this.options, options || {});

    this.fieldElem = $(field);
    this.counterElem = $(counter);

    // register to monitor changes
    this.register_events();

    // make sure the counter is setup
    this.doCharCounter();
  },

  register_events: function(){
    if (this.fieldElem) {
      Event.observe(this.fieldElem, 'keyup', this.doCharCounter.bindAsEventListener(this));
      Event.observe(this.fieldElem, 'keydown', this.doCharCounter.bindAsEventListener(this));

    }
  },

  doCharCounter: function(event) {
    // if there is no counter insert one
    if (!this.counterElem){
      this.fieldElem.insert({after: '<div id="' + this.fieldElem.id + '_counter"></div>'});
      this.counterElem = $(this.fieldElem.id + '_counter');
    }

    if($F(this.fieldElem).length >= this.options.maxLimit){
      // if limited then chop text at max
      if(this.options.limited) {
        this.fieldElem.value = $F(this.fieldElem).substring(0, this.options.maxLimit);
      }

      // set some css classes for visual feedback
      this.counterElem.addClassName('charcount-limit');
      this.counterElem.removeClassName('charcount-safe');
    }
    else {
      this.counterElem.removeClassName('charcount-limit');
      this.counterElem.addClassName('charcount-safe');
    }
    this.counterElem.update(this.options.maxLimit - $F(this.fieldElem).length);
  }
}

// Class level function to attach limiter to text areas
CharLimiter.findAndLimit = function() {
  // find each text area with the class "char_limiter" and add the limiter
  $$('textarea.char_limiter').each(function(textArea) {
      opts = {};
      if (textArea.hasAttribute('max')) {
        opts.maxLimit = textArea.readAttribute('max');
      }
      if (textArea.hasAttribute('limit')) {
        opts.limited = textArea.readAttribute('limit');
      }
      new CharLimiter(textArea, textArea.readAttribute('counter'), opts);
                                   });
}

// auto count textareas with our class
Event.observe(window, 'load', function() {
    CharLimiter.findAndLimit();
  });
