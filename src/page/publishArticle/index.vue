<template>
  <div class='tinymce'>
    <div class="css-width10 tinymce-label upload-pic">
      <div class="css-width1">文章标题:<span class="span-must">*</span></div>
      <div class="css-width9"><el-input v-model="form.articleTitle" placeholder="请输入文章标题"></el-input></div>
    </div>
    <div class="css-width10 tinymce-label">
      文章正文:<span class="span-must">*</span>
    </div>
    <div class="css-width10">
      <v-markDown v-model="content"></v-markDown>
    </div>
    <div class="css-width10 tinymce-label upload-pic">
      <div class="css-width1">封面图:</div>
      <div class="css-width9">
        <el-upload :action = "uploadUrl"
                   accept="image/jpeg,image/gif,image/png" list-type="picture-card"
                   :on-success="handlePictureUploadSucc" :limit="1" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" alt="">
        </el-dialog>
      </div>
    </div>
    <div class="css-width10 tinymce-label upload-pic">
      <div class="css-width1">文章分类:<span class="span-must">*</span></div>
      <div class="css-width9">
        <el-select v-model="form.articleTypeId" placeholder="请选择">
          <el-option v-for="item in articleTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="css-width10 tinymce-label">
      <el-button type="primary" @click="uploadArticleFromServer()">发表</el-button>
    </div>
  </div>
</template>

<script>
import markDown from '@/components/markdown/index'
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'

export default {
  name: 'index',
  data: function () {
    return {
      form: {
      },
      content: ''
    }
  },
  components: {
    'v-markDown': markDown
  },
  mounted () {
    this.getArticleType()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    getArticleDetail (articleId) {
      // 将数据放在当前组件的数据内
      let params = {
        articleId: articleId
      }
      let url = RequestUrl.GET_ARTICLE_DETAIL
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.form = res.data.articleDetail
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getArticleType () {
      let url = RequestUrl.GET_ARTICLE_TYPE
      this.http.post(url).then(res => {
        if (res.code === '1000') {
          this.articleTypeOptions = res.data
        }
        let articleId = this.$route.query.article_id
        if (articleId) {
          this.getArticleDetail(articleId)
        }
      })
    },
    uploadArticleFromServer () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      // let ed = TinyMce.activeEditor
      // let e = ed.getBody()
      // ed.selection.select(e)
      // let text = ed.selection.getContent({ 'format': 'text' })
      let articleCount = this.content.length
      let articleInfo = this.content.substring(0, 100) + '...'
      if (!this.form.articleTitle) {
        alert('请输入文章标题')
        return
      }
      if (!this.content) {
        alert('请输入文章内容')
        return
      }
      this.form.articleContent = this.content
      this.form.articleCount = articleCount
      this.form.articleInfo = articleInfo
      this.form.userId = this.loginId
      let url = RequestUrl.UPLOAD_ARTICLE
      this.http.postForm(url, this.form).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.form = {}
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureUploadSucc (file) {
      this.form.articlePic = file.location
    }
  }
}
</script>

<style scoped>
  .span-must {
    color: red;
  }
  .tinymce-label {
    text-align: left;
  }
  .tinymce {
    margin-bottom: 50px;
  }
  .tinymce div{
    margin-bottom: 10px;
  }
  .upload-pic div {
    float: left;
  }
</style>
