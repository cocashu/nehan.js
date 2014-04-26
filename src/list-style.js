var ListStyle = (function(){
  function ListStyle(opt){
    this.type = new ListStyleType(opt.type || "none");
    this.position = new ListStylePos(opt.position || "outside");
    this.image = (opt.image !== "none")? new ListStyleImage(opt.image) : null;
  }

  ListStyle.prototype = {
    isMultiCol : function(){
      return this.position.isOutside();
    },
    isInside : function(){
      return this.position.isInside();
    },
    isImageList : function(){
      return (this.image !== null);
    },
    getMarkerHtml : function(count){
      if(this.image !== null){
	return this.image.getMarkerHtml(count);
      }
      return this.type.getMarkerHtml(count);
    }
  };

  return ListStyle;
})();
