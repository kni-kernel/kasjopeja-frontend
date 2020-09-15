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
            Zmiana nazwy przedmiotu:
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
            <mu-form :model="form">
              <mu-form-item prop="subject" label="Nazwa przedmiotu">
                <mu-text-field v-model="form.name" type="text"></mu-text-field>
              </mu-form-item>
            </mu-form>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <mu-button
              type="button"
              color="primary"
              class="button"
              @click="change"
              aria-label="Close modal"
            >
              Zmień nazwę
            </mu-button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/utils/EventBus";

export default {
  name: "ChangeSubjectNameModal",
  created() {
    EventBus.$on("setDataForChangeSubjectNameModal", data => {
      this.form.name = data.subjectName;
      this.form.index = data.subjectIndex;
    });
  },
  data() {
    return {
      form: {
        name: "",
        index: 0
      }
    };
  },
  methods: {
    change() {
      EventBus.$emit("changeSubjectNameModalClosed", {
        subjectName: this.form.name,
        subjectIndex: this.form.index
      });
      this.close();
    },
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
  z-index: 666;
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
    left: 1vw;
  }
}
</style>
