<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Przedmiot spoza bazy WFiIS:
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              X
            </button>
          </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <mu-form-item prop="subject" label="Nazwa przedmiotu">
              <mu-text-field v-model="form.subject" type="text"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="hours" label="Liczba godzin W/C/L/P/S/I:">
              <mu-text-field
                v-model="form.numberOfHours"
                type="text"
              ></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="ects" label="Ilość punktów ECTS:">
              <mu-text-field
                v-model="form.ectsPoints"
                type="text"
              ></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="faculty" label="Wydział:">
              <mu-select v-model="form.faculty">
                <mu-option
                  v-for="option in departments"
                  :key="option"
                  :label="option"
                  :value="option"
                ></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="session" label="Semestr:">
              <mu-select v-model="form.session">
                <mu-option
                  v-for="option in sessions"
                  :key="option"
                  :label="option"
                  :value="option"
                ></mu-option>
              </mu-select>
            </mu-form-item>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <mu-button
              type="button"
              color="primary"
              class="button"
              @click="close"
              aria-label="Close modal"
            >
              Dodaj
            </mu-button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ExternalSubjectModal",
  props: {
    formValues: Object
  },
  data() {
    return {
      departments: [
        "WFiIS",
        "WGiG",
        "WIMiIP",
        "WEAIiIB",
        "WIEiT",
        "WIMiR",
        "WGGiOŚ",
        "WGGiIŚ",
        "WIMiC",
        "WO",
        "WMN",
        "WWNiG",
        "WZ",
        "WEiP",
        "WMS",
        "WH"
      ],
      sessions: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
      form: {
        subject: "",
        hours: "",
        ects: "",
        faculty: "",
        session: ""
        // payload = {'key1': 'value1', 'key2': 'value2'}
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  color: #009688;
  justify-content: space-between;
  margin: 15px;
  font-size: 1.5em;
}

.modal-footer {
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 5px 25px 5px 10px;
  width: 500px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
  color: #009688;
  background: transparent;
}
@media only screen and (max-width: 1000px) {
  .button {
    left:1vw
  }
}
</style>
