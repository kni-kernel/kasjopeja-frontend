<template>
  <mu-container class="container">
    <mu-form
      :model="form"
      class="form"
      label-position="right"
      label-width="200"
    >
      <mu-container
        :class="{ highlighted: isTableVisible === false }"
        id="table"
      >
        <dataTable
          :list="list"
          :columns="columns"
          :deleteButton="false"
          :checkBox="true"
        />
      </mu-container>
      <mu-button color="primary" class="button" @click="showModal">
        Zwolnij z wybranej formy przedmiotu
      </mu-button>
      <modal v-show="isModalVisible" @close="closeModal" />
      <mu-data-table
        v-if="list2.length > 0"
        :columns="columns2"
        max-height="200"
        :data="list2"
        :class="{ highlighted: isTableVisible === false }"
      >
        <template slot-scope="scope">
          <td>{{ scope.row.subject }}</td>
          <td>{{ scope.row.type }}</td>
          <td>{{ scope.row.date }}</td>
          <td>{{ scope.row.grade }}</td>
          <td>
            <button class="btn" @click="deleteItem(scope.row)">
              X
            </button>
          </td>
        </template>
      </mu-data-table>
    </mu-form>
  </mu-container>
</template>

<script>
import modal from "./DismissalOptionModal.vue";
import dataTable from "./DataTableTemplate.vue";

export default {
  name: "RepeatedSubjectsForm",
  components: {
    modal,
    dataTable
  },
  props: {
    formValues: Object
  },
  isModalVisible: false,
  isTableVisible: true,
  data() {
    return {
      isModalVisible: false,
      isTableVisible: true,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "Przedmiot", name: "name", width: 320, align: "center" },
        { title: "Liczba godzin", name: "hours", width: 150, align: "center" },
        { title: "ECTS", name: "ects", width: 100, align: "center" },
        { title: "Wydział", name: "faculty", width: 100, align: "center" },
        { title: "Dopisz do planu", name: "checkBox", width: 145, align: "center" }
      ],
      columns2: [
        { title: "Przedmiot", name: "subject", width: 294, align: "center" },
        { title: "Forma zajęć", name: "type", width: 186, align: "center" },
        { title: "Data zaliczenia", name: "date", width: 150, align: "center" },
        { title: "Ocena", name: "grade", width: 85, align: "center" },
        { title: "Usuń", name: "deleteItem", width: 120, align: "center" }
      ],
      list: [
        {
          name: "Programowanie obiektowe",
          hours: "30/0/30/0/0/0",
          ects: 5,
          faculty: "WFiIS",
          checkBox: false
        },
        {
          name: "Programowanie obiektowe 2",
          hours: "30/15/15/0/0/0",
          ects: 4,
          faculty: "WFiIS",
          checkBox: false
        },
        {
          name: "Programowanie obiektowe 4",
          hours: "30/0/30/0/0/0",
          ects: 2,
          faculty: "WMN",
          checkBox: false
        },
        {
          name: "Programowanie obiektowe 2",
          hours: "30/15/15/0/0/0",
          ects: 5,
          faculty: "WFiIS",
          checkBox: true
        }
      ],
      list2: [
        {
          subject: "Programowanie obiektowe",
          type: "Ćwiczenia laboratoryjne",
          date: "26.06.2019",
          grade: 3.5
        }
      ]
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      this.isTableVisible = false;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isTableVisible = true;
    },
    deleteItem(item) {
      const index = this.list.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.list.splice(index, 1);
    }
  }
};
</script>

<style scoped>
  .form {
    margin-top: 3em;
    width: 100%;
    max-width: 600px;
  }
  td {
    text-align: center;
  }
  #table {
    margin-top: 25px;
  }
  .container {
    position: relative;
    min-width: 55vw;
    /*z-index: 0;*/
    padding: 20px;
  }
  .highlighted {
    z-index: -2;
  }
  .select-control-row,
  .btn {
    text-align: center;
    vertical-align: middle;
    border: none;
    font-size: 1.4em;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-weight: bold;
    color: #777777;
    background: transparent;
  }
  .button {
    position: relative;
    left: 33vw;
    width: 319px;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  @media only screen and (max-width: 1000px) {
    .button {
      left:2vw
    }
    .container {
      min-width: 95vw;
    }
  }
</style>
