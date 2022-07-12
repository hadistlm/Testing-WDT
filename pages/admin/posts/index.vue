<template>
  <div class="h-193px bg-orange-brand pt-35px relative rounded-bl-56px rounded-br-56px relative z-20">
    <MiscHeaderBox
      icon="page-post.png"
      title="Post management"
      message="This page you will be able to configure and managing some of your blog post information and their comments, and listing data with pagination and modal info"
    />

    <MiscDataTable
      class="mt-4"
      title="Blog post"
      :config="tableConfig"
      :data-page="dataPage"
      :header-column="headerData"
      :datasets="postData"
      @onchanged="fetchData"
      @deleteBatch="deleteAll"
    />

    <MiscModal
      :modal-state="modalState"
      @onchanged="submitData"
    />
  </div>
</template>

<script>
import FormPost from '@/components/form/FormPost.vue'

export default {
  middleware: 'isAuthenticated',
  data () {
    return {
      tableConfig: {
        actionButton: {
          edit: {
            type: 'alert',
            url: ''
          },
          delete: {
            type: 'alert',
            url: ''
          },
          detail: {
            type: false,
            url: ''
          }
        },
        searchButton: true,
        createButton: {
          id: 'postForm',
          type: 'modal',
          text: ''
        },
        perpageButton: true,
        deleteBulk: true
      },
      modalState: {
        open: false,
        id: 'postForm',
        title: 'Post form',
        message: FormPost,
        buttons: {
          right: {
            show: true,
            type: 'secondary',
            text: 'Close'
          },
          left: {
            type: 'success',
            text: 'Submit'
          }
        }
      },
      headerData: [
        {
          name: 'Word',
          variable: 'word'
        },
        {
          name: 'Created Date',
          variable: 'created_at',
          block: true
        },
        {
          name: 'Updated Date',
          variable: 'updated_at',
          block: true
        }
      ],
      postData: [],
      dataPage: {
        listperpage: [10, 25, 50, 100],
        search: '',
        perpage: 10,
        totalPage: 1,
        totalData: 0,
        page: 1
      }
    }
  },
  methods: {
    fetchData (payload = {}) {

    },
    submitData (payload) {

    },
    deleteAll () {

    }
  }
}
</script>

<style scoped></style>
