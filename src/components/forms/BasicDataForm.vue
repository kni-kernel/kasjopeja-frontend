<template>
  <mu-container>
    <mu-form
      ref="form"
      :model="form"
      class="form"
      label-position="right"
      label-width="200"
    >
      <mu-form-item prop="name" :rules="nameRules" label="Imię">
        <mu-text-field v-model="form.name" type="text" />
      </mu-form-item>
      <mu-form-item prop="surname" :rules="surnameRules" label="Nazwisko">
        <mu-text-field v-model="form.surname" />
      </mu-form-item>
      <mu-form-item prop="index" :rules="indexRules" label="Nr indeksu">
        <mu-text-field v-model="form.index" />
      </mu-form-item>
      <mu-form-item prop="level" :rules="levelRules" label="Stopień">
        <mu-radio v-model="form.level" :value="1" label="pierwszy" />
        <mu-radio v-model="form.level" :value="2" label="drugi" />
      </mu-form-item>
      <mu-form-item
        prop="fieldOfStudy"
        :rules="fieldOfStudyRules"
        label="Kierunek"
      >
        <mu-select :disabled="form.level === ''" v-model="form.fieldOfStudy">
          <mu-option
            v-for="option in form.level === 2
              ? levelTwoFieldsOfStudies
              : levelOneFieldsOfStudies"
            :key="option.key"
            :label="option.label"
            :value="option.key"
          />
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="semester" :rules="semesterRules" label="Semestr">
        <mu-select :disabled="form.level === ''" v-model="form.semester">
          <mu-option
            v-for="option in form.level === 2
              ? semestersSecondLevel
              : semestersFirstLevel"
            :key="option"
            :label="option"
            :value="romanianToInt(option)"
          />
        </mu-select>
      </mu-form-item>
      <mu-form-item
        prop="beginningYear"
        :rules="beginningYearRules"
        label="Rok rozpoczęcia studiów"
      >
        <mu-date-input
          :min-date="new Date(2012, 1, 1)"
          :max-date="this.previousYear"
          v-model="form.beginningYear"
          type="year"
          full-width
        />
      </mu-form-item>
      <mu-form-item prop="year" label="Rok akademicki SPZu">
        <mu-text-field v-model="form.actualYear" />
      </mu-form-item>
      <mu-form-item prop="email" :rules="emailRules" label="e-mail">
        <mu-text-field v-model="form.email" />
      </mu-form-item>
    </mu-form>
    <mu-circular-progress
      v-if="loading"
      class="demo-circular-progress"
      :size="36"
    />
  </mu-container>
</template>

<script>
import { mapActions } from "vuex";

import { EventBus } from "@/utils/EventBus";
import { romanianToInt } from "@/utils/functions";

export default {
  name: "BasicDataForm",
  mounted() {
    EventBus.$on("clickButtonChangeFormPage", step => {
      if (step === 1) {
        this.submitForm();
      }
    });
    this.previousYear.setFullYear(this.currentYear.getFullYear() - 1);
  },
  data() {
    return {
      loading: false,
      levelOneFieldsOfStudies: [
        {
          key: "IS",
          label: "Informatyka Stosowana"
        },
        {
          key: "FT",
          label: "Fizyka Techniczna"
        },
        {
          key: "FM",
          label: "Fizyka Medyczna"
        }
      ],
      levelTwoFieldsOfStudies: [
        {
          key: "IS-GKPIO",
          label: "Informatyka Stosowana - GKPIO"
        },
        {
          key: "IS-MIAD",
          label: "Informatyka Stosowana - MIAD"
        },
        {
          key: "IS-SWIR",
          label: "Informatyka Stosowana - SWIR"
        },
        {
          key: "FT",
          label: "Fizyka Techniczna"
        },
        {
          key: "FM-TOIB",
          label: "Fizyka Medyczna - TOIB"
        },
        {
          key: "FM-DIEWM",
          label: "Fizyka Medyczna - DIEWM"
        }
      ],
      semestersFirstLevel: ["I", "II", "III", "IV", "V", "VI", "VII"],
      semestersSecondLevel: ["I", "II", "III"],
      form: {
        name: "",
        surname: "",
        index: "",
        fieldOfStudy: "",
        level: "",
        semester: "",
        email: "",
        beginningYear: "",
        actualYear: process.env.VUE_APP_ACTUAL_ACADEMIC_YEAR
      },
      currentYear: new Date(),
      previousYear: new Date(),
      emailRules: [
        { validate: val => !!val, message: "Email nie może być pusty!" },
        {
          validate: val => this.validEmail(val),
          message: "Podano niepoprawny email"
        }
      ],
      indexRules: [
        {
          validate: val => val.length >= 6,
          message: "Indeks musi mieć przynajmniej 6 cyfr"
        },
        {
          validate: val => /^[0-9]*$/gm.test(val),
          message: "Indeks musi się składać z samych cyfr"
        }
      ],
      nameRules: [
        {
          validate: val => val.length >= 3,
          message: "Imię musi mieć przynajmniej 3 znaki"
        }
      ],
      surnameRules: [
        {
          validate: val => val.length >= 5,
          message: "Nazwisko musi mieć przynajmniej 3 znaki"
        }
      ],
      levelRules: [
        {
          validate: val => !!val,
          message: "Stopień studiów musi być wybrany"
        }
      ],
      fieldOfStudyRules: [
        {
          validate: val => !!val,
          message: "Kierunek studiów musi być wybrany"
        }
      ],
      semesterRules: [
        {
          validate: val => !!val,
          message: "Semestr studiów musi być wybrany"
        }
      ],
      beginningYearRules: [
        {
          validate: val => !!val,
          message: "Data rozpoczęcia studiów musi być wybrana"
        }
      ]
    };
  },
  methods: {
    ...mapActions("form", ["setPersonalData"]),
    ...mapActions("subjects", [
      "getObligatorySubjects",
      "getElectiveSubjects",
      "getPreviousObligatorySubjects"
    ]),
    submitForm() {
      if (!this.$refs.form) return;
      this.$refs.form.validate().then(async result => {
        if (result) {
          this.loading = true;
          this.setPersonalData({
            album: this.form.index,
            email: this.form.email,
            fieldOfStudy: this.form.fieldOfStudy,
            firstName: this.form.name,
            lastName: this.form.surname,
            semester: this.form.semester,
            studyDegree: this.form.level,
            studyYear: this.form.beginningYear.getFullYear(),
            actualYear: this.form.actualYear
          });

          await Promise.all([
            this.getElectiveSubjects({
              startYear: this.form.beginningYear.getFullYear()
            }),
            this.getObligatorySubjects({
              fieldOfStudy: this.form.fieldOfStudy,
              startYear: this.form.beginningYear.getFullYear(),
              semester: this.form.semester,
              level: this.form.level
            }),
            this.getPreviousObligatorySubjects({
              fieldOfStudy: this.form.fieldOfStudy,
              startYear: this.form.beginningYear.getFullYear(),
              semester: this.form.semester,
              level: this.form.level
            })
          ]);

          this.loading = false;

          EventBus.$emit("changeFormPage");
        }
      });
    },

    romanianToInt(romanian) {
      return romanianToInt(romanian);
    },

    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 3em;
  width: 100%;
  max-width: 460px;
}
</style>

<style>
.mu-picker {
  color: #080f5b !important;
}
</style>
