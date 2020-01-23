import DropdownSelectBox from "select-kit/components/dropdown-select-box";
import { popupAjaxError } from "discourse/lib/ajax-error";
import showModal from "discourse/lib/show-modal";
import discourseComputed from "discourse-common/utils/decorators";
import { computed } from "@ember/object";

export default DropdownSelectBox.extend({
  classNames: ["user-notifications", "user-notifications-dropdown"],

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectKit.set(
      "icon",
      this.mainCollection.find(row => row.id === this.value).icon
    );
  },

  content: computed(function() {
    const content = [];

    content.push({
      icon: "user",
      id: "changeToNormal",
      description: I18n.t("user.user_notifications.normal_option_title"),
      name: I18n.t("user.user_notifications.normal_option")
    });

    content.push({
      icon: "times-circle",
      id: "changeToMuted",
      description: I18n.t("user.user_notifications.mute_option_title"),
      name: I18n.t("user.user_notifications.mute_option")
    });

    if (this.get("user.can_ignore_user")) {
      content.push({
        icon: "far-eye-slash",
        id: "changeToIgnored",
        description: I18n.t("user.user_notifications.ignore_option_title"),
        name: I18n.t("user.user_notifications.ignore_option")
      });
    }

    return content;
  }),

  changeToNormal() {
    this.updateNotificationLevel("normal").catch(popupAjaxError);
  },
  changeToMuted() {
    this.updateNotificationLevel("mute").catch(popupAjaxError);
  },
  changeToIgnored() {
    showModal("ignore-duration", {
      model: this.user
    });
  },

  @discourseComputed("user.ignored", "user.muted")
  value() {
    if (this.get("user.ignored")) {
      return "changeToIgnored";
    } else if (this.get("user.muted")) {
      return "changeToMuted";
    } else {
      return "changeToNormal";
    }
  },

  actions: {
    onSelect(level) {
      this[level]();
    }
  }
});
