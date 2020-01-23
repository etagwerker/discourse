import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";

const HEADING_COLLECTION_IDENTIFIER = "HEADING_COLLECTION";

export default DropdownSelectBoxComponent.extend({
  pluginApiIdentifiers: ["toolbar-popup-menu-options"],
  classNames: ["toolbar-popup-menu-options"],

  init() {
    this._super(...arguments);

    this.prependCollection(HEADING_COLLECTION_IDENTIFIER);
  },

  selectKitOptions: {
    showFullTitle: false,
    filterable: false,
    autoFilterable: false
  },

  componentForCollectionIdentifier(collectionIdentifier) {
    if (collectionIdentifier === HEADING_COLLECTION_IDENTIFIER) {
      return "toolbar-popup-menu-options/toolbar-popup-menu-options-heading";
    }

    return this._super(...arguments);
  },

  collectionForIdentifier(identifier) {
    if (identifier === HEADING_COLLECTION_IDENTIFIER) {
      return { title: this.selectKit.options.title };
    }

    return this._super(...arguments);
  },

  modifyContent(contents) {
    return contents
      .map(content => {
        if (content.condition) {
          return {
            icon: content.icon,
            name: I18n.t(content.label),
            id: content.action
          };
        }
      })
      .filter(Boolean);
  }
});
