<template>
  <mu-container class="container">
    <mu-container
      :class="{ highlighted: isTableVisible === false }"
      id="subjects-table"
    >
      <dataTable
        :list="list"
        :columns="columns"
        :deleteButton="false"
        :checkBox="true"
      />
    </mu-container>
    <!-- <mu-button color="primary" class="button" @click="showModal">
      Zwolnij z wybranej formy przedmiotu
    </mu-button>
    <modal v-show="isModalVisible" @close="closeModal" />
    <mu-container
      :class="{ highlighted: isTableVisible === false }"
      id="freed-table"
    >
      <dataTable
        :list="list2"
        :columns="columns2"
        :deleteButton="true"
        :checkBox="false"
      />
    </mu-container> -->
  </mu-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

import dataTable from "./common/DataTableTemplate.vue";
// import modal from "./DismissalOptionModal.vue";

import { EventBus } from "@/utils/EventBus";

export default {
  name: "RepeatedSubjectsForm",
  components: {
    // modal,
    dataTable
  },
  mounted() {
    EventBus.$on("clickButtonChangeFormPage", step => {
      if (step === 7) {
        this.submitForm();
      }
    });
  },
  data() {
    return {
      isModalVisible: false,
      isTableVisible: true,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "Przedmiot", name: "name", width: 400, align: "center" },
        { title: "Liczba godzin", name: "hours", width: 145, align: "center" },
        { title: "ECTS", name: "ects", width: 145, align: "center" },
        { title: "Wydział", name: "faculty", width: 145, align: "center" },
        {
          title: "Dopisz do planu",
          name: "checkBox",
          width: 145,
          align: "center"
        }
      ],
      columns2: [
        { title: "Przedmiot", name: "name", width: 294, align: "center" },
        { title: "Forma zajęć", name: "type", width: 186, align: "center" },
        { title: "Data zaliczenia", name: "date", width: 150, align: "center" },
        { title: "Ocena", name: "grade", width: 85, align: "center" },
        { title: "Usuń", name: "deleteItem", width: 120, align: "center" }
      ],
      list2: []
    };
  },
  computed: {
    ...mapState("form", ["deficitSubjects"]),
    list() {
      return this.deficitSubjects.map(subject => ({
        ...subject,
        checkBox: false
      }));
    }
  },
  methods: {
    ...mapActions("form", ["setSubjectsData"]),
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
        key: "deficitSubjects",
        subjectsArray: this.list.map(subject => ({
          ...subject,
          doingNow: this.subject.checkbox
        }))
      });
      EventBus.$emit("changeFormPage");
    }
  }
};
</script>

<style scoped>
td {
  text-align: center;
}
.container {
  position: relative;
  min-width: 55vw;
  /*z-index: 0;*/
  padding: 20px;
}
@media only screen and (max-width: 1000px) {
  .button {
    left: 2vw;
  }
  .container {
    min-width: 95vw;
  }
}
</style>
