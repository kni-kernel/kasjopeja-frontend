<template>
  <mu-paper>
    <modal v-show="isModalVisible" @close="closeModal" />
    <mu-data-table
      no-data-text="Brak wybranych przedmiotów"
      :columns="columns"
      :data="list"
    >
      <template slot-scope="scope">
        <td @click="showModal(scope.row)">{{ scope.row.name }}</td>
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
import modal from "../modals/ChangeSubjectNameModal.vue";

import { EventBus } from "@/utils/EventBus";

export default {
  name: "SubjectsTable",
  components: {
    modal
  },
  props: {
    list: Array,
    columns: Array,
    deleteButton: Boolean,
    checkBox: Boolean,
    editable: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    EventBus.$on("changeSubjectNameModalClosed", () => {
      this.closeModal();
    });
  },
  data() {
    return {
      isModalVisible: false,
      isTableVisible: true
    };
  },
  methods: {
    showModal(row) {
      if (this.editable) {
        this.isModalVisible = true;
        EventBus.$emit("setDataForChangeSubjectNameModal", {
          subjectName: row.name,
          subjectIndex: this.list.indexOf(row)
        });
        this.isTableVisible = false;
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.isTableVisible = true;
    },
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
