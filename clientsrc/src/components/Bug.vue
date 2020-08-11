<template>
  <div class="bug">
    <div class="container-fluid">
      <div
        v-if="bug.closed && show"
        class="row entry bg-black div-link text-light border my-2 py-1 justify-content-center align-items-center"
        :class="{'active':isActive}"
        @click="changeIt()"
        v-tooltip:bottom="'toggle to show notes/hide notes'"
        data-toggle="collapse"
        :data-target="'#collapse'+bug.id"
        aria-expanded="false"
        role:button
        :aria-controls="'#collapse'+bug.id"
      >
        <div class="col-sm-12 col-md-1 text-center">{{index+1}}</div>
        <div class="col-sm-12 col-md-3 text-center">{{bug.title}}</div>
        <div class="col-sm-12 col-md-3 text-center">{{bug.description}}</div>
        <div class="col-sm-12 col-md-2 text-center">{{bug.creatorEmail}}</div>
        <div class="col-sm-12 col-md-1 text-center text-light">
          <span class="bg-dark px-3 py-1 mt-1 rounded">Closed</span>
        </div>
        <div class="col-sm-12 col-md-2 text-center">{{bug.closedDate}}</div>
      </div>

      <div
        v-else-if="!bug.closed"
        class="row blue entry div-link text-dark border my-2 py-1 justify-content-center align-items-center"
        :class="{'active':isActive}"
        @click="changeIt()"
        v-tooltip:bottom="'toggle to show notes/hide notes'"
        data-toggle="collapse"
        :data-target="'#collapse'+bug.id"
        aria-expanded="false"
        :aria-controls="'#collapse'+bug.id"
      >
        <div class="col-sm-12 col-md-1 text-center">{{index + 1}}</div>
        <div class="col-sm-12 col-md-3 text-center">{{bug.title}}</div>
        <div class="col-sm-12 col-md-3 text-center">{{bug.id}}</div>
        <div class="col-sm-12 col-md-2 text-center">{{bug.creatorEmail}}</div>
        <div class="col-sm-12 col-md-1 text-center text-info">
          <span class="bg-dark px-3 py-1 mt-1 rounded">Opened</span>
        </div>
        <div class="col-sm-12 col-md-2 text-center">{{bug.openedDate}}</div>
      </div>
    </div>
    <div class="container-fluid accordian" :id="'accordion'+bug.id">
      <div
        class="row justify-content-center text-dark collapse mt-3 pt-3 border"
        :id="'collapse'+bug.id"
        aria-labelledby="headingOne"
        aria-expanded="false"
        data-toggle="collapse"
        :data-parent="'#accordion'+bug.id"
      >
        <div class="col-2 noteHeader">
          <p style="border-bottom:solid 1px white">Commentor</p>
        </div>
        <div class="col-8 noteHeader">
          <p style="border-bottom:solid 1px white">Description</p>
        </div>
        <router-link class="nav-link col-1" :to="{ name: 'Bug',params:{id:this.bug.id} }">
          <h6>
            <button class="btn bg-primary text-info round">Details</button>
          </h6>
        </router-link>
        <div class="col-1">
          <button
            v-if="!bug.closed"
            class="btn btn-sm btn-secondary text-dark"
            @click="setThisBugId()"
            data-toggle="modal"
            data-target="#newNote"
          >Add Note</button>
        </div>
        <div class="container-fluid" :id="'noteCon'+bug.id">
          <Notes class="bg-dark text-light pt-1" v-for="note in notes" :note="note" :key="note.id" />
          <h3 class="text-center" v-if="notes.length<1&!bug.closed">No Notes...</h3>
          <h3 v-else-if="bug.closed">Bug Is Closed</h3>
          <div class="row align-items-end" style="min-height: 12rem;">
            <div class="col-12">
              <button v-if="!bug.closed" class="btn btn-block btn-dark" @click="closeBug">Close Bug</button>
              <button
                v-if="bug.closed"
                class="btn btn-block btn-primary"
                @click="deleteBug"
              >Delete Bug</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notes from "../components/Notes";
export default {
  name: "bug",
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes.filter((n) => n.bug == this.bug.id);
    },
  },

  methods: {
    // details() {
    //   console.log(this.bug.id);
    //   // this.$store.dispatch("getActiveBug", this.bug.id);
    //   this.$router.push({ name: "Bug", params: { id: this.bug.id } });
    //   // console.log(this.$router);
    // },
    setThisBugId() {
      this.$emit("setThisBugId", this.bug.id);
    },
    changeIt() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        $("#noteCon" + this.bug.id).css("min-height", "30vh");
      } else {
        $("#noteCon" + this.bug.id).css("min-height", "initial");
      }
    },
    closeBug() {
      swal({
        title: "Are you sure?",
        text: "Once closed, you will not be able to revert back to opened !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.bug.closed = true;
          this.bug.closedDate = new Date().toLocaleString();
          let bug = this.$store.dispatch("closeBug", this.bug);
          swal("Your bug file has been closed!", {
            icon: "success",
            content: "img",
          });
        } else {
          swal("Bug is still opened.");
        }
        $(".collapse").collapse("hide");
      });
    },
    deleteBug() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let bug = this.$store.dispatch("deleteBug", this.bug.id);
          swal("Your bug file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Bug is still available.");
        }
        $(".collapse").collapse("hide");
      });
    },
  },
  components: { Notes },
  props: ["bug", "index", "show"],
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
.entry {
  cursor: pointer;
}

.blue {
  background-color: lightblue;
  /* min-height: 1rem; */
}

.active {
  background-color: rgb(16, 105, 134);
  color: whitesmoke;
  /* height: 100hv; */
}
</style>