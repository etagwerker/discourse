import MultiSelectComponent from "select-kit/components/multi-select";
import { MAIN_COLLECTION_IDENTIFIER } from "select-kit/components/select-kit";
import { computed } from "@ember/object";

export default MultiSelectComponent.extend({
  pluginApiIdentifiers: ["list-setting"],
  classNames: ["list-setting"],
  choices: null,
  nameProperty: null,
  valueProperty: null,

  selectKitOptions: {
    filterable: true,
    selectedNameComponent: "selectedNameComponent"
  },

  selectedNameComponent: computed("settingName", function() {
    if (this.settingName && this.settingName.indexOf("color") > -1) {
      return "selected-color";
    } else {
      return "selected-name";
    }
  }),

  componentForRow(collection, value) {
    if (
      collection === MAIN_COLLECTION_IDENTIFIER &&
      value === this.selectKit.filter &&
      this.settingName &&
      this.settingName.indexOf("color") > -1
    ) {
      return "create-color-row";
    }

    return this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    const values = (this.value || []).map(v => {
      if (this.selectKit.valueProperty) {
        return this.choices.findBy(this.valueProperty, v);
      } else {
        return v;
      }
    });

    this.setProperties({
      content: [...new Set([...values, ...(this.choices || [])])].filter(
        Boolean
      )
    });
  }
});
