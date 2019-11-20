<template>
  <div class="navBar">
    <router-link
      class="navBar__title"
      to="/"
    >
      Armando task manager
    </router-link>
    <div class="navBar__items">
      <router-link
        class="navBar__link"
        :class="{active: $route.name === 'tasks'}"
        to="/tasks"
      >
        Tasks
      </router-link>
      <router-link
        class="navBar__link"
        :class="{active: $route.name === 'admin'}"
        to="/admin"
      >
        Admin panel
      </router-link>
      <router-link
        class="navBar__link"
        :class="{active: $route.name === 'about'}"
        to="/about"
      >
        About
      </router-link>
      <div
        v-if="!user.isAuthorized"
        class="navBar__button"
        @click="openDialog('Login')"
      >
        LOGIN
      </div>
      <div
        v-else
        class="navBar__button"
        @click="openDialog('User')"
      >
        {{ user.userInfo.firstName }} {{ user.userInfo.lastName }}
      </div>
    </div>
    <el-collapse v-model="openedCollapse">
      <el-collapse-item>
        <router-link
          class="navBar__link"
          :class="{active: $route.name === 'tasks'}"
          to="/tasks"
          @click.native="closeMenu"
        >
          Tasks
        </router-link>
        <router-link
          class="navBar__link"
          :class="{active: $route.name === 'admin'}"
          to="/admin"
          @click.native="closeMenu"
        >
          Admin panel
        </router-link>
        <router-link
          class="navBar__link"
          :class="{active: $route.name === 'about'}"
          to="/about"
          @click.native="closeMenu"
        >
          About
        </router-link>
        <el-divider />
        <div
          v-if="!user.isAuthorized"
          class="navBar__button"
          @click="openDialog('Login')"
        >
          LOGIN
        </div>
        <div
          v-else
          class="navBar__button"
          @click="openDialog('User')"
        >
          {{ user.userInfo.firstName }} {{ user.userInfo.lastName }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      openedCollapse: [],
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state,
    }),
  },
  methods: {
    closeMenu() {
      this.openedCollapse = [];
    },
    openDialog(name) {
      this.$emit('open-dialog', name);
    },
  },
};
</script>

<style lang="scss">
.navBar {
  z-index: 100;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  &__items {
    display: flex;
    width: 100%;
  }
  &__link {
    transition: 0.3s;
    box-sizing: border-box;
    text-transform: uppercase;
    background: #fff;
    padding: 20px 40px;
    color: #333;
    text-decoration: none;
    border-right: 1px solid #fff;
    &:hover, &.active {
      background: #409EFF;
      color: #fff;
    }
  }
  &__title {
    min-width: fit-content;
    box-sizing: border-box;
    text-decoration: none;
    text-transform: uppercase;
    color: #409EFF;
    padding: 20px 40px;
  }

  &__button {
    margin-left: auto;
    box-sizing: border-box;
    cursor: pointer;
    background: #409EFF;
    color: #fff;
    padding: 20px 30px;
  }
  .el-collapse{
    display: none;
    margin-left: auto;
    &-item {
      &__header {
        height: 58px;
        font-size: 30px;
      }
      &__wrap {
        position: absolute;
        top: 60px;
        left: 5vw;
        width: 90vw;
      }
      &__content {
        display: flex;
        flex-direction: column;
        padding: 0;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        .navBar__button {
          margin: unset;
        }
      }
    }
  }
}
@media all and (max-width: 1200px) {
  .navBar {
    &__items {
      display: none;
    }
    &__link, &__button {
      border: none;
      padding: 10px 30px;
    }
    .el-collapse {
      display: block;
    }
    .el-divider {
      margin: 10px 0;
    }
  }
}
</style>
