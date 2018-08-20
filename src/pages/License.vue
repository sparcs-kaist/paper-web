<template lang=''>
  <div class="totalWrapper">
    <div class="contentWrapper">License</div>
    <div class="content">
      <div class="singleWrapper">
    <div class="singleTitle">ZURB In Tutorial</div>
    <div class="singleContent">====</div>

<div class="singleContent">Joyride was made by [ZURB](http://www.zurb.com), a product design company in Campbell, CA.</div>

<div class="singleContent">If Joyride knocks your socks off the way we hope it does and you want more, why not check out [our jobs](http://www.zurb.com/talent/jobs)?</div>
</div>

<div class="singleWrapper">
<div class="singleTitle">MIT Open Source License</div>
<div class="singleContent">=======================</div>

<div class="singleContent">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</div>

<div class="singleContent">The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</div>

<div class="singleContent">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</div>
</div>
</div>
</div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.totalWrapper {
  @include footerTabs();
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  .contentWrapper {
    font-size: $big-font-size;
    margin-bottom: 20px;
    font-weight: $big-font-weight;
  }
  .content {
    text-align: center;
    .contentTitle {
      font-size: $h1-font-size;
      margin-bottom: 10px;
      font-weight: $big-font-weight;
    }
    .singleWrapper {
      margin-bottom: 20px;
      .singleTitle {
        font-size: $h1-font-size;
        margin-bottom: 5px;
        color: $red-color;
        font-weight: $big-font-weight;
      }
      .singleContent {
        font-size: $normal-font-size;
      }
    }
  }
}
</style>
