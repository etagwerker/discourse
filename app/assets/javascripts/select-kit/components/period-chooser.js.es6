import { oneWay, readOnly } from "@ember/object/computed";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";
import discourseComputed from "discourse-common/utils/decorators";

export default DropdownSelectBoxComponent.extend({
  classNames: ["period-chooser"],
  content: oneWay("site.periods"),
  value: readOnly("period"),
  isVisible: readOnly("showPeriods"),
  valueProperty: null,
  nameProperty: null,

  componentFor() {
    return "period-chooser/period-chooser-row";
  },

  @discourseComputed("isExpanded")
  caretIcon(isExpanded) {
    return isExpanded ? "caret-up" : "caret-down";
  },

  selectKitOptions: {
    filterable: false,
    autoFilterable: false,
    fullDay: "fullDay",
    headerComponent: "period-chooser/period-chooser-header"
  },

  onChange(value) {
    this.action && this.action(value);
  }
});
