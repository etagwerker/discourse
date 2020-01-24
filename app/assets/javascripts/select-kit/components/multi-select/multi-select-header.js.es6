import SelectKitHeaderComponent from "select-kit/components/select-kit/select-kit-header";
import { computed } from "@ember/object";

export default SelectKitHeaderComponent.extend({
  classNames: ["multi-select-header"],
  layoutName:
    "select-kit/templates/components/multi-select/multi-select-header",

  selectedNames: computed("selectedContent", function() {
    if (this.selectedContent) {
      return this.selectedContent.map(c => this.getName(c));
    }
    return [];
  }),

  selectedValue: computed("selectedContent", function() {
    if (this.selectedContent) {
      return this.selectedContent.map(c => this.getValue(c));
    }
    return [];
  })
});
