<template>
  <mu-paper>
    <mu-data-table
      v-if="list.length > 0"
      :columns="columns"
      max-height="200"
      :data="list"
    >
      <template slot-scope="scope">
        <td>{{ scope.row.name }}</td>
        <td v-if="scope.row.session">{{ scope.row.session }}</td>
        <td v-if="scope.row.hours">{{ scope.row.hours }}</td>
        <td v-if="scope.row.ects">{{ scope.row.ects }}</td>
        <td v-if="scope.row.faculty">{{ scope.row.faculty }}</td>
        <td v-if="scope.row.type">{{ scope.row.type }}</td>
        <td v-if="scope.row.date">{{ scope.row.date }}</td>
        <td v-if="scope.row.grade">{{ scope.row.grade }}</td>
        <td v-if="checkBox">
          <mu-checkbox
            class="select-control-row"
            v-model="scope.row.checkbox"
          ></mu-checkbox>
        </td>
        <td v-if="deleteButton">
          <button class="btn-close" @click="deleteItem(scope.row)">
            X
          </button>
        </td>
      </template>
    </mu-data-table>
  </mu-paper>
</template>

<script>
export default {
  name: "SubjectsTable",
  props: {
    list: Array,
    columns: Array,
    deleteButton: Boolean,
    checkBox: Boolean
  },
  data() {
    return {};
  },
  methods: {
    deleteItem(item) {
      const index = this.list.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.list.splice(index, 1);
    }
  }
};
</script>

<style scoped>
td {
  text-align: center;
}
.btn-close,
.select-control-row {
  text-align: center;
  vertical-align: middle;
  border: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
  color: #777777;
  background: transparent;
}
</style>
