<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="expert.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Nome do especialista"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.specialty"
                type="text"
                class="form-control form-control-lg"
                id="txtSpecialty"
                placeholder="Especialidade"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.email"
                type="email"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.institution"
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
                v-model="expert.bio"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
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
import { EDIT_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      expert: {}
    };
  },
  computed: {
    ...mapGetters("expert", ["getExpertById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, this.$data.expert).then(
        () => {
          this.$alert(this.getMessage, "Especialista atualizado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.expert = this.getExpertById(this.$route.params.expertId);
  }
};
</script>
