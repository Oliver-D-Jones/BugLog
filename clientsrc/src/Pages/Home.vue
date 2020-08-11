<template>
  <div class="home bg-info">
    <div class="container-fluid">
      <div class="row justify-content-around border rounded shadow">
        <div class="col-3" style="align-self: center">
          <img id="logo" class="img-fluid" alt="logo" src="../assets/logo.png" />
        </div>
        <div class="col-6 text-center text-light" style="z-index:100">
          <h1>Bug Tracker</h1>
        </div>
        <div class="col-3 text-right splatter" style="align-self: center">
          <!-- <img id="blood" alt="blood" src="../assets/blood.png" /> -->

          <button
            type="button"
            class="btn btn-warning"
            id="bugcatcher"
            data-toggle="modal"
            data-target="#reportBug"
          >
            Report Bug &nbsp;
            <i class="fas fa-bug ml-1" style="color:blue;"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row text-center d-flex">
        <div class="col-2" style="text-align-last: start;">
          <button
            class="btn btn-success btn-sm my-3 border shadow rounded"
            @click="deleteAll"
          >DELETE ALL BUGS</button>
        </div>
        <div class="col-8 justify-content-center" style="align-self:flex-end">
          <nav>
            <ul class="pagination justify-content-center" style="cursor:pointer">
              <li class="page-item">
                <span
                  class="page-link px-5 border rounded bg-info text-dark"
                  @click="movePage(false)"
                >Previous</span>
              </li>
              <li class="page-item">
                <span
                  class="page-link px-5 border rounded bg-info text-dark"
                  @click="movePage(true)"
                >&nbsp; Next &nbsp;</span>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-2 pl-5">
          <button
            @click="show =!show"
            v-tooltip:bottom="'toggle to show all/opened'"
            type="button"
            class="btn btn-lg bg-info my-2 border shadow rounded box-hover font-weight-bold"
          >
            <i class="far fa-folder-open" v-if="show"></i>
            <i class="far fa-folder" v-else></i>
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center" style="background:black">
        <div class="col-sm-12 col-md-1 text-center text-info" style="padding-left: 3rem;">#</div>
        <div class="col-sm-12 col-md-3 text-center text-info" style="padding-left: 2rem;">Title</div>
        <div class="col-sm-12 col-md-3 text-center text-info" style>Description</div>
        <div class="col-sm-12 col-md-2 text-center text-info" style>Creator</div>
        <div class="col-sm-12 col-md-1 text-center text-info" style="padding-right: 2.3rem;">Status</div>
        <div class="col-sm-12 col-md-2 text-center" style="padding-right: 2.5rem;">
          <button class="btn btn-lg link text-info" @click="sortDates">
            Modified
            <i class="fas fa-chevron-circle-down" v-if="sort"></i>
            <i v-else class="fas fa-chevron-circle-up"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="bugs.length>1">
      <Bug
        v-for="(bug,index) in bugs"
        :show="show"
        :bug="bug"
        :index="index"
        :key="bug.id"
        :bugId="bugId"
        @setThisBugId="bugId = $event"
      />
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-12">
        <h1 class="text-center">No Bugs Reported</h1>
      </div>
    </div>

    <!-- New Bug Modal -->
    <div
      class="modal fade"
      id="reportBug"
      tabindex="-1"
      role="dialog"
      aria-labelledby="reportBugLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reportBugLabel">Report Bug</h5>
            <button type="button" class="close bg-info" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="bg-dark text-light mb-2 py-2"
              style="width:100%"
              name="bugReportTitle"
              placeholder="Enter Bug Title..."
              v-model="bugPost.title"
            />
            <textarea
              style="width:100%"
              class="bg-dark text-light"
              v-model="bugPost.description"
              name="bugReportDescription"
              cols="50"
              rows="15"
              placeholder="Enter Bug Description..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary" v-on:click="report">Log Bug</button>
          </div>
        </div>
      </div>
    </div>
    <!--New Note Modal -->
    <div
      class="modal fade"
      id="newNote"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newNoteLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark text-info">
          <div class="modal-header">
            <h5 class="modal-title" id="newNoteLabel">Make Note On This Bug</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-info">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea
              style="width:100%"
              class="bg-dark text-light"
              v-model="notePost.body"
              name="bugReportDescription"
              cols="50"
              rows="15"
              placeholder="Enter Description..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary" v-on:click="note()">Log Note</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug";
export default {
  name: "home",
  data() {
    return {
      bugId: null,
      show: true,
      sort: false,
      page: 1,
      bugPost: {
        title: null,
        description: null,
        openedDate: null,
      },
      notePost: {
        body: null,
        bug: null,
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {
    movePage(move) {
      console.log(move);
      if (move) {
        ++this.page;
        if (this.page > this.$store.state.page.total)
          this.page = this.$store.state.page.total;
      } else {
        --this.page;
        if (this.page < 1) this.page = 1;
      }
      this.$store.dispatch("getBugs", this.page);
      console.log(this.page);
    },
    sortDates() {
      this.sort = !this.sort;
      if (this.sort) {
        this.bugs.sort(function (a, b) {
          return new Date(b.openedDate) - new Date(a.openedDate);
        });
      } else {
        this.bugs.sort(function (a, b) {
          return new Date(a.openedDate) - new Date(b.openedDate);
        });
      }
    },
    deleteAll() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, all bugs will be deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch("deleteBugs");
          swal("All bugs have been deleted!", {
            icon: "success",
          });
        } else {
          swal("Bugs are still available.");
        }
      });
    },
    report() {
      this.bugPost.openedDate = new Date().toLocaleString();
      let newBug = {
        openedDate: this.bugPost.openedDate,
        title: this.bugPost.title,
        description: this.bugPost.description,
      };
      this.$store.dispatch("addBug", newBug);
      this.bugPost.title = null;
      this.bugPost.description = null;
      $("#reportBug").modal("hide");
    },
    note(arg) {
      this.notePost.bug = this.bugId;
      this.$store.dispatch("addNote", this.notePost);
      this.notePost = {
        body: null,
        bug: null,
      };
      $("#newNote").modal("hide");
    },
  },
  components: { Bug },
  directives: {
    tooltip: function (el, binding) {
      $(el).tooltip({
        title: binding.value,
        placement: binding.arg,
        trigger: "hover",
      });
    },
  },
};
</script>

<style scoped>
#logo {
  height: 2.7rem;
  margin-left: 0%;
  transition-property: marign-left;
  animation: bug 16s linear infinite;
  /* animation-iteration-count: infinite; */
}

@keyframes bug {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(225deg);
  }
  from {
    margin-left: -10%;
  }
  to {
    margin-left: 390%;
  }
}

/* -----
SVG Icons - svgicons.sparkk.fr
----- */

.svg-icon {
  width: 2em;
  height: 2em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #ffffff;
}

.svg-icon circle {
  stroke: #0d2c4d;
  stroke-width: 1;
}
.home {
  min-height: fit-content;
}
</style>