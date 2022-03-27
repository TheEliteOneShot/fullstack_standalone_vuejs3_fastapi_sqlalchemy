import store from "./store.js";

export default {
  name: "App",
  setup() {
    const { onMounted, ref } = Vue;
    const page = ref(null);

    //store management: save $variables to localstorage
    onMounted(() => {
      window.addEventListener("beforeunload", () => {
        Object.keys(store).forEach(function (key) {
          if (key.charAt(0) == "$") {
            localStorage.setItem(key, store[key]);
          } else {
            localStorage.removeItem("$" + key);
          }
        });
      });
      Object.keys(store).forEach(function (key) {
        if (key.charAt(0) == "$") {
          if (localStorage.getItem(key)) store[key] = localStorage.getItem(key);
        }
      });
    });

    // //url management
    // watchEffect(() => {
    //     const urlpage = window.location.pathname.split("/").pop();
    //     if (page.value == null) {page.value = urlpage}
    //     if (page.value != urlpage) {const url = page.value ? page.value : './'; window.history.pushState({url: url}, '', url);                                }
    //     window.onpopstate = function() {page.value = window.location.pathname.split("/").pop()};
    // })

    return { page };
  },

  template: `
    <header class="header" id="header">
    <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
    <div class="header_img"><img src="./static/img/icon.png" /></div>
    </header>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
        <div>
            <a href="#" class="nav_logo"> <i class='bx bx-book-bookmark nav_logo-icon'></i> <span class="nav_logo-name">Demonstration</span> </a>
            <div class="nav_list">
                <a href="#" class="nav_link active"> <i class='bx bx-bookmark nav_icon'></i> <span class="nav_name">Bootstrap5</span></a> 
                <router-link class="nav_link" to="/one"><i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Material Design</span></router-link>
                <router-link class="nav_link" to="/two"><i class='bx bx-message-square-detail nav_icon'></i> <span class="nav_name">Toasts</span></router-link>
                <router-link class="nav_link" to="/five"><i class='bx bx-data nav_icon'></i> <span class="nav_name">AG Grid Datatable</span></router-link>
                <router-link class="nav_link" to="/three"><i class='bx bx-server nav_icon'></i> <span class="nav_name">Full Stack</span></router-link>
                <router-link class="nav_link" to="/six"><i class='bx bx-book-reader nav_icon'></i> <span class="nav_name">API Docs</span></router-link>
            </div>
        </div>
        <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">Sign Out</span> </a>
        </nav>
    </div>
    <body id="body-pd">
        <div class="content-container height-100 bg-light">
        <router-view></router-view>
        </div>
    </body>`,
};
