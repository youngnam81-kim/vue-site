<template>
  <div class="project-links">
    <h2>AI 풀스택 교육 과정 프로젝트 목록</h2>

    <table id="projectTable">
      <thead>
        <tr>
          <th>이름</th>
          <!-- <th>html2507</th>
          <th>js2507</th>
          <th>test2508</th> -->
          <th>react-site</th>
          <th>react2508</th>
          <th>vue-site</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projectData" :key="item.name">
          <td>{{ formatName(item.name) }}</td>
          <!-- <td v-for="i in 3" :key="i + 3">
            <a v-if="item['link' + i + 3]" :href="generateUrl(getGithubUsername(item.name), item['link' + i + 3])"
              target="_blank">
              {{ item['link' + i + 3] }}
            </a>
            <span v-else>-</span>
          </td> -->

          <td v-for="i in 3" :key="i + 3">
            <a v-if="item['link' + (i + 3)]" :href="generateUrl(getGithubUsername(item.name), item['link' + (i + 3)])"
              target="_blank">
              {{ item['link' + (i + 3)] }}
            </a>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProjectLinks',
  data() {
    return {
      projectData: [
        {
          "name": "수업예제/skc4365",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "김지수/kjs-alt",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이주환/goentvy",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "김가빈/gdbin1",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "김동현/dongdong-byte",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "김명횡/kimmh74",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "나유진/nayujin-svg",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "박근철/parkote9212",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "박창일/crist-17",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "심성보/simsbgit",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이경진/kungjin",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이유채/dbco0409",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이은정/lej9310",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이정재/onwardjake",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이정현/dnjsgur32-lang",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "이지민/elona52",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "임승우/lsw1232414",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "장경건/gxnny19",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "정희찬/huch99",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "최윤아/lejardindeyuna",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "최지현/jihyeon1011",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        },
        {
          "name": "김영남/youngnam81-kim",
          "link1": "html2507",
          "link2": "js2507",
          "link3": "test2508",
          "link4": "react-site",
          "link5": "react-test2508",
          "link6": "vue-site"
        }
      ]
    };
  },
  methods: {
    formatName(name) {
      const parts = name.split('/');
      const displayName = parts[0];
      const githubUsername = parts.length > 1 ? parts[1] : displayName;
      // return `${displayName} (${githubUsername})`;
      return `${displayName}`;
    },
    getGithubUsername(name) {
      const parts = name.split('/');
      return parts.length > 1 ? parts[1] : parts[0];
    },
    generateUrl(username, repo) {
      return `https://${username}.github.io/${repo}/`;
    }
  }
}
</script>

<style scoped>
/* 테이블 스타일링은 여기에 추가하시면 됩니다 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #eeeeee;
  cursor: pointer;
}

a {
  color: #282247;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;

}

h1 {
  margin-bottom: 1.5rem;
}
</style>