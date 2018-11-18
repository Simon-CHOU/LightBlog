<template>
	<div class="comments-item">
		<div class="pull-left">
			<img class="avatar-32" src="https://cn.vuejs.org/images/logo.png" alt="" v-if="avatar" @click="handleClickAvatar">
		</div>
		<div class="comments-box">
			<div class="comments-trigger">
				<strong><a target="_blank" href="javascript:void(0)" @click="handleClickAuthor">{{author}}</a></strong>
				<span class="comments-date">{{time}}</span>
			</div>
			<div class="comments-content">
				<p>{{content}}</p>
			</div>
			<div class="reply-list" v-show="true">
				<div v-for='(v,i) in comments' :key = i>
					<hr v-if='i>0'>
					<div class="comments-trigger">
						<strong><a target="_blank" href="javascript:void(0)" @click="handleClickAuthor">{{v.author}}</a></strong>
						<span class="comments-date">{{v.time}}</span>
					</div>
					<div class="comments-content">
						<p>{{v.content}}</p>
					</div>
					
				</div>
			
				
			</div>

			<div class="comment_form">
            <form action="index.html" @submit.prevent="comment" class="contact">

                 <p v-if="form.errors.length && show">
                    <b>Please correct the following error(s):</b>
                    <br/>
                    <ul><li v-for="(err,i) in form.errors" :key = i>{{ err }}</li></ul>
                </p><br v-if="form.errors.length && show">

				
                <p class="contact-input" v-if="show">
                    <input v-model="form.name" placeholder="Your Name…" >
                </p> <br v-if="show">

                <p class="contact-input" v-if="show">
                    <textarea  v-model="form.content" placeholder="Your Message…"></textarea>
                </p><br v-if="show">


                <button class="comment_button" type="submit">评论</button>
            </form>
        </div>
		
		</div>
		
	</div>
</template>

<script>

export default {
  name: 'CommentsItem',
   props: ["blogId","commentId","author","time","content", 'comments','replyStatus','replyId'],
  data () {
	return {
	   avatar: 'String',
	   form:{
			name:"",
			content:"",
			errors:[]
    	},
	}
  },
  mounted:function(){
  },
  computed: {
	  show:function(){
		  let show = (this.replyStatus && this.replyId == this.commentId);
		  if(!show){
			  this.errors = [];
			  this.form = {name:"",content:"",errors:[]}
		  }
		  	
		  return show;
	  }
  },
  methods: {
	handleClickAvatar (event) {
	  event.stopPropagation()
	  this.$emit('clickAvatar', this)
	},
	handleClickAuthor (event) {
	  event.stopPropagation()
	  this.$emit('clickAuthor', this)
	},
	comment:function(){
		 if(!(this.replyStatus && this.replyId == this.commentId)){
				this.$router.app.$emit('changeReply',{commentId:this.commentId,turn:true})
                return;
            }
            this.form.errors = [];

            if (!this.form.name) 
                this.form.errors.push('Name required.');
            
            if (!this.form.content) 
                this.form.errors.push('Content required.');
            
            if(this.form.errors.length>0)
                return;

            /** 添加回复 */
			$.ajax({
				type: "POST",
				url: "/api/addReply",
				data:{
					blogId:this.blogId,
					commentId:this.commentId,
                    name:this.form.name,
                    content:this.form.content
				},
				success: (data) => {
					if( data instanceof Object)
						_self.blogs = data;
					console.log(data);
				}
			});

            this.form = {name:"",content:"",errors:[]}
            this.$router.app.$emit('updateComment');
	}
  },
  filters: {
	filterTime (value) {
	  if (!value) {
		return '未知时间'
	  }
	  if (Object.prototype.toString.call(value) === '[object String]') {
		return value
	  }
	  if (value === '' || isNaN(value)) {
		return '未知时间'
	  }
	  if (value <= 0) {
		return '未知时间'
	  }
	  if (value < 10000000000) {
		value *= 1000
	  }
	  let time = new Date(value)
	  let tY = time.getFullYear()
	  let tM = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
	  let tD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
	  let th = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
	  let tm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
	  let ts = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
	  let now = new Date()
	  let nY = now.getFullYear()
	  let nM = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
	  let nD = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
	  let result = ''
	  if (tY !== nY) {
		result += tY + '年'
	  }
	  if (tM !== nM || tD !== nD) {
		result += tM + '月'
		result += tD + '日'
	  }
	  if (result === '') {
		result = th + ':' + tm + ':' + ts
	  }
	  return result
	}
  }
}
</script>

<style scoped>
img {
  border: 0;
  vertical-align: middle;
}
.ml10 {
  margin-left: 10px !important;
}
.ml15 {
  margin-left: 15px !important;
}
.comments-item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0,0,0,0.09);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  font-size: 14px;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.avatar-32 {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comments-item a {
  color: #009a61;
  text-decoration: none;
  background: transparent;
}
.comments-item a:hover,
.comments-item a:active,
.comments-item a:focus {
  outline: 0;
}
.comments-box {
  padding-left: 47px;
}
.comments-box strong {
  font-weight: bold;
}
.comments-trigger {
  margin-bottom: 10px;
  color: #999;
  font-size: 13px;
}
.comments-option {
  /*visibility: hidden;*/
}
.comments-content {
  line-height: 1.6;
  word-wrap: break-word;
  margin-bottom: 10px !important;
}
.comments-content::before,
.comments-content::after {
  display: table;
}
.comments-content::after {
  content: "";
  clear: both;
}
.comments-ops {
  margin: 0;
  color: #999;
  font-size: 13px;
}
.comments-reply-btn {
  cursor: pointer;
}
.reply-list {
  margin-top: 10px;
  font-size: 13px;
  background-color: #FAFAFA;
  padding: 0 10px;
  color: #666;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
.reply-item--ops {
  border-bottom: none;
}
.reply-item {
  padding-bottom: 10px;
  padding-top: 10px;
  word-break: break-word;
}

</style>
