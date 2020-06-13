<template>
  <mu-container :class="{ highlighted: isTableVisible === false }" id="table">
    <dataTable
      :list="list"
      :columns="columns"
      :deleteButton="false"
      :checkBox="true"
    />
  </mu-container>
</template>

<script>
import dataTable from "./DataTableTemplate.vue";
import { EventBus } from "../../utils/EventBus";
import { mapActions, mapState } from "vuex";

export default {
  name: "ObligatorySubjectsForm",
  components: {
    dataTable
  },
  mounted() {
    this.list = this.obligatorySubjects.map(obligatorySubject => ({
      ...obligatorySubject,
      checkbox: true
    }));
    EventBus.$on("clickButtonChangeFormPage", step => {
      if (step === 4) {
        this.submitForm();
      }
    });
  },
  data() {
    return {
      isTableVisible: true,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "Przedmiot", width: 400, name: "name", align: "center" },
        { title: "Liczba godzin", name: "hours", width: 200, align: "center" },
        { title: "ECTS", name: "ects", width: 100, align: "center" },
        {
          title: "Dopisz do planu",
          name: "checkBox",
          width: 150,
          align: "center"
        }
      ],
      list: []
    };
  },
  computed: {
    ...mapState("subjects", ["obligatorySubjects"])
  },
  methods: {
    ...mapActions("form", ["setSubjectsData"]),
    submitForm() {
      this.setSubjectsData({
        key: "regularSubjects",
        subjectsArray: this.list.filter(subject => subject.checkbox)
      });
      EventBus.$emit("changeFormPage");
    }
  }
};
</script>

<style scoped>
#table {
  margin-top: 25px;
}
td {
  text-align: center;
}
</style>
