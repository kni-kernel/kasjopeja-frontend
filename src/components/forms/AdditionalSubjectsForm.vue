<template>
  <mu-container>
    <mu-form
      :model="form"
      class="form"
      label-position="right"
      label-width="200"
    >
      <mu-flex direction="row" justify-content="between">
        <mu-form-item
          class="select-subject"
          prop="subjects"
          label="Przedmiot z bazy WFiIS"
        >
          <mu-select v-model="form.subjects" filterable>
            <mu-option
              v-for="option in electiveSubjects"
              :key="option._id"
              :label="option.name"
              :value="option"
            ></mu-option>
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
import modal from "./ExternalSubjectModal.vue";
import dataTable from "./DataTableTemplate.vue";
import { EventBus } from "../../utils/EventBus";
import { mapActions, mapState } from "vuex";

export default {
  name: "AdditionalSubjectsForm",
  components: {
    modal,
    dataTable
  },
  mounted() {
    EventBus.$on("externalSubjectModalClosed", subjectData => {
      this.list.push(subjectData);
    });
    EventBus.$on("clickButtonChangeFormPage", step => {
      if (step === 6) {
        this.submitForm();
      }
    });
  },
  data() {
    return {
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
        { title: "Semestr", name: "semester", width: 175, align: "center" },
        { title: "ECTS", name: "ects", width: 175, align: "center" },
        { title: "Wydział", name: "faculty", width: 175, align: "center" },
        { title: "Usuń", name: "deleteItem", width: 175, align: "center" }
      ],
      list: []
    };
  },
  computed: {
    ...mapState("subjects", ["electiveSubjects"])
  },
  methods: {
    ...mapActions("form", ["setSubjectsData"]),
    handleButtonClick() {
      this.list.push({
        ...this.form.subjects,
        faculty: "WFiIS"
      });
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
        key: "additionalSubjects",
        subjectsArray: this.list
      });
      EventBus.$emit("changeFormPage");
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
