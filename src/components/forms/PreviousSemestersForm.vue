<template>
  <mu-container>
    <mu-form :model="form" class="form" label-position="right">
      <mu-flex direction="row" justify-content="between">
        <mu-form-item
          class="select-subject"
          prop="subjects"
          label="Przedmiot z bazy WFiIS"
        >
          <mu-select v-model="form.subjects" filterable>
            <mu-option
              v-for="option in subjects"
              :key="option._id"
              :label="option.name"
              :value="option"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item prop="semester" label="Semestr realizacji">
          <mu-select v-model="form.semester">
            <mu-option
              v-for="option in semesters"
              :key="option"
              :label="option"
              :value="romanianToInt(option)"
            />
          </mu-select>
        </mu-form-item>
        <mu-button color="primary" class="button" @click="handleButtonClick">
          Dodaj przedmiot
        </mu-button>
      </mu-flex>
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
      <mu-button color="primary" class="button" @click="showModal">
        Dodaj przedmiot spoza bazy WFiIS
      </mu-button>
    </mu-form>
  </mu-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

import modal from "./ExternalSubjectModal.vue";
import dataTable from "./DataTableTemplate.vue";

import { EventBus } from "../../utils/EventBus";
import { romanianToInt } from "../../utils/functions";

export default {
  name: "PreviousSemestersForm",
  components: {
    modal,
    dataTable
  },
  mounted() {
    EventBus.$on("externalSubjectModalClosed", subjectData => {
      this.list.push(subjectData);
    });
    EventBus.$on("clickButtonChangeFormPage", step => {
      if (step === 3) {
        this.submitForm();
      }
    });
  },
  data() {
    return {
      form: {
        subjects: "",
        semester: ""
      },
      isModalVisible: false,
      isTableVisible: true,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "Przedmiot", width: 400, name: "name", align: "center" },
        { title: "Semestr", name: "semester", width: 175, align: "center" },
        { title: "ECTS", name: "ects", width: 175, align: "center" },
        { title: "Wydział", name: "faculty", width: 175, align: "center" },
        { title: "Usuń", name: "deleteItem", width: 175, align: "center" }
      ],
      list: []
    };
  },
  computed: {
    ...mapState("subjects", ["electiveSubjects", "previousObligatorySubjects"]),
    ...mapState("form", ["semester"]),
    subjects() {
      return [...this.electiveSubjects, ...this.previousObligatorySubjects];
    },
    semesters() {
      const allSemesters = ["I", "II", "III", "IV", "V", "VI", "VII"];
      return allSemesters.slice(0, this.semester - 1);
    }
  },
  methods: {
    ...mapActions("form", ["setSubjectsData"]),
    handleButtonClick() {
      this.list.push({
        ...this.form.subjects,
        faculty: "WFiIS",
        semester: this.form.semester
      });
      this.form.semester = "";
      this.form.subjects = "";
    },
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
      this.list.splice(index, 1);
    },
    submitForm() {
      this.setSubjectsData({
        key: "previousSemesterSubjects",
        subjectsArray: this.list
      });
      EventBus.$emit("changeFormPage");
    },
    romanianToInt(romanian) {
      return romanianToInt(romanian);
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 3em;
  width: 100%;
}
.button {
  width: 300px;
}
#table {
  margin-top: 25px;
}
.select-subject {
  width: 100%;
  padding-right: 20px;
}
td {
  text-align: center;
}
@media only screen and (max-width: 1000px) {
  .button {
    left: 1vw;
  }
}
</style>
