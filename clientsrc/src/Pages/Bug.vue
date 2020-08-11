<template>
  <div class="Bug">
    <div class="container-fluid" style="min-height: 100vh">
      <div class="row bg-dark text-warning align-items-end invisible mt-5">
        <div class="col-sm-12 col-md-2 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">Title BUG</p>
        </div>
        <div class="col-sm-12 col-md-4 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">Description</p>
        </div>
        <div class="col-sm-12 col-md-3 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">Creator</p>
        </div>
        <div class="col-sm-12 col-md-1 text-center rounded">
          <p class="visible bg-dark p-2 border shadow rounded m-1">Status</p>
        </div>
        <div class="col-sm-12 col-md-2 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">
            <span class="bg-dark px-3 py-1 mt-1 rounded">Opened</span>
          </p>
        </div>
      </div>
      <div class="row bg-dark text-warning invisible">
        <div class="col-sm-12 col-md-2 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">{{bug.title}}</p>
        </div>
        <div class="col-sm-12 col-md-4 text-center text-wrap">
          <p class="visible bg-dark p-2 border shadow rounded m-1">{{bug.description}}</p>
        </div>
        <div class="col-sm-12 col-md-3 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">{{bug.creatorEmail}}</p>
        </div>
        <div class="col-sm-12 col-md-1 text-center text-danger rounded">
          <p class="visible bg-dark p-2 border shadow rounded m-1">
            <span class="bg-dark px-3 py-1 mt-1 rounded">Open</span>
          </p>
        </div>
        <div class="col-sm-12 col-md-2 text-center">
          <p class="visible bg-dark p-2 border shadow rounded m-1">{{bug.openedDate}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center my-2">
          <button
            v-if="!bug.closed"
            class="btn btn-secondary text-dark"
            data-toggle="modal"
            data-target="#newNote1"
          >Add Note</button>
        </div>
      </div>
      <div class="row bg-dark py-1 text-secondary" style="border-top: solid 1px black;margin-center:auto">
        <div class="col-2">
          <h6 class="pl-2 py-1">Creator&nbsp;|&nbsp;</h6>
        </div>
        <div class="col-10">
          <h6 class="py-1">Description</h6>
                  <!-- <img id="logo" class="img-fluid" alt="logo" src="../assets/wallpaper.jpg" /> -->

        </div>
      </div>
      <div v-if="notes != undefined && notes.length > 0">
        <Notes class="text-dark" v-for="note in notes" :note="note" :key="note.id" />
      </div>
      <div v-else>
        <p class="text-info text-center">No Notes Currently...</p>
      </div>
    </div>
    <!--New Note Modal -->
    <div
      class="modal fade"
      id="newNote1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newNote1Label"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark text-info">
          <div class="modal-header">
            <h5 class="modal-title" id="newNote1Label">Make Note On This Bug</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-info">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea
              style="width:100%"
              class="bg-dark text-light"
              v-model="Post.body"
              name="bugReportDescription"
              cols="50"
              rows="15"
              placeholder="Enter Description..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary" v-on:click="noted()">Log Noted</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Notes from "../components/ActiveNotes";
export default {
  name: "Bug",
  data() {
    return {
      Post: {
        body: "",
        bug: "",
      },
    };
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.activeNotes;
    },
  },
  methods: {
    noted() {
      this.Post.bug = this.bug.id;
      this.$store.dispatch("addActiveNote", this.Post);
      this.Post = {
        body: null,
        bug: null,
      };
      $("#newNote1").modal("hide");
    },
  },
  components: { Notes },
  beforeCreate() {
    let _route = this.$router.currentRoute.fullPath;
    let _id = this.$router.currentRoute.params.id;
    console.log(this.$router.currentRoute);
    this.$store.dispatch("getActiveBug", _route);
    this.$store.dispatch("getNotes",_id);
  },
};
</script>


<style scoped>
.Bug{
  background-image: url("../assets/bug.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>