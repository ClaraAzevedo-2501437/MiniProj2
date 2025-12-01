<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Nome do especialista"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="specialty"
                type="text"
                class="form-control form-control-lg"
                id="txtSpecialty"
                placeholder="Especialidade"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="institution"
                type="text"
                class="form-control form-control-lg"
                id="txtInstitution"
                placeholder="Instituição (opcional)"
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtBio"
                class="form-control form-control-lg"
                placeholder="Biografia (opcional)"
                cols="30"
                rows="10"
                v-model="bio"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{name: 'listExperts'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      specialty: "",
      email: "",
      institution: "",
      bio: ""
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`expert/${ADD_EXPERT}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
