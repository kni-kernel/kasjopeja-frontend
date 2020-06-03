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
            Zwolnienie z wybranej formy zajęć
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
            <mu-form-item prop="subject" label="Przedmiot:">
              <mu-select v-model="form.subject">
                <mu-option
                  v-for="option in subjects"
                  :key="option"
                  :label="option"
                  :value="option"
                ></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="type" label="Forma zajęć:">
              <mu-select v-model="form.type">
                <mu-option
                  v-for="option in types"
                  :key="option"
                  :label="option"
                  :value="option"
                ></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="date" label="Data zaliczenia:">
              <mu-text-field v-model="form.date" type="text"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="grade" label="Uzyskana ocena:">
              <mu-text-field v-model="form.grade" type="text"></mu-text-field>
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
  name: "DismissalOptionModal",
  props: {
    formValues: Object
  },
  data() {
    return {
      subjects: [ "Programowanie obiektowe I", "Programowanie obiektowe II", "Tutaj fajnie jakby importowały sie nazwy przedmiotów z tabelki wyżej, a jeszcze lepiej te z zaznaczonych checkBoxem" ],
      types: [ "Wykład", "Ćwiczenia audytoryjne", "Ćwiczenia laboratoryjne", "Ćwiczenia projektowe", "Zajęcia seminaryjne", "Inne" ],
      form: {
        subject: "",
        type: "",
        date: "",
        grade: ""
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
  padding: 5px 25px 5px 0;
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
    left: 1vw;
  }
}
</style>
