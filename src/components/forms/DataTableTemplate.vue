<template>
  <mu-paper>
    <mu-data-table
      no-data-text="Brak wybranych przedmiotów"
      :columns="columns"
      :data="list"
    >
      <template slot-scope="scope">
        <td>{{ scope.row.name }}</td>
        <td v-if="columns.find(column => column.name === 'semester')">
          {{ scope.row.semester }}
        </td>
        <td v-if="columns.find(column => column.name === 'hours')">
          {{ scope.row.hours }}
        </td>
        <td v-if="columns.find(column => column.name === 'ects')">
          {{ scope.row.ects }}
        </td>
        <td v-if="columns.find(column => column.name === 'faculty')">
          {{ scope.row.faculty }}
        </td>
        <td v-if="columns.find(column => column.name === 'type')">
          {{ scope.row.type }}
        </td>
        <td v-if="columns.find(column => column.name === 'date')">
          {{ scope.row.date }}
        </td>
        <td v-if="columns.find(column => column.name === 'grade')">
          {{ scope.row.grade }}
        </td>
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
  methods: {
    deleteItem(item) {
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.mu-table {
  background-color: #fafafa;
}
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
