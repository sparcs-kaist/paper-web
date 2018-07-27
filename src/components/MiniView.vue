<template>
  <div class="viewWrapper">
    <div v-if="miniview" class="yesMiniView">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="ListWrapper"
      ></v-progress-circular>
      <div class="miniViewTotalWrapper" v-else>
        <div class="posterWrapper" @click="gotoZabo">
          <img class="posterImage" :src="posterImage">
          <div class="posterOverlay">
            <v-icon>mdi-heart</v-icon>{{likeCount}}
          </div>
        </div>
        <div class="explainationWrapper">
          <div class="author">
            <img class="profileImage" :src="profileImage">
            <span class="authorSpan">{{nickName}}</span>
          </div>
          <div class="explainationTitle">제목: {{title}}</div>
          <div class="category">카테고리: {{category}}</div>
          <div class="explainationLocation">장소: {{location}}</div>
          <div class="explainationContent">{{content}}</div>
        </div>
      </div>
    </div>
    <div v-else class="noMiniView">
      <span>
        페이퍼에 해당하는 자보 게시물의 URL을<br /> 올려주시면 자동으로 미니뷰가 생성됩니다.
      </span>
    </div>
  </div>
</template>
<script>
import axios from '@/axios-auth';

export default {
  props: {
    url: String
  },
  computed: {
    miniview () {
      var expUrl = /^http[s]?\:\/\/zabo.sparcs.org\/zabo\//;
      return expUrl.test(this.url)
    }
  },
  data() {
    return {
      profileImage: "",
      posterImage: "",
      header: "",
      location: "",
      explaination: "",
      category: "",
      title: "",
      nickName: "",
      content: "",
      likeCount: 0,
      loading: true
    }
  },
  mounted () {
    if (this.miniview) {
      let zabo = this.url.split('/');
      let zaboId = zabo[zabo.length-1];
      axios.get('http://ssal.sparcs.org:16133/api/zaboes/'+zaboId).then(res => {
        const {title, category, author: {nickName, profile_image}, content, location, posters, like_count, link_url} = res.data
        this.category = category;
        this.title = title;
        this.profileImage = profile_image;
        this.nickName = nickName;
        this.content = content;
        this.location = location;
        this.posterImage = posters[0].image_thumbnail
        this.likeCount = like_count;
        this.loading = false;
      })
    }
  },
  methods: {
    gotoZabo () {
      window.location.replace(this.url)
    }
  },
  watch: {
    miniview (val) {
      if (val) {
        let zabo = this.url.split('/');
        let zaboId = zabo[zabo.length-1];
        axios.get('http://ssal.sparcs.org:16133/api/zaboes/'+zaboId).then(res => {
          const {title, category, author: {nickName, profile_image}, content, location, posters, like_count, link_url} = res.data
          this.category = category;
          this.title = title;
          this.profileImage = profile_image;
          this.nickName = nickName;
          this.content = content;
          this.location = location;
          this.posterImage = posters[0].image_thumbnail
          this.likeCount = like_count;
          this.loading = false;
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.yesMiniView{
  margin-top: 12px;
  @include smallBoxShadow();
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .miniViewSpan {
    font-size: $big-font-size;
  }
  .miniViewTotalWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
    .posterWrapper {
      position: relative;
      width: 200px;
      height: 250px;
      cursor: pointer;
      .posterOverlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $big-font-size;
        color: transparent;
        z-index: 20;
        background-color: transparent;
        transition: all .2s ease-in-out;
      }
      &:hover {
        .posterOverlay {
          color: white;
          background-color: $transparent-black-dark;
        }
      }
      .posterImage {
        position: absolute;
        width: 100%;
        height: 250px;
      }
    }
    .explainationWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-left: 10px;
      flex: 1;
        .author {
          display: flex;
          width: 100%;
          align-items: center;
          .profileImage {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
          .authorSpan {
            font-size: $normal-font-size;
            font-weight: $big-font-weight;
            margin-left: 10px;
          }
        }
        .explainationTitle {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
          margin-top: 8px;
        }
        .category {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
          margin-top: 8px;
        }
        .explainationLocation {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
          margin-top: 8px;
        }
        .explainationContent {
          font-size: $normal-font-size;
          margin-top: 8px;
        }
      }
  }
}
.noMiniView {
  margin-top: 12px;
  @include smallBoxShadow();
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>