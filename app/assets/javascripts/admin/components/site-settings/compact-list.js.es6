import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tokenSeparator: "|",

  settingValue: computed("value", function() {
    return (this.value || "").split(this.tokenSeparator).filter(Boolean);
  }),

  actions: {
    onChangeListSetting(value) {
      this.set("value", value.join(this.tokenSeparator));
    }
  }
});
