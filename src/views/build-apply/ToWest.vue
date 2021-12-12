<template>
  <div class="to-west">
    <div class="info-message">
      <div class="info-title">四至</div>
      <div class="info-form">
        <van-form label-width="35%" @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="form.value1" label="东至" placeholder="东至" />
            <van-field
              v-model="form.value2"
              name="西至"
              label="西至"
              placeholder="西至"
            />
            <van-field v-model="form.value3" label="南至" placeholder="南至" />
            <van-field v-model="form.value4" label="北至" placeholder="北至" />
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="footer_btn">
      <div>
        <van-button block @click="toCancel">取消</van-button>
      </div>
      <div>
        <van-button block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// import { useRouter } from "vue-router";
// import { Toast } from "vant";
export default {
  setup() {
    // const router = useRouter();
    const form = reactive({});
    return {
      form,
    };
  },
};
</script>

<style lang="less" scoped>
.to-west {
  background-color: #f6fbfa;
  font-family: Microsoft YaHei;
  overflow: auto;
}
.info-message {
  background: #ffffff;
  border-radius: 15px;
  margin: 20px;
  .info-title {
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #2e3f6a;
    border-bottom: 1px solid #dee1eb;
  }
}
.footer_btn {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  div {
    width: 48%;
  }
}
</style>