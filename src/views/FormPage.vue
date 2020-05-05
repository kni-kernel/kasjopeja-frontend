<template>
  <FormLayout :step="step" :title="title" :percentage="percentage">
    <BasicDataForm v-if="step === 1" :form-values="formValues" />
    <DeficitForm v-if="step === 2" :form-values="formValues" />
    <PreviousSemestersForm v-if="step === 3" :form-values="formValues" />
    <ObligatorySubjectsForm v-if="step === 4" :form-values="formValues" />
    <ElectiveSubjectsForm v-if="step === 5" :form-values="formValues" />
    <AdditionalSubjectsForm v-if="step === 6" :form-values="formValues" />
    <RepeatedSubjectsForm v-if="step === 7" :form-values="formValues" />
  </FormLayout>
</template>

<script>
import FormLayout from "../layouts/FormLayout";

import AdditionalSubjectsForm from "../components/forms/AdditionalSubjectsForm";
import BasicDataForm from "../components/forms/BasicDataForm";
import DeficitForm from "../components/forms/DeficitForm";
import ElectiveSubjectsForm from "../components/forms/ElectiveSubjectsForm";
import ObligatorySubjectsForm from "../components/forms/ObligatorySubjectsForm";
import PreviousSemestersForm from "../components/forms/PreviousSemestersForm";
import RepeatedSubjectsForm from "../components/forms/RepeatedSubjectsForm";

export default {
  name: "FormPage",
  components: {
    AdditionalSubjectsForm,
    BasicDataForm,
    DeficitForm,
    ElectiveSubjectsForm,
    FormLayout,
    ObligatorySubjectsForm,
    PreviousSemestersForm,
    RepeatedSubjectsForm
  },
  created() {
    this.$on("changeFormPage", () => {
      if (this.step === 7) {
        this.handleFormSend();
      } else {
        this.step++;
      }
    });
  },
  data() {
    return {
      step: 1,
      formValues: {
        firstName: "",
        lastName: ""
      }
    };
  },
  computed: {
    title() {
      switch (this.step) {
        case 1:
          return "Dane podstawowe";
        case 2:
          return "Przedmioty stanowiące deficyt ECTS";
        // TODO: do uzupełnienia
        default:
          return "";
      }
    },
    percentage() {
      return Math.round(((this.step - 1) / 7) * 100);
    }
  },
  methods: {
    handleFormSend() {
      // TODO: porządne todo :D
      console.log("sending form...");
      this.$router.push("/final");
    }
  }
};
</script>

<style scoped></style>
