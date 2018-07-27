<template lang=''>
<div class="totalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <span class="headingTitle">페이퍼 올리기 | </span>
      <span class="essential"> *필수 항목</span>
    </div>
    <div class="categoryWrapper">
      <span class="categoryHeading">카테고리 </span>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" >리크루팅</label>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" >설문 조사</label>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <form-wrapper type="text" :margin="true" title="제목" placeholder="제목을 입력하세요." :content.sync="title" ></form-wrapper>
      <form-wrapper type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content.sync="time" ></form-wrapper>
      <form-wrapper type="text" :textarea="true" :margin="true" title="페이퍼 설명(1500자 이내)" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content.sync="explaination" ></form-wrapper>
    </div>
    <div class="column">
      <form-wrapper type="text" :margin="true" title="URL(자보, 아라)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content.sync="url" ></form-wrapper>
      <mini-view></mini-view>
    </div>
  </div>
</div>
</template>
<script>
import FormWrapper from '@/components/FormWrapper';
import MiniView from '@/components/MiniView.vue';

export default {
  data () {
    return {
      selectedCategory: "",
      title: "",
      explaination: "",
      time: "",
      url: ""
    }
  },
  components: {
    FormWrapper,
    MiniView
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include marginPage();
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    &:first-child {
      align-items: center;
      .headingWrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .headingTitle {
          font-size: $big-font-size;
          font-weight: $big-font-weight;
        }
        .essential {
          font-size: $normal-font-size;
          color: $essential-color;
          margin-left: 5px;
        }
      }
      .categoryWrapper {
        margin-left: 40px;
        .categoryHeading {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
        }
        .radio {
          margin-left: 15px;
        }
        .label {
          font-size: $normal-font-size;
        }
      }
    }
    &:last-child {
      .column {
        &:first-child {
          flex: 3;
          margin-right: 80px;
        }
        &:last-child {
          flex: 2;
        }
        .formWrapper {
          .formTitle {
          }
        }
      }
    }
  }
}
</style>
