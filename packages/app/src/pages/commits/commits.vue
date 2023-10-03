<template>
  <CommonPageWrapper title="提交记录" @scrolltolower="fetchCommitList">
    <view class="p-2">
      <view class="app-info">
        <image
          class="app-info-logo"
          mode="scaleToFill"
          src="@/static/logo.svg"
        ></image>
        <uni-title
          class="app-info-title"
          type="h2"
          title="HahaChat哈聊"
        ></uni-title>
        <text class="app-info-version">Version 1.0.0</text>
      </view>
      <uni-section title="Commit列表" />

      <uni-steps
        :options="listData"
        active-color="#2ac4ff"
        :active="active"
        direction="column"
      />
    </view>
    <uni-load-more v-if="isFetching" iconType="circle" status="loading" />
    <uni-load-more v-if="allCommitsLoaded" iconType="circle" status="no-more" />
  </CommonPageWrapper>
</template>

<script setup>
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import { Octokit } from "@octokit/core";
import { ref } from "vue";

const listData = ref([]);

let commitPage = 1; // 分页
const isFetching = ref(false);
const pageSize = Number(import.meta.env.VITE_GITHUB_COMMITS_PAGE_SIZE);
const allCommitsLoaded = ref(false); // 是否已经全部拉取
const active = ref(1);

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_OPEN_API_TOKEN,
});
function fetchCommitList() {
  if (allCommitsLoaded.value || isFetching.value) return;
  isFetching.value = true;
  octokit
    .request("GET /repos/iovitz/hahachat/commits", {
      page: commitPage++,
      per_page: pageSize,
    })
    .then(({ data, status }) => {
      isFetching.value = false;
      if (!status === 200) {
        return;
      }
      // 是否拉取全部commits
      if (data.length < pageSize) allCommitsLoaded.value = true;

      const result = data.map(({ commit }) => {
        return {
          title: commit.message,
          desc: `(${commit.committer.name}) - ${commit.committer.date}`,
        };
      });
      listData.value.push(...result);
    });
}
fetchCommitList();

// console.log(res);
</script>

<style lang="scss" scoped>
.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100upx 40upx;
  .app-info-logo {
    height: 140upx;
    width: 140upx;
  }
  .app-info-title {
    color: #333333;
  }
  .app-info-version {
    font-size: 24upx;
  }
}
</style>
