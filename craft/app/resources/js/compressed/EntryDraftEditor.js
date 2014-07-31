/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @link      http://buildwithcraft.com
*/
(function(b){Craft.EntryDraftEditor=Garnish.Base.extend({$revisionBtn:null,$editBtn:null,$form:null,$nameInput:null,$saveBtn:null,$spinner:null,draftId:null,draftName:null,draftNotes:null,hud:null,loading:!1,init:function(a,c,d){this.draftId=a;this.draftName=c;this.draftNotes=d;this.$revisionBtn=b("#revision-btn");this.$editBtn=b("#editdraft-btn");this.addListener(this.$editBtn,"click","showHud")},showHud:function(){if(this.hud)this.hud.show();else{this.$form=b('<form method="post" accept-charset="UTF-8"/>');
var a=b('<div class="field"><div class="heading"><label for="draft-name">'+Craft.t("Draft Name")+"</label></div></div>").appendTo(this.$form),a=b('<div class="input"/>').appendTo(a);this.$nameInput=b('<input type="text" class="text fullwidth" id="draft-name"/>').appendTo(a).val(this.draftName);a=b('<div class="field"><div class="heading"><label for="draft-notes">'+Craft.t("Notes")+"</label></div></div>").appendTo(this.$form);a=b('<div class="input"/>').appendTo(a);this.$notesInput=b('<textarea class="text fullwidth" id="draft-notes" rows="2"/>').appendTo(a).val(this.draftNotes);
a=b('<div class="buttons"/>').appendTo(this.$form);this.$saveBtn=b('<input type="submit" class="btn submit disabled" value="'+Craft.t("Save")+'"/>').appendTo(a);this.$spinner=b('<div class="spinner hidden"/>').appendTo(a);this.hud=new Garnish.HUD(this.$editBtn,this.$form);new Garnish.NiceText(this.$notesInput);this.addListener(this.$notesInput,"keydown","onNotesKeydown");this.addListener(this.$nameInput,"textchange","checkValues");this.addListener(this.$notesInput,"textchange","checkValues");this.addListener(this.$form,
"submit","save");this.hud.on("show",b.proxy(this,"onHudShow"));this.hud.on("hide",b.proxy(this,"onHudHide"));this.hud.on("escape",b.proxy(this,"onHudEscape"));this.onHudShow()}Garnish.isMobileBrowser(!0)||this.$nameInput.focus()},onHudShow:function(){this.$editBtn.addClass("active")},onHudHide:function(){this.$editBtn.removeClass("active")},onHudEscape:function(){this.$nameInput.val(this.draftName)},onNotesKeydown:function(a){a.keyCode==Garnish.RETURN_KEY&&(a.preventDefault(),this.$form.submit())},
hasAnythingChanged:function(){return this.$nameInput.val()!=this.draftName||this.$notesInput.val()!=this.draftNotes},checkValues:function(){if(this.$nameInput.val()&&this.hasAnythingChanged())return this.$saveBtn.removeClass("disabled"),!0;this.$saveBtn.addClass("disabled");return!1},save:function(a){a.preventDefault();if(!this.loading)if(this.checkValues()){this.loading=!0;this.$saveBtn.addClass("active");this.$spinner.removeClass("hidden");var c={draftId:this.draftId,name:this.$nameInput.val(),
notes:this.$notesInput.val()};Craft.postActionRequest("entryRevisions/updateDraftMeta",c,b.proxy(function(a,b){this.loading=!1;this.$saveBtn.removeClass("active");this.$spinner.addClass("hidden");"success"==b&&(a.success?(this.$revisionBtn.text(c.name),this.$revisionBtn.data("menubtn").menu.$options.filter(".sel").text(c.name),this.draftName=c.name,this.draftNotes=c.notes,this.checkValues(),this.hud.hide()):this.shakeHud())},this))}else this.shakeHud()},shakeHud:function(){Garnish.shake(this.hud.$hud)}})})(jQuery);

//# sourceMappingURL=EntryDraftEditor.min.map
