<template>
  <FormLayout
    :step="step"
    :title="title"
    :subtitle="subtitle"
    :percentage="percentage"
  >
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
        case 3:
          return "Przedmioty zrealizowane w poprzednich semestrach";
        case 4:
          return "Przedmioty obowiązkowe";
        case 5:
          return "Przedmioty obieralne";
        case 6:
          return "Przedmioty dodatkowe";
        case 7:
          return "Przedmioty powtarzane";
        default:
          return "";
      }
    },
    subtitle() {
      switch (this.step) {
        case 1:
          return (
            "Na podstawie informacji wypełnionych w tym kroku aplikacja będzie wiedzieć jakie przedmioty " +
            "są obowiązkowe twoim semestrze"
          );
        case 2:
          return (
            "Podaj przedmioty, z których nie masz zaliczenia. Jeżeli ten krok Cię nie dotyczy po prostu " +
            "przejdź dalej."
          );
        case 3:
          return (
            "Podaj przedmioty obowiązkowe lub nadprogramowe, które udało Ci się zrealizować wcześniej i " +
            "chcesz się z nich rozliczyć teraz. Jeżeli ten krok Cię nie dotyczy po prostu przejdź dalej."
          );
        case 4:
          return "Tutaj podane są twoje przedmioty na dany semestr. Sprawdź czy wszystko się zgadza i przejdź dalej.";
        case 5:
          return (
            "Podaj przedmioty, z których nie masz zaliczenia. Jeżeli ten krok Cię nie dotyczy po prostu " +
            "przejdź dalej."
          );
        case 6:
          return (
            "Podaj przedmioty dodatkowe bądź realizowane na poczet przyszłych semestrów. Jeżeli ten krok Cię " +
            "nie dotyczy po prostu przejdź dalej."
          );
        case 7:
          return (
            "Spośród przedmiotów stanowiących deficyt ECTS zaznacz te, które będziesz powtarzać w nadchodzącym " +
            "semestrze, albo dodaj te, którymi zastępujesz przedmioty niezaliczone.\n" +
            "Jeśli Twój prowadzący wyraził zgodę - zaznacz formy zajęć, w których nie będziesz uczestniczył. " +
            "Jeżeli ten krok Cię nie dotyczy po prostu przejdź dalej."
          );
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
