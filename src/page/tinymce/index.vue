<template>
  <div class='tinymce'>
    <div class="css-width10 tinymce-label">
      文章标题:
    </div>
    <div class="css-width10">
      <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
    </div>
    <div class="css-width10 tinymce-label">
      文章正文:
    </div>
    <div class="css-width10">
      <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    </div>
    <div class="css-width10 tinymce-label">
      文章分类:
      <el-select v-model="articleType" placeholder="请选择">
      <el-option v-for="item in articleTypeOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    </div>
    <div class="css-width10">
    </div>
    <div class="css-width10 tinymce-label">
      <el-button type="primary" @click="uploadArticleFromServer()">发表</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import RequestUrl from '@/utils/RequestUrl'
import Constant from '@/utils/Constant'

export default {
  name: 'index',
  data: function () {
    return {
      tinymceHtml: '请输入内容',
      articleTitle: '',
      loginId: '',
      articleType: 2,
      articleTypeOptions: null,
      options: [],
      isHidden: true,
      init: {
        language_url: 'static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'static/tinymce/skins/ui/oxide',
        height: 800,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | table | link image code | removeformat',
        branding: false,
        menubar: false,
        images_upload_base_path: '',
        images_upload_credentials: false,
        automatic_uploads: false,
        images_upload_url: process.env.BASE_API + RequestUrl.UPLOAD_IMAGE,
        file_picker_types: 'image'
      }
    }
  },
  components: {
    Editor
  },
  mounted () {
    tinymce.init({})
  },
  created () {
    this.getArticleType()
  },
  methods: {
    getUserId () {
      let token = Constant.USER_ID_TOKEN
      this.loginId = this.cookie.get(token)
    },
    getArticleType () {
      let url = RequestUrl.GET_ARTICLE_TYPE
      this.http.post(url).then(res => {
        if (res.code === '1000') {
          this.articleTypeOptions = res.data
        }
      })
    },

    uploadArticleFromServer () {
      this.getUserId()
      if (this.loginId === null) {
        this.$message.warning('请先登录！')
        return
      }
      let ed = tinymce.activeEditor
      let e = ed.getBody()
      ed.selection.select(e)
      let text = ed.selection.getContent({ 'format': 'text' })
      let articleCount = text.length
      let articleInfo = text.substring(0, 100) + '...'
      if (!this.articleTitle) {
        alert('请输入文章标题')
        return
      }
      if (!this.tinymceHtml) {
        alert('请输入文章内容')
        return
      }
      let params = {
        articleContent: this.tinymceHtml,
        articleTypeId: this.articleType,
        articleTitle: this.articleTitle,
        articleCount: articleCount,
        articleInfo: articleInfo,
        userId: this.loginId
      }
      let url = RequestUrl.UPLOAD_ARTICLE
      this.http.postForm(url, params).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.articleTitle = ''
          this.tinymceHtml = ''
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .tinymce-label {
    text-align: left;
  }
  .tinymce {
    margin-bottom: 50px;
  }
  .tinymce div{
    margin-bottom: 10px;
  }
</style>
