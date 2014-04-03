var HoriLayoutEvaluator = (function(){
  function HoriLayoutEvaluator(){
    LayoutEvaluator.call(this);
  }
  Class.extend(HoriLayoutEvaluator, LayoutEvaluator);

  HoriLayoutEvaluator.prototype.evalInlineBlock = function(iblock){
    iblock.css.display = "inline-block";
    return this.evalBlock(iblock);
  };

  HoriLayoutEvaluator.prototype.evalInlineChild = function(line, child){
    return Html.tagWrap("span", this.evalInlineElements(child, child.elements), {
      "style":Css.toString(line.css),
      "class":line.classes.join(" ")
    });
  };

  HoriLayoutEvaluator.prototype.evalRuby = function(line, ruby){
    var body = this.evalRt(line, ruby) + this.evalRb(line, ruby);
    return Html.tagWrap("span", body, {
      "style":Css.toString(ruby.getCssHoriRuby(line)),
      "class":"nehan-ruby-body"
    });
  };

  HoriLayoutEvaluator.prototype.evalRb = function(line, ruby){
    return Html.tagWrap("div", this.evalInlineElements(line, ruby.getRbs()), {
      "style":Css.toString(ruby.getCssHoriRb(line)),
      "class":"nehan-rb"
    });
  };

  HoriLayoutEvaluator.prototype.evalRt = function(line, ruby){
    return Html.tagWrap("div", ruby.getRtString(), {
      "style":Css.toString(ruby.getCssHoriRt(line)),
      "class":"nehan-rt"
    });
  };

  HoriLayoutEvaluator.prototype.evalWord = function(line, word){
    return word.data;
  };

  HoriLayoutEvaluator.prototype.evalTcy = function(line, tcy){
    return tcy.data;
  };

  HoriLayoutEvaluator.prototype.evalChar = function(line, chr){
    if(chr.isHalfSpaceChar()){
      return chr.cnv;
    } else if(chr.isKerningChar()){
      return this.evalKerningChar(line, chr);
    }
    return chr.data;
  };

  HoriLayoutEvaluator.prototype.evalEmpha = function(line, chr, char_body){
    var char_part = Html.tagWrap("div", char_body, {
      "style":Css.toString(chr.getCssHoriEmphaTarget(line))
    });
    var empha_part = Html.tagWrap("div", line.style.textEmpha.getText(), {
      "style":Css.toString(chr.getCssHoriEmphaText(line))
    });
    // TODO: check text-emphasis-position is over or under
    return Html.tagWrap("span", empha_part + char_part, {
      "style":Css.toString(line.style.textEmpha.getCssHoriEmphaWrap(line, chr))
    });
  };

  HoriLayoutEvaluator.prototype.evalKerningChar = function(line, chr){
    var css = chr.getCssPadding(line);
    if(chr.isKakkoStart()){
      css["margin-left"] = "-0.5em";
      return Html.tagWrap("span", chr.data, {
	"style": Css.toString(css),
	"class":"nehan-char-kakko-start"
      });
    }
    if(chr.isKakkoEnd()){
      css["margin-right"] = "-0.5em";
      return Html.tagWrap("span", chr.data, {
	"style": Css.toString(css),
	"class":"nehan-char-kakko-end"
      });
    }
    if(chr.isKutenTouten()){
      css["margin-right"] = "-0.5em";
      return Html.tagWrap("span", chr.data, {
	"style": Css.toString(css),
	"class":"nehan-char-kuto"
      });
    }
    return chr.data;
  };

  HoriLayoutEvaluator.prototype.evalPaddingChar = function(line, chr){
    return Html.tagWrap("span", chr.data, {
      "style": Css.toString(chr.getCssPadding(line))
    });
  };

  return HoriLayoutEvaluator;
})();

