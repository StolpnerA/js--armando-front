<template>
  <card
    v-if="users"
    :data="users"
    :selected-item="selectedUser"
    :loading="usersLoading"
    type="user"
    @select-item="$emit('select', $event)"
  />
</template>

<script>
import Card from '@/components/common/card/Card.vue';
import { getUsers } from '@/helpers/api';

export default {
  name: 'UserCard',
  components: {
    Card,
  },
  props: {
    selectedUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      usersLoading: false,
      users: null,
    };
  },
  mounted() {
    this.getUsersData();
  },
  methods: {
    async getUsersData () {
      this.usersLoading = true;
      this.users = await getUsers();
      this.usersLoading = false;
    },
  },
};
</script>
