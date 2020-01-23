import { computed } from "@ember/object";
import SelectKitHeaderComponent from "select-kit/components/select-kit/select-kit-header";
import UtilsMixin from "select-kit/mixins/utils";

export default SelectKitHeaderComponent.extend(UtilsMixin, {
  layoutName: "select-kit/templates/components/select-kit/single-select-header",
  classNames: ["single-select-header"],
  attributeBindings: ["selectedValue:data-value", "selectedName:data-name"],

  selectedName: computed("selectedContent", function() {
    return this.getName(this.selectedContent);
  }),

  selectedValue: computed("selectedContent", function() {
    return this.getValue(this.selectedContent);
  })
});
