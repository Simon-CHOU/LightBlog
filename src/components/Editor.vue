<template>
    <div class="editor">
        <div class="btnsContainer">
            <div class="btn" @click="getMdValueFn">获取mdValue</div>
            <div class="btn" @click="getHtmlValueFn">获取htmlValue</div>
        </div>
        <div class="maskContainer" v-if="dilogStatus">
            <div class="contentContainer">

             
                <el-form :model="form" status-icon :rules="rules" ref="form"  label-width="80px">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                     <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>

                    <el-row type="flex" class="row-bg">
                        <el-col :span="12">
                            <el-form-item label="类别" prop="category_name">
                                <el-select v-model="form.category_name" placeholder="请选择主类别" >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-form-item label="类别" prop="sub_category_name">
                            <el-select v-model="form.sub_category_name" placeholder="请选择子类别">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-form-item label="摆放">
                        轮播图<el-switch v-model="form.banner"></el-switch>&nbsp;&nbsp;&nbsp;&nbsp;
                        置顶<el-switch v-model="form.toppic"></el-switch>&nbsp;&nbsp;&nbsp;&nbsp;
                        专题<el-switch v-model="form.subject"></el-switch>&nbsp;&nbsp;&nbsp;&nbsp;
                    </el-form-item>

                    <el-form-item >
                        <el-tag
                            :key="tag"
                            v-for="tag in form.tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-form-item>


                    <el-form-item label="摘要" prop="abstract">
                        <el-input type="textarea" v-model="form.abstract"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">确定</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>


                <!-- <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea> -->
            </div>
        </div>
        <div class="editorContainer">
            <markdown 
            :mdValuesP="msg.mdValue"  
            :fullPageStatusP="false" 
            :editStatusP="true" 
            :previewStatusP="true" 
            :navStatusP="true"
            :icoStatusP="true"  
            @childevent="childEventHandler"
            ></markdown>
        </div>
    </div>
</template>

<script>
    import markdown from '../components/Markdown'
   
    import 'bootstrap/dist/js/bootstrap.min.js'
     import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'Editor',
        data() {
            return {
                msgShow:'我要显示的内容',
                dilogStatus:true,
                msg: {
                    mdValue:'## Vue-markdownEditor'
                },
                form:{
                    author:'',
                    abstract:'',
                    category_name:'',
                    sub_category_name:'',
                    title: '',
                    tags: ['数据可视化'],
                    banner:false,
                    toppic:false,
                    subject:false,

                },
                
                inputVisible: false,
                inputValue: '',
                rules: {
                    author: [{required: true, message: '请输入名称', trigger: 'blur'},{min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}],
                    abstract: [{ required: true, message:'请填写摘要', trigger:'blur'}],
                    category_name: [{required: true, message: '请选择主类别', trigger: 'change'}],
                    sub_category_name: [{required: true, message: '请选择子类别', trigger: 'change'}],
                    title: [{required: true, message: '请输入标题', trigger: 'blur'},{min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}],
                }
            }
        },
        components: {
            markdown
        },
        methods: {
            childEventHandler:function(res){
                // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
                this.msg=res;
            },
            getMdValueFn:function(){
                this.msgShow=this.msg.mdValue;
                this.dilogStatus=true;
            },
            getHtmlValueFn:function(){
                this.msgShow=this.msg.htmlValue;
                this.dilogStatus=true;
                
            },
            closeMaskFn:function(){
                this.msgShow='';
                this.dilogStatus=false;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    //alert('submit!');
                    this.closeMaskFn();
                    console.log(this.form)
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },



            handleClose(tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
        }
    }
</script>

<style lang="scss" scoped>

    .show{
        position: absolute;
        left: 0;
        top: 0;
    }
    .editor {
        width: 100%;
        height: 80%;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .btnsContainer{
        position: absolute;
        z-index: 10;
        left: 65px;
        top: 5px;
        height: 25px;
        min-width: 300px;
        // background: pink;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .btn{
            display: inline-block;
            border:1px solid #ccc;
            margin-right: 10px;
            box-sizing: border-box;
            padding: 0 10px;
            background: #fff;
            font-size: 12px;
            height: 25px;
            line-height: 25px;
            cursor:pointer;
            moz-user-select: -moz-none; 
            -moz-user-select: none; 
            -o-user-select:none; 
            -khtml-user-select:none; /* you could also put this in a class */ 
            -webkit-user-select:none;/* and add the CSS class here instead */ 
            -ms-user-select:none; 
            user-select:none;/**禁止选中文字*/ 
            &:active{
                opacity: 0.8;
                background: lightblue;
            }
        }
    }
    .maskContainer{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        height: 100vh;
        width: 100vw;
        background: rgba(0,0,0,0.5);
        // z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        .contentContainer{
            width: 60%;
            height: 60%;
            background: #fefefe;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            .showAreaContainer{
                height: 100%;
                width: 100%;
                outline: none;
                background: #eee;
                display: block;
                resize: none;
                padding: 10px;
                box-sizing: border-box;
            }
            .closeBtnContainer{
                position: absolute;
                height: 30px;
                width: 30px;
                right: -40px;
                top: -40px;
                border:1px solid #fff;
                border-radius: 50%;
                &::before{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: bblock;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: bblock;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                }
            }

        }

    }
    
    .editorContainer {
        width: 90%;
        height: 90%;
        border: 1px solid #ddd;
    }


    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>