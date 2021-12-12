<template>
  <div class="apply-base">
    <div class="apply-header">
      <div class="header-icon">3</div>
      <div class="header-title">现宅基地情况</div>
      <div class="header-page">3/5</div>
    </div>
    <div class="info-message">
      <div class="info-title">现宅基地及农房情况</div>
      <div class="info-form">
        <van-form label-width="40%">
          <van-cell-group inset>
            <van-field
              v-model="form.homesteadArea"
              label="宅基地面积"
              placeholder="宅基地面积"
              clearable
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.preCapitaHomesteadArea"
              label="人均宅基地面积"
              placeholder="人均宅基地面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.certOwnershipNo1"
              label="权属证书号"
              placeholder="权属证书号"
            >
            </van-field>
            <van-field
              v-model="form.constructionArea"
              label="建筑面积"
              placeholder="建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.preCapitaConstructionArea"
              label="人均建筑面积"
              placeholder="人均建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.certOwnershipNo2"
              label="权属证书号"
              placeholder="权属证书号"
            >
            </van-field>
            <van-field label="现宅基地处置情况" label-width="100%"></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group
                  v-model="form.presentHomesteadDisposalCase"
                  direction="horizontal"
                >
                  <van-radio name="1">保留</van-radio>
                  <van-radio name="2">退还村集体</van-radio>
                  <van-radio name="3">其他</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="info-message">
      <div class="info-title">拟申请宅基地及建房情况</div>
      <div class="info-form">
        <van-form label-width="45%">
          <van-cell-group inset>
            <van-field
              v-model="form.proposedLocationAddress"
              label="拟建位置"
              placeholder="拟建位置"
            >
            </van-field>
            <van-field
              v-model="form.proposedHomesteadArea"
              label="拟建宅基地面积"
              placeholder="拟建宅基地面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedEastTo"
              label="东至"
              placeholder="东至"
            >
            </van-field>
            <van-field
              v-model="form.proposedWestTo"
              label="西至"
              placeholder="西至"
            >
            </van-field>
            <van-field
              v-model="form.proposedSouthTo"
              label="南至"
              placeholder="南至"
            >
            </van-field>
            <van-field
              v-model="form.proposedNorthTo"
              label="北至"
              placeholder="北至"
            >
            </van-field>
            <!-- <van-field
              v-model="form.value3"
              readonly
              label="四至"
              placeholder="四至"
              @click="toWest"
            >
              <template #extra>
                <van-icon class="form-icon" name="arrow" size="20" />
              </template>
            </van-field> -->
            <van-field
              v-model="form.proposedConstructionLandArea"
              label="建设用地"
              placeholder="建设用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedUnusedArea"
              label="未利用地"
              placeholder="未利用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedAgriculturalLandArea"
              label="农用地"
              placeholder="农用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedArableLand"
              label="耕地"
              placeholder="耕地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedWoodlandArea"
              label="林地"
              placeholder="林地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedConstructionArea"
              label="建筑面积"
              placeholder="建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.proposedBuildingStorey"
              label="建筑层数"
              placeholder="建筑层数"
            >
            </van-field>
            <van-field
              v-model="form.proposedBuildingHeight"
              label="建筑高度"
              placeholder="建筑高度"
            >
            </van-field>
            <van-field label="设计图纸"></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group
                  v-model="form.proposedDesignType"
                  direction="horizontal"
                >
                  <van-radio name="1">委托设计</van-radio>
                  <van-radio name="2">选通用图</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              label="是否征求相邻权利人意见"
              label-width="100%"
            ></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group
                  v-model="form.isSeekNeighboursOpinion"
                  direction="horizontal"
                >
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <van-button block to="" @click="goBack">上一步</van-button>
      </div>
      <div>
        <van-button block @click="onSubmit">保存</van-button>
      </div>
      <div>
        <van-button block type="primary" @click="goNext">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import $localStorage from "@/utils/localStorage.js";
