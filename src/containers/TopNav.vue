<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click.prevent="
          changeSideMenuStatus({
            step: menuClickCount + 1,
            classNames: menuType,
            selectedMenuHasSubItems
          })
        "
      >
        <menu-icon />
      </a>
      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click.prevent="changeSideMenuForMobile(menuType)"
      >
        <mobile-menu-icon />
      </a>
      <div
        :class="{ search: true, 'mobile-view': isMobileSearch }"
        ref="searchContainer"
        @mouseenter="isSearchOver = true"
        @mouseleave="isSearchOver = false"
      >
        <b-input
          :placeholder="$t('menu.search')"
          @keypress.native.enter="search"
          v-model="searchKeyword"
        />
        <span class="search-icon" @click="searchClick">
          <i class="simple-icon-magnifier"></i>
        </span>
      </div>
    </div>
    <router-link class="navbar-logo" tag="a" to="/app">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
    </router-link>

    <div class="navbar-right">
      <div class="d-none d-md-inline-block align-middle mr-3">
        <switches
          id="tool-mode-switch"
          v-model="isDarkActive"
          theme="custom"
          class="vue-switcher-small"
          color="primary"
        />
        <b-tooltip
          target="tool-mode-switch"
          placement="left"
          title="Dark Mode"
        ></b-tooltip>
      </div>
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content">
            <span class="name mr-1">{{ currentUser.title }}</span>
            <span>
              <img :alt="currentUser.title" :src="apiUrl + '/' + currentUser.img" />
            </span>
          </template>
          <b-dropdown-item v-b-modal.modalEditProfile
            >Edit account</b-dropdown-item
          >
          <b-dropdown-item v-b-modal.modalEditPassword>Change Password</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-dropdown>
      </div>

      <b-modal
        v-if="user"
        id="modalEditProfile"
        ref="modalEditProfile"
        :title="$t('EditPorfile')"
        modal-class="modal-right"
      >
        <b-form>
          <b-form-group :label="$t('image')">
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              v-model="user.file"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>
          <b-form-group
            :label="$t('user.firstname')"
            class="has-float-label mb-4"
          >
            <b-form-input type="text" v-model="user.name" />
          </b-form-group>
          <b-form-group
            :label="$t('user.lastname')"
            class="has-float-label mb-4"
          >
            <b-form-input type="text" v-model="user.surname" />
          </b-form-group>
          <b-form-group
            :label="$t('user.address')"
            class="has-float-label mb-4"
          >
            <b-form-input type="text" v-model="user.adress" />
          </b-form-group>
          <b-form-group
            :label="$t('user.telephone')"
            class="has-float-label mb-4"
          >
            <b-form-input type="number" v-model="user.phone" />
          </b-form-group>
          <b-form-group
            :label="$t('user.birthdate')"
            class="has-float-label mb-4"
          >
            <b-form-input type="date" v-model="user.birthday" />
          </b-form-group>
          <b-form-group :label="$t('Gender')" class="has-float-label mb-4">
            <b-form-select
              v-model="user.gender"
              :options="genderOptions"
            ></b-form-select>
          </b-form-group>
        </b-form>
        <template slot="modal-footer">
          <b-button
            variant="outline-secondary"
            @click="hideModal('modalEditProfile')"
            >{{ $t("pages.cancel") }}</b-button
          >
          <b-button variant="primary" @click="updateProfile()" class="mr-1">{{
            $t("pages.submit")
          }}</b-button>
        </template>
      </b-modal>

      <b-modal
              id="modalEditPassword"
              ref="modalEditPassword"
              :title="$t('Change Password')"
              modal-class="modal-right"
            >
              <b-form>
        
            <b-form-group
              :label="$t('Old password')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="password"
                v-model="password.old"
              />
            </b-form-group>
            <b-form-group
              :label="$t('New password')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="password"
                v-model="password.new"
              />
            </b-form-group>
            <b-form-group
              :label="$t('Confirm password')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="password"
                v-model="password.confirm"
              />
            </b-form-group>
          </b-form>
              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalEditPassword')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="updatePassword()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
    </div>
  </nav>
</template>

<script>
import Switches from "vue-switches";
import notifications from "../data/notifications";
import moment from "moment";

import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../components/Svg";
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl,
  defaultColor
} from "../constants/config";
import { getDirection, setDirection } from "../utils";
export default {
  components: {
    "menu-icon": MenuIcon,
    "mobile-menu-icon": MobileMenuIcon,
    switches: Switches
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      user: null,
      password: {},
      selectedParentMenu: "",
      searchKeyword: "",
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      localeOptions,
      buyUrl,
      notifications,
      isDarkActive: false,
      genderOptions: [
        {
          text: "Male",
          value: "male"
        },
        {
          text: "Female",
          value: "female"
        },
        {
          text: "Other",
          value: "other"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut", "profileUpdate"]),
    moment,
    search() {
      if(this.currentUser.user.role == 'Pet Owner') {
           this.$router.push('/owner/searchUser/'+this.searchKeyword);
      } else {
           this.$router.push('/vet/searchUser/'+this.searchKeyword);
      }
      this.searchKeyword = "";
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true;
        } else {
          this.search();
          this.isMobileSearch = false;
        }
      } else {
        this.search();
      }
    },
    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false;
        this.searchKeyword = "";
      }
    },

    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
        setDirection(direction);
      }

      this.setLang(locale);
    },
    logout() {
      this.signOut().then(() => {
        this.$router.push("/user/login");
      });
    },

    hideModal(refname) {
      this.$refs[refname].hide();
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },
    getThemeColor() {
      return localStorage.getItem("themeColor")
        ? localStorage.getItem("themeColor")
        : defaultColor;
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    },
    updateProfile() {
      let formData = new FormData();
      if (this.user.file) {
        formData.append("avatar", this.user.file);
      }
      formData.append("email", this.user.email);
      formData.append("name", this.user.name);
      formData.append("surname", this.user.surname);
      formData.append("adress", this.user.adress);
      formData.append("birthday", this.user.birthday);
      formData.append("gender", this.user.gender);
      formData.append("phone", this.user.phone);

      console.log("adding item : ", formData);
      console.log(this.user);

      this.$Axios({
        method: "put",
        url: "/profile",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log(res.data)
          this.profileUpdate({ user: res.data});
          this.hideModal("modalEditProfile");
          this.$notify("success", "Profile", "Profile updated", {
            duration: 3000,
            permanent: false
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePassword: function() {
        if(this.password.new != this.password.confirm) {
            this.$notify("error", "Profile", "Passwords doesn't match", {
            duration: 3000,
            permanent: false
          });
        }
         
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems"
    })
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  created() {
    const color = this.getThemeColor();
    this.isDarkActive = color.indexOf("dark") > -1;
    console.log(this.currentUser);
    this.user = this.currentUser.user;
    this.user.avatar = null;
    this.user.birthday = moment(this.user.birthday).format("YYYY-MM-DD");
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    isDarkActive(val) {
      let color = this.getThemeColor();
      let isChange = false;
      if (val && color.indexOf("light") > -1) {
        isChange = true;
        color = color.replace("light", "dark");
      } else if (!val && color.indexOf("dark") > -1) {
        isChange = true;
        color = color.replace("dark", "light");
      }
      if (isChange) {
        localStorage.setItem("themeColor", color);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    isMobileSearch(val) {
      if (val) {
        document.addEventListener("click", this.handleDocumentforMobileSearch);
      } else {
        document.removeEventListener(
          "click",
          this.handleDocumentforMobileSearch
        );
      }
    }
  }
};
</script>
