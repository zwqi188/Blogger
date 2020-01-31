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
        :label="item.articleTypeName"
        :value="item.articleTypeName">
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
import Header from '@/components/layout/Header'
import Aside from '@/components/layout/aside'
import RequestUrl from '@/utils/RequestUrl'
import HTTP from '@/utils/HttpUtils'

export default {
  name: 'index',
  data: function () {
    return {
      tinymceHtml: '请输入内容',
      articleTitle: '',
      articleType: 2,
      articleTypeOptions: [],
      options: [{'label': '生活剪影', 'value': 2}, {'label': '学习笔记', 'value': 1}, {'label': '福利专区', 'value': 3}],
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
        images_upload_url: RequestUrl.SERVER_ADDRESS + RequestUrl.UPLOAD_IMAGE,
        file_picker_types: 'image'
      }
    }
  },
  components: {
    Editor,
    'v-header': Header,
    'v-aside': Aside
  },
  mounted () {
    tinymce.init({})
  },
  created () {
    this.getArticleType()
  },
  methods: {
    getArticleType: function () {
      HTTP.post(RequestUrl.GET_ARTICLE_TYPE, {}, response => {
        console.log('hihi' + JSON.stringify(response))
        if (response.respCode === '1000') {
          this.articleTypeOptions = response.data
          console.log('---' + JSON.stringify(this.articleTypeOptions))
        }
      })
    },

    uploadArticleFromServer: function () {
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
        articleType: this.articleType,
        articleTitle: this.articleTitle,
        masterId: 1
      }
      console.log(params)
      HTTP.post(RequestUrl.UPLOAD_ARTICLE, params, response => {
        if (response.status >= 200 && response.status < 300) {
          alert(response.data)
        } else {
          alert(response.message)
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
