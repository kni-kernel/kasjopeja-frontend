<template>
  <mu-container>
    <mu-form
      :model="form"
      class="form"
      label-position="right"
      label-width="100"
    >
      <mu-form-item prop="name" label="Imię">
        <mu-text-field v-model="form.name" type="text"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="surname" label="Nazwisko">
        <mu-text-field v-model="form.surname"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="index" :rules="indexRules" label="Nr indeksu">
        <mu-text-field v-model="form.index"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="fieldOfStudy" label="Kierunek">
        <mu-select v-model="form.fieldOfStudy">
          <mu-option
            v-for="option in fields"
            :key="option"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="level" label="Stopień">
        <mu-radio
          v-model="form.level"
          value="first"
          label="pierwszy"
        ></mu-radio>
        <mu-radio v-model="form.level" value="second" label="drugi"></mu-radio>
      </mu-form-item>
      <mu-form-item prop="session" label="Semestr">
        <mu-select v-model="form.session">
          <mu-option
            v-for="option in sessions"
            :key="option"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="email" :rules="emailRules" label="e-mail">
        <mu-text-field v-model="form.email"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>

<script>
export default {
  name: "BasicDataForm",
  props: {
    formValues: Object
  },
  data() {
    return {
      fields: ["Informatyka Stosowana", "Fizyka Techniczna", "Fizyka Medyczna"],
      sessions: ["I", "II", "III", "IV", "V", "VI"],
      form: {
        name: "",
        surname: "",
        index: "",
        fieldOfStudy: "",
        level: "",
        session: "",
        email: ""
      },
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
      ]
    };
  },
  methods: {
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
