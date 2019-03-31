<template>
  <div>
    <el-button :plain="true"></el-button>
    <el-button :plain="true"></el-button>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel>
                  <el-carousel-item v-for="(item,index) in imglist" :key="index" class="slider">
                    <img :src="item.thumb_path" alt class="sliderimg" width="100%">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{det.goodsinfo.title}}</h1>
                <p class="subtitle">{{det.goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{det.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{det.goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{det.goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="num1"
                          @change="handleChange"
                          :min="1"
                          :max="10"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{det.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" @click="index=1" :class="{selected:index==1}">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="index=2" :class="{selected:index==2}">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry"
                style="display: block;"
                v-html="det.goodsinfo.content"
                v-show="index==1"
              ></div>
              <div class="tab-content" style="display: block;" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model="text"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postComment"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentList">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | glformatTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalcount"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in det.hotgoodslist">
                    <div class="img-box">
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                      <span>{{item.add_time | glformatTime('YYYY年MM月DD日')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      det: {},
      index: 1,
      num1: 1,
      imglist: [],
      pageIndex: 1,
      pageSize: 10,
      commentList: [],
      totalcount: 0,
      text: ""
    };
  },
  methods: {
    //评论失败弹出的事件
    open4() {
      this.$message.error("评论失败了");
    },
    //上传成功跳出弹窗事件
    open2() {
      this.$message({
        message: "评论成功",
        type: "success"
      });
    },
    //插件提供的页码和页码容量改变的事件
    handleSizeChange(v1) {
      this.pageSize = v1;
      this.route();
    },
    handleCurrentChange(v1) {
      this.pageIndex = v1;
      this.route();
    },
    handleChange(value) {
      console.log(value);
    },
    //创建一个获取评论的方法
    getcomments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.commentList = res.data.message;
          this.commentList.push(this)
          this.totalcount = res.data.totalcount;
          console.log(this.commentList);

        });
    },
    //创建一个提交评论的方法
    postComment() {
      this.$axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
  "commenttxt":this.text  
}
)
        .then(res => {
          console.log(res);
          
          if (res.status == 200) {
              console.log("hhh ");
              
            this.open2();
            this.pageIndex = 1;
            this.pageSize = 5;
            this.getcomments();
            this.text = "";
          } else {
            this.open4();
          }
        });
    },
    route() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
            this.$route.params.id
          }`
        )
        .then(res => {
          this.det = res.data.message;
          this.imglist = this.det.imglist;
        });
    }
  },
  //侦听变化
  watch: {
    $route: function() {
      this.route();
      this.getcomments();
    }
  },
  created() {
    this.getcomments();
    this.route();
  }
};
</script>

<style>
.pic-box {
  width: 395px;
}
.pic-box el-carousel {
  width: 100%;
}
.pic-box el-carousel el-carousel-item {
  width: 100%;
}
</style>
