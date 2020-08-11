<template>
  <div class="activeBug">
    <div class="container-fluid">
      <div class="row bg-dark text-warning align-items-end invisible mt-5">
        <div class="col-sm-12 col-md-2 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">Title</h3>
        </div>
        <div class="col-sm-12 col-md-4 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">Description</h3>
        </div>
        <div class="col-sm-12 col-md-3 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">Creator</h3>
        </div>
        <div class="col-sm-12 col-md-1 text-center rounded">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">Status</h3>
        </div>
        <div class="col-sm-12 col-md-2 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">
            <span class="bg-dark px-3 py-1 mt-1 rounded">Opened</span>
          </h3>
        </div>
      </div>
      <div class="row bg-dark text-warning invisible">
        <div class="col-sm-12 col-md-2 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">{{bug.title}}</h3>
        </div>
        <div class="col-sm-12 col-md-4 text-center text-wrap">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">{{bug.description}}</h3>
        </div>
        <div class="col-sm-12 col-md-3 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">{{bug.creatorEmail}}</h3>
        </div>
        <div class="col-sm-12 col-md-1 text-center text-danger rounded">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">
            <span class="bg-dark px-3 py-1 mt-1 rounded">Open</span>
          </h3>
        </div>
        <div class="col-sm-12 col-md-2 text-center">
          <h3 class="visible bg-dark p-2 border shadow rounded m-1">{{bug.openedDate}}</h3>
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
      <div class="row text-info" style="border-top: solid 1px white">
        <div class="col-2">
          <h1 class="pl-2">Creator&nbsp;|&nbsp;</h1>
        </div>
        <div class="col-10">
          <h1>Description</h1>
        </div>
      </div>
      <div v-if="notes.length>0">
        <activeNotes class="text-light" v-for="note in notes" :note="note" :key="note.id" />
      </div>
      <div v-else>
        <h3 class="text-info text-center">No Notes Currently...</h3>
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
import activeNotes from "../components/ActiveNotes";
export default {
  name: "activeBug",
  data() {
    return {
      Post: {
        body: "",
        bug: "",
      },
    };
  },
  computed: {
    notes() {
      //return this.$store.state.activeNotes;
    },
    bug() {
      console.log("AB computed", this.$store.state.activeBug.title);
     // return this.$store.state.activeBug;
    },
  },
  methods: {
    noted() {
      this.Post.bug = this.bug.id;
      console.log(this.bug.id, this.Post);
      this.$store.dispatch("addActiveNote", this.Post);
      this.Post = {
        body: null,
        bug: null,
      };
      $("#newNote1").modal("hide");
    },
  },
  components: { activeNotes },
  created() {
    console.log("created");
    // this.$store.dispatch("getStateFromLocal");
    // let _id = this.$store.state.activeBug.id;
    // this.$store.dispatch("getNotes", _id);
  },
};
</script>


<style scoped>
</style>