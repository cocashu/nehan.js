Nehan.FlipGenerator = (function(){
  /**
     @memberof Nehan
     @class FlipGenerator
     @classdesc generate fliped layout of [style]
     @constructor
     @param style {Nehan.Style}
     @param stream {Nehan.TokenStream}
  */
  function FlipGenerator(style, stream){
    Nehan.BlockGenerator.call(this, style, stream);
  }
  Nehan.Class.extend(FlipGenerator, Nehan.BlockGenerator);

  /**
     @memberof Nehan.FlipGenerator
     @method yield
     @param context {Nehan.LayoutContext}
     @return {Nehan.Box}
  */
  FlipGenerator.prototype.yield = function(context){
    // [measure of this.style] -> [extent of this.style.parent]
    // [extent of this.style]  -> [measure of this.style.parent]
    this.style.updateContextSize(context.getBlockRestExtent(), context.getInlineMaxMeasure());
    return Nehan.BlockGenerator.prototype.yield.call(this);
  };

  return FlipGenerator;
})();

