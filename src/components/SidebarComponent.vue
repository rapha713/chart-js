<template>
  <div class="w-fit flex h-screen items-start fixed z-[1001] shadow-md overflow-y-hidden">
    <ul class="bg-white p-[3px] h-full px-2 py-4">
      <li>
        <router-link to="/dashboard" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z"
                stroke="#46494e" stroke-width="1.44" stroke-linecap="round"></path>
              <path
                d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z"
                stroke="#46494e" stroke-width="1.44" stroke-linecap="round"></path>
              <path
                d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z"
                stroke="#46494e" stroke-width="1.44" stroke-linecap="round"></path>
              <path
                d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z"
                stroke="#46494e" stroke-width="1.44" stroke-linecap="round"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-regular text-[13px] mb-0">Dashboard</p>
        </router-link>
      </li>
      <li>
        <a @click="dados_nav_visible = !dados_nav_visible"
          class="p-2 flex flex-col justify-center items-center cursor-pointer">
          <svg width="38px" height="38px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="#000000" stroke-width="0.00024000000000000003">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
              stroke-width="0.096"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2.25 12C2.25 10.4812 3.48122 9.25 5 9.25C6.51878 9.25 7.75 10.4812 7.75 12C7.75 13.5188 6.51878 14.75 5 14.75C3.48122 14.75 2.25 13.5188 2.25 12ZM5 10.75C4.30964 10.75 3.75 11.3096 3.75 12C3.75 12.6904 4.30964 13.25 5 13.25C5.69036 13.25 6.25 12.6904 6.25 12C6.25 11.3096 5.69036 10.75 5 10.75Z"
                fill="#46494e"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12ZM12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75Z"
                fill="#46494e"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M19 9.25C17.4812 9.25 16.25 10.4812 16.25 12C16.25 13.5188 17.4812 14.75 19 14.75C20.5188 14.75 21.75 13.5188 21.75 12C21.75 10.4812 20.5188 9.25 19 9.25ZM17.75 12C17.75 11.3096 18.3096 10.75 19 10.75C19.6904 10.75 20.25 11.3096 20.25 12C20.25 12.6904 19.6904 13.25 19 13.25C18.3096 13.25 17.75 12.6904 17.75 12Z"
                fill="#46494e"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-regular text-[13px] mb-0">Dados</p>
        </a>
      </li>
      <li>
        <router-link to="/faqs" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10 22C14.4183 22 18 18.4183 18 14C18 9.58172 14.4183 6 10 6C5.58172 6 2 9.58172 2 14C2 15.2355 2.28008 16.4056 2.7802 17.4502C2.95209 17.8093 3.01245 18.2161 2.90955 18.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L5.39939 21.0904C5.78393 20.9876 6.19071 21.0479 6.54976 21.2198C7.5944 21.7199 8.76449 22 10 22Z"
                stroke="#46494e" stroke-width="1.8"></path>
              <path
                d="M18 14.5018C18.0665 14.4741 18.1324 14.4453 18.1977 14.4155C18.5598 14.2501 18.9661 14.1882 19.3506 14.2911L19.8267 14.4185C20.793 14.677 21.677 13.793 21.4185 12.8267L21.2911 12.3506C21.1882 11.9661 21.2501 11.5598 21.4155 11.1977C21.7908 10.376 22 9.46242 22 8.5C22 4.91015 19.0899 2 15.5 2C12.7977 2 10.4806 3.64899 9.5 5.9956"
                stroke="#46494e" stroke-width="1.8"></path>
              <path d="M6.51828 14H6.52728M10.009 14H10.018M13.5 14H13.509" stroke="#46494e" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-regular text-[13px] mb-0">Perguntas</p>
        </router-link>
      </li>
      <li>
        <router-link to="/valores" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 370 370" xmlns="http://www.w3.org/2000/svg">
            <path fill="#46494e" d="M361.095,104.875l-72.814-84.256c-6.967-8.059-17.069-12.682-27.719-12.682c-10.652,0-20.76,4.623-27.722,12.682 l-54.912,63.539c-2.178,0.457-4.276,1.131-6.273,1.998c-0.316-19.932-16.619-36.051-36.625-36.051H83.849 c-20.201,0-36.637,16.438-36.637,36.639v117.787H36.625c-14.295,0-27.372,8.4-33.314,21.395	c-5.953,13.002-3.754,28.393,5.595,39.201l72.813,84.254c6.969,8.059,17.07,12.682,27.72,12.682c10.652,0,20.76-4.623,27.722-12.682	l55.042-63.686c2.134-0.496,4.185-1.201,6.137-2.09c0.192,20.041,16.545,36.289,36.632,36.289h51.182	c20.201,0,36.638-16.438,36.638-36.639V165.471h10.586c14.295,0,27.372-8.402,33.315-21.395	C372.642,131.074,370.444,115.682,361.095,104.875z M110.57,326.403c-0.565,0.656-1.69,0.658-2.261,0l-72.816-84.26	c-0.381-0.436-0.468-1.061-0.224-1.594c0.241-0.533,0.775-0.875,1.356-0.875h45.731V86.744c0-0.824,0.668-1.492,1.492-1.492h51.182	c0.825,0,1.498,0.668,1.498,1.492v36.59c-1.154,1.131-2.264,2.309-3.308,3.549c-8.687,10.346-13.277,22.899-13.277,36.299	c0,9.986,2.563,19.166,7.626,27.391c-2.402,2.668-4.383,5.754-5.833,9.158c-4.333,10.184-3.284,21.777,2.803,31.016	c6.677,10.127,15.929,17.727,27.268,22.51v0.377c0,6.842,2.1,13.203,5.685,18.475L110.57,326.403z M218.729,225.07	c-5.781,5.492-13.514,9.154-23.031,10.924v17.639c0,6.055-4.907,10.961-10.965,10.961c-6.053,0-10.961-4.906-10.961-10.961v-17.055	c-13.89-1.881-24.286-7.9-30.89-17.92c-2.023-3.07-2.376-6.945-0.935-10.326c1.438-3.379,4.475-5.818,8.086-6.484l8.276-1.541	c4.233-0.785,8.536,0.982,10.998,4.518c3.112,4.475,8.379,6.744,15.657,6.744c11.206,0,11.206-4.455,11.206-5.92	c0-2.125-0.797-3.668-2.508-4.861c-1.745-1.217-4.927-2.299-9.455-3.221c-18.205-3.711-29.934-8.529-34.863-14.318	c-5.007-5.869-7.436-12.434-7.436-20.066c0-8.287,2.735-15.744,8.132-22.172c5.226-6.219,13.21-10.256,23.73-12.018v-12.623	c0-6.055,4.908-10.963,10.961-10.963c6.058,0,10.965,4.908,10.965,10.963v12.859c9.416,1.797,16.769,5.602,22.349,11.572	c2.577,2.754,3.557,6.639,2.597,10.285c-0.963,3.646-3.729,6.541-7.328,7.664l-5.678,1.777c-4.118,1.293-8.61,0.041-11.477-3.186	c-2.857-3.221-7.095-4.855-12.6-4.855c-4.434,0-9.72,1.057-9.72,6.084c0,1.424,0.547,2.709,1.575,3.717	c1.082,1.053,4.235,2.172,9.373,3.318c11.856,2.594,20.522,4.961,25.709,7.023c5.261,2.096,9.69,5.688,13.176,10.678	c3.483,4.98,5.254,10.955,5.254,17.746C228.928,210.563,225.497,218.643,218.729,225.07z M334.732,129.451	c-0.241,0.535-0.775,0.875-1.357,0.875h-45.731v152.93c0,0.824-0.668,1.492-1.492,1.492H234.97c-0.825,0-1.498-0.668-1.498-1.492	v-41.908c0.128-0.119,0.259-0.232,0.388-0.354c11.143-10.586,17.033-24.396,17.033-39.941c0-11.229-3.188-21.717-9.212-30.318	c-1.192-1.709-2.456-3.324-3.788-4.846c1.761-2.803,3.116-5.895,3.989-9.203c2.903-11.021-0.009-22.572-7.791-30.887	c-4.728-5.057-10.265-9.162-16.553-12.291c-0.483-5.605-2.386-10.811-5.335-15.264l47.227-54.646	c0.283-0.328,0.697-0.516,1.132-0.516c0.434,0,0.844,0.189,1.129,0.518l72.816,84.258	C334.889,128.293,334.976,128.918,334.732,129.451z"/>
          </svg>
          <p class="text-zinc-700 font-regular text-[13px] mb-0">Valores</p>
        </router-link>
      </li>
      <li>
        <router-link to="/usuarios" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#46494e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#46494e"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-regular text-[13px] mb-0">Usuários</p>
        </router-link>
      </li>
      <li>
        <router-link to="/configuracoes" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M23.265,24.381l.9-.894c4.164.136,4.228-.01,4.411-.438l1.144-2.785L29.805,20l-.093-.231c-.049-.122-.2-.486-2.8-2.965V15.5c3-2.89,2.936-3.038,2.765-3.461L28.538,9.225c-.171-.422-.236-.587-4.37-.474l-.9-.93a20.166,20.166,0,0,0-.141-4.106l-.116-.263-2.974-1.3c-.438-.2-.592-.272-3.4,2.786l-1.262-.019c-2.891-3.086-3.028-3.03-3.461-2.855L9.149,3.182c-.433.175-.586.237-.418,4.437l-.893.89c-4.162-.136-4.226.012-4.407.438L2.285,11.733,2.195,12l.094.232c.049.12.194.48,2.8,2.962l0,1.3c-3,2.89-2.935,3.038-2.763,3.462l1.138,2.817c.174.431.236.584,4.369.476l.9.935a20.243,20.243,0,0,0,.137,4.1l.116.265,2.993,1.308c.435.182.586.247,3.386-2.8l1.262.016c2.895,3.09,3.043,3.03,3.466,2.859l2.759-1.115C23.288,28.644,23.44,28.583,23.265,24.381ZM11.407,17.857a4.957,4.957,0,1,1,6.488,2.824A5.014,5.014,0,0,1,11.407,17.857Z" stroke="#46494e"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-bold text-[11.5px] mb-0">Configurações</p>
        </router-link>
      </li>
    </ul>
  </div>

  <div class="w-fit flex h-screen items-start fixed z-[900] dados_nav bg-slate-50"
    :class="{ 'visivel': dados_nav_visible }">
    <ul class="menu p-[3px] h-full px-2 py-4">
      <li>
        <router-link to="/contatos" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M18 9V6M18 6V3M18 6H15M18 6H21M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
                stroke="#46494e" stroke-width="1.9440000000000002" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </g>
          </svg>
          <p class="text-zinc-700 font-semibold text-[13px] mb-0">Contatos</p>
        </router-link>
      </li>
      <li>
        <router-link to="/lances" class="p-2 flex flex-col justify-center items-center">
          <svg fill="#46494e" height="38px" width="38px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" stroke="#46494e"
            stroke-width="0.00512">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path
                    d="M475.542,203.546c-15.705-15.707-38.776-18.531-57.022-9.796L296.42,71.648c8.866-18.614,5.615-41.609-9.775-56.999 c-19.528-19.531-51.307-19.531-70.837,0L144.97,85.486c-19.529,19.529-19.529,51.307,0,70.836 c15.351,15.353,38.31,18.678,56.999,9.775l25.645,25.645L14.902,404.454c-19.575,19.574-19.578,51.259,0,70.836 c19.575,19.576,51.259,19.579,70.837,0l212.712-212.711l25.642,25.641c-8.868,18.615-5.617,41.609,9.774,57 c9.46,9.46,22.039,14.672,35.419,14.672s25.957-5.21,35.418-14.672l70.837-70.837 C495.072,254.853,495.072,223.077,475.542,203.546z M192.196,132.71c-6.51,6.509-17.103,6.507-23.613,0 c-6.509-6.511-6.509-17.102,0-23.612l70.837-70.837c6.509-6.509,17.1-6.512,23.612,0c6.51,6.51,6.51,17.102,0.001,23.612 L192.196,132.71z M62.127,451.676c-6.526,6.525-17.086,6.526-23.612,0c-6.525-6.525-6.526-17.087,0-23.612l212.712-212.712 l23.612,23.613L62.127,451.676z M227.614,144.516l11.805-11.807l35.419-35.419L392.9,215.353l-47.224,47.225L227.614,144.516z M451.931,250.772l-70.837,70.837c-6.526,6.526-17.086,6.526-23.612,0c-6.51-6.51-6.51-17.103,0-23.613l70.838-70.837 c6.524-6.526,17.086-6.525,23.611,0C458.457,233.684,458.457,244.245,451.931,250.772z">
                  </path>
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M461.691,411.822H328.12c-27.619,0-50.089,22.47-50.089,50.089v33.393c0,9.221,7.476,16.696,16.696,16.696h200.357 c9.221,0,16.696-7.476,16.696-16.696v-33.393C511.781,434.292,489.311,411.822,461.691,411.822z M478.388,478.607H311.424v-16.696 c0-9.206,7.49-16.696,16.696-16.696h133.571c9.206,0,16.696,7.49,16.696,16.696V478.607z">
                  </path>
                </g>
              </g>
            </g>
          </svg>
          <p class="text-zinc-700 font-semibold text-[13px] mb-0">Lances</p>
        </router-link>
      </li>
      <li>
        <router-link to="/simulacoes" class="p-2 flex flex-col justify-center items-center">
          <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.65573 13.3765 7.75 12 7.75C10.6235 7.75 9.75 8.65573 9.75 9.5C9.75 10.3443 10.6235 11.25 12 11.25C13.9372 11.25 15.75 12.5828 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.3443 10.6235 16.25 12 16.25C13.3765 16.25 14.25 15.3443 14.25 14.5C14.25 13.6557 13.3765 12.75 12 12.75C10.0628 12.75 8.25 11.4172 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                fill="#46494e"></path>
            </g>
          </svg>
          <p class="text-zinc-700 font-semibold text-[13px] mb-0">Simulações</p>
        </router-link>
      </li>
    </ul>
  </div>



</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      dados_nav_visible: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    }
  }
};
</script>

<style scoped>
a:hover {
  background-color: transparent !important;
}

svg {
  transition: transform 0.15s ease;
}

a:hover svg {
  transform: scale(1.1);
  filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(304deg) brightness(-199%) contrast(101%);
}

a:hover p {
  color: black;
}

a {
  text-decoration: none;
  color: black;
}

.dropdown-content {
  display: none;
}

.dropdown-content.show {
  display: block;
  /* Exibe quando a classe 'show' é aplicada */
  transition: max-height 0.3s ease-in-out;
  /* Exemplo de transição */
}

.dados_nav {
  transform: translateX(0px);
  transition: transform 0.3s ease-in;

}

.visivel {
  transform: translateX(95px);
  transition: transform 0.3s ease-out;
}
</style>
