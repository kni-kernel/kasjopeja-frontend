<template>
  <mu-container
          :class="{ highlighted: isTableVisible === false }"
          id="table"
  >
    <mu-form
            :model="form"
            class="form"
            label-position="right"
            label-width="200"
    >
      

      
      <dataTable
        :list="list"
        :columns="columns"
        :deleteButton="false"
        :checkBox="true"
      />
  </mu-form>
  </mu-container>
</template>

<script>
import dataTable from "./DataTableTemplate.vue";

export default {
  name: "ObligatorySubjectsForm",
  components: {
    dataTable
  },
  props: {
    formValues: Object
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
        { title: "Dopisz do planu", name: "checkBox", width: 150, align: "center" }

      ],
      list: [
        {
          name: "Programowanie obiektowe",
          hours: "30/0/30/0/0/0",
          ects: 5,
          checkBox: true
        },
        {
          name: "Programowanie obiektowe",
          hours: "30/0/30/0/0/0",
          ects: 1,
          checkBox: true
        },
        {
          name: "Programowanie obiektowe 2",
          hours: "30/15/15/0/0/0",
          ects: 1,
          checkBox: true
        },
        {
          name: "Programowanie obiektowe 4",
          hours: "30/15/15/0/0/0",
          ects: 5,
          checkBox: true
        },
        {
          name: "Programowanie obiektowe 2",
          hours: "30/15/15/0/0/0",
          ects: 5,
          checkBox: true
        }
      ]
    };
  }
};
</script>

<style scoped>
  #table {
    margin-top: 25px;
  }
  .button {
    position: relative;
    left: 35vw;
    width: 300px;
  }
  td {
    text-align: center;
  }
  .container {
    position: relative;
    min-width: 55vw;
    max-width: max-content;
    padding: 20px;
  }

  @media only screen and (max-width: 1000px) {
    .button {
      left:1vw
    }
    .container {
      min-width: 95vw;
    }  
  }

</style>
