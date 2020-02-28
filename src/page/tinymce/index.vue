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
      <editor id='tinymce' v-model='form.articleContent' :init='init'></editor>
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
import previewPic from '@/assets/images/avatar.jpg'

export default {
  name: 'index',
  data: function () {
    return {
      form: {
        articleContent: '请输入内容'
      },
      articleTitle: '',
      loginId: '',
      articleType: 2,
      articleTypeOptions: null,
      uploadUrl: process.env.BASE_API + RequestUrl.UPLOAD_IMAGE,
      options: [],
      isHidden: true,
      preview: previewPic,
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
        file_picker_types: 'image',
        // 上传图片回调
        images_upload_handler: function (blobInfo, success, failure) {
          var xhr, formData
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', process.env.BASE_API + RequestUrl.UPLOAD_IMAGE)
          formData = new FormData()
          formData.append('file', blobInfo.blob())
          xhr.onload = function (e) {
            var json
            if (xhr.status !== 200) {
              failure('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(this.responseText)

            if (!json || typeof json.location !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText)
              return
            }
            success(json.location)
            this.form.articlePic = json.location
          }
          xhr.send(formData)
        }
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
        alert(articleId)
        this.getArticleDetail(articleId)
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
      if (!this.form.articleTitle) {
        alert('请输入文章标题')
        return
      }
      if (!this.form.articleContent) {
        alert('请输入文章内容')
        return
      }
      this.form.articleCount = articleCount
      this.form.articleInfo = articleInfo
      this.form.userId = this.loginId
      let url = RequestUrl.UPLOAD_ARTICLE
      this.http.postForm(url, this.form).then(res => {
        if (res.code === '1000') {
          this.$message.success(res.message)
          this.form = {
            articleContent: '请输入内容'
          }
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
