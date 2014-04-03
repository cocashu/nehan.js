var BlockLayoutContext = (function(){
  function BlockLayoutContext(max_extent){
    this.curExtent = 0;
    this.maxExtent = max_extent; // const
    this.pushedElements = [];
    this.elements = [];
    this.pulledElements = [];
  }

  BlockLayoutContext.prototype = {
    addElement : function(element, extent){
      this.elements.push(element);
      this.curExtent += extent;
    },
    pushElement : function(element, extent){
      this.pushedElements.push(element);
      this.curExtent += extent;
    },
    pullElement : function(element, extent){
      this.pulledElements.unshift(element);
      this.curExtent += extent;
    },
    getCurExtent : function(){
      return this.curExtent;
    },
    getRestExtent : function(){
      return this.maxExtent - this.curExtent;
    },
    getMaxExtent : function(){
      return this.maxExtent;
    },
    getElements : function(){
      return this.pulledElements
	.concat(this.elements)
	.concat(this.pushedElements);
    }
  };

  return BlockLayoutContext;
})();
