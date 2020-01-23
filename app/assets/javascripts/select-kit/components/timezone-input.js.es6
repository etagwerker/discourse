import ComboBoxComponent from "select-kit/components/combo-box";

export default ComboBoxComponent.extend({
  pluginApiIdentifiers: ["timezone-input"],
  classNames: ["timezone-input"],
  nameProperty: "value",

  selectKitOptions: {
    filterable: true,
    allowAny: false
  },

  search(filter) {
    if (!filter || filter.length < 3) {
      return [];
    }

    filter = filter.toLowerCase();

    let timezones;

    if (
      moment.locale() !== "en" &&
      typeof moment.tz.localizedNames === "function"
    ) {
      timezones = moment.tz.localizedNames();
    } else {
      timezones = moment.tz.names();
    }

    return timezones.filter(n => n.value.toLowerCase().indexOf(filter) > -1);
  }
});