export default {
  setup() {
    const router = useRouter();
    const form = reactive({});
    const state = reactive({
      homesteadForm: {},
    });
    onMounted(() => {
      init();
    });
    const init = async () => {
      state.homesteadForm = JSON.parse($localStorage.get("homesteadForm"));
      console.log(state.homesteadForm);
      if (state.homesteadForm) {
        // state.homesteadForm = form;
        form.homesteadArea = state.homesteadForm.homesteadArea;
        form.preCapitaHomesteadArea =
          state.homesteadForm.preCapitaHomesteadArea;
        form.certOwnershipNo1 = state.homesteadForm.certOwnershipNo1;
        form.constructionArea = state.homesteadForm.constructionArea;
        form.preCapitaConstructionArea =
          state.homesteadForm.preCapitaConstructionArea;
        form.certOwnershipNo2 = state.homesteadForm.certOwnershipNo2;
        form.presentHomesteadDisposalCase =
          state.homesteadForm.presentHomesteadDisposalCase;
        form.proposedLocationAddress =
          state.homesteadForm.proposedLocationAddress;
        form.proposedHomesteadArea = state.homesteadForm.proposedHomesteadArea;
        form.proposedEastTo = state.homesteadForm.proposedEastTo;
        form.proposedWestTo = state.homesteadForm.proposedWestTo;
        form.proposedSouthTo = state.homesteadForm.proposedSouthTo;
        form.proposedNorthTo = state.homesteadForm.proposedNorthTo;
        form.proposedConstructionLandArea =
          state.homesteadForm.proposedConstructionLandArea;
        form.proposedUnusedArea = state.homesteadForm.proposedUnusedArea;
        form.proposedBuildingStorey =
          state.homesteadForm.proposedBuildingStorey;
        form.proposedBuildingHeight =
          state.homesteadForm.proposedBuildingHeight;
        form.proposedDesignType = state.homesteadForm.proposedDesignType;
        form.isSeekNeighboursOpinion =
          state.homesteadForm.isSeekNeighboursOpinion;
        form.proposedAgriculturalLandArea = state.homesteadForm.proposedAgriculturalLandArea
        form.proposedArableLand = state.homesteadForm.proposedArableLand
        form.proposedWoodlandArea = state.homesteadForm.proposedWoodlandArea
        form.proposedConstructionArea = state.homesteadForm.proposedConstructionArea
      } else {
        state.homesteadForm = {};
      }
    };
    const onSubmit = () => {
      console.log("onSubmit");
      Toast.success("保存到草稿箱");
    };
    const goNext = () => {
      saveLocal();
      const data = $localStorage.get('homesteadForm')
      console.log(data)
      router.push({
        path: "/build-apply/build-info",
      });
    };
    const goBack = () => {
      saveLocal();
      $localStorage.set("homesteadForm", JSON.stringify(state.homesteadForm));
      router.push({
        path: "/build-apply/apply-info",
      });
    };
    const saveLocal = () => {
      state.homesteadForm.homesteadArea = form.homesteadArea;
      state.homesteadForm.preCapitaHomesteadArea = form.preCapitaHomesteadArea;
      state.homesteadForm.certOwnershipNo1 = form.certOwnershipNo1;
      state.homesteadForm.constructionArea = form.constructionArea;
      state.homesteadForm.preCapitaConstructionArea =
        form.preCapitaConstructionArea;
      state.homesteadForm.certOwnershipNo2 = form.certOwnershipNo2;
      state.homesteadForm.proposedLocationAddress =
        form.proposedLocationAddress;
      state.homesteadForm.proposedHomesteadArea = form.proposedHomesteadArea;
      state.homesteadForm.proposedEastTo = form.proposedEastTo;
      state.homesteadForm.proposedWestTo = form.proposedWestTo;
      state.homesteadForm.proposedSouthTo = form.proposedSouthTo;
      state.homesteadForm.proposedNorthTo = form.proposedNorthTo;
      state.homesteadForm.proposedConstructionLandArea =
        form.proposedConstructionLandArea;
      state.homesteadForm.proposedBuildingStorey = form.proposedBuildingStorey;
      state.homesteadForm.proposedBuildingHeight = form.proposedBuildingHeight;
      state.homesteadForm.proposedDesignType = form.proposedDesignType;
      state.homesteadForm.isSeekNeighboursOpinion =
        form.isSeekNeighboursOpinion;
      state.homesteadForm.presentHomesteadDisposalCase =
        form.presentHomesteadDisposalCase;
      state.homesteadForm.proposedUnusedArea = form.proposedUnusedArea;
      state.homesteadForm.proposedAgriculturalLandArea = form.proposedAgriculturalLandArea;
      state.homesteadForm.proposedArableLand = form.proposedArableLand
      state.homesteadForm.proposedWoodlandArea = form.proposedWoodlandArea
      state.homesteadForm.proposedConstructionArea = form.proposedConstructionArea
      $localStorage.set("homesteadForm", JSON.stringify(state.homesteadForm));
    };
    const toWest = () => {
      router.push({
        path: "/build-apply/to-west",
      });
    };
    return {
      form,
      ...toRefs(state),
      onSubmit,
      goNext,
      goBack,
      toWest,
    };
  },
};
</script>

<style lang="less" scoped>
.apply-base {
  background-color: #f6fbfa;
  overflow: auto;
  font-family: Microsoft YaHei;
}
.apply-header {
  display: flex;
  .header-icon {
    // flex: 1 0;
    margin: 18px;
    width: 45px;
    height: 45px;
    background: #3487f6;
    border-radius: 50%;
    font-size: 27px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 45px;
  }
  .header-title {
    flex: 4 0;
    font-size: 26px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #252d42;
    line-height: 80px;
  }
  .header-page {
    flex: 1 0;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #252d42;
    line-height: 80px;
  }
}
.info-message {
  background: #ffffff;
  border-radius: 15px;
  margin: 0 20px 20px 20px;
  .info-title {
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #2e3f6a;
    border-bottom: 1px solid #dee1eb;
  }
  .info-form {
    padding-bottom: 10px;
  }
  .info-header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 18px;
      font-weight: bold;
      color: #2e3f6a;
    }
    .right {
      font-size: 16px;
      font-weight: 400;
      color: #3487f6;
    }
  }
  .info-user {
    padding-bottom: 20px;
  }
  .form-icon {
    margin-top: 5px;
  }
}
.footer-btn {
  margin: 30px;
  display: flex;
  div {
    width: 100%;
    margin-right: 10px;
  }
}
</style>