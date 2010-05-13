// A Prototype class to limit textareas to a certain amount of characters
// also implements a counter to count down to this limit

var CharLimiter = Class.create();


CharLimiter.prototype = {
  // creation
  initialize: function(field, counter, options) {
    this.options = {
      'maxLimit':	140,
      'limited'	:	false
      }
    Object.extend(this.options, options || {});

    this.fieldElem = $(field);
    this.counterElem = $(counter);
    
    // register to monitor changes
    CharLimiter.register_events();
    
    // make sure the counter is setup
    this.doCharCounter();
  },
  
  register_events: function(){
    if (this.fieldElem) {
      Event.observe(this.fieldElem, 'keyup', this.doCharCounter.bind);
      Event.observe(this.fieldElem, 'keydown', this.doCharCounter.bind);
      
    }
  },
  
  doCharCounter(event) {
    // if there is no counter insert one
    if (!this.counterElem){
      this.counterElem = this.fieldElem.insert({after: '<div class="char_counter"></div>'});
    }
    
    if(this.fieldElem.length >= this.options.maxLimit){
      // if limited then chop text at max
      if(this.options.limited) {    
        this.fieldElem.value = this.fieldElem.substring(0, this.options.maxLimit); 
      }

      // set some css classes for visual feedback
      this.counterElem.addClassName('charcount-limit');
      this.counterElem.removeClassName('charcount-safe');
    } 
    else {
      this.counterElem.removeClassName('charcount-limit');
      this.counterElem.addClassName('charcount-safe');
    }
    counterElem.update(this.fieldElem.length + '/' + this.options.maxLimit );
  }
}


// auto count textareas with our class
Event.observe(window, 'load', function() {
  
  // find each text area with the class "char_limiter" and add the limiter
  $$('textarea.char_limiter').each(function(textArea) {
    CharLimiter.new(textArea, textArea.counter,
                    {
                      maxLimit: textArea.max,
                      limit: textArea.limit
                    });
                                   });
              
              
              });
