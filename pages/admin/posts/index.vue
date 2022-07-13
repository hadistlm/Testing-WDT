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

    <MiscModal :modal-state="modalDetail" />
  </div>
</template>

<script>
import moment from 'moment'
import FormPost from '@/components/form/FormPost.vue'
import PostDetail from '@/components/admin/PostDetail.vue'

export default {
  name: 'PostPage',
  middleware: 'isAuthenticated',
  data () {
    return {
      tableConfig: {
        actionButton: {
          edit: {
            type: false,
            url: ''
          },
          delete: {
            type: false,
            url: ''
          },
          detail: {
            id: 'postDetail',
            type: 'alert',
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
      modalDetail: {
        open: false,
        id: 'postDetail',
        title: 'Post detail',
        message: PostDetail,
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
          name: 'Title',
          variable: 'title'
        },
        {
          name: 'Category',
          variable: 'category'
        },
        {
          name: 'Created Date',
          variable: 'created_at',
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
  async fetch () {
    await this.fetchData()
  },
  watch: {
    async $route (to, from) {
      await this.fetchData(this.dataPage);
    }
  },
  methods: {
    async fetchData (payload = {}) {
      const query = this.$route.query
      const resultSet = await this.$axios.get('/api/v1/post', {
        params: {
          page: !query.page ? '' : query.page,
          per_page: Object.prototype.hasOwnProperty.call(payload, 'perpage') && payload.perpage ? payload.perpage : this.dataPage.perpage,
          search: Object.prototype.hasOwnProperty.call(payload, 'search') && payload.search ? payload.search : ''
        }
      })

      this.dataPage = {
        ...this.dataPage,
        perpage: resultSet.data.paginate.perpage,
        page: resultSet.data.paginate.page,
        totalPage: resultSet.data.paginate.total_pages,
        totalData: resultSet.data.paginate.total,
        search: Object.prototype.hasOwnProperty.call(payload, 'search') && payload.search ? payload.search : ''
      }

      this.postData = resultSet.data.data.map((res) => {
        return {
          id: res.id,
          title: res.title,
          slug: res.slug,
          category: res.category,
          created_at: moment(res.created_date).format('ddd, DD MMM YYYY'),
          updated_at: moment(res.last_edited).format('ddd, DD MMM YYYY')
        }
      })
    },
    submitData (payload) {

    },
    deleteAll () {

    }
  }
}
</script>

<style scoped></style>
