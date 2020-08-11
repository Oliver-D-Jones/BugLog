<template>
  <div class="notes row align-items-end py-1">
    <span class="col-2 pl-3" style="margin-bottom: auto;">{{note.creatorEmail}}</span>
    <span class="col-9" style="text-align:justify !important">{{note.body}}</span>
    <div class="col-1">
      <button
        v-tooltip:bottom="'Delete this Note?'"
        type="button"
        class="btn btn-outline-danger mb-1 border rounded box-hover text-light"
        @click="deleteNote"
      >
        <!-- TRASH ICON -->
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "notes",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteNote() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your note!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let note = this.$store.dispatch("deleteNote", this.note.id);
          swal("Your note file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Note is still available.");
        }
      });
    },
  },
  components: {},
  props: ["note"],
  mounted() {},
  directives: {
    tooltip: function (el, binding) {
      $(el).tooltip({
        title: binding.value,
        placement: binding.arg,
        container: "body",
        trigger: "hover",
      });
    },
  },
};
</script>


<style scoped>
.notes {
  border-bottom: khaki solid 1px;
}
</style>