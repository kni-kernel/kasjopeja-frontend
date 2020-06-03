<template>
  <mu-container>
    <mu-form
      :model="form"
      class="form"
      label-position="right"
      label-width="200"
    >
      <mu-form-item
        prop="subjects"
        class="container"
        label="Przedmiot z bazy WFiIS"
      >
        <mu-select v-model="form.subjects">
          <mu-option
            v-for="option in subjects"
            :key="option"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-button color="primary" class="button" @click="handleButtonClick">
        Dodaj wybrany przedmiot
      </mu-button>
      <br /><br />
      <mu-button color="primary" class="button" @click="showModal">
        Dodaj przedmiot spoza bazy WFiIS
      </mu-button>
      <modal v-show="isModalVisible" @close="closeModal" />
      <mu-container
        :class="{ highlighted: isTableVisible === false }"
        id="table"
      >
        <dataTable
          :list="list"
          :columns="columns"
          :deleteButton="true"
          :checkBox="false"
        />
      </mu-container>
    </mu-form>
  </mu-container>
</template>

<script>
import modal from "./ExternalSubjectModal.vue";
import dataTable from "./DataTableTemplate.vue";

export default {
  name: "AdditionalSubjectsForm",
  components: {
    modal,
    dataTable
  },
  props: {
    formValues: Object
  },
  data() {
    return {
      subjects: [],
      form: {
        subjects: ""
      },
      isModalVisible: false,
      isTableVisible: true,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "Przedmiot", width: 400, name: "name", align: "center" },
        { title: "Semestr", name: "session", width: 100, align: "center" },
        { title: "ECTS", name: "ects", width: 100, align: "center" },
        { title: "Wydział", name: "faculty", width: 100, align: "center" },
        { title: "Usuń", name: "deleteItem", width: 100, align: "center" }
      ],
      list: [
        {
          name: "Programowanie obiektowe",
          session: 1,
          ects: 5,
          faculty: "WFiIS"
        },
        {
          name: "Programowanie obiektowe 2",
          session: 4,
          ects: 5,
          faculty: "WFiIS"
        },
        {
          name: "Programowanie obiektowe 4",
          session: 3,
          ects: 5,
          faculty: "WEAIB"
        },
        {
          name: "Programowanie obiektowe 2",
          session: 4,
          ects: 5,
          faculty: "WFiIS"
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
.container {
  position: relative;
}
.button {
  position: absolute;
  right: 10vw;
  width: 300px;
}
#table.container {
  margin: 50px;
  width: max-content;
  /*z-index: 0;*/
  padding: 20px;
}
td {
  text-align: center;
}
.highlighted {
  z-index: -2;
}
.btn-close {
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
