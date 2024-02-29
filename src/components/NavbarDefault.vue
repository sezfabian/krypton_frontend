<template>
    <nav
      class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      v-bind="$attrs"
      id="navbarBlur"
      data-scroll="true"
    >
      <div class="px-3 py-1 container-fluid">
        <div
          class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
          id="navbar"
        >
          <div
            class="pe-md-3 d-flex align-items-center ms-md-auto"
          >
            <div class="input-group">
              <span class="input-group-text text-body">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                class="form-control"
                :placeholder="'Type here...'"
              />
            </div>
          </div>
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <router-link
                :to="{ name: 'Profile' }"
                class="px-0 nav-link font-weight-bold text-white"
                target="_blank"
                v-if="this.$store.state.user"
              >
                <i
                  class="fa fa-user"
                  :class="'me-sm-2'"
                ></i>
                <span class="d-sm-inline d-none">{{ this.$store.state.user.email }}</span>
              </router-link>
  
              <a
                :to="{ name: 'Signin' }"
                class="px-0 nav-link font-weight-bold text-white"
                target="_blank"
                v-if="this.$store.state.user"
                @click="logout()"
              >
                <i
                  class="fa fa-door-open mx-2"
                  :class="'me-sm-2'"
                ></i>
                <span class="d-sm-inline d-none">Log Out</span>
            </a>
              
            </li>
            
            <li class="px-3 nav-item d-flex align-items-center">
              <a class="p-0 nav-link text-white" @click="toggleConfigurator">
                <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
              </a>
            </li>
            <li
              class="nav-item dropdown d-flex align-items-center"
              :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'"
            >
              <a
                href="#"
                class="p-0 nav-link text-white"
                :class="[showMenu ? 'show' : '']"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="showMenu = !showMenu"
              >
                <i class="cursor-pointer fa fa-bell"></i>
              </a>
              <ul
                class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
                :class="showMenu ? 'show' : ''"
                aria-labelledby="dropdownMenuButton"
              >
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="my-auto">
                        <img
                          src="../../assets/img/team-2.jpg"
                          class="avatar avatar-sm me-3"
                          alt="user image"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal">
                          <span class="font-weight-bold">New message</span> from
                          Laur
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                          <i class="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="py-1 d-flex">
                      <div class="my-auto">
                        <img
                          src="../../assets/img/small-logos/logo-spotify.svg"
                          class="avatar avatar-sm bg-gradient-dark me-3"
                          alt="logo spotify"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal">
                          <span class="font-weight-bold">New album</span> by
                          Travis Scott
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                          <i class="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
            </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>


  <script setup>
  
  </script>
  